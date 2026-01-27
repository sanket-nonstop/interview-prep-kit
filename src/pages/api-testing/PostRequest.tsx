import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Database, HelpCircle, Info, Plus } from 'lucide-react';

const PostRequest = () => {
  const [title, setTitle] = useState('My New Post');
  const [body, setBody] = useState('This is the content of my post');
  const [userId, setUserId] = useState('1');
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
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: parseInt(userId) }),
      });
      const data = await res.json();
      setTime(Date.now() - start);
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
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
      <div className="topic-card p-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">➕</span> POST Request Testing
        </h1>
        <p className="text-muted-foreground text-lg">Create new resources on the server</p>
      </div>

      {/* What is POST? */}
      <div className="topic-card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          What is a POST Request?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p className="text-base">
            Think of POST like <strong className="text-foreground">adding a new contact to your phone</strong>. You're creating something new that didn't exist before.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">✨</div>
              <div className="text-xs font-semibold text-foreground">Creates New</div>
              <div className="text-xs">Adds data to server</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-xs font-semibold text-foreground">Not Idempotent</div>
              <div className="text-xs">Multiple requests = multiple items</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">📦</div>
              <div className="text-xs font-semibold text-foreground">Has Body</div>
              <div className="text-xs">Sends data in request body</div>
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
          Fill out the form below to create a new post. When you click the button, your data will be sent to the server!
        </p>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 1: Enter Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
            placeholder="Enter post title"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 This will be the headline of your post</div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 2: Write Post Content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg h-24"
            placeholder="Enter post content"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 The main content of your post</div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 3: Select User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 Which user is creating this post</div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <div className="text-xs font-semibold mb-2 text-foreground">📤 Request Body Preview (JSON):</div>
          <div className="text-xs text-muted-foreground mb-2">This is the data that will be sent to the server:</div>
          <pre className="text-xs overflow-x-auto bg-background p-2 rounded">
            {JSON.stringify({ title, body, userId: parseInt(userId) }, null, 2)}
          </pre>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 4: Send the Request</label>
          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {loading ? 'Creating Post...' : 'Send POST Request'}
          </button>
        </div>
      </div>

      {/* Response Section */}
      {response && (
        <div className="space-y-4">
          <div className="topic-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">✅ Post Created Successfully!</h3>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-lg text-foreground">Status: {response.status} {response.statusText}</div>
                  <div className="text-xs text-muted-foreground">
                    {response.status === 201 ? '✅ Resource created successfully' : '✅ Success'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-semibold">{time}ms</div>
                  <div className="text-xs text-muted-foreground">Response time</div>
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
                  <span>📝 Created Resource</span>
                  <span className="text-xs font-normal text-muted-foreground">(The new post with server-assigned ID)</span>
                </div>
                <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto border border-border">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
                <div className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm">
                  <div className="font-semibold text-foreground mb-1">🎉 Notice the "id" field!</div>
                  <div className="text-xs text-muted-foreground">The server automatically assigned an ID ({response.data.id}) to your new post. This is how you can reference it later.</div>
                </div>
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
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500 font-bold text-sm">1</div>
            <div>
              <div className="font-semibold text-sm text-foreground">POST Creates New Resources</div>
              <div className="text-xs text-muted-foreground">Every POST request creates a new item on the server</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500 font-bold text-sm">2</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Not Idempotent</div>
              <div className="text-xs text-muted-foreground">Sending the same POST request 5 times creates 5 different items</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500 font-bold text-sm">3</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Data in Request Body</div>
              <div className="text-xs text-muted-foreground">Unlike GET, POST sends data in the request body (usually JSON format)</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500 font-bold text-sm">4</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Status Codes</div>
              <div className="text-xs text-muted-foreground">201 = Created (ideal), 200 = Success, 400 = Bad Request, 500 = Server Error</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-500 font-bold text-sm">5</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Server Returns Created Resource</div>
              <div className="text-xs text-muted-foreground">Usually includes the new resource with a server-assigned ID</div>
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
            <div className="font-semibold text-sm text-foreground">Social Media Post</div>
            <div className="text-xs text-muted-foreground">When you post on Twitter/Instagram, it sends a POST request to create your post</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">🛒</div>
            <div className="font-semibold text-sm text-foreground">Add to Cart</div>
            <div className="text-xs text-muted-foreground">Adding items to shopping cart uses POST to create cart entries</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📝</div>
            <div className="font-semibold text-sm text-foreground">Form Submission</div>
            <div className="text-xs text-muted-foreground">Contact forms, signup forms all use POST to send data</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">💬</div>
            <div className="font-semibold text-sm text-foreground">Send Message</div>
            <div className="text-xs text-muted-foreground">Sending a message in chat apps uses POST to create new message</div>
          </div>
        </div>
      </div>

      {/* POST vs GET Comparison */}
      <div className="topic-card p-6">
        <h3 className="font-semibold mb-3 text-lg">⚖️ POST vs GET</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              POST Request
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>✓ Creates new data</li>
              <li>✓ Data in request body</li>
              <li>✓ Not safe (modifies server)</li>
              <li>✓ Not idempotent</li>
              <li>✓ Not cacheable</li>
            </ul>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              GET Request
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>✓ Retrieves data</li>
              <li>✓ Data in URL parameters</li>
              <li>✓ Safe (doesn't modify)</li>
              <li>✓ Idempotent</li>
              <li>✓ Cacheable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRequest;
