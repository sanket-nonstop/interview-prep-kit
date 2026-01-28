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
      {
        id: 'animations',
        title: 'Animations & 3D',
        topics: [
          { id: 'gsap', title: 'GSAP Animations', route: '/react/animations/gsap/', category: 'react', difficulty: 'advanced' },
          { id: 'threejs', title: 'Three.js in React', route: '/react/animations/threejs/', category: 'react', difficulty: 'advanced' },
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
          { id: 'keywords', title: 'Keyword Research', route: '/seo/basics/keywords', category: 'seo', difficulty: 'beginner' },
        ],
      },
      {
        id: 'on-page',
        title: 'On-Page SEO',
        topics: [
          { id: 'title-meta', title: 'Title & Meta Tags', route: '/seo/on-page/title-meta', category: 'seo', difficulty: 'beginner' },
          { id: 'headings', title: 'Headings Structure', route: '/seo/on-page/headings', category: 'seo', difficulty: 'beginner' },
          { id: 'image-seo', title: 'Image SEO', route: '/seo/on-page/image-seo', category: 'seo', difficulty: 'beginner' },
          { id: 'url-structure', title: 'URL Structure', route: '/seo/on-page/url-structure', category: 'seo', difficulty: 'beginner' },
          { id: 'internal-linking', title: 'Internal Linking', route: '/seo/on-page/internal-linking', category: 'seo', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'technical',
        title: 'Technical SEO',
        topics: [
          { id: 'core-web-vitals', title: 'Core Web Vitals', route: '/seo/technical/core-web-vitals', category: 'seo', difficulty: 'intermediate' },
          { id: 'sitemap-robots', title: 'Sitemap & Robots.txt', route: '/seo/technical/sitemap-robots', category: 'seo', difficulty: 'intermediate' },
          { id: 'structured-data', title: 'Structured Data (Schema)', route: '/seo/technical/structured-data', category: 'seo', difficulty: 'advanced' },
          { id: 'mobile-seo', title: 'Mobile SEO', route: '/seo/technical/mobile-seo', category: 'seo', difficulty: 'intermediate' },
          { id: 'page-speed', title: 'Page Speed Optimization', route: '/seo/technical/page-speed', category: 'seo', difficulty: 'intermediate' },
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
      {
        id: 'modern-seo',
        title: 'Modern SEO',
        topics: [
          { id: 'ai-seo', title: 'AI & SEO', route: '/seo/modern/ai-seo', category: 'seo', difficulty: 'advanced' },
          { id: 'voice-search', title: 'Voice Search Optimization', route: '/seo/modern/voice-search', category: 'seo', difficulty: 'intermediate' },
          { id: 'local-seo', title: 'Local SEO', route: '/seo/modern/local-seo', category: 'seo', difficulty: 'intermediate' },
          { id: 'sem-ppc', title: 'SEM & PPC', route: '/seo/modern/sem-ppc', category: 'seo', difficulty: 'intermediate' },
          { id: 'content-marketing', title: 'Content Marketing & SEO', route: '/seo/modern/content-marketing', category: 'seo', difficulty: 'intermediate' },
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
  ,
  {
    id: 'other-languages',
    title: 'Other Languages',
    icon: '🌐',
    description: 'Backend languages and frameworks',
    subcategories: [
      {
        id: 'php-fundamentals',
        title: 'PHP - Fundamentals',
        topics: [
          { id: 'syntax-basics', title: 'Syntax & Basics', route: '/other-languages/php/fundamentals/syntax-basics', category: 'other-languages', difficulty: 'beginner' },
          { id: 'variables-types', title: 'Variables & Data Types', route: '/other-languages/php/fundamentals/variables-types', category: 'other-languages', difficulty: 'beginner' },
          { id: 'functions', title: 'Functions', route: '/other-languages/php/fundamentals/functions', category: 'other-languages', difficulty: 'beginner' },
          { id: 'arrays', title: 'Arrays & Array Functions', route: '/other-languages/php/fundamentals/arrays', category: 'other-languages', difficulty: 'beginner' },
          { id: 'superglobals', title: 'Superglobals', route: '/other-languages/php/fundamentals/superglobals', category: 'other-languages', difficulty: 'beginner' },
        ],
      },
      {
        id: 'php-oop',
        title: 'PHP - OOP',
        topics: [
          { id: 'classes-objects', title: 'Classes & Objects', route: '/other-languages/php/oop/classes-objects', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'inheritance', title: 'Inheritance & Polymorphism', route: '/other-languages/php/oop/inheritance', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'interfaces-traits', title: 'Interfaces & Traits', route: '/other-languages/php/oop/interfaces-traits', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'namespaces', title: 'Namespaces & Autoloading', route: '/other-languages/php/oop/namespaces', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'magic-methods', title: 'Magic Methods', route: '/other-languages/php/oop/magic-methods', category: 'other-languages', difficulty: 'advanced' },
        ],
      },
      {
        id: 'php-advanced',
        title: 'PHP - Advanced',
        topics: [
          { id: 'error-handling', title: 'Error & Exception Handling', route: '/other-languages/php/advanced/error-handling', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'sessions-cookies', title: 'Sessions & Cookies', route: '/other-languages/php/advanced/sessions-cookies', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'file-handling', title: 'File Handling', route: '/other-languages/php/advanced/file-handling', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'pdo-database', title: 'PDO & Database', route: '/other-languages/php/advanced/pdo-database', category: 'other-languages', difficulty: 'advanced' },
          { id: 'composer', title: 'Composer & Dependencies', route: '/other-languages/php/advanced/composer', category: 'other-languages', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'php-security',
        title: 'PHP - Security',
        topics: [
          { id: 'sql-injection', title: 'SQL Injection Prevention', route: '/other-languages/php/security/sql-injection', category: 'other-languages', difficulty: 'advanced' },
          { id: 'xss-csrf', title: 'XSS & CSRF Protection', route: '/other-languages/php/security/xss-csrf', category: 'other-languages', difficulty: 'advanced' },
          { id: 'authentication', title: 'Authentication & Hashing', route: '/other-languages/php/security/authentication', category: 'other-languages', difficulty: 'advanced' },
          { id: 'validation', title: 'Input Validation & Sanitization', route: '/other-languages/php/security/validation', category: 'other-languages', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'laravel-fundamentals',
        title: 'Laravel - Fundamentals',
        topics: [
          { id: 'installation-setup', title: 'Installation & Setup', route: '/other-languages/laravel/fundamentals/installation-setup', category: 'other-languages', difficulty: 'beginner' },
          { id: 'routing', title: 'Routing', route: '/other-languages/laravel/fundamentals/routing', category: 'other-languages', difficulty: 'beginner' },
          { id: 'controllers', title: 'Controllers', route: '/other-languages/laravel/fundamentals/controllers', category: 'other-languages', difficulty: 'beginner' },
          { id: 'views-blade', title: 'Views & Blade Templates', route: '/other-languages/laravel/fundamentals/views-blade', category: 'other-languages', difficulty: 'beginner' },
          { id: 'middleware', title: 'Middleware', route: '/other-languages/laravel/fundamentals/middleware', category: 'other-languages', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'laravel-eloquent',
        title: 'Laravel - Eloquent ORM',
        topics: [
          { id: 'models', title: 'Models & Migrations', route: '/other-languages/laravel/eloquent/models', category: 'other-languages', difficulty: 'beginner' },
          { id: 'relationships', title: 'Relationships', route: '/other-languages/laravel/eloquent/relationships', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'query-builder', title: 'Query Builder', route: '/other-languages/laravel/eloquent/query-builder', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'accessors-mutators', title: 'Accessors & Mutators', route: '/other-languages/laravel/eloquent/accessors-mutators', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'scopes', title: 'Query Scopes', route: '/other-languages/laravel/eloquent/scopes', category: 'other-languages', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'laravel-advanced',
        title: 'Laravel - Advanced',
        topics: [
          { id: 'authentication', title: 'Authentication (Sanctum/Passport)', route: '/other-languages/laravel/advanced/authentication', category: 'other-languages', difficulty: 'advanced' },
          { id: 'authorization', title: 'Authorization (Gates/Policies)', route: '/other-languages/laravel/advanced/authorization', category: 'other-languages', difficulty: 'advanced' },
          { id: 'validation', title: 'Form Validation', route: '/other-languages/laravel/advanced/validation', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'api-resources', title: 'API Resources', route: '/other-languages/laravel/advanced/api-resources', category: 'other-languages', difficulty: 'advanced' },
          { id: 'events-listeners', title: 'Events & Listeners', route: '/other-languages/laravel/advanced/events-listeners', category: 'other-languages', difficulty: 'advanced' },
          { id: 'queues-jobs', title: 'Queues & Jobs', route: '/other-languages/laravel/advanced/queues-jobs', category: 'other-languages', difficulty: 'advanced' },
          { id: 'notifications', title: 'Notifications', route: '/other-languages/laravel/advanced/notifications', category: 'other-languages', difficulty: 'intermediate' },
          { id: 'file-storage', title: 'File Storage', route: '/other-languages/laravel/advanced/file-storage', category: 'other-languages', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'laravel-testing',
        title: 'Laravel - Testing',
        topics: [
          { id: 'phpunit', title: 'PHPUnit Testing', route: '/other-languages/laravel/testing/phpunit', category: 'other-languages', difficulty: 'advanced' },
          { id: 'feature-tests', title: 'Feature Tests', route: '/other-languages/laravel/testing/feature-tests', category: 'other-languages', difficulty: 'advanced' },
          { id: 'database-testing', title: 'Database Testing', route: '/other-languages/laravel/testing/database-testing', category: 'other-languages', difficulty: 'advanced' },
        ],
      },
      {
        id: 'laravel-deployment',
        title: 'Laravel - Deployment',
        topics: [
          { id: 'optimization', title: 'Performance Optimization', route: '/other-languages/laravel/deployment/optimization', category: 'other-languages', difficulty: 'advanced' },
          { id: 'caching', title: 'Caching Strategies', route: '/other-languages/laravel/deployment/caching', category: 'other-languages', difficulty: 'advanced' },
          { id: 'deployment', title: 'Deployment Best Practices', route: '/other-languages/laravel/deployment/deployment', category: 'other-languages', difficulty: 'advanced' },
        ],
      },
    ],
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    icon: '📦',
    description: 'Additional essential topics for interviews',
    subcategories: [
      {
        id: 'data-structures',
        title: 'Data Structures',
        topics: [
          { id: 'arrays', title: 'Arrays', route: '/miscellaneous/data-structures/arrays', category: 'miscellaneous', difficulty: 'beginner' },
          { id: 'linked-lists', title: 'Linked Lists', route: '/miscellaneous/data-structures/linked-lists', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'stacks-queues', title: 'Stacks & Queues', route: '/miscellaneous/data-structures/stacks-queues', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'trees', title: 'Trees & Binary Trees', route: '/miscellaneous/data-structures/trees', category: 'miscellaneous', difficulty: 'advanced' },
          { id: 'hash-tables', title: 'Hash Tables', route: '/miscellaneous/data-structures/hash-tables', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'graphs', title: 'Graphs', route: '/miscellaneous/data-structures/graphs', category: 'miscellaneous', difficulty: 'advanced' },
        ],
      },
      {
        id: 'http-networking',
        title: 'HTTP & Networking',
        topics: [
          { id: 'http-methods', title: 'HTTP Methods', route: '/miscellaneous/http-networking/http-methods', category: 'miscellaneous', difficulty: 'beginner' },
          { id: 'status-codes', title: 'Status Codes', route: '/miscellaneous/http-networking/status-codes', category: 'miscellaneous', difficulty: 'beginner' },
          { id: 'headers', title: 'Headers', route: '/miscellaneous/http-networking/headers', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'cors', title: 'CORS', route: '/miscellaneous/http-networking/cors', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'websockets', title: 'WebSockets', route: '/miscellaneous/http-networking/websockets', category: 'miscellaneous', difficulty: 'advanced' },
          { id: 'rest-graphql', title: 'REST vs GraphQL', route: '/miscellaneous/http-networking/rest-graphql', category: 'miscellaneous', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'git',
        title: 'Git & Version Control',
        topics: [
          { id: 'fundamentals', title: 'Git Fundamentals', route: '/miscellaneous/git/fundamentals', category: 'miscellaneous', difficulty: 'beginner' },
          { id: 'branching', title: 'Branching & Merging', route: '/miscellaneous/git/branching', category: 'miscellaneous', difficulty: 'beginner' },
          { id: 'rebase', title: 'Rebase & Cherry-pick', route: '/miscellaneous/git/rebase', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'workflows', title: 'Git Workflows', route: '/miscellaneous/git/workflows', category: 'miscellaneous', difficulty: 'intermediate' },
        ],
      },
      {
        id: 'browser-tools',
        title: 'Browser DevTools',
        topics: [
          { id: 'console', title: 'Console & Debugging', route: '/miscellaneous/browser-tools/console', category: 'miscellaneous', difficulty: 'beginner' },
          { id: 'network', title: 'Network Tab', route: '/miscellaneous/browser-tools/network', category: 'miscellaneous', difficulty: 'intermediate' },
          { id: 'performance', title: 'Performance Tab', route: '/miscellaneous/browser-tools/performance', category: 'miscellaneous', difficulty: 'intermediate' },
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
    'other-languages': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    testing: 'bg-green-100 text-green-800 border-green-300',
    performance: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    security: 'bg-red-100 text-red-800 border-red-300',
    seo: 'bg-purple-100 text-purple-800 border-purple-300',
    miscellaneous: 'bg-gray-100 text-gray-800 border-gray-300',
  };
  return colors[category] || '';
};
