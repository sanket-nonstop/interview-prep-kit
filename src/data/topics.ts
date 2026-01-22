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
      { id: 'closures', title: 'Closures', route: '/javascript/closures', category: 'javascript' },
      { id: 'promises', title: 'Promises & Async/Await', route: '/javascript/promises', category: 'javascript' },
      { id: 'event-loop', title: 'Event Loop', route: '/javascript/event-loop', category: 'javascript' },
      { id: 'this-keyword', title: 'this Keyword', route: '/javascript/this', category: 'javascript' },
      { id: 'prototypes', title: 'Prototypes & Classes', route: '/javascript/prototypes', category: 'javascript' },
      { id: 'modules', title: 'ES Modules', route: '/javascript/modules', category: 'javascript' },
      { id: 'destructuring', title: 'Destructuring & Spread', route: '/javascript/destructuring', category: 'javascript' },
      { id: 'array-methods', title: 'Array Methods', route: '/javascript/array-methods', category: 'javascript' },
    ],
  },
  {
    id: 'react',
    title: 'React',
    icon: '⚛️',
    topics: [
      { id: 'useState', title: 'useState Hook', route: '/react/hooks/useState', category: 'react' },
      { id: 'useEffect', title: 'useEffect Hook', route: '/react/hooks/useEffect', category: 'react' },
      { id: 'useRef', title: 'useRef Hook', route: '/react/hooks/useRef', category: 'react' },
      { id: 'useMemo', title: 'useMemo & useCallback', route: '/react/hooks/useMemo', category: 'react' },
      { id: 'context', title: 'Context API', route: '/react/context', category: 'react' },
      { id: 'custom-hooks', title: 'Custom Hooks', route: '/react/custom-hooks', category: 'react' },
      { id: 'performance', title: 'Performance Optimization', route: '/react/performance', category: 'react' },
      { id: 'patterns', title: 'React Patterns', route: '/react/patterns', category: 'react' },
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
  };
  return colors[category] || '';
};
