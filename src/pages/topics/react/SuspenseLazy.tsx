import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const suspenseCode = `// Suspense & Lazy: Code splitting and async component loading

import { lazy, Suspense } from 'react';

// ✅ Route-based Code Splitting - Industry Standard
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// ✅ Component-level Code Splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Analytics() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart data={data} />
        </Suspense>
      )}
    </div>
  );
}

// ✅ Named Exports with Lazy Loading
const LazyComponent = lazy(() => 
  import('./MyComponent').then(module => ({
    default: module.MyNamedExport
  }))
);

// ✅ Preloading Components - Performance Optimization
const preloadDashboard = () => {
  const component = import('./pages/Dashboard');
  return component;
};

function Navigation() {
  return (
    <nav>
      <Link 
        to="/dashboard"
        onMouseEnter={preloadDashboard} // Preload on hover
      >
        Dashboard
      </Link>
    </nav>
  );
}

// ✅ Error Boundaries with Suspense
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <LazyRoute />
      </Suspense>
    </ErrorBoundary>
  );
}

// ✅ Nested Suspense Boundaries - Granular Loading
function ProductPage() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <ProductHeader />
      </Suspense>
      
      <Suspense fallback={<DetailsSkeleton />}>
        <ProductDetails />
      </Suspense>
      
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews />
      </Suspense>
    </div>
  );
}

// ✅ Retry Logic for Failed Lazy Loads
function lazyWithRetry(componentImport, retries = 3) {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      const attemptLoad = (retriesLeft) => {
        componentImport()
          .then(resolve)
          .catch((error) => {
            if (retriesLeft === 0) {
              reject(error);
              return;
            }
            setTimeout(() => attemptLoad(retriesLeft - 1), 1000);
          });
      };
      attemptLoad(retries);
    });
  });
}

const RobustComponent = lazyWithRetry(() => import('./Component'));`;

const SuspenseLazy = () => {
  return (
    <TopicLayout
      title="Suspense & Lazy Loading"
      route="/react/advanced/suspense-lazy"
      category="react"
      explanation="Suspense lets components 'wait' for something before rendering. Combined with lazy(), it enables code splitting - loading components only when needed. Critical for performance in large apps."
      code={suspenseCode}
      codeFilename="SuspenseLazy.tsx"
      whyItMatters="Code splitting is mandatory for production apps. A 1MB bundle kills mobile performance. Lazy loading can reduce initial bundle by 70%+. Every senior React dev must know route-based and component-based splitting. Shows performance awareness."
      mistakes={[
        "No error boundary: Lazy loads can fail, always wrap in ErrorBoundary",
        "Too granular: Don't lazy load tiny components, overhead isn't worth it",
        "Missing fallback: Suspense requires fallback prop, show skeleton not spinner",
        "Forgetting preload: Hover/focus preloading eliminates perceived lag"
      ]}
      practiceTask="Build a photo gallery that lazy loads images in batches of 10. Implement: intersection observer for infinite scroll, skeleton loading states, retry logic for failed loads, and preloading next batch on scroll."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Suspense & Lazy"
        examples={[
          {
            title: "Lazy Component",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial; padding: 40px; background: #f0f4f8; }
    .app { background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    button { padding: 12px 24px; background: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px 5px; }
    button:hover { background: #2563EB; }
    .skeleton { height: 200px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; border-radius: 8px; }
    @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .content { padding: 20px; background: #F3F4F6; border-radius: 8px; margin-top: 20px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, Suspense, lazy } = React;
    
    // Simulate lazy loading with delay
    function fakeLazyLoad(Component, delay = 2000) {
      return lazy(() => 
        new Promise(resolve => {
          setTimeout(() => resolve({ default: Component }), delay);
        })
      );
    }
    
    function HeavyComponent() {
      return (
        <div className="content">
          <h3>🎉 Heavy Component Loaded!</h3>
          <p>This component was lazy loaded after 2 seconds.</p>
          <p>In production, this would be a separate bundle.</p>
        </div>
      );
    }
    
    const LazyHeavyComponent = fakeLazyLoad(HeavyComponent);
    
    function App() {
      const [show, setShow] = useState(false);
      
      return (
        <div className="app">
          <h1>⚡ Suspense & Lazy Loading</h1>
          <p>Click to load component dynamically</p>
          <button onClick={() => setShow(true)}>
            Load Heavy Component
          </button>
          
          {show && (
            <Suspense fallback={<div className="skeleton" />}>
              <LazyHeavyComponent />
            </Suspense>
          )}
        </div>
      );
    }
    
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default SuspenseLazy;
