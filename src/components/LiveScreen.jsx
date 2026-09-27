import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { Lock, Pause, Play } from 'lucide-react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../lib/cn';

/**
 * A screenshot "played" like a screen recording. Every scene describes, in
 * image-percent coordinates, a camera path, a cursor path, clicks and toast
 * events along a normalised 0→1 timeline.
 *
 * scene = {
 *   src, url, label, duration (ms),
 *   camera: [{ t, x, y, s }],           // focus point + zoom
 *   cursor: [{ t, x, y, click? }],
 *   exit:   { to, t, x, y },           // click that opens scene `to`
 *   toasts: [{ from, to, title, body, tone }],
 * }
 */

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function interp(keys, field, t) {
  if (!keys?.length) return field === 's' ? 1 : 50;
  if (t <= keys[0].t) return keys[0][field];
  for (let i = 1; i < keys.length; i += 1) {
    const a = keys[i - 1];
    const b = keys[i];
    if (t <= b.t) {
      const p = (t - a.t) / (b.t - a.t || 1);
      const e = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
      return a[field] + (b[field] - a[field]) * e;
    }
  }
  return keys[keys.length - 1][field];
}

function cameraAt(scene, t) {
  const s = interp(scene.camera, 's', t);
  const fx = interp(scene.camera, 'x', t);
  const fy = interp(scene.camera, 'y', t);
  const lim = (s - 1) * 50;
  return { s, tx: clamp(s * (50 - fx), -lim, lim), ty: clamp(s * (50 - fy), -lim, lim) };
}

