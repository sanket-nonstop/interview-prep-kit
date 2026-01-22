import { TopicLayout } from '@/components/TopicLayout';

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
      whyItMatters="Every frontend app fetches data. Interviewers test: Can you handle errors properly? Do you know parallel vs sequential execution? Can you implement timeout patterns? This directly affects app reliability and performance."
      mistakes={[
        "Missing try/catch: Unhandled rejections crash apps in production.",
        "Sequential awaits: await in loops runs serially. Use Promise.all for parallel.",
        "Swallowing errors: catch(() => {}) hides bugs. Always log or re-throw.",
        "Not using finally: Cleanup code (loading states) should go in finally block.",
      ]}
      practiceTask="Create a fetchWithRetry(url, maxRetries, delayMs) function that retries failed requests with exponential backoff. Should work with fetch and return the successful response or throw after max retries."
    />
  );
};

export default Promises;
