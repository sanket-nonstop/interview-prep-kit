export interface Topic {
  id: string;
  title: string;
  route: string;
  category: 'html' | 'css' | 'javascript' | 'react' | 'nextjs';
}

export interface TopicCategory {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}

export const topicsData: TopicCategory[] = [
  {
    id: 'html',
    title: 'HTML',
    icon: '🏗️',
    topics: [
      { id: 'semantic-html', title: 'Semantic HTML', route: '/html/semantic', category: 'html' },
      { id: 'forms', title: 'Forms & Validation', route: '/html/forms', category: 'html' },
      { id: 'accessibility', title: 'Accessibility (a11y)', route: '/html/accessibility', category: 'html' },
      { id: 'meta-tags', title: 'Meta Tags & SEO', route: '/html/meta-tags', category: 'html' },
      { id: 'web-apis', title: 'Web Storage APIs', route: '/html/web-apis', category: 'html' },
    ],
  },
  {
    id: 'css',
    title: 'CSS',
    icon: '🎨',
    topics: [
      { id: 'flexbox', title: 'Flexbox', route: '/css/flexbox', category: 'css' },
      { id: 'grid', title: 'CSS Grid', route: '/css/grid', category: 'css' },
      { id: 'positioning', title: 'Positioning', route: '/css/positioning', category: 'css' },
      { id: 'animations', title: 'Animations & Transitions', route: '/css/animations', category: 'css' },
      { id: 'responsive', title: 'Responsive Design', route: '/css/responsive', category: 'css' },
      { id: 'specificity', title: 'Specificity & Cascade', route: '/css/specificity', category: 'css' },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: '⚡',
    topics: [
      { id: 'variables', title: 'Variables & Scope', route: '/javascript/variables', category: 'javascript' },
      { id: 'functions', title: 'Functions', route: '/javascript/functions', category: 'javascript' },
      { id: 'objects-arrays', title: 'Objects & Arrays', route: '/javascript/objects-arrays', category: 'javascript' },
      { id: 'hoisting', title: 'Hoisting', route: '/javascript/hoisting', category: 'javascript' },
      { id: 'execution-context', title: 'Execution Context', route: '/javascript/execution-context', category: 'javascript' },
      { id: 'memory', title: 'Memory Management', route: '/javascript/memory', category: 'javascript' },
      { id: 'dom', title: 'DOM Manipulation', route: '/javascript/dom', category: 'javascript' },
      { id: 'closures', title: 'Closures', route: '/javascript/closures', category: 'javascript' },
      { id: 'promises', title: 'Promises & Async/Await', route: '/javascript/promises', category: 'javascript' },
      { id: 'event-loop', title: 'Event Loop', route: '/javascript/event-loop', category: 'javascript' },
      { id: 'this-keyword', title: 'this Keyword', route: '/javascript/this', category: 'javascript' },
      { id: 'prototypes', title: 'Prototypes & Classes', route: '/javascript/prototypes', category: 'javascript' },
      { id: 'modules', title: 'ES Modules', route: '/javascript/modules', category: 'javascript' },
      { id: 'destructuring', title: 'Destructuring & Spread', route: '/javascript/destructuring', category: 'javascript' },
      { id: 'array-methods', title: 'Array Methods', route: '/javascript/array-methods', category: 'javascript' },
      { id: 'browser-apis', title: 'Browser APIs', route: '/javascript/browser-apis', category: 'javascript' },
      { id: 'pwa', title: 'PWA Fundamentals', route: '/javascript/pwa', category: 'javascript' },
      { id: 'debounce', title: 'Debounce Pattern', route: '/javascript/patterns/debounce', category: 'javascript' },
      { id: 'throttle', title: 'Throttle Pattern', route: '/javascript/patterns/throttle', category: 'javascript' },
      { id: 'deep-clone', title: 'Deep Clone Pattern', route: '/javascript/patterns/deep-clone', category: 'javascript' },
      { id: 'flatten-array', title: 'Flatten Array Pattern', route: '/javascript/patterns/flatten-array', category: 'javascript' },
      { id: 'memoization', title: 'Memoization Pattern', route: '/javascript/patterns/memoization', category: 'javascript' },
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: '🔷',
    topics: [
      { id: 'fundamentals', title: 'TypeScript Fundamentals', route: '/typescript/fundamentals', category: 'javascript' },
    ],
  },
  {
    id: 'react',
    title: 'React',
    icon: '⚛️',
    topics: [
      { id: 'components', title: 'Components Basics', route: '/react/components', category: 'react' },
      { id: 'jsx-virtual-dom', title: 'JSX & Virtual DOM', route: '/react/jsx-virtual-dom', category: 'react' },
      { id: 'props-state', title: 'Props & State', route: '/react/props-state', category: 'react' },
      { id: 'conditional-rendering', title: 'Conditional Rendering', route: '/react/conditional-rendering', category: 'react' },
      { id: 'events', title: 'Event Handling', route: '/react/events', category: 'react' },
      { id: 'lifecycle', title: 'Lifecycle Methods', route: '/react/lifecycle', category: 'react' },
      { id: 'useState', title: 'useState Hook', route: '/react/hooks/useState', category: 'react' },
      { id: 'useEffect', title: 'useEffect Hook', route: '/react/hooks/useEffect', category: 'react' },
      { id: 'useRef', title: 'useRef Hook', route: '/react/hooks/useRef', category: 'react' },
      { id: 'useMemo', title: 'useMemo & useCallback', route: '/react/hooks/useMemo', category: 'react' },
      { id: 'context', title: 'Context API', route: '/react/context', category: 'react' },
      { id: 'custom-hooks', title: 'Custom Hooks', route: '/react/custom-hooks', category: 'react' },
      { id: 'performance', title: 'Performance Optimization', route: '/react/performance', category: 'react' },
      { id: 'patterns', title: 'React Patterns', route: '/react/patterns', category: 'react' },
      { id: 'state-management', title: 'State Management', route: '/react/state-management', category: 'react' },
      { id: 'error-handling', title: 'Error Handling', route: '/react/error-handling', category: 'react' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: '🧪',
    topics: [
      { id: 'fundamentals', title: 'Testing Fundamentals', route: '/testing/fundamentals', category: 'javascript' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: '⚡',
    topics: [
      { id: 'optimization', title: 'Web Performance', route: '/performance/optimization', category: 'javascript' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: '🔒',
    topics: [
      { id: 'fundamentals', title: 'Web Security', route: '/security/fundamentals', category: 'javascript' },
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    icon: '▲',
    topics: [
      { id: 'app-router', title: 'App Router Basics', route: '/nextjs/app-router', category: 'nextjs' },
      { id: 'server-components', title: 'Server Components', route: '/nextjs/server-components', category: 'nextjs' },
      { id: 'data-fetching', title: 'Data Fetching', route: '/nextjs/data-fetching', category: 'nextjs' },
      { id: 'metadata', title: 'Metadata & SEO', route: '/nextjs/metadata', category: 'nextjs' },
      { id: 'routing', title: 'Dynamic Routing', route: '/nextjs/routing', category: 'nextjs' },
      { id: 'api-routes', title: 'API Routes', route: '/nextjs/api-routes', category: 'nextjs' },
      { id: 'auth-layout', title: 'Auth Layout Patterns', route: '/nextjs/patterns/auth-layout', category: 'nextjs' },
      { id: 'protected-routes', title: 'Protected Routes', route: '/nextjs/patterns/protected-routes', category: 'nextjs' },
      { id: 'server-vs-client', title: 'Server vs Client Components', route: '/nextjs/patterns/server-vs-client', category: 'nextjs' },
      { id: 'caching', title: 'Caching Patterns', route: '/nextjs/patterns/caching', category: 'nextjs' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    icon: '🔍',
    topics: [
      { id: 'what-is-seo', title: 'What is SEO', route: '/seo/basics/what-is-seo', category: 'javascript' },
      { id: 'search-engines', title: 'How Search Engines Work', route: '/seo/basics/search-engines', category: 'javascript' },
      { id: 'title-meta', title: 'Title & Meta Tags', route: '/seo/on-page/title-meta', category: 'javascript' },
      { id: 'headings', title: 'Headings Structure', route: '/seo/on-page/headings', category: 'javascript' },
      { id: 'image-seo', title: 'Image SEO', route: '/seo/on-page/image-seo', category: 'javascript' },
      { id: 'core-web-vitals', title: 'Core Web Vitals', route: '/seo/technical/core-web-vitals', category: 'javascript' },
      { id: 'nextjs-metadata', title: 'Next.js Metadata API', route: '/seo/nextjs/metadata', category: 'javascript' },
      { id: 'server-client-seo', title: 'Server vs Client & SEO', route: '/seo/nextjs/server-vs-client', category: 'javascript' },
    ],
  },
];

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    html: 'bg-category-html/20 text-category-html border-category-html/30',
    css: 'bg-category-css/20 text-category-css border-category-css/30',
    javascript: 'bg-category-js/20 text-category-js border-category-js/30',
    react: 'bg-category-react/20 text-category-react border-category-react/30',
    nextjs: 'bg-category-nextjs/20 text-category-nextjs border-category-nextjs/30',
    typescript: 'bg-blue-100 text-blue-800 border-blue-300',
    testing: 'bg-green-100 text-green-800 border-green-300',
    performance: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    security: 'bg-red-100 text-red-800 border-red-300',
    seo: 'bg-purple-100 text-purple-800 border-purple-300',
  };
  return colors[category] || '';
};
