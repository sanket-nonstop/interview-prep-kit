import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Database, Lightbulb, Play } from 'lucide-react';

const endpoints = [
  { name: 'All Posts', url: 'https://jsonplaceholder.typicode.com/posts', desc: 'Get list of blog posts', icon: '📝', explain: 'Like viewing all messages in your inbox' },
  { name: 'Single Post', url: 'https://jsonplaceholder.typicode.com/posts/1', desc: 'Get one specific post', icon: '📄', explain: 'Like opening one email' },
  { name: 'User Profile', url: 'https://jsonplaceholder.typicode.com/users/1', desc: 'Get user information', icon: '👤', explain: 'Like viewing a profile' },
  { name: 'Comments', url: 'https://jsonplaceholder.typicode.com/comments?postId=1', desc: 'Get post comments', icon: '💬', explain: 'Like reading comments' },
];

const GetRequest = () => {
  const [url, setUrl] = useState(endpoints[0].url);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

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
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="text-6xl mb-4">📥</div>
        <h1 className="text-4xl font-bold">
          GET <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Request</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Retrieve data from a server. Like reading a book - you can look, but you don't change anything.
        </p>
      </div>

      {/* What is GET - Simple */}
      <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10">
            <Lightbulb className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">What is GET?</h2>
            <p className="text-muted-foreground mb-4">
              GET is the most common way to fetch data from a server. Every time you visit a website, your browser sends GET requests to load the page, images, and data.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">📚</div>
                <div className="font-semibold text-sm">Read-Only</div>
                <div className="text-xs text-muted-foreground">Doesn't change data</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">🔁</div>
                <div className="font-semibold text-sm">Safe</div>
                <div className="text-xs text-muted-foreground">Can repeat anytime</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="font-semibold text-sm">Fast</div>
                <div className="text-xs text-muted-foreground">Can be cached</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-bold">Try It Yourself!</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Follow these 3 simple steps to send your first GET request
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="font-semibold">Choose what to fetch</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {endpoints.map((ep, idx) => (
                <button
                  key={ep.url}
                  onClick={() => {
                    setUrl(ep.url);
                    setSelectedEndpoint(idx);
                    setResponse(null);
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedEndpoint === idx
                      ? 'border-green-500 bg-green-500/10 shadow-lg'
                      : 'border-border hover:border-green-500/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{ep.icon}</span>
                    <span className="font-semibold">{ep.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{ep.desc}</div>
                  <div className="text-xs text-muted-foreground italic">💡 {ep.explain}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="font-semibold">See the URL</h3>
            </div>
            <div className="text-xs text-muted-foreground mb-2">This is where your request will be sent:</div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 bg-secondary border border-border rounded-lg font-mono text-sm"
              placeholder="Enter API URL"
            />
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="font-semibold">Send the request</h3>
            </div>
            <button
              onClick={sendRequest}
              disabled={loading}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Fetching data...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send GET Request
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="border border-green-500/30 rounded-lg overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Response Received!</h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Status</span>
                </div>
                <div className="text-2xl font-bold text-green-500">{response.status}</div>
                <div className="text-xs text-muted-foreground">{response.statusText}</div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Time</span>
                </div>
                <div className="text-2xl font-bold text-blue-500">{time}ms</div>
                <div className="text-xs text-muted-foreground">Response time</div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold">Items</span>
                </div>
                <div className="text-2xl font-bold text-purple-500">{response.totalItems}</div>
                <div className="text-xs text-muted-foreground">Data received</div>
              </div>
            </div>

            {/* Data */}
            <div>
              <div className="font-semibold mb-2 flex items-center gap-2">
                <span>📦 Response Data</span>
                {response.isArray && (
                  <span className="text-xs font-normal text-muted-foreground">
                    (Showing 3 of {response.totalItems} items)
                  </span>
                )}
              </div>
              <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto max-h-96 border border-border">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5 flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <div className="font-semibold text-red-500">Error</div>
            <div className="text-sm text-muted-foreground">{error}</div>
          </div>
        </div>
      )}

      {/* How it Works - Interactive */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🔍 How GET Works (Step by Step)</h3>
          <p className="text-sm text-muted-foreground mt-2">Click each step to see what happens behind the scenes</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Step 1 */}
          <div className="border-2 border-blue-500/30 rounded-lg overflow-hidden hover:border-blue-500 transition-all">
            <button
              onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
              className="w-full p-4 bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">📤 Browser Sends Request</div>
                    <div className="text-sm text-muted-foreground">Your browser creates and sends the GET request</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeStep === 1 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeStep === 1 && (
              <div className="p-4 border-t border-border bg-background/50 animate-fade-in space-y-3">
                <p className="text-sm text-muted-foreground">
                  When you click "Send GET Request", your browser creates an HTTP request with:
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold text-foreground mb-1">Method</div>
                    <div className="text-xs font-mono">GET</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold text-foreground mb-1">URL</div>
                    <div className="text-xs font-mono break-all">https://jsonplaceholder.typicode.com/posts</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold text-foreground mb-1">Headers</div>
                    <div className="text-xs font-mono">Accept: application/json<br/>User-Agent: Mozilla/5.0...</div>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-xs font-semibold mb-1">💡 Real-World Example:</div>
                  <div className="text-xs text-muted-foreground">Like asking a librarian: "Can I see the book about JavaScript?"</div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden hover:border-purple-500 transition-all">
            <button
              onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
              className="w-full p-4 bg-purple-500/5 hover:bg-purple-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">2</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">🌐 Request Travels to Server</div>
                    <div className="text-sm text-muted-foreground">Request goes through the internet to reach the server</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeStep === 2 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeStep === 2 && (
              <div className="p-4 border-t border-border bg-background/50 animate-fade-in space-y-3">
                <p className="text-sm text-muted-foreground">
                  Your request travels through the internet:
                </p>
                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="text-3xl mb-1">💻</div>
                    <div className="text-xs font-semibold">Your Browser</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl mb-1">🌍</div>
                    <div className="text-xs font-semibold">Internet</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl mb-1">🖥️</div>
                    <div className="text-xs font-semibold">Server</div>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-xs font-semibold mb-1">💡 Real-World Example:</div>
                  <div className="text-xs text-muted-foreground">Like your request traveling from you to the librarian's desk</div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div className="border-2 border-orange-500/30 rounded-lg overflow-hidden hover:border-orange-500 transition-all">
            <button
              onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
              className="w-full p-4 bg-orange-500/5 hover:bg-orange-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">3</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">⚙️ Server Processes Request</div>
                    <div className="text-sm text-muted-foreground">Server finds and prepares the data you asked for</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeStep === 3 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeStep === 3 && (
              <div className="p-4 border-t border-border bg-background/50 animate-fade-in space-y-3">
                <p className="text-sm text-muted-foreground">
                  The server does several things:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-secondary rounded-lg">
                    <div className="text-lg">1️⃣</div>
                    <div>
                      <div className="text-xs font-semibold">Receives Request</div>
                      <div className="text-xs text-muted-foreground">Server gets your GET request</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-secondary rounded-lg">
                    <div className="text-lg">2️⃣</div>
                    <div>
                      <div className="text-xs font-semibold">Checks Database</div>
                      <div className="text-xs text-muted-foreground">Queries database for the posts you requested</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-secondary rounded-lg">
                    <div className="text-lg">3️⃣</div>
                    <div>
                      <div className="text-xs font-semibold">Formats Data</div>
                      <div className="text-xs text-muted-foreground">Converts data to JSON format</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-secondary rounded-lg">
                    <div className="text-lg">4️⃣</div>
                    <div>
                      <div className="text-xs font-semibold">Prepares Response</div>
                      <div className="text-xs text-muted-foreground">Adds status code (200) and headers</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <div className="text-xs font-semibold mb-1">💡 Real-World Example:</div>
                  <div className="text-xs text-muted-foreground">Like the librarian finding the book on the shelf and bringing it to you</div>
                </div>
              </div>
            )}
          </div>

          {/* Step 4 */}
          <div className="border-2 border-green-500/30 rounded-lg overflow-hidden hover:border-green-500 transition-all">
            <button
              onClick={() => setActiveStep(activeStep === 4 ? 0 : 4)}
              className="w-full p-4 bg-green-500/5 hover:bg-green-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">4</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">📥 Browser Receives Response</div>
                    <div className="text-sm text-muted-foreground">Data comes back and displays on your screen</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeStep === 4 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeStep === 4 && (
              <div className="p-4 border-t border-border bg-background/50 animate-fade-in space-y-3">
                <p className="text-sm text-muted-foreground">
                  Your browser receives the response with:
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold text-foreground mb-1">Status Code</div>
                    <div className="text-xs font-mono text-green-500">200 OK</div>
                    <div className="text-xs text-muted-foreground mt-1">Means: Success! Data found and sent</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold text-foreground mb-1">Response Headers</div>
                    <div className="text-xs font-mono">Content-Type: application/json<br/>Content-Length: 1234</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold text-foreground mb-1">Response Body (Data)</div>
                    <div className="text-xs font-mono">[{'{'}"id": 1, "title": "Post"{'}'}, ...]</div>
                  </div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-xs font-semibold mb-1">💡 Real-World Example:</div>
                  <div className="text-xs text-muted-foreground">Like receiving the book from the librarian and reading it</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Timeline */}
        <div className="p-6 border-t border-border bg-gradient-to-r from-secondary/30 to-transparent">
          <div className="text-sm font-semibold mb-3">⏱️ Typical Timeline:</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-24 text-xs text-muted-foreground">0ms</div>
              <div className="flex-1 h-2 bg-blue-500 rounded-full"></div>
              <div className="text-xs">Request sent</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 text-xs text-muted-foreground">10-50ms</div>
              <div className="flex-1 h-2 bg-purple-500 rounded-full"></div>
              <div className="text-xs">Traveling</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 text-xs text-muted-foreground">50-150ms</div>
              <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
              <div className="text-xs">Processing</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 text-xs text-muted-foreground">150-200ms</div>
              <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
              <div className="text-xs">Response received</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-3">💡 Total time: Usually 100-300ms (less than a blink!)</div>
        </div>
      </div>

      {/* Real Examples */}
      <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-secondary/30 to-transparent">
        <h3 className="text-xl font-bold mb-4">Real-World Examples</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: '📱', title: 'Social Media', desc: 'Loading Instagram posts' },
            { icon: '🛍️', title: 'Shopping', desc: 'Viewing product details' },
            { icon: '☁️', title: 'Weather', desc: 'Checking forecast' },
            { icon: '📧', title: 'Email', desc: 'Loading inbox messages' },
          ].map((example) => (
            <div key={example.title} className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
              <div className="text-2xl mb-1">{example.icon}</div>
              <div className="font-semibold text-sm">{example.title}</div>
              <div className="text-xs text-muted-foreground">{example.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="border border-green-500/30 rounded-lg p-6 bg-green-500/5">
        <h3 className="text-xl font-bold mb-4">✅ Remember</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>GET is for <strong>reading</strong> data, not changing it</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>Safe to repeat - same result every time</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>Status 200 means success, 404 means not found</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span>Most common HTTP method - used everywhere!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetRequest;
