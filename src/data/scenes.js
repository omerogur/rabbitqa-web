// Scene scripts for <LiveScreen>. Coordinates are percentages of the
// screenshot; `t` runs 0 → 1 across the scene. A scene's `exit` click is only
// played when the next scene in the playlist is the screen that click opens,
// so the cursor never clicks something the following frame doesn't show.

const TAB_Y = 19.4;

export const SCENES = {
  heroDashboard: {
    id: 'hero-dashboard',
    src: '/shots/hero-1-dashboard.webp',
    url: '/dashboard',
    label: 'Dashboard',
    duration: 6000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.3, x: 50, y: 50, s: 1 },
      { t: 0.65, x: 62, y: 40, s: 1.3 },
    ],
    cursor: [
      { t: 0, x: 60, y: 70 },
      { t: 0.35, x: 55, y: 42 },
      { t: 0.65, x: 80, y: 42 },
    ],
    exit: { to: 'hero-switcher', t: 0.9, x: 14.1, y: 12.2 },
    toasts: [
      { from: 0.08, to: 0.45, title: 'One platform overview', body: 'Projects, provisioning, teams and users at a glance', tone: 'info' },
      { from: 0.48, to: 0.86, title: 'Every module reports in', body: 'Analyzer, AutoRunner, SmartPBI, TestPilot…', tone: 'pass' },
    ],
  },

  heroSwitcher: {
    id: 'hero-switcher',
    src: '/shots/hero-2-switcher.webp',
    url: '/dashboard',
    label: 'Module switcher',
    duration: 7500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.45, x: 50, y: 42, s: 1.45 },
      { t: 0.7, x: 50, y: 42, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 14.1, y: 12.2 },
      { t: 0.3, x: 42, y: 29 },
      { t: 0.5, x: 63, y: 29 },
      { t: 0.7, x: 85, y: 44 },
    ],
    exit: { to: 'hero-projects-dropdown', t: 0.9, x: 17.2, y: 2.5 },
    toasts: [
      { from: 0.08, to: 0.42, title: 'Business, Planning & Technical agents', body: 'Every module one click away', tone: 'ai' },
      { from: 0.45, to: 0.86, title: '15 modules, one workspace', body: 'Same projects, permissions and repository', tone: 'info' },
    ],
  },

  heroProjectsDropdown: {
    id: 'hero-projects-dropdown',
    chapter: 'Projects',
    src: '/shots/hero-3-projects-dropdown.webp',
    url: '/dashboard',
    label: 'Projects',
    duration: 5500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.12, x: 50, y: 50, s: 1 },
      { t: 0.4, x: 28, y: 25, s: 1.5 },
      { t: 0.6, x: 28, y: 25, s: 1.5 },
    ],
    cursor: [
      { t: 0, x: 17.2, y: 2.5 },
      { t: 0.3, x: 22, y: 24 },
      { t: 0.55, x: 22, y: 35 },
    ],
    exit: { to: 'hero-projects', t: 0.88, x: 16.6, y: 42.5 },
    toasts: [
      { from: 0.1, to: 0.8, title: 'Switch project in one click', body: 'Every module follows the active project', tone: 'info' },
    ],
  },

  heroProjects: {
    id: 'hero-projects',
    chapter: 'Projects',
    src: '/shots/hero-4-projects.webp',
    url: '/projects',
    label: 'Projects home',
    duration: 6500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.25, x: 50, y: 50, s: 1 },
      { t: 0.7, x: 62, y: 70, s: 1.3 },
      { t: 1, x: 62, y: 70, s: 1.3 },
    ],
    cursor: [
      { t: 0, x: 16.6, y: 42.5 },
      { t: 0.35, x: 45, y: 58 },
      { t: 0.7, x: 70, y: 60 },
      { t: 1, x: 72, y: 62 },
    ],
    toasts: [
      { from: 0.1, to: 0.5, title: 'All your projects in one place', body: 'Each with its own modules, team and access', tone: 'info' },
      { from: 0.55, to: 1, title: 'Ready to ensure quality', body: 'Pick a project and every agent follows', tone: 'pass' },
    ],
  },

  tpDashboard: {
    id: 'tp-dashboard',
    src: '/shots/tp-1-dashboard.webp',
    url: '/testpilot/dashboard',
    label: 'Dashboard',
    duration: 6000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.25, x: 50, y: 50, s: 1 },
      { t: 0.6, x: 66, y: 40, s: 1.3 },
    ],
    cursor: [
      { t: 0, x: 60, y: 70 },
      { t: 0.35, x: 55, y: 20 },
      { t: 0.6, x: 85, y: 50 },
    ],
    exit: { to: 'tp-plans', t: 0.9, x: 5.8, y: 23.8 },
    toasts: [
      { from: 0.08, to: 0.5, title: '77 results across the project', body: '69% overall pass rate', tone: 'pass' },
      { from: 0.52, to: 0.86, title: 'Execution trend & status', body: 'Success, failed, blocked and not executed at a glance', tone: 'info' },
    ],
  },

  tpPlans: {
    id: 'tp-plans',
    src: '/shots/tp-2-plans.webp',
    url: '/testpilot/test-plans',
    label: 'Test plans',
    duration: 4500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.55, x: 50, y: 45, s: 1.25 },
    ],
    cursor: [
      { t: 0, x: 5.8, y: 23.8 },
      { t: 0.4, x: 40, y: 45 },
    ],
    exit: { to: 'tp-plan-expanded', t: 0.88, x: 18.4, y: 50.1 },
    toasts: [{ from: 0.1, to: 0.8, title: 'Plans track quality across releases', body: 'Default Plan · 77 scenarios · 3 runs', tone: 'info' }],
  },

  tpPlanExpanded: {
    id: 'tp-plan-expanded',
    chapter: 'Test plans',
    src: '/shots/tp-3-plan-expanded.webp',
    url: '/testpilot/test-plans',
    label: 'Plan runs',
    duration: 5500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 58, y: 62, s: 1.35 },
    ],
    cursor: [
      { t: 0, x: 18.4, y: 50.1 },
      { t: 0.35, x: 55, y: 65 },
      { t: 0.6, x: 70, y: 66 },
    ],
    exit: { to: 'tp-exec', t: 0.88, x: 23.1, y: 65.1 },
    toasts: [{ from: 0.1, to: 0.84, title: '3 runs in this plan', body: 'Mobile, web and marketplace, each with live results', tone: 'info' }],
  },

  tpExec: {
    id: 'tp-exec',
    src: '/shots/tp-4-exec.webp',
    url: '/testpilot/test-executions?run=mobile-app-regression',
    label: 'Execution',
    duration: 9000,
    scroll: {
      src: '/shots/tp-4-exec-tall.webp',
      x: 17.251,
      y: 12.724,
      w: 82.749,
      h: 85.987,
      ratio: 0.4153,
      keys: [
        { t: 0, p: 0 },
        { t: 0.2, p: 0 },
        { t: 0.75, p: 1 },
        { t: 1, p: 1 },
      ],
    },
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 1, x: 50, y: 50, s: 1 },
    ],
    cursor: [
      { t: 0, x: 23.1, y: 65.1 },
      { t: 0.2, x: 60, y: 55 },
      { t: 0.75, x: 62, y: 60 },
    ],
    exit: { to: 'tp-drawer', t: 0.9, x: 29.1, y: 72.6 },
    toasts: [
      { from: 0.05, to: 0.4, title: '25 cases · 72% progress', body: 'Passed, bug fixed, retest, blocked, failed', tone: 'info' },
      { from: 0.42, to: 0.86, title: 'Every case, owner and status', body: 'Priority, complexity and actions per row', tone: 'pass' },
    ],
  },

  tpDrawer: {
    id: 'tp-drawer',
    src: '/shots/tp-5-drawer.webp',
    url: '/testpilot/test-executions?case=RUN-244008',
    label: 'Case detail',
    duration: 9000,
    scroll: {
      src: '/shots/tp-6-drawer-tall.webp',
      x: 50,
      y: 18.419,
      w: 50,
      h: 81.581,
      ratio: 0.4554,
      keys: [
        { t: 0, p: 0 },
        { t: 0.25, p: 0 },
        { t: 0.85, p: 1 },
        { t: 1, p: 1 },
      ],
    },
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.45, x: 75, y: 55, s: 1.35 },
      { t: 1, x: 75, y: 55, s: 1.35 },
    ],
    cursor: [
      { t: 0, x: 29.1, y: 72.6 },
      { t: 0.25, x: 70, y: 60 },
      { t: 0.85, x: 72, y: 66 },
      { t: 1, x: 73, y: 67 },
    ],
    toasts: [
      { from: 0.05, to: 0.35, title: 'Failed · Performance metrics regression', body: 'Test 19 of 25 · Medium priority', tone: 'fail' },
      { from: 0.4, to: 0.7, title: 'Pre-conditions and data', body: 'Everything a tester needs, in one drawer', tone: 'info' },
      { from: 0.72, to: 1, title: '7 steps with expected results', body: 'Execute, edit or file a bug from here', tone: 'pass' },
    ],
  },

  cwDashboard: {
    id: 'cw-dashboard',
    src: '/shots/cw-1-dashboard.webp',
    url: '/casewriter/dashboard',
    label: 'Dashboard',
    duration: 7000,
    scroll: { src: '/shots/cw-1-dashboard-tall.webp', x: 17.251, y: 12.724, w: 82.749, h: 85.987, ratio: 0.5479, keys: [{ t: 0, p: 0 }, { t: 0.2, p: 0 }, { t: 0.7, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 60, y: 30 }, { t: 0.5, x: 55, y: 60 }, { t: 0.75, x: 30, y: 45 }],
    exit: { to: 'cw-generator', t: 0.9, x: 8.3, y: 28.3 },
    toasts: [
      { from: 0.05, to: 0.45, title: '7,891 test cases · 224 sets', body: '82% of them generated by AI', tone: 'ai' },
      { from: 0.48, to: 0.86, title: '856 AI sessions', body: 'Every generation is kept and reviewable', tone: 'info' },
    ],
  },

  cwGenerator: {
    id: 'cw-generator',
    src: '/shots/cw-2-generator.webp',
    url: '/casewriter/ai-generator',
    label: 'AI generation',
    duration: 7500,
    scroll: { src: '/shots/cw-2-generator-tall.webp', x: 17.251, y: 12.724, w: 82.749, h: 85.987, ratio: 0.5471, keys: [{ t: 0, p: 0 }, { t: 0.25, p: 0 }, { t: 0.75, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 8.3, y: 28.3 }, { t: 0.3, x: 50, y: 55 }, { t: 0.75, x: 60, y: 70 }],
    exit: { to: 'cw-session', t: 0.9, x: 8.3, y: 32.6 },
    toasts: [
      { from: 0.05, to: 0.45, title: 'Documents, text, URLs, PBIs or Figma', body: 'Any source becomes test scenarios', tone: 'ai' },
      { from: 0.48, to: 0.86, title: 'Platforms, types and case count', body: 'Advanced configuration when you need it', tone: 'info' },
    ],
  },

  cwSession: {
    id: 'cw-session',
    src: '/shots/cw-5-session.webp',
    url: '/casewriter/ai-tests/session-23-cases',
    label: 'AI session',
    duration: 8500,
    scroll: { src: '/shots/cw-5-session-tall.webp', x: 17.251, y: 12.724, w: 82.749, h: 85.987, ratio: 0.3333, keys: [{ t: 0, p: 0 }, { t: 0.2, p: 0 }, { t: 0.78, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 8.3, y: 32.6 }, { t: 0.3, x: 60, y: 45 }, { t: 0.78, x: 40, y: 70 }],
    exit: { to: 'cw-expanded', t: 0.9, x: 19.18, y: 72.75 },
    toasts: [
      { from: 0.05, to: 0.4, title: '23 of 23 cases generated in 4 min', body: 'Functional, happy path, boundary and negative', tone: 'pass' },
      { from: 0.42, to: 0.86, title: 'Coverage analysis 55%', body: 'Gaps, uncovered areas and recommendations', tone: 'warn' },
    ],
  },

  cwExpanded: {
    id: 'cw-expanded',
    chapter: 'AI session',
    src: '/shots/cw-6-expanded.webp',
    url: '/casewriter/ai-tests/session-23-cases?case=ATC-531092',
    label: 'Case steps',
    duration: 7000,
    scroll: { src: '/shots/cw-6-expanded-tall.webp', x: 17.251, y: 12.724, w: 82.749, h: 85.987, ratio: 0.5, keys: [{ t: 0, p: 0 }, { t: 0.25, p: 0 }, { t: 0.75, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 19.18, y: 72.75 }, { t: 0.35, x: 55, y: 55 }, { t: 0.75, x: 50, y: 60 }],
    exit: { to: 'cw-repo', t: 0.9, x: 8.3, y: 37.1 },
    toasts: [
      { from: 0.05, to: 0.45, title: 'Pre-conditions, steps and expected results', body: 'Written for you, ready for review', tone: 'ai' },
      { from: 0.48, to: 0.86, title: '9 API steps, each verified', body: 'Quality score: Good', tone: 'pass' },
    ],
  },

  cwRepo: {
    id: 'cw-repo',
    src: '/shots/cw-7-repo.webp',
    url: '/casewriter/test-repository',
    label: 'Repository',
    duration: 6500,
    scroll: { src: '/shots/cw-7-repo-tall.webp', x: 17.31, y: 31.274, w: 20.409, h: 56.047, ratio: 0.5, keys: [{ t: 0, p: 0 }, { t: 0.2, p: 0 }, { t: 0.7, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 8.3, y: 37.1 }, { t: 0.3, x: 28, y: 50 }, { t: 0.7, x: 28, y: 58 }],
    exit: { to: 'cw-folder', t: 0.9, x: 19.5, y: 60.3 },
    toasts: [
      { from: 0.05, to: 0.5, title: '225 test sets · 7,891 cases', body: 'One shared repository across modules', tone: 'info' },
    ],
  },

  cwFolder: {
    id: 'cw-folder',
    chapter: 'Repository',
    src: '/shots/cw-8-folder.webp',
    url: '/casewriter/test-repository?set=rabbitqa-analyzer',
    label: 'Folder',
    duration: 3500,
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 0.4, x: 30, y: 55, s: 1.35 }, { t: 0.6, x: 30, y: 55, s: 1.35 }],
    cursor: [{ t: 0, x: 19.5, y: 60.3 }, { t: 0.5, x: 25, y: 64 }],
    exit: { to: 'cw-subfolder', t: 0.88, x: 20.0, y: 65.2 },
    toasts: [{ from: 0.1, to: 0.8, title: 'Nested test sets', body: '420 cases across 5 sub-sets', tone: 'info' }],
  },

  cwSubfolder: {
    id: 'cw-subfolder',
    chapter: 'Repository',
    src: '/shots/cw-9-subfolder.webp',
    url: '/casewriter/test-repository?set=analysis-score',
    label: 'Scenarios',
    duration: 4000,
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 0.4, x: 30, y: 60, s: 1.35 }, { t: 0.6, x: 30, y: 60, s: 1.35 }],
    cursor: [{ t: 0, x: 20.0, y: 65.2 }, { t: 0.5, x: 26, y: 70 }],
    exit: { to: 'cw-detail', t: 0.88, x: 28.7, y: 71.8 },
    toasts: [{ from: 0.1, to: 0.8, title: '275 scenarios in this set', body: 'Pick one to see its full detail', tone: 'info' }],
  },

  cwDetail: {
    id: 'cw-detail',
    chapter: 'Repository',
    src: '/shots/cw-10-detail.webp',
    url: '/casewriter/test-repository?testCase=TC-1001160',
    label: 'Case detail',
    duration: 8000,
    scroll: { src: '/shots/cw-10-detail-tall.webp', x: 37.895, y: 49.77, w: 60.702, h: 42.484, ratio: 0.564, keys: [{ t: 0, p: 0 }, { t: 0.35, p: 0 }, { t: 0.8, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 0.25, x: 66, y: 62, s: 1.3 }, { t: 0.8, x: 66, y: 62, s: 1.3 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 28.7, y: 71.8 }, { t: 0.3, x: 62, y: 60 }, { t: 0.8, x: 64, y: 70 }],
    exit: { to: 'cw-settings', t: 0.92, x: 5.4, y: 41.7 },
    toasts: [
      { from: 0.05, to: 0.4, title: 'Upload a valid document and run the analysis', body: 'Medium priority · Simple · 7 steps', tone: 'info' },
      { from: 0.42, to: 0.86, title: 'Steps with expected results', body: 'Edit, regenerate with AI or link to TestRail', tone: 'ai' },
    ],
  },

  cwSettings: {
    id: 'cw-settings',
    src: '/shots/cw-11-settings.webp',
    url: '/casewriter/settings',
    label: 'Settings',
    duration: 7000,
    scroll: { src: '/shots/cw-11-settings-tall.webp', x: 17.251, y: 12.723, w: 82.749, h: 79.699, ratio: 0.5, keys: [{ t: 0, p: 0 }, { t: 0.3, p: 0 }, { t: 0.85, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [{ t: 0, x: 5.4, y: 41.7 }, { t: 0.4, x: 55, y: 50 }, { t: 1, x: 60, y: 60 }],
    toasts: [
      { from: 0.05, to: 0.45, title: 'Generation defaults for the team', body: 'Language, case count, execution and focus', tone: 'info' },
      { from: 0.5, to: 1, title: 'Platforms and risk weights', body: 'Priority and complexity must total 100', tone: 'pass' },
    ],
  },

  mhLive: {
    id: 'mh-live',
    chapter: 'Live session',
    src: '/shots/mh-3-live.webp',
    url: '/mobilehub/live-testing/redmi-9-prime',
    label: 'Live device',
    duration: 7000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 58, y: 52, s: 1.45 },
      { t: 0.7, x: 58, y: 52, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 60, y: 60 },
      { t: 0.35, x: 56, y: 75 },
      { t: 0.55, x: 67.5, y: 22 },
      { t: 0.7, x: 20, y: 40 },
    ],
    exit: { to: 'mh-network', t: 0.9, x: 5.9, y: 35.9 },
    toasts: [
      { from: 0.05, to: 0.45, title: 'Redmi 9 Prime · connected', body: 'Real Android 12 device, streamed over WebRTC', tone: 'pass' },
      { from: 0.48, to: 0.86, title: '7 ms latency · 0% loss', body: 'Home, back, rotate, screenshot and record from the toolbar', tone: 'info' },
    ],
  },

  mhNetwork: {
    id: 'mh-network',
    chapter: 'Live session',
    src: '/shots/mh-4-network.webp',
    url: '/mobilehub/live-testing/redmi-9-prime?panel=network',
    label: 'Network',
    duration: 5500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 25, y: 40, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 5.9, y: 35.9 },
      { t: 0.4, x: 20, y: 60 },
    ],
    exit: { to: 'mh-performance', t: 0.88, x: 2.5, y: 37.3 },
    toasts: [{ from: 0.08, to: 0.82, title: 'Connectivity and packet capture', body: 'Wi-Fi route, links and whole-device captures', tone: 'info' }],
  },

  mhPerformance: {
    id: 'mh-performance',
    chapter: 'Live session',
    src: '/shots/mh-5-performance.webp',
    url: '/mobilehub/live-testing/redmi-9-prime?panel=metrics',
    label: 'Performance',
    duration: 6000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 25, y: 60, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 2.5, y: 37.3 },
      { t: 0.4, x: 22, y: 75 },
    ],
    exit: { to: 'mh-accessibility', t: 0.88, x: 2.5, y: 28.0 },
    toasts: [{ from: 0.08, to: 0.82, title: 'Live device metrics', body: 'CPU, memory, disk I/O and battery every second', tone: 'pass' }],
  },

  mhAccessibility: {
    id: 'mh-accessibility',
    chapter: 'Live session',
    src: '/shots/mh-6-accessibility.webp',
    url: '/mobilehub/live-testing/redmi-9-prime?panel=accessibility',
    label: 'Accessibility',
    duration: 6000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 25, y: 45, s: 1.4 },
    ],
    cursor: [
      { t: 0, x: 2.5, y: 28.0 },
      { t: 0.4, x: 18, y: 36 },
    ],
    exit: { to: 'mh-audit', t: 0.88, x: 22.9, y: 91.7 },
    toasts: [{ from: 0.08, to: 0.84, title: 'Accessibility audits on real devices', body: 'Native app or mobile web, saved as a persistent report', tone: 'ai' }],
  },

  mhAudit: {
    id: 'mh-audit',
    chapter: 'Live session',
    src: '/shots/mh-7-audit.webp',
    url: '/mobilehub/live-testing/redmi-9-prime?panel=accessibility',
    label: 'Audit result',
    duration: 6500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.45, x: 25, y: 45, s: 1.45 },
      { t: 0.75, x: 25, y: 45, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 22, y: 85 },
      { t: 0.4, x: 20, y: 40 },
      { t: 0.7, x: 10, y: 50 },
    ],
    exit: { to: 'mh-a11y-list', t: 0.9, x: 6.2, y: 55.0 },
    toasts: [
      { from: 0.08, to: 0.5, title: 'Audit finished in seconds', body: '5 errors · 1 warning · WCAG 2.2 AA', tone: 'fail' },
      { from: 0.52, to: 0.86, title: 'Touch targets and screen-reader labels', body: 'Every finding tied to the element on screen', tone: 'info' },
    ],
  },

  mhA11yList: {
    id: 'mh-a11y-list',
    chapter: 'Audit report',
    src: '/shots/mh-8-a11y-list.webp',
    url: '/mobilehub/accessibility',
    label: 'Audit reports',
    duration: 5000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 45, y: 45, s: 1.3 },
    ],
    cursor: [
      { t: 0, x: 6.2, y: 55.0 },
      { t: 0.45, x: 40, y: 40 },
    ],
    exit: { to: 'mh-report', t: 0.88, x: 37.4, y: 62.3 },
    toasts: [{ from: 0.1, to: 0.84, title: 'Every audit becomes a persistent report', body: 'From live testing, automation and AI agents', tone: 'info' }],
  },

  mhReport: {
    id: 'mh-report',
    chapter: 'Audit report',
    src: '/shots/mh-9-report.webp',
    url: '/mobilehub/accessibility/audits/redmi-home-screen',
    label: 'Audit report',
    duration: 7500,
    scroll: { src: '/shots/mh-9-report-tall.webp', x: 17.251, y: 12.72, w: 82.749, h: 86.292, ratio: 0.6956, keys: [{ t: 0, p: 0 }, { t: 0.3, p: 0 }, { t: 0.8, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [
      { t: 0, x: 37.4, y: 62.3 },
      { t: 0.4, x: 60, y: 45 },
      { t: 0.75, x: 30, y: 45 },
    ],
    exit: { to: 'mh-sessions', t: 0.9, x: 6.2, y: 28.2 },
    toasts: [
      { from: 0.05, to: 0.45, title: '1 critical · 5 serious', body: 'WCAG 2.2 Level AA · export as PDF or CSV', tone: 'fail' },
      { from: 0.48, to: 0.86, title: 'App and device snapshot', body: 'Redmi 9 Prime · Android 12 · 1080×2340', tone: 'info' },
    ],
  },

  mhSessions: {
    id: 'mh-sessions',
    chapter: 'Session detail',
    src: '/shots/mh-10-sessions.webp',
    url: '/mobilehub/live-testing',
    label: 'Sessions',
    duration: 5000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 35, y: 70, s: 1.35 },
    ],
    cursor: [
      { t: 0, x: 6.2, y: 28.2 },
      { t: 0.45, x: 30, y: 70 },
    ],
    exit: { to: 'mh-session', t: 0.88, x: 24.1, y: 90.8 },
    toasts: [{ from: 0.1, to: 0.84, title: 'Every session is recorded', body: 'Result, screenshots, captures and audits per run', tone: 'pass' }],
  },

  mhSession: {
    id: 'mh-session',
    chapter: 'Session detail',
    src: '/shots/mh-11-session.webp',
    url: '/mobilehub/sessions/redmi-9-prime',
    label: 'Session detail',
    duration: 7000,
    scroll: { src: '/shots/mh-11-session-tall.webp', x: 17.251, y: 12.72, w: 81.404, h: 86.292, ratio: 0.7032, keys: [{ t: 0, p: 0 }, { t: 0.3, p: 0 }, { t: 0.8, p: 1 }, { t: 1, p: 1 }] },
    camera: [{ t: 0, x: 50, y: 50, s: 1 }, { t: 1, x: 50, y: 50, s: 1 }],
    cursor: [
      { t: 0, x: 24.1, y: 90.8 },
      { t: 0.4, x: 60, y: 40 },
      { t: 1, x: 62, y: 50 },
    ],
    toasts: [
      { from: 0.05, to: 0.45, title: 'Session passed · 2m 7s', body: 'Logs, network, screenshots, performance and audits', tone: 'pass' },
      { from: 0.5, to: 1, title: 'Full activity timeline', body: 'Every tap and action, timestamped', tone: 'info' },
    ],
  },

  arPrompt: {
    id: 'ar-prompt',
    src: '/shots/ar-1-prompt.webp',
    url: '/autorunner/ai-studio/scenarios/create-cod-shipment',
    label: 'Prompt',
    duration: 7000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.6, x: 62, y: 48, s: 1.4 },
      { t: 0.85, x: 45, y: 30, s: 1.25 },
      { t: 1, x: 45, y: 30, s: 1.25 },
    ],
    cursor: [
      { t: 0, x: 20, y: 36 },
      { t: 0.25, x: 16, y: 38.5 },
      { t: 0.6, x: 72, y: 48 },
      { t: 0.85, x: 34, y: TAB_Y },
    ],
    exit: { to: 'ar-script', t: 0.9, x: 34, y: TAB_Y },
    toasts: [
      { from: 0.08, to: 0.5, title: 'Plain-language goal', body: 'Seven steps and an expected result, no code', tone: 'ai' },
      { from: 0.52, to: 0.88, title: 'Test data as variables', body: 'Data_customerId, Data_codAmount…', tone: 'info' },
    ],
  },

  arScript: {
    id: 'ar-script',
    src: '/shots/ar-2-script.webp',
    url: '/autorunner/ai-studio/scenarios/create-cod-shipment/script',
    label: 'Script',
    duration: 7000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.55, x: 60, y: 62, s: 1.45 },
      { t: 0.85, x: 50, y: 32, s: 1.25 },
      { t: 1, x: 50, y: 32, s: 1.25 },
    ],
    cursor: [
      { t: 0, x: 34, y: TAB_Y },
      { t: 0.3, x: 40, y: 50 },
      { t: 0.55, x: 48, y: 68 },
      { t: 0.85, x: 45.3, y: TAB_Y },
    ],
    exit: { to: 'ar-variables', t: 0.9, x: 45.3, y: TAB_Y },
    toasts: [
      { from: 0.08, to: 0.5, title: '50 steps written by the agent', body: 'Grouped by screen: Login, Dashboard, Create Shipment', tone: 'ai' },
      { from: 0.52, to: 0.88, title: 'Locators live in a repository', body: 'LoginScreen.usernameInput, not brittle XPaths', tone: 'info' },
    ],
  },

  arVariables: {
    id: 'ar-variables',
    chapter: 'Script',
    src: '/shots/ar-3-variables.webp',
    url: '/autorunner/ai-studio/scenarios/create-cod-shipment/variables',
    label: 'Variables',
    duration: 6500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.6, x: 62, y: 60, s: 1.4 },
      { t: 0.85, x: 55, y: 30, s: 1.2 },
      { t: 1, x: 55, y: 30, s: 1.2 },
    ],
    cursor: [
      { t: 0, x: 45.3, y: TAB_Y },
      { t: 0.35, x: 38, y: 55 },
      { t: 0.6, x: 58, y: 70 },
      { t: 0.85, x: 52.4, y: TAB_Y },
    ],
    exit: { to: 'ar-versions', t: 0.9, x: 52.4, y: TAB_Y },
    toasts: [
      { from: 0.08, to: 0.5, title: '19 scenario variables', body: 'Swap data without touching a single step', tone: 'info' },
      { from: 0.52, to: 0.88, title: 'Base variables shared', body: 'Reused across every scenario in the project', tone: 'pass' },
    ],
  },

  arVersions: {
    id: 'ar-versions',
    src: '/shots/ar-4-versions.webp',
    url: '/autorunner/ai-studio/scenarios/create-cod-shipment/versions',
    label: 'Versions',
    duration: 6500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.6, x: 60, y: 44, s: 1.45 },
      { t: 0.85, x: 58, y: 30, s: 1.2 },
      { t: 1, x: 58, y: 30, s: 1.2 },
    ],
    cursor: [
      { t: 0, x: 52.4, y: TAB_Y },
      { t: 0.35, x: 40, y: 38 },
      { t: 0.6, x: 45, y: 46 },
      { t: 0.85, x: 58.4, y: TAB_Y },
    ],
    exit: { to: 'ar-history', t: 0.9, x: 58.4, y: TAB_Y },
    toasts: [
      { from: 0.08, to: 0.5, title: 'Immutable versions', body: 'v4 active · published from v2', tone: 'pass' },
      { from: 0.52, to: 0.88, title: 'Heals wait for your review', body: 'Draft v3: 1 step needs review before it ships', tone: 'warn' },
    ],
  },

  arHistory: {
    id: 'ar-history',
    chapter: 'Agent log',
    src: '/shots/ar-5-history.webp',
    url: '/autorunner/ai-studio/scenarios/create-cod-shipment/history',
    label: 'Runs',
    duration: 6000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.7, x: 70, y: 45, s: 1.4 },
      { t: 1, x: 70, y: 45, s: 1.4 },
    ],
    cursor: [
      { t: 0, x: 58.4, y: TAB_Y },
      { t: 0.4, x: 65, y: 43 },
      { t: 0.8, x: 86.8, y: 43.2 },
    ],
    exit: { to: 'ar-agent', t: 0.88, x: 86.8, y: 43.2 },
    toasts: [
      { from: 0.1, to: 0.55, title: '4 generation runs', body: 'Run #11232 succeeded in 17m 44s', tone: 'pass' },
      { from: 0.58, to: 0.9, title: 'Open the agent’s conversation', body: 'Every run keeps its full reasoning trail', tone: 'info' },
    ],
  },

  arAgent: {
    id: 'ar-agent',
    src: '/shots/ar-6-agent.webp',
    url: '/autorunner/ai-studio/runs/11232/conversation',
    label: 'Agent log',
    duration: 8000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 45, y: 45, s: 1.45 },
      { t: 0.9, x: 45, y: 64, s: 1.45 },
      { t: 1, x: 45, y: 64, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 86.8, y: 43.2 },
      { t: 0.3, x: 60, y: 44 },
      { t: 0.6, x: 62, y: 56 },
      { t: 1, x: 66, y: 66 },
    ],
    toasts: [
      { from: 0.05, to: 0.35, title: '172 events recorded', body: 'Read-only timeline of the generation run', tone: 'info' },
      { from: 0.38, to: 0.66, title: 'Action verified', body: 'The DOM settled before the agent moved on', tone: 'pass' },
      { from: 0.68, to: 1, title: 'Plan before every step', body: 'The agent states what it expects to happen next', tone: 'ai' },
    ],
  },

  srBoard: {
    id: 'sr-board',
    src: '/shots/sr-2-board.webp',
    url: '/smartrequest/request-board',
    label: 'Request board',
    duration: 6500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.6, x: 45, y: 70, s: 1.35 },
      { t: 1, x: 35, y: 72, s: 1.35 },
    ],
    cursor: [
      { t: 0, x: 70, y: 30 },
      { t: 0.35, x: 60, y: 62 },
      { t: 0.8, x: 25.1, y: 76 },
    ],
    exit: { to: 'sr-request', t: 0.86, x: 25.1, y: 76 },
    toasts: [
      { from: 0.08, to: 0.45, title: '49 requests, one board', body: 'Pending → To Do → In Progress → Test → Review', tone: 'info' },
      { from: 0.48, to: 0.84, title: 'Every request scored by AI', body: 'Clarity, completeness and business value out of 100', tone: 'ai' },
    ],
  },

  srRequest: {
    id: 'sr-request',
    src: '/shots/sr-3-request.webp',
    url: '/smartrequest/request-board?request=break-management',
    label: 'Request',
    duration: 6500,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.55, x: 45, y: 38, s: 1.4 },
      { t: 1, x: 70, y: 40, s: 1.35 },
    ],
    cursor: [
      { t: 0, x: 25.1, y: 76 },
      { t: 0.4, x: 50, y: 42 },
      { t: 0.75, x: 75, y: 12 },
      { t: 0.9, x: 25.9, y: 25.6 },
    ],
    exit: { to: 'sr-analysis', t: 0.93, x: 25.9, y: 25.6 },
    toasts: [
      { from: 0.1, to: 0.5, title: 'Score 80 / 100 · Passed', body: 'Ready to approve, medium priority detected', tone: 'pass' },
      { from: 0.52, to: 0.88, title: 'Approve or reject in one click', body: 'Business owners stay in control', tone: 'info' },
    ],
  },

  srAnalysis: {
    id: 'sr-analysis',
    src: '/shots/sr-4-analysis.webp',
    url: '/smartrequest/request-board?request=break-management&tab=detail',
    label: 'AI analysis',
    duration: 7000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.15, x: 50, y: 50, s: 1 },
      { t: 0.5, x: 40, y: 52, s: 1.45 },
      { t: 1, x: 42, y: 70, s: 1.4 },
    ],
    cursor: [
      { t: 0, x: 25.9, y: 25.6 },
      { t: 0.35, x: 30, y: 46 },
      { t: 0.6, x: 52, y: 55 },
      { t: 0.95, x: 48, y: 80 },
    ],
    toasts: [
      { from: 0.08, to: 0.48, title: 'A one-line ask becomes a spec', body: '“we need proper break management for drivers”', tone: 'ai' },
      { from: 0.5, to: 0.92, title: 'Evaluated through 12 questions', body: '+77 points earned, acceptance criteria drafted', tone: 'pass' },
    ],
  },

  mhFleet: {
    id: 'mh-fleet',
    chapter: 'Device fleet',
    src: '/shots/mh-1-fleet.webp',
    url: '/mobilehub/devices',
    label: 'Device fleet',
    duration: 7000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.55, x: 62, y: 62, s: 1.3 },
      { t: 0.85, x: 38, y: 80, s: 1.4 },
      { t: 1, x: 38, y: 80, s: 1.4 },
    ],
    cursor: [
      { t: 0, x: 60, y: 20 },
      { t: 0.3, x: 40, y: 26.5 },
      { t: 0.55, x: 70, y: 62 },
      { t: 0.85, x: 27.2, y: 96.8 },
    ],
    exit: { to: 'mh-preparing', t: 0.9, x: 27.2, y: 96.8 },
    toasts: [
      { from: 0.08, to: 0.5, title: '121 devices in the fleet', body: 'Real phones and tablets next to emulators & simulators', tone: 'info' },
      { from: 0.52, to: 0.9, title: 'Redmi 9 Prime · Android 12', body: 'Real device · available now', tone: 'pass' },
    ],
  },

  mhPreparing: {
    id: 'mh-preparing',
    chapter: 'Live session',
    src: '/shots/mh-2-preparing.webp',
    url: '/mobilehub/live-testing/redmi-9-prime',
    label: 'Live session',
    duration: 7000,
    camera: [
      { t: 0, x: 50, y: 50, s: 1 },
      { t: 0.2, x: 50, y: 50, s: 1 },
      { t: 0.6, x: 20, y: 50, s: 1.4 },
      { t: 0.9, x: 57, y: 55, s: 1.45 },
      { t: 1, x: 57, y: 55, s: 1.45 },
    ],
    cursor: [
      { t: 0, x: 27.2, y: 96.8 },
      { t: 0.3, x: 12, y: 30 },
      { t: 0.6, x: 13, y: 60 },
      { t: 1, x: 70, y: 62 },
    ],
    toasts: [
      { from: 0.08, to: 0.4, title: 'Reserving Redmi 9 Prime', body: 'The device is locked to your session', tone: 'info' },
      { from: 0.42, to: 0.72, title: 'Session tools ready', body: 'Inspector, network, performance, a11y, recordings', tone: 'ai' },
      { from: 0.74, to: 1, title: 'Connecting to the device…', body: 'WebRTC stream negotiating', tone: 'pass' },
    ],
  },
};

