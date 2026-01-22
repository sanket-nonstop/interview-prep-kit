import { TopicLayout } from '@/components/TopicLayout';

const performanceCode = `// Web Performance: Optimizing frontend applications

// ✅ Core Web Vitals optimization
const OptimizedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 768px) 100vw, 50vw"
      srcSet={\`
        \${src}?w=400 400w,
        \${src}?w=800 800w,
        \${src}?w=1200 1200w
      \`}
    />
  );
};

// ✅ Code splitting and lazy loading
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

const App: React.FC = () => (
  <Suspense fallback={<SkeletonLoader />}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Suspense>
);

// ✅ Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedList: React.FC<{ items: any[] }> = ({ items }) => {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style} className="flex items-center p-4 border-b">
      <img 
        src={items[index].avatar} 
        alt={items[index].name}
        className="w-10 h-10 rounded-full mr-4"
        loading="lazy"
      />
      <div>
        <h3 className="font-semibold">{items[index].name}</h3>
        <p className="text-gray-600">{items[index].email}</p>
      </div>
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};

// ✅ Performance monitoring
const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }, []);
};

// ✅ Memory leak prevention
const useCleanup = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Some periodic task
    }, 1000);
    
    const handleResize = () => {
      // Handle resize
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};`;

const Performance = () => {
  return (
    <TopicLayout
      title="Web Performance"
      route="/performance/optimization"
      category="javascript"
      explanation="Web performance optimization focuses on Core Web Vitals: LCP (loading), FID (interactivity), and CLS (visual stability). Use code splitting, lazy loading, virtual scrolling, resource preloading, and performance monitoring for optimal user experience."
      code={performanceCode}
      codeFilename="performance.tsx"
      whyItMatters="Performance directly impacts user experience, SEO rankings, and business metrics. Interviewers test understanding of performance metrics, optimization techniques, and monitoring tools. Critical for building fast, responsive web applications."
      mistakes={[
        "Not measuring performance - optimize based on data, not assumptions.",
        "Loading everything upfront - use code splitting and lazy loading strategically.",
        "Ignoring Core Web Vitals - Google uses these for search rankings.",
        "Not cleaning up resources - causes memory leaks and performance degradation.",
      ]}
      practiceTask="Optimize a slow React app by implementing code splitting, virtual scrolling for large lists, image optimization, and Core Web Vitals monitoring. Measure improvements with Lighthouse."
    />
  );
};

export default Performance;