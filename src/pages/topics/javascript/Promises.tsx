import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const promisesCode = `// Promises: Handle async operations with proper error handling

// ✅ Production pattern: Fetch with error handling
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    
    return await response.json();
  } catch (error) {
    // Re-throw with context for debugging
    throw new Error(\`Failed to fetch user \${id}: \${error.message}\`);
  }
}

// ✅ Parallel execution with Promise.all
async function loadDashboard(userId: string) {
  // Runs concurrently - much faster than sequential awaits
  const [user, posts, notifications] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId),
    fetchNotifications(userId),
  ]);
  
  return { user, posts, notifications };
}

// ✅ Promise.allSettled for partial failures
async function loadOptionalData(ids: string[]) {
  const results = await Promise.allSettled(
    ids.map((id) => fetchData(id))
  );
  
  return results.map((result, i) => ({
    id: ids[i],
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason : null,
  }));
}

// ✅ Race pattern: Timeout implementation
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
  );
  
  return Promise.race([promise, timeout]);
}`;

const Promises = () => {
  return (
    <TopicLayout
      title="Promises & Async/Await"
      route="/javascript/promises"
      category="javascript"
      explanation="Promises represent eventual completion/failure of async operations. async/await is syntactic sugar that makes Promise chains readable. Understanding when to use Promise.all vs allSettled vs race separates production code from tutorials."
      code={promisesCode}
      codeFilename="promises.ts"
      whyItMatters="Every app fetches data. Interviewers test: Can you handle errors properly? Do you know parallel vs sequential execution? Can you implement timeout patterns? This directly affects app reliability and performance."
      mistakes={[
        "Missing try/catch: Unhandled rejections crash apps in production.",
        "Sequential awaits: await in loops runs serially. Use Promise.all for parallel.",
        "Swallowing errors: catch(() => {}) hides bugs. Always log or re-throw.",
        "Not using finally: Cleanup code (loading states) should go in finally block.",
      ]}
      practiceTask="Create a fetchWithRetry(url, maxRetries, delayMs) function that retries failed requests with exponential backoff. Should work with fetch and return the successful response or throw after max retries."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Promises"
        examples={[
          {
            title: "Fetch Data",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .container { background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    button { padding: 12px 24px; background: #3B82F6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 5px; }
    button:hover { background: #2563EB; }
    .loading { color: #F59E0B; }
    .success { color: #10B981; }
    .error { color: #EF4444; }
    #result { margin-top: 20px; padding: 15px; background: #F3F4F6; border-radius: 8px; min-height: 50px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🚀 Async/Await Demo</h2>
    <button onclick="fetchData()">Fetch User Data</button>
    <button onclick="fetchMultiple()">Fetch Multiple (Parallel)</button>
    <div id="result"></div>
  </div>
  
  <script>
    async function fetchData() {
      const result = document.getElementById('result');
      result.innerHTML = '<p class="loading">Loading...</p>';
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        result.innerHTML = \`<p class="success"><strong>✅ Success!</strong></p><pre>\${JSON.stringify(data, null, 2)}</pre>\`;
      } catch (error) {
        result.innerHTML = \`<p class="error">❌ Error: \${error.message}</p>\`;
      }
    }
    
    async function fetchMultiple() {
      const result = document.getElementById('result');
      result.innerHTML = '<p class="loading">Loading 3 users in parallel...</p>';
      
      try {
        const [user1, user2, user3] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
          fetch('https://jsonplaceholder.typicode.com/users/2').then(r => r.json()),
          fetch('https://jsonplaceholder.typicode.com/users/3').then(r => r.json())
        ]);
        result.innerHTML = \`<p class="success"><strong>✅ Loaded 3 users!</strong></p><p>\${user1.name}, \${user2.name}, \${user3.name}</p>\`;
      } catch (error) {
        result.innerHTML = \`<p class="error">❌ Error: \${error.message}</p>\`;
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Error Handling",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .container { background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    button { padding: 12px 24px; background: #3B82F6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 5px; }
    button:hover { background: #2563EB; }
    .success { background: #D1FAE5; color: #065F46; padding: 15px; border-radius: 8px; margin-top: 15px; }
    .error { background: #FEE2E2; color: #991B1B; padding: 15px; border-radius: 8px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>⚠️ Error Handling</h2>
    <button onclick="successRequest()">Success Request</button>
    <button onclick="failRequest()">Fail Request</button>
    <div id="output"></div>
  </div>
  
  <script>
    async function successRequest() {
      const output = document.getElementById('output');
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const data = await response.json();
        output.innerHTML = \`<div class="success"><strong>✅ Success!</strong><br>User: \${data.name}</div>\`;
      } catch (error) {
        output.innerHTML = \`<div class="error"><strong>❌ Error!</strong><br>\${error.message}</div>\`;
      }
    }
    
    async function failRequest() {
      const output = document.getElementById('output');
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid-url');
        if (!response.ok) throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        const data = await response.json();
        output.innerHTML = \`<div class="success">Success: \${data}</div>\`;
      } catch (error) {
        output.innerHTML = \`<div class="error"><strong>❌ Caught Error!</strong><br>\${error.message}<br><br>Always use try/catch with async/await!</div>\`;
      }
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

export default Promises;
