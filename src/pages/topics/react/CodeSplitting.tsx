import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const codeSplittingCode = `// Code Splitting: Load code on demand for better performance

// ✅ React.lazy for component code splitting
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// ✅ Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}

// ✅ Nested Suspense boundaries
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Separate loading state for heavy chart */}
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
      
      {/* Separate loading state for data table */}
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}

const HeavyChart = lazy(() => import('./HeavyChart'));
const DataTable = lazy(() => import('./DataTable'));

// ✅ Named exports with lazy loading
const MyComponent = lazy(() =>
  import('./MyComponent').then(module => ({
    default: module.MyComponent
  }))
);

// ✅ Preloading components
const AdminPanel = lazy(() => import('./AdminPanel'));

// Preload on hover
function AdminLink() {
  const preload = () => {
    import('./AdminPanel');
  };
  
  return (
    <Link 
      to="/admin" 
      onMouseEnter={preload}
      onFocus={preload}
    >
      Admin Panel
    </Link>
  );
}

// ✅ Error boundary for lazy components
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading failed:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Failed to load component</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage with error boundary
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// ✅ Route-based code splitting
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// ✅ Dynamic imports for utilities
async function processData(data) {
  // Load heavy library only when needed
  const { default: heavyLib } = await import('heavy-library');
  return heavyLib.process(data);
}

// ✅ Conditional loading
function AdminDashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<Loading />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}

// ❌ Common mistakes
// Don't use lazy inside components
function BadComponent() {
  const LazyComp = lazy(() => import('./Comp')); // ❌ Re-creates on every render
  return <LazyComp />;
}

// ✅ Define lazy components at module level
const LazyComp = lazy(() => import('./Comp')); // ✅ Created once

function GoodComponent() {
  return <LazyComp />;
}`;