// The exit click only plays when the next scene is the screen it opens. The
// camera settles back to full frame first so the cursor lands exactly where
// the next scene picks it up.
function resolveScene(scene, next) {
  const ex = scene.exit;
  if (!ex || !next || next.id !== ex.to) return { ...scene, cut: false };
  const settle = ex.t - 0.1;
  return {
    ...scene,
    cut: true,
    camera: [...scene.camera.filter((k) => k.t < settle - 0.1), { t: settle, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [
      ...scene.cursor.filter((k) => k.t < settle),
      { t: ex.t - 0.03, x: ex.x, y: ex.y },
      { t: ex.t, x: ex.x, y: ex.y, click: true },
      { t: 1, x: ex.x, y: ex.y },
    ],
  };
}

const toneClass = {
  pass: 'bg-pass',
  fail: 'bg-fail',
  ai: 'bg-gradient-to-br from-brand-400 to-magenta',
  info: 'bg-aqua',
  warn: 'bg-amber',
};

// A scrollable area inside the frame: a tall capture of that area slides
// under a clip, so the page scrolls instead of cutting between screenshots.
function ScrollRegion({ scroll, t }) {
  const y = useTransform(t, (v) => `${-interp(scroll.keys, 'p', v) * (1 - scroll.ratio) * 100}%`);
  return (
    <div
      className="absolute overflow-hidden"
      style={{ left: `${scroll.x}%`, top: `${scroll.y}%`, width: `${scroll.w}%`, height: `${scroll.h}%` }}
    >
      <motion.img src={scroll.src} alt="" draggable={false} className="block w-full select-none will-change-transform" style={{ y }} />
    </div>
  );
}

function Scene({ scene, t, playing, enterByCut }) {
  const [now, setNow] = useState(0);
  useMotionValueEvent(t, 'change', (v) => setNow(v));

  const transform = useTransform(t, (v) => {
    const { s, tx, ty } = cameraAt(scene, v);
    return `translate(${tx}%, ${ty}%) scale(${s})`;
  });
  const cursorLeft = useTransform(t, (v) => {
    const { s, tx } = cameraAt(scene, v);
    return `${50 + s * (interp(scene.cursor, 'x', v) - 50) + tx}%`;
  });
  const cursorTop = useTransform(t, (v) => {
    const { s, ty } = cameraAt(scene, v);
    return `${50 + s * (interp(scene.cursor, 'y', v) - 50) + ty}%`;
  });

  const clicks = (scene.cursor || []).filter((c) => c.click);
  const pressed = clicks.some((c) => now >= c.t && now < c.t + 0.03);

  return (
    <motion.div
      className="absolute inset-0"
      initial={enterByCut ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: enterByCut ? 0.18 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute inset-0 origin-center will-change-transform" style={{ transform }}>
        <img src={scene.src} alt={scene.label} className="absolute inset-0 h-full w-full select-none object-cover object-top" draggable={false} />

        {scene.scroll && <ScrollRegion scroll={scene.scroll} t={t} />}

        {clicks.map((c, i) => (
          <AnimatePresence key={i}>
            {now >= c.t && now < c.t + 0.08 && (
              <motion.span
                className="pointer-events-none absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500 bg-brand-500/20"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        ))}
      </motion.div>

      {scene.cursor?.length > 0 && (
        <motion.div className="pointer-events-none absolute z-20" style={{ left: cursorLeft, top: cursorTop }}>
          <motion.svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="-translate-x-[3px] -translate-y-[2px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
            animate={{ scale: pressed ? 0.82 : 1 }}
            transition={{ duration: 0.12 }}
          >
            <path d="M4 2.5 20 11l-7.2 1.9L9.6 20z" fill="#0b0a24" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      )}

      <div className="pointer-events-none absolute bottom-5 left-5 z-30 hidden w-[min(320px,70%)] flex-col gap-2 sm:flex">
        <AnimatePresence>
          {(scene.toasts || [])
            .filter((m) => playing !== null && now >= m.from && now <= m.to)
            .map((m) => (
              <motion.div
                key={m.title}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0c0b27] p-3 text-left shadow-[0_18px_50px_-12px_rgba(10,9,38,0.7)] ring-1 ring-black/20"
              >
                <span className={cn('mt-1 size-2 flex-shrink-0 rounded-full', toneClass[m.tone || 'ai'])} />
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-white sm:text-[13px]">{m.title}</p>
                  {m.body && <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/60 sm:text-xs">{m.body}</p>}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function LiveScreen({ scenes, className, compact = false, showChapters = true, index: controlledIndex, onIndexChange }) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [innerIndex, setInnerIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const index = controlledIndex ?? innerIndex;
  const setIndex = (i) => (onIndexChange ? onIndexChange(i) : setInnerIndex(i));
  const t = useMotionValue(0);
  const count = scenes.length;
  const i0 = index % count;
  const scene = useMemo(() => resolveScene(scenes[i0], count > 1 ? scenes[(i0 + 1) % count] : null), [scenes, i0, count]);
  const prevCut = useMemo(
    () => count > 1 && resolveScene(scenes[(i0 - 1 + count) % count], scenes[i0]).cut,
    [scenes, i0, count],
  );
  const playing = inView && !paused;

  const totalBefore = useMemo(
    () => scenes.slice(0, index).reduce((sum, s) => sum + (s.duration || 7000), 0),
    [scenes, index],
  );

  useEffect(() => {
    scenes.forEach((s) => {
      [s.src, s.scroll?.src].filter(Boolean).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [scenes]);

  useEffect(() => {
    t.set(0);
  }, [index, t]);

  useEffect(() => {
    if (!playing) return undefined;
    const dur = scene.duration || 7000;
    const controls = animate(t, 1, {
      duration: (dur * (1 - t.get())) / 1000,
      ease: 'linear',
      onComplete: () => setIndex((index + 1) % scenes.length),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, scene]);

  useMotionValueEvent(t, 'change', (v) => setElapsed(totalBefore + v * (scene.duration || 7000)));
  const progress = useTransform(t, (v) => `${v * 100}%`);
  const chapters = useMemo(() => {
    const out = [];
    scenes.forEach((sc, i) => {
      const label = sc.chapter || sc.label;
      const last = out[out.length - 1];
      if (last && last.label === label) last.end = i + 1;
      else out.push({ label, start: i, end: i + 1 });
    });
    return out;
  }, [scenes]);
  const activeChapter = chapters.find((c) => i0 >= c.start && i0 < c.end) || chapters[0];
  const chapterProgress = useTransform(
    t,
    (v) => `${((i0 - activeChapter.start + v) / (activeChapter.end - activeChapter.start)) * 100}%`,
  );

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-30px_rgba(49,32,255,0.55),0_0_0_1px_rgba(255,255,255,0.04)] sm:rounded-[22px]">
        <div className="flex h-9 items-center gap-3 border-b border-white/[0.07] bg-[#11102c] px-3 sm:h-11 sm:px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[60%] items-center gap-2 rounded-lg bg-white/[0.05] px-3 py-1 font-mono text-[10px] text-white/55 sm:text-[11px]">
            <Lock className="size-3 flex-shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={scene.url}
                className="truncate"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                app.rabbitqa.com{scene.url}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-fail/15 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-red-300 sm:inline-flex">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-fail" />
              LIVE
            </span>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play product tour' : 'Pause product tour'}
              className="grid size-6 place-items-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          </div>
        </div>

        <div className="relative aspect-[1512/789] w-full overflow-hidden bg-[#f7f8fb]">
          <AnimatePresence initial={false}>
            <Scene key={`${index}-${scene.src}`} scene={scene} t={t} playing={playing} enterByCut={prevCut} />
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-brand-400 via-iris to-magenta" style={{ width: progress }} />
        </div>
      </div>

      {showChapters && (
        <div className={cn('mt-4 flex items-center gap-3', compact && 'mt-3')}>
          <span className="hidden font-mono text-[11px] tabular-nums text-white/40 sm:block">{formatTime(elapsed)}</span>
          <div className="flex flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">
            {chapters.map((c) => {
              const active = i0 >= c.start && i0 < c.end;
              const done = i0 >= c.end;
              return (
                <button
                  key={c.start}
                  type="button"
                  onClick={() => setIndex(c.start)}
                  className={cn(
                    'group relative min-w-[110px] flex-1 overflow-hidden rounded-lg border px-2.5 py-2 text-left transition-colors',
                    active ? 'border-white/20 bg-white/[0.07]' : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]',
                  )}
                >
                  <span className={cn('block truncate text-[11px] font-medium', active ? 'text-white' : 'text-white/50')}>{c.label}</span>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]">
                    {active && <motion.span className="block h-full bg-brand-400" style={{ width: chapterProgress }} />}
                    {done && <span className="block h-full w-full bg-brand-400/50" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(LiveScreen);
