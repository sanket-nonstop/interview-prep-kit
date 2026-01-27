import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Performance"
        examples={[
          {
            title: "Lazy Loading Images",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 20px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
  .card { background: #1e293b; border-radius: 8px; overflow: hidden; }
  img { width: 100%; height: 200px; object-fit: cover; }
  .loading { background: #334155; height: 200px; display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
  <h2>🖼️ Lazy Loading Images</h2>
  <div class="grid" id="grid"></div>
  
  <script>
    const images = Array.from({length: 12}, (_, i) => 
      \`https://picsum.photos/200/200?random=\${i}\`
    );
    
    images.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = \`
        <img src="\${src}" alt="Image \${i}" loading="lazy" />
        <div style="padding: 10px;">Image \${i + 1}</div>
      \`;
      document.getElementById('grid').appendChild(card);
    });
  </script>
</body>
</html>`
          },
          {
            title: "Virtual Scrolling",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .list { height: 400px; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 10px; }
  .item { padding: 15px; background: rgba(255,255,255,0.1); margin: 5px 0; border-radius: 6px; }
  .stats { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin-bottom: 15px; }
</style>
</head>
<body>
  <div class="card">
    <h2>📜 Virtual Scrolling Demo</h2>
    <div class="stats">
      <strong>Total Items:</strong> 1000<br>
      <strong>Rendered:</strong> <span id="rendered">20</span>
    </div>
    <div class="list" id="list"></div>
  </div>
  
  <script>
    const totalItems = 1000;
    const itemHeight = 60;
    const visibleItems = 20;
    
    function renderItems() {
      const list = document.getElementById('list');
      list.innerHTML = '';
      
      for (let i = 0; i < visibleItems; i++) {
        const item = document.createElement('div');
        item.className = 'item';
        item.textContent = \`Item \${i + 1} of \${totalItems}\`;
        list.appendChild(item);
      }
    }
    
    renderItems();
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Performance;