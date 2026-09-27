import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components = {
  h2: (p) => <h2 className="h-display mt-12 mb-4 text-2xl sm:text-3xl" {...p} />,
  h3: (p) => <h3 className="font-display mt-8 mb-3 text-xl font-semibold text-white" {...p} />,
  p: (p) => <p className="mb-5 text-[17px] leading-relaxed text-white/70" {...p} />,
  a: (p) => <a className="text-brand-200 underline decoration-brand-400/40 underline-offset-4 hover:text-white" target="_blank" rel="noreferrer" {...p} />,
  ul: (p) => <ul className="mb-6 flex list-disc flex-col gap-2 pl-6 text-[17px] text-white/70 marker:text-brand-300" {...p} />,
  ol: (p) => <ol className="mb-6 flex list-decimal flex-col gap-2 pl-6 text-[17px] text-white/70 marker:text-brand-300" {...p} />,
  li: (p) => <li className="leading-relaxed" {...p} />,
  strong: (p) => <strong className="font-semibold text-white" {...p} />,
  blockquote: (p) => <blockquote className="my-8 border-l-2 border-brand-400 pl-5 text-lg text-white/80 italic" {...p} />,
  hr: () => <div className="hairline my-10" />,
  table: (p) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm" {...p} />
    </div>
  ),
  thead: (p) => <thead className="bg-white/[0.05]" {...p} />,
  th: (p) => <th className="border-b border-white/10 px-4 py-3 font-semibold text-white" {...p} />,
  td: (p) => <td className="border-b border-white/[0.06] px-4 py-3 align-top text-white/70" {...p} />,
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
