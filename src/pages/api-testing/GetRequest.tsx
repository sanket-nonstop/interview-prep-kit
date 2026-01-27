import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Database, HelpCircle, Info } from 'lucide-react';

const endpoints = [
  { name: 'Get All Posts', url: 'https://jsonplaceholder.typicode.com/posts', desc: 'Fetch list of posts', explain: 'Like viewing all messages in your inbox' },
  { name: 'Get Single Post', url: 'https://jsonplaceholder.typicode.com/posts/1', desc: 'Fetch specific post', explain: 'Like opening one specific email' },
  { name: 'Get User', url: 'https://jsonplaceholder.typicode.com/users/1', desc: 'Fetch user details', explain: 'Like viewing someone\'s profile' },
  { name: 'Get Comments', url: 'https://jsonplaceholder.typicode.com/comments?postId=1', desc: 'Fetch post comments', explain: 'Like reading comments on a post' },
];

const GetRequest = () => {
  const [url, setUrl] = useState(endpoints[0].url);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);

  const sendRequest = async () => {
    setLoading(true);
    setError('');
    setResponse(null);
    const start = Date.now();

    try {
      const res = await fetch(url);
      const data = await res.json();
      setTime(Date.now() - start);
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: Array.isArray(data) ? data.slice(0, 3) : data,
        isArray: Array.isArray(data),
        totalItems: Array.isArray(data) ? data.length : 1,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">📥</span> GET Request Testing
        </h1>
        <p className="text-muted-foreground text-lg">Retrieve data from server without modifying anything</p>
      </div>

      {/* What is GET? */}
      <div className="topic-card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          What is a GET Request?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p className="text-base">
            Think of GET like <strong className="text-foreground">reading a book from a library</strong>. You can look at the book, 
            but you don't change anything. The book stays the same for everyone else.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">📚</div>
              <div className="text-xs font-semibold text-foreground">Safe</div>
              <div className="text-xs">Doesn't change data</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🔁</div>
              <div className="text-xs font-semibold text-foreground">Repeatable</div>
              <div className="text-xs">Same result every time</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">💾</div>
              <div className="text-xs font-semibold text-foreground">Cacheable</div>
              <div className="text-xs">Can be saved for speed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Section */}
      <div className="topic-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Try It Yourself!</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Select an endpoint below, then click the button to send a real GET request. You'll see the response instantly!
        </p>
        
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 1: Choose What to Fetch</label>
          <div className="grid md:grid-cols-2 gap-2">
            {endpoints.map((ep) => (
              <button
                key={ep.url}
                onClick={() => setUrl(ep.url)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  url === ep.url ? 'border-green-500 bg-green-500/10' : 'border-border hover:border-green-500/50'
                }`}
              >
                <div className="font-semibold text-sm text-foreground">{ep.name}</div>
                <div className="text-xs text-muted-foreground">{ep.desc}</div>
                <div className="text-xs text-muted-foreground italic mt-1">💡 {ep.explain}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 2: See the URL</label>
          <div className="text-xs text-muted-foreground mb-2">This is where the request will be sent:</div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg font-mono text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 3: Send the Request</label>
          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full p-4 bg-green-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {loading ? 'Sending Request...' : 'Send GET Request'}
          </button>
        </div>
      </div>

      {/* Response Section */}
      {response && (
        <div className="space-y-4">
          <div className="topic-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">✅ Response Received!</h3>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <div>
                  <div className="font-semibold text-lg text-foreground">Status: {response.status} {response.statusText}</div>
                  <div className="text-xs text-muted-foreground">
                    {response.status === 200 ? '✅ Success! Data retrieved successfully' : 'Response status code'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{time}ms</div>
                    <div className="text-xs text-muted-foreground">Response time</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{response.totalItems} items</div>
                    <div className="text-xs text-muted-foreground">Data received</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span>📦 Response Headers</span>
                  <span className="text-xs font-normal text-muted-foreground">(Metadata about the response)</span>
                </div>
                <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto border border-border">
                  {JSON.stringify(response.headers, null, 2)}
                </pre>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span>📝 Response Body</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    (The actual data you requested)
                    {response.isArray && ` - Showing 3 of ${response.totalItems} items`}
                  </span>
                </div>
                <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto max-h-96 border border-border">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Section */}
      {error && (
        <div className="topic-card p-4 bg-destructive/10 border-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5 text-destructive" />
          <div>
            <div className="font-semibold text-destructive">Error occurred</div>
            <div className="text-sm text-destructive">{error}</div>
          </div>
        </div>
      )}

      {/* Key Points */}
      <div className="topic-card p-6">
        <h3 className="font-semibold mb-3 text-lg">🎯 Key Things to Remember</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-500 font-bold text-sm">1</div>
            <div>
              <div className="font-semibold text-sm text-foreground">GET is Read-Only</div>
              <div className="text-xs text-muted-foreground">It fetches data but never changes anything on the server</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-500 font-bold text-sm">2</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Safe to Repeat</div>
              <div className="text-xs text-muted-foreground">You can send the same GET request 100 times - same result every time</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-500 font-bold text-sm">3</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Data in URL</div>
              <div className="text-xs text-muted-foreground">Parameters are visible in the URL (like ?postId=1)</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-500 font-bold text-sm">4</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Status Codes Matter</div>
              <div className="text-xs text-muted-foreground">200 = Success, 404 = Not Found, 500 = Server Error</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real World Examples */}
      <div className="topic-card p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <h3 className="font-semibold mb-3 text-lg">🌍 Real-World Examples</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📱</div>
            <div className="font-semibold text-sm text-foreground">Social Media Feed</div>
            <div className="text-xs text-muted-foreground">When you open Instagram, it sends GET requests to fetch posts</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">🛍️</div>
            <div className="font-semibold text-sm text-foreground">Online Shopping</div>
            <div className="text-xs text-muted-foreground">Viewing product details uses GET to fetch information</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">🎞️</div>
            <div className="font-semibold text-sm text-foreground">Weather App</div>
            <div className="text-xs text-muted-foreground">Checking weather sends GET request to weather API</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📧</div>
            <div className="font-semibold text-sm text-foreground">Email Inbox</div>
            <div className="text-xs text-muted-foreground">Loading your emails uses GET to retrieve messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetRequest;
