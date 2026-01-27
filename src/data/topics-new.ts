// Updated topics structure with proper hierarchy

export interface Topic {
  id: string;
  title: string;
  route: string;
  category: string;
  subcategory?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Subcategory {
  id: string;
  title: string;
  topics: Topic[];
}

export interface TopicCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export const topicsDataNew: TopicCategory[] = [
  {
    id: 'html',
    title: 'HTML',
    icon: '🏗️',
    description: 'Master HTML structure, semantics, and best practices',
    subcategories: [
      {
        id: 'fundamentals',
        title: 'Fundamentals',
        topics: [
          { id: 'semantic', title: 'Semantic HTML', route: '/html/fundamentals/semantic', category: 'html', difficulty: 'beginner' },
          { id: 'html5-features', title: 'HTML5 Features', route: '/html/fundamentals/html5-features', category: 'html', difficulty: 'beginner' },
          { id: 'forms', title: 'Forms & Validation', route: '/html/fundamentals/forms', category: 'html', difficulty: 'beginner' },
          { id: 'tables', title: 'Tables', route: '/html/fundamentals/tables', category: 'html', difficulty: 'beginner' },
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        topics: [
          { id: 'data-attributes', title: 'Data Attributes', route: '/html/advanced/data-attributes', category: 'html', difficulty: 'intermediate' },
          { id: 'iframes', title: 'Iframes & Embedding', route: '/html/advanced/iframes', category: 'html', difficulty: 'intermediate' },
          { id: 'entities', title: 'HTML Entities', route: '/html/advanced/entities', category: 'html', difficulty: 'intermediate' },
          { id: 'web-apis', title: 'Web Storage APIs', route: '/html/advanced/web-apis', category: 'html', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'best-practices',
        title: 'Best Practices',
        topics: [
          { id: 'accessibility', title: 'Accessibility (a11y)', route: '/html/best-practices/accessibility', category: 'html', difficulty: 'intermediate' },
          { id: 'performance', title: 'Performance', route: '/html/best-practices/performance', category: 'html', difficulty: 'intermediate' },
          { id: 'meta-tags', title: 'Meta Tags & SEO', route: '/html/best-practices/meta-tags', category: 'html', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'css',
    title: 'CSS',
    icon: '🌈',
    description: 'Learn modern CSS layouts, styling, and animations',
    subcategories: [
      {
        id: 'layout',
        title: 'Layout',
        topics: [
          { id: 'flexbox', title: 'Flexbox', route: '/css/layout/flexbox', category: 'css', difficulty: 'beginner' },
          { id: 'grid', title: 'CSS Grid', route: '/css/layout/grid', category: 'css', difficulty: 'intermediate' },
          { id: 'positioning', title: 'Positioning', route: '/css/layout/positioning', category: 'css', difficulty: 'beginner' },
        ],
      },
      {
        id: 'styling',
        title: 'Styling',
        topics: [
          { id: 'variables', title: 'CSS Variables', route: '/css/styling/variables', category: 'css', difficulty: 'beginner' },
          { id: 'pseudo-classes', title: 'Pseudo-classes', route: '/css/styling/pseudo-classes', category: 'css', difficulty: 'intermediate' },
          { id: 'specificity', title: 'Specificity & Cascade', route: '/css/styling/specificity', category: 'css', difficulty: 'intermediate' },
          { id: 'units', title: 'CSS Units', route: '/css/styling/units', category: 'css', difficulty: 'beginner' },
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        topics: [
          { id: 'transforms', title: 'Transforms', route: '/css/advanced/transforms', category: 'css', difficulty: 'intermediate' },
          { id: 'animations', title: 'Animations & Transitions', route: '/css/advanced/animations', category: 'css', difficulty: 'intermediate' },
          { id: 'responsive', title: 'Responsive Design', route: '/css/advanced/responsive', category: 'css', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: '⚡',
    description: 'Deep dive into JavaScript fundamentals and advanced concepts',
    subcategories: [
      {
        id: 'fundamentals',
        title: 'Fundamentals',
        topics: [
          { id: 'variables', title: 'Variables & Scope', route: '/javascript/fundamentals/variables', category: 'javascript', difficulty: 'beginner' },
          { id: 'functions', title: 'Functions', route: '/javascript/fundamentals/functions', category: 'javascript', difficulty: 'beginner' },
          { id: 'objects-arrays', title: 'Objects & Arrays', route: '/javascript/fundamentals/objects-arrays', category: 'javascript', difficulty: 'beginner' },
          { id: 'hoisting', title: 'Hoisting', route: '/javascript/fundamentals/hoisting', category: 'javascript', difficulty: 'intermediate' },
          { id: 'destructuring', title: 'Destructuring & Spread', route: '/javascript/fundamentals/destructuring', category: 'javascript', difficulty: 'beginner' },
          { id: 'array-methods', title: 'Array Methods', route: '/javascript/fundamentals/array-methods', category: 'javascript', difficulty: 'beginner' },
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced Concepts',
        topics: [
          { id: 'closures', title: 'Closures', route: '/javascript/advanced/closures', category: 'javascript', difficulty: 'advanced' },
          { id: 'prototypes', title: 'Prototypes & Classes', route: '/javascript/advanced/prototypes', category: 'javascript', difficulty: 'advanced' },
          { id: 'execution-context', title: 'Execution Context', route: '/javascript/advanced/execution-context', category: 'javascript', difficulty: 'advanced' },
          { id: 'this-keyword', title: 'this Keyword', route: '/javascript/advanced/this', category: 'javascript', difficulty: 'advanced' },
          { id: 'memory', title: 'Memory Management', route: '/javascript/advanced/memory', category: 'javascript', difficulty: 'advanced' },
          { id: 'modules', title: 'ES Modules', route: '/javascript/advanced/modules', category: 'javascript', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'async',
        title: 'Asynchronous JavaScript',
        topics: [
          { id: 'promises', title: 'Promises & Async/Await', route: '/javascript/async/promises', category: 'javascript', difficulty: 'intermediate' },
          { id: 'event-loop', title: 'Event Loop', route: '/javascript/async/event-loop', category: 'javascript', difficulty: 'advanced' },
        ],
      },
      {
        id: 'browser',
        title: 'Browser APIs',
        topics: [
          { id: 'dom', title: 'DOM Manipulation', route: '/javascript/browser/dom', category: 'javascript', difficulty: 'beginner' },
          { id: 'browser-apis', title: 'Browser APIs', route: '/javascript/browser/browser-apis', category: 'javascript', difficulty: 'intermediate' },
          { id: 'pwa', title: 'PWA Fundamentals', route: '/javascript/browser/pwa', category: 'javascript', difficulty: 'advanced' },
        ],
      },
      {
        id: 'patterns',
        title: 'Common Patterns',
        topics: [
          { id: 'debounce', title: 'Debounce', route: '/javascript/patterns/debounce', category: 'javascript', difficulty: 'intermediate' },
          { id: 'throttle', title: 'Throttle', route: '/javascript/patterns/throttle', category: 'javascript', difficulty: 'intermediate' },
          { id: 'memoization', title: 'Memoization', route: '/javascript/patterns/memoization', category: 'javascript', difficulty: 'intermediate' },
          { id: 'deep-clone', title: 'Deep Clone', route: '/javascript/patterns/deep-clone', category: 'javascript', difficulty: 'intermediate' },
          { id: 'flatten-array', title: 'Flatten Array', route: '/javascript/patterns/flatten-array', category: 'javascript', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'react',
    title: 'React',
    icon: '⚛️',
    description: 'Master React fundamentals, hooks, and advanced patterns',
    subcategories: [
      {
        id: 'fundamentals',
        title: 'Fundamentals',
        topics: [
          { id: 'components', title: 'Components Basics', route: '/react/fundamentals/components', category: 'react', difficulty: 'beginner' },
          { id: 'jsx-virtual-dom', title: 'JSX & Virtual DOM', route: '/react/fundamentals/jsx-virtual-dom', category: 'react', difficulty: 'beginner' },
          { id: 'props-state', title: 'Props & State', route: '/react/fundamentals/props-state', category: 'react', difficulty: 'beginner' },
          { id: 'events', title: 'Event Handling', route: '/react/fundamentals/events', category: 'react', difficulty: 'beginner' },
          { id: 'conditional-rendering', title: 'Conditional Rendering', route: '/react/fundamentals/conditional-rendering', category: 'react', difficulty: 'beginner' },
          { id: 'lists-keys', title: 'Lists & Keys', route: '/react/fundamentals/lists-keys', category: 'react', difficulty: 'beginner' },
          { id: 'controlled-uncontrolled', title: 'Controlled vs Uncontrolled', route: '/react/fundamentals/controlled-uncontrolled', category: 'react', difficulty: 'intermediate' },
          { id: 'lifecycle', title: 'Lifecycle Methods', route: '/react/fundamentals/lifecycle', category: 'react', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'hooks',
        title: 'React Hooks',
        topics: [
          { id: 'useState', title: 'useState', route: '/react/hooks/useState', category: 'react', difficulty: 'beginner' },
          { id: 'useEffect', title: 'useEffect', route: '/react/hooks/useEffect', category: 'react', difficulty: 'intermediate' },
          { id: 'useRef', title: 'useRef', route: '/react/hooks/useRef', category: 'react', difficulty: 'intermediate' },
          { id: 'useMemo', title: 'useMemo & useCallback', route: '/react/hooks/useMemo', category: 'react', difficulty: 'intermediate' },
          { id: 'useReducer', title: 'useReducer', route: '/react/hooks/useReducer', category: 'react', difficulty: 'advanced' },
          { id: 'custom-hooks', title: 'Custom Hooks', route: '/react/hooks/custom-hooks', category: 'react', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced Concepts',
        topics: [
          { id: 'context', title: 'Context API', route: '/react/advanced/context', category: 'react', difficulty: 'intermediate' },
          { id: 'reconciliation', title: 'Reconciliation', route: '/react/advanced/reconciliation', category: 'react', difficulty: 'advanced' },
          { id: 'react-memo', title: 'React.memo', route: '/react/advanced/react-memo', category: 'react', difficulty: 'intermediate' },
          { id: 'compound-components', title: 'Compound Components', route: '/react/advanced/compound-components', category: 'react', difficulty: 'advanced' },
          { id: 'error-handling', title: 'Error Handling', route: '/react/advanced/error-handling', category: 'react', difficulty: 'intermediate' },
          { id: 'render-props', title: 'Render Props', route: '/react/advanced/render-props', category: 'react', difficulty: 'advanced' },
          { id: 'hoc', title: 'Higher Order Components', route: '/react/advanced/hoc', category: 'react', difficulty: 'advanced' },
          { id: 'portals', title: 'Portals', route: '/react/advanced/portals', category: 'react', difficulty: 'intermediate' },
          { id: 'suspense-lazy', title: 'Suspense & Lazy Loading', route: '/react/advanced/suspense-lazy', category: 'react', difficulty: 'advanced' },
          { id: 'concurrent-features', title: 'useTransition & useDeferredValue', route: '/react/advanced/concurrent-features', category: 'react', difficulty: 'advanced' },
        ],
      },
      {
        id: 'best-practices',
        title: 'Best Practices',
        topics: [
          { id: 'performance', title: 'Performance Optimization', route: '/react/best-practices/performance', category: 'react', difficulty: 'advanced' },
          { id: 'patterns', title: 'React Patterns', route: '/react/best-practices/patterns', category: 'react', difficulty: 'advanced' },
          { id: 'state-management', title: 'State Management', route: '/react/best-practices/state-management', category: 'react', difficulty: 'advanced' },
          { id: 'state-colocation', title: 'State Colocation', route: '/react/best-practices/state-colocation', category: 'react', difficulty: 'intermediate' },
          { id: 'forms-handling', title: 'Forms Handling', route: '/react/best-practices/forms-handling', category: 'react', difficulty: 'intermediate' },
          { id: 'code-splitting', title: 'Code Splitting', route: '/react/best-practices/code-splitting', category: 'react', difficulty: 'intermediate' },
          { id: 'accessibility', title: 'Accessibility', route: '/react/best-practices/accessibility', category: 'react', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: '🔷',
    description: 'Add type safety to your JavaScript applications',
    subcategories: [
      {
        id: 'basics',
        title: 'Basics',
        topics: [
          { id: 'fundamentals', title: 'TypeScript Fundamentals', route: '/typescript/basics/fundamentals', category: 'typescript', difficulty: 'beginner' },
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        topics: [
          { id: 'generics-mapped-types', title: 'Generics & Mapped Types', route: '/typescript/advanced/generics-mapped-types', category: 'typescript', difficulty: 'advanced' },
        ],
      },
      {
        id: 'react',
        title: 'React + TypeScript',
        topics: [
          { id: 'patterns', title: 'React TypeScript Patterns', route: '/typescript/react/patterns', category: 'typescript', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    icon: '▲',
    description: 'Build production-ready React applications with Next.js',
    subcategories: [
      {
        id: 'fundamentals',
        title: 'Fundamentals',
        topics: [
          { id: 'app-router', title: 'App Router', route: '/nextjs/fundamentals/app-router', category: 'nextjs', difficulty: 'beginner' },
          { id: 'routing', title: 'Dynamic Routing', route: '/nextjs/fundamentals/routing', category: 'nextjs', difficulty: 'beginner' },
          { id: 'server-components', title: 'Server Components', route: '/nextjs/fundamentals/server-components', category: 'nextjs', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'data',
        title: 'Data Management',
        topics: [
          { id: 'data-fetching', title: 'Data Fetching', route: '/nextjs/data/data-fetching', category: 'nextjs', difficulty: 'intermediate' },
          { id: 'api-routes', title: 'API Routes', route: '/nextjs/data/api-routes', category: 'nextjs', difficulty: 'intermediate' },
          { id: 'caching', title: 'Caching', route: '/nextjs/data/caching', category: 'nextjs', difficulty: 'advanced' },
        ],
      },
      {
        id: 'patterns',
        title: 'Patterns',
        topics: [
          { id: 'auth-layout', title: 'Auth Layout', route: '/nextjs/patterns/auth-layout', category: 'nextjs', difficulty: 'intermediate' },
          { id: 'protected-routes', title: 'Protected Routes', route: '/nextjs/patterns/protected-routes', category: 'nextjs', difficulty: 'intermediate' },
          { id: 'server-vs-client', title: 'Server vs Client', route: '/nextjs/patterns/server-vs-client', category: 'nextjs', difficulty: 'intermediate' },
          { id: 'metadata', title: 'Metadata & SEO', route: '/nextjs/patterns/metadata', category: 'nextjs', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    icon: '🔍',
    description: 'Optimize your website for search engines',
    subcategories: [
      {
        id: 'basics',
        title: 'SEO Basics',
        topics: [
          { id: 'what-is-seo', title: 'What is SEO', route: '/seo/basics/what-is-seo', category: 'seo', difficulty: 'beginner' },
          { id: 'search-engines', title: 'How Search Engines Work', route: '/seo/basics/search-engines', category: 'seo', difficulty: 'beginner' },
        ],
      },
      {
        id: 'on-page',
        title: 'On-Page SEO',
        topics: [
          { id: 'title-meta', title: 'Title & Meta Tags', route: '/seo/on-page/title-meta', category: 'seo', difficulty: 'beginner' },
          { id: 'headings', title: 'Headings Structure', route: '/seo/on-page/headings', category: 'seo', difficulty: 'beginner' },
          { id: 'image-seo', title: 'Image SEO', route: '/seo/on-page/image-seo', category: 'seo', difficulty: 'beginner' },
        ],
      },
      {
        id: 'technical',
        title: 'Technical SEO',
        topics: [
          { id: 'core-web-vitals', title: 'Core Web Vitals', route: '/seo/technical/core-web-vitals', category: 'seo', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'nextjs',
        title: 'Next.js SEO',
        topics: [
          { id: 'nextjs-metadata', title: 'Next.js Metadata API', route: '/seo/nextjs/metadata', category: 'seo', difficulty: 'intermediate' },
          { id: 'server-client-seo', title: 'Server vs Client & SEO', route: '/seo/nextjs/server-vs-client', category: 'seo', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: '⚡',
    description: 'Optimize web application performance',
    subcategories: [
      {
        id: 'web',
        title: 'Web Performance',
        topics: [
          { id: 'optimization', title: 'Performance Optimization', route: '/performance/web/optimization', category: 'performance', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: '🔒',
    description: 'Secure your web applications',
    subcategories: [
      {
        id: 'basics',
        title: 'Security Basics',
        topics: [
          { id: 'fundamentals', title: 'Web Security Fundamentals', route: '/security/basics/fundamentals', category: 'security', difficulty: 'intermediate' },
        ],
      },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: '🧪',
    description: 'Test your applications effectively',
    subcategories: [
      {
        id: 'basics',
        title: 'Testing Basics',
        topics: [
          { id: 'fundamentals', title: 'Testing Fundamentals', route: '/testing/basics/fundamentals', category: 'testing', difficulty: 'intermediate' },
        ],
      },
    ],
  },
];

// Helper function to get all topics in flat structure (for backward compatibility)
export const getAllTopics = (): Topic[] => {
  return topicsDataNew.flatMap(category =>
    category.subcategories.flatMap(subcategory => subcategory.topics)
  );
};

// Helper function to get category color
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
