import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const debounceCode = `// Debounce: Delay execution until after calls have stopped

// ✅ Production debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ✅ React hook for debounced values
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Search input with debounced API calls
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // Only calls API 300ms after user stops typing
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

// ✅ Debounced resize handler
const handleResize = debounce(() => {
  console.log('Window resized:', window.innerWidth);
}, 250);

window.addEventListener('resize', handleResize);`;

const Debounce = () => {
  return (
    <TopicLayout
      title="Debounce Pattern"
      route="/javascript/patterns/debounce"
      category="javascript"
      explanation="Debounce delays function execution until after calls have stopped coming for a specified time. Essential for search inputs, resize handlers, and any high-frequency events where you only want the final result."
      code={debounceCode}
      codeFilename="debounce.ts"
      whyItMatters="Prevents excessive API calls and improves performance. Common interview question: 'Implement debounce from scratch' or 'How would you optimize a search input?' Shows understanding of performance optimization and user experience."
      mistakes={[
        "Not clearing previous timeout: Creates memory leaks and unexpected behavior.",
        "Wrong delay timing: Too short = still too many calls, too long = poor UX.",
        "Missing TypeScript generics: Loses type safety for function parameters.",
        "Not handling cleanup: In React, missing cleanup in useEffect causes bugs.",
      ]}
      practiceTask="Create a debounced save function for a form that saves to localStorage 500ms after the user stops typing. Include proper cleanup and TypeScript types."
    >
      <MultiExampleEditor
        title="🎯 Try It: Debounce Pattern"
        examples={[
          {
            title: "Search with Debounce",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  input { width: 100%; padding: 15px; border: none; border-radius: 8px; font-size: 18px; margin: 15px 0; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
  .stat { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; text-align: center; }
  .stat-value { font-size: 48px; font-weight: bold; color: #fbbf24; }
  .stat-label { font-size: 14px; opacity: 0.9; margin-top: 5px; }
</style>
</head>
<body>
  <div class="card">
    <h2>🔍 Debounce Demo</h2>
    <p>Type to see debouncing in action (500ms delay)</p>
    <input id="searchInput" placeholder="Type something..." />
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="inputCount">0</div>
        <div class="stat-label">Keystrokes</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="apiCount">0</div>
        <div class="stat-label">API Calls (Debounced)</div>
      </div>
    </div>
    <p style="font-size: 14px; opacity: 0.8;">✅ Saved ~<span id="saved">0</span> unnecessary API calls!</p>
  </div>
  
  <script>
    let inputCount = 0;
    let apiCount = 0;
    let debounceTimer = null;
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
      inputCount++;
      document.getElementById('inputCount').textContent = inputCount;
      document.getElementById('saved').textContent = inputCount - apiCount - 1;
      
      // Clear previous timer (debounce)
      clearTimeout(debounceTimer);
      
      // Set new timer
      debounceTimer = setTimeout(() => {
        makeApiCall(e.target.value);
      }, 500);
    });
    
    function makeApiCall(value) {
      if (value) {
        apiCount++;
        document.getElementById('apiCount').textContent = apiCount;
        console.log('🚀 API call:', value);
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Auto-Save with Debounce",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  textarea { width: 100%; padding: 15px; border: 2px solid #3b82f6; border-radius: 8px; font-size: 16px; font-family: inherit; background: #1e293b; color: white; min-height: 200px; }
  .status { background: #1e293b; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
  .saving { border-left-color: #fbbf24; }
  .saved { border-left-color: #10b981; }
</style>
</head>
<body>
  <div class="container">
    <h2>💾 Auto-Save with Debounce</h2>
    <p>Type in the textarea - saves 1 second after you stop typing</p>
    <textarea id="editor" placeholder="Start typing..."></textarea>
    <div id="status" class="status">Ready to save...</div>
    <p style="font-size: 14px; opacity: 0.7;">Saved data persists in localStorage</p>
  </div>
  
  <script>
    const editor = document.getElementById('editor');
    const status = document.getElementById('status');
    let saveTimer = null;
    
    // Load saved content
    editor.value = localStorage.getItem('autoSaveContent') || '';
    
    editor.addEventListener('input', () => {
      // Show saving status
      status.textContent = '⏳ Saving...';
      status.className = 'status saving';
      
      // Clear previous timer
      clearTimeout(saveTimer);
      
      // Debounce save
      saveTimer = setTimeout(() => {
        localStorage.setItem('autoSaveContent', editor.value);
        const now = new Date().toLocaleTimeString();
        status.textContent = \`✅ Saved at \${now}\`;
        status.className = 'status saved';
      }, 1000);
    });
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Debounce;