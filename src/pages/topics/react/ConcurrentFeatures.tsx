import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const concurrentCode = `// useTransition & useDeferredValue: React 18 Concurrent Features

import { useTransition, useDeferredValue, useState } from 'react';

// ✅ useTransition - Mark Updates as Non-Urgent
function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);
  
  const handleSearch = (value: string) => {
    setQuery(value); // Urgent: Update input immediately
    
    startTransition(() => {
      // Non-urgent: Can be interrupted
      const filtered = expensiveSearch(value);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  );
}

// ✅ useDeferredValue - Defer Expensive Renders
function ProductList({ searchTerm }: { searchTerm: string }) {
  const deferredSearch = useDeferredValue(searchTerm);
  
  // This expensive filter uses deferred value
  // React can interrupt and prioritize user input
  const filtered = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(deferredSearch.toLowerCase())
    );
  }, [deferredSearch]);
  
  return (
    <div>
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Real-World: Autocomplete with Transitions
function Autocomplete() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = async (value: string) => {
    setInput(value); // Immediate
    
    startTransition(() => {
      // Fetch can be interrupted if user keeps typing
      fetchSuggestions(value).then(setSuggestions);
    });
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isPending ? (
        <LoadingDots />
      ) : (
        <SuggestionList items={suggestions} />
      )}
    </div>
  );
}

// ✅ Tab Switching with Smooth Transitions
function TabContainer() {
  const [tab, setTab] = useState('posts');
  const [isPending, startTransition] = useTransition();
  
  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setTab(nextTab); // Can be interrupted
    });
  };
  
  return (
    <div>
      <TabButton 
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
      >
        Posts {isPending && '⏳'}
      </TabButton>
      
      <TabButton 
        isActive={tab === 'comments'}
        onClick={() => selectTab('comments')}
      >
        Comments
      </TabButton>
      
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {tab === 'posts' ? <Posts /> : <Comments />}
      </div>
    </div>
  );
}

// ✅ Debounced Search with useDeferredValue
function SmartSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  // This only re-renders when deferred value changes
  const results = useMemo(() => {
    return performExpensiveSearch(deferredSearchTerm);
  }, [deferredSearchTerm]);
  
  const isStale = searchTerm !== deferredSearchTerm;
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SearchResults results={results} />
      </div>
    </div>
  );
}

// ✅ When to Use What
// useTransition: You control the state update
// useDeferredValue: You receive a prop/value from parent`;

const ConcurrentFeatures = () => {
  return (
    <TopicLayout
      title="useTransition & useDeferredValue"
      route="/react/advanced/concurrent-features"
      category="react"
      explanation="React 18's concurrent features let you mark updates as non-urgent. useTransition wraps state updates, useDeferredValue defers a value. Both keep UI responsive during expensive operations by allowing React to interrupt and prioritize."
      code={concurrentCode}
      codeFilename="ConcurrentFeatures.tsx"
      whyItMatters="These are React 18's killer features. They solve the 'janky input' problem without debouncing. Production apps with search, filters, or large lists need this. Shows you're current with modern React and understand performance at a deep level."
      mistakes={[
        "Using for everything: Only use for expensive operations (>50ms)",
        "Confusing the two: useTransition for your updates, useDeferredValue for props",
        "Not showing pending state: Users need feedback during transitions",
        "Forgetting useMemo: Deferred values need memoization to work"
      ]}
      practiceTask="Build a data table with 10,000 rows. Add: real-time search filter using useTransition, column sorting with useDeferredValue, and pagination. Ensure typing in search stays responsive even during heavy filtering."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Concurrent Features"
        examples={[
          {
            title: "useTransition Search",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial; padding: 40px; background: #f0f4f8; }
    .app { background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    input { width: 100%; padding: 12px; border: 2px solid #D1D5DB; border-radius: 6px; font-size: 16px; box-sizing: border-box; }
    input:focus { outline: none; border-color: #3B82F6; }
    .results { margin-top: 20px; }
    .item { padding: 12px; background: #F3F4F6; margin: 8px 0; border-radius: 6px; }
    .pending { opacity: 0.6; }
    .spinner { display: inline-block; margin-left: 10px; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useTransition, useMemo } = React;
    
    // Generate fake data
    const items = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: \`Item \${i + 1}\`,
      description: \`Description for item \${i + 1}\`
    }));
    
    function App() {
      const [query, setQuery] = useState('');
      const [searchQuery, setSearchQuery] = useState('');
      const [isPending, startTransition] = useTransition();
      
      const handleSearch = (value) => {
        setQuery(value);
        startTransition(() => {
          setSearchQuery(value);
        });
      };
      
      const filtered = useMemo(() => {
        if (!searchQuery) return items.slice(0, 20);
        return items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 20);
      }, [searchQuery]);
      
      return (
        <div className="app">
          <h1>🔍 useTransition Search</h1>
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search 1000 items..."
          />
          {isPending && <span className="spinner">⏳</span>}
          
          <div className={\`results \${isPending ? 'pending' : ''}\`}>
            <p>{filtered.length} results</p>
            {filtered.map(item => (
              <div key={item.id} className="item">
                <strong>{item.name}</strong>
                <div>{item.description}</div>
              </div>
            ))}
          </div>
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

export default ConcurrentFeatures;