const CodeSplitting = () => {
  return (
    <TopicLayout
      title="Code Splitting & Lazy Loading"
      route="/react/code-splitting"
      category="react"
      explanation="Code splitting breaks your bundle into smaller chunks loaded on demand. React.lazy() dynamically imports components, Suspense provides loading states, and fallback shows UI while loading. Reduces initial bundle size and improves performance."
      code={codeSplittingCode}
      codeFilename="code-splitting.tsx"
      whyItMatters="Large bundles slow initial page load. Code splitting is critical for performance. Interviewers ask: 'How do you optimize bundle size?', 'What's React.lazy?', 'When to use Suspense?' Shows understanding of performance optimization and user experience."
      mistakes={[
        "Defining lazy() inside components - creates new component on every render.",
        "No error boundaries - lazy loading failures crash the entire app.",
        "Missing Suspense boundary - React throws error without fallback.",
        "Over-splitting - too many small chunks increase HTTP requests overhead.",
      ]}
      practiceTask="Build a dashboard with route-based code splitting, lazy load a heavy chart library only when user clicks 'Show Chart', implement preloading on hover, add error boundaries, and measure bundle size reduction."
    >
      <MultiExampleEditor
        title="🎯 Try It: Code Splitting & Lazy Loading"
        examples={[
          {
            title: "❌ Before: Large Bundle",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; background: #fee; padding: 20px; }
  .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .error { background: #fee; border-left: 4px solid #ef4444; padding: 15px; border-radius: 4px; }
  .metric { display: inline-block; background: #fee; padding: 8px 16px; border-radius: 6px; margin: 5px; font-weight: bold; color: #ef4444; }
  .btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
</style>
</head>
<body>
  <div class="error">
    <strong>❌ Without Code Splitting:</strong><br>
    • All code loaded upfront<br>
    • Large initial bundle (slow)<br>
    • Unused code downloaded<br>
    • Poor performance
  </div>

  <div class="card">
    <h3>Bundle Metrics</h3>
    <div class="metric">📦 Bundle: 850KB</div>
    <div class="metric">⏱️ Load: 3.2s</div>
    <div class="metric">🐌 TTI: 4.5s</div>
  </div>

  <div class="card">
    <h2>Dashboard</h2>
    <button class="btn" onclick="showChart()">Show Chart</button>
    <button class="btn" onclick="showTable()">Show Table</button>
    <div id="content"></div>
  </div>

  <div class="card" style="background:#f9fafb;">
    <strong>Problems:</strong><br>
    • Heavy chart library (300KB) loaded immediately<br>
    • Data table library (200KB) loaded but not used<br>
    • Admin panel code (150KB) loaded for all users<br>
    • Total: 850KB for features user may never use
  </div>

  <script>
    // ❌ All code loaded upfront
    const chartLib = { render: () => '<div style="padding:20px; background:#dbeafe; border-radius:6px; margin-top:10px;">📊 Heavy Chart (300KB loaded)</div>' };
    const tableLib = { render: () => '<div style="padding:20px; background:#fef3c7; border-radius:6px; margin-top:10px;">📋 Data Table (200KB loaded)</div>' };

    function showChart() {
      document.getElementById('content').innerHTML = chartLib.render();
    }

    function showTable() {
      document.getElementById('content').innerHTML = tableLib.render();
    }
  </script>
</body>
</html>`
          },
          {
            title: "✅ After: Code Splitting",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; background: #d1fae5; padding: 20px; }
  .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; }
  .metric { display: inline-block; background: #d1fae5; padding: 8px 16px; border-radius: 6px; margin: 5px; font-weight: bold; color: #10b981; }
  .btn { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; transition: transform 0.2s; }
  .btn:hover { transform: scale(1.05); }
  .badge { display: inline-block; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
  .loading { text-align: center; padding: 20px; color: #6b7280; }
  .spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid #e5e7eb; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
  <div class="success">
    <strong>✅ With Code Splitting:</strong><br>
    • Load code on demand<br>
    • Small initial bundle (fast)<br>
    • Only download what's needed<br>
    • Great performance
  </div>

  <div class="card">
    <h3>Bundle Metrics</h3>
    <div class="metric">📦 Initial: 200KB (76% smaller)</div>
    <div class="metric">⚡ Load: 0.8s</div>
    <div class="metric">🚀 TTI: 1.2s</div>
  </div>

  <div class="card">
    <h2>Dashboard <span class="badge">OPTIMIZED</span></h2>
    <button class="btn" onclick="loadChart()">Show Chart</button>
    <button class="btn" onclick="loadTable()">Show Table</button>
    <div id="content"></div>
    <div id="status" style="margin-top:10px; color:#6b7280; font-size:14px;"></div>
  </div>

  <div class="card" style="background:#dbeafe; border-left:4px solid #3b82f6;">
    <strong>🎯 Optimizations:</strong><br>
    • Initial bundle: 200KB (core app only)<br>
    • Chart loaded on demand: +300KB<br>
    • Table loaded on demand: +200KB<br>
    • Admin panel: Not loaded for regular users<br>
    • Result: 76% faster initial load!
  </div>

  <div class="card" style="background:#f0fdf4;">
    <h3>Loading States:</h3>
    <div style="padding:15px; background:white; border-radius:6px; margin-top:10px;">
      <div class="loading">
        <div class="spinner"></div>
        <div style="margin-top:10px;">Loading component...</div>
      </div>
    </div>
  </div>

  <script>
    let chartLoaded = false;
    let tableLoaded = false;

    function loadChart() {
      if (chartLoaded) {
        document.getElementById('content').innerHTML = '<div style="padding:20px; background:#dbeafe; border-radius:6px; margin-top:10px;">📊 Chart Component (cached)</div>';
        return;
      }

      document.getElementById('content').innerHTML = '<div class="loading"><div class="spinner"></div><div style="margin-top:10px;">Loading chart...</div></div>';
      document.getElementById('status').textContent = '⬇️ Downloading chart.js (300KB)...';

      // Simulate lazy loading
      setTimeout(function() {
        chartLoaded = true;
        document.getElementById('content').innerHTML = '<div style="padding:20px; background:#dbeafe; border-radius:6px; margin-top:10px;">📊 Chart Component<br><small style="color:#6b7280;">Loaded on demand: 300KB</small></div>';
        document.getElementById('status').textContent = '✅ Chart loaded successfully!';
      }, 1000);
    }

    function loadTable() {
      if (tableLoaded) {
        document.getElementById('content').innerHTML = '<div style="padding:20px; background:#fef3c7; border-radius:6px; margin-top:10px;">📋 Table Component (cached)</div>';
        return;
      }

      document.getElementById('content').innerHTML = '<div class="loading"><div class="spinner"></div><div style="margin-top:10px;">Loading table...</div></div>';
      document.getElementById('status').textContent = '⬇️ Downloading table.js (200KB)...';

      setTimeout(function() {
        tableLoaded = true;
        document.getElementById('content').innerHTML = '<div style="padding:20px; background:#fef3c7; border-radius:6px; margin-top:10px;">📋 Table Component<br><small style="color:#6b7280;">Loaded on demand: 200KB</small></div>';
        document.getElementById('status').textContent = '✅ Table loaded successfully!';
      }, 800);
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default CodeSplitting;