export const AUTORUNNER_FLOW = [SCENES.arPrompt, SCENES.arScript, SCENES.arVariables, SCENES.arVersions, SCENES.arHistory, SCENES.arAgent];
export const MOBILEHUB_FLOW = [SCENES.mhFleet, SCENES.mhPreparing, SCENES.mhLive, SCENES.mhNetwork, SCENES.mhPerformance, SCENES.mhAccessibility, SCENES.mhAudit, SCENES.mhA11yList, SCENES.mhReport, SCENES.mhSessions, SCENES.mhSession];
export const TESTPILOT_FLOW = [SCENES.tpDashboard, SCENES.tpPlans, SCENES.tpPlanExpanded, SCENES.tpExec, SCENES.tpDrawer];
export const CASEWRITER_FLOW = [SCENES.cwDashboard, SCENES.cwGenerator, SCENES.cwSession, SCENES.cwExpanded, SCENES.cwRepo, SCENES.cwFolder, SCENES.cwSubfolder, SCENES.cwDetail, SCENES.cwSettings];
export const ACCESSIBILITY_FLOW = [SCENES.mhAccessibility, SCENES.mhAudit, SCENES.mhA11yList, SCENES.mhReport];
export const HERO_SCENES = [SCENES.heroDashboard, SCENES.heroSwitcher, SCENES.heroProjectsDropdown, SCENES.heroProjects];
export const SMARTREQUEST_FLOW = [SCENES.srBoard, SCENES.srRequest, SCENES.srAnalysis];
export const PLANNING_FLOW = [SCENES.cwGenerator, SCENES.cwSession, SCENES.cwExpanded];
export const TECHNICAL_FLOW = [SCENES.arPrompt, SCENES.arScript, SCENES.arAgent];
