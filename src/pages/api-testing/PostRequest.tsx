import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Lightbulb, Play, ArrowRight, Code2, Eye } from 'lucide-react';

const PostRequest = () => {
  const [title, setTitle] = useState('My Awesome Post');
  const [body, setBody] = useState('This is the content of my post');
  const [userId, setUserId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeExample, setActiveExample] = useState(0);
  const [editorCode, setEditorCode] = useState(`import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // POST request
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    
    if (response.ok) {
      setStatus('✅ Sent!');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg">
      <h2 className="text-xl font-bold">Contact Us</h2>
      
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded"
        required
      />
      
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded"
        required
      />
      
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border rounded h-24"
        required
      />
      
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
      >
        Send Message
      </button>
      
      {status && <div className="text-center font-semibold">{status}</div>}
    </form>
  );
}

export default ContactForm;`);
  const [previewKey, setPreviewKey] = useState(0);

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
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="text-6xl mb-4">➕</div>
        <h1 className="text-4xl font-bold">
          POST <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Request</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create new data on the server. Like adding a new contact to your phone.
        </p>
      </div>

      {/* What is POST */}
      <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Lightbulb className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">What is POST?</h2>
            <p className="text-muted-foreground mb-4">
              POST creates new resources on the server. Every time you submit a form, post on social media, or upload a file, you're using POST. Unlike GET (which only reads), POST actually changes the server by adding new data.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">✨</div>
                <div className="font-semibold text-sm">Creates New</div>
                <div className="text-xs text-muted-foreground">Adds data to server</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">📦</div>
                <div className="font-semibold text-sm">Has Body</div>
                <div className="text-xs text-muted-foreground">Sends data in body</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">🔄</div>
                <div className="font-semibold text-sm">Not Repeatable</div>
                <div className="text-xs text-muted-foreground">Each creates new item</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual: GET vs POST */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-secondary/50 to-transparent p-6 border-b border-border">
          <h3 className="text-xl font-bold">📊 GET vs POST Comparison</h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">G</div>
                <h4 className="font-bold">GET Request</h4>
              </div>
              <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/5">
                <div className="text-3xl mb-2">📖</div>
                <div className="text-sm font-semibold mb-2">Reading a Book</div>
                <div className="text-xs text-muted-foreground">You can read it many times, but the book stays the same</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Only reads data</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Safe & repeatable</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Data in URL</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">P</div>
                <h4 className="font-bold">POST Request</h4>
              </div>
              <div className="p-4 border border-blue-500/30 rounded-lg bg-blue-500/5">
                <div className="text-3xl mb-2">✍️</div>
                <div className="text-sm font-semibold mb-2">Writing in a Notebook</div>
                <div className="text-xs text-muted-foreground">Each time you write, you add something new to the notebook</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Creates new data</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Changes server state</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Data in body</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How POST Works - Interactive */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🔍 How POST Works (Step by Step)</h3>
          <p className="text-sm text-muted-foreground mt-2">Click each step to learn more</p>
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
                    <div className="font-bold text-lg">📝 Fill Form</div>
                    <div className="text-sm text-muted-foreground">User enters data into form fields</div>
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
                  You fill out a form with information like title, content, etc.
                </p>
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="text-xs font-semibold mb-2">Example Form:</div>
                  <div className="space-y-1 text-xs">
                    <div>Title: "My First Post"</div>
                    <div>Content: "Hello World!"</div>
                    <div>User ID: 1</div>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-xs font-semibold mb-1">💡 Real Example:</div>
                  <div className="text-xs text-muted-foreground">Like filling out a contact form on a website</div>
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
                    <div className="font-bold text-lg">📦 Package as JSON</div>
                    <div className="text-sm text-muted-foreground">Data converted to JSON format</div>
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
                  Your form data is converted to JSON (JavaScript Object Notation) format:
                </p>
                <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto">
{`{
  "title": "My First Post",
  "body": "Hello World!",
  "userId": 1
}`}
                </pre>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-xs font-semibold mb-1">💡 Why JSON?</div>
                  <div className="text-xs text-muted-foreground">JSON is a standard format that both browsers and servers understand easily</div>
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
                    <div className="font-bold text-lg">🚀 Send to Server</div>
                    <div className="text-sm text-muted-foreground">POST request sent with data</div>
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
                  Browser sends POST request with your data in the body:
                </p>
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="text-xs font-mono">
                    POST /posts HTTP/1.1<br/>
                    Content-Type: application/json<br/>
                    <br/>
                    {`{"title": "My First Post", ...}`}
                  </div>
                </div>
                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="text-3xl mb-1">💻</div>
                    <div className="text-xs font-semibold">Browser</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl mb-1">🖥️</div>
                    <div className="text-xs font-semibold">Server</div>
                  </div>
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
                    <div className="font-bold text-lg">✅ Server Creates & Responds</div>
                    <div className="text-sm text-muted-foreground">New resource created with ID</div>
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
                  Server saves your data and responds with the created resource:
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold mb-1">Status Code</div>
                    <div className="text-xs font-mono text-green-500">201 Created</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <div className="text-xs font-semibold mb-1">Response Body</div>
                    <pre className="text-xs font-mono">
{`{
  "id": 101,  ← Server assigned!
  "title": "My First Post",
  "body": "Hello World!",
  "userId": 1
}`}
                    </pre>
                  </div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-xs font-semibold mb-1">🎉 Notice the ID!</div>
                  <div className="text-xs text-muted-foreground">Server automatically assigns a unique ID (101) to your new post</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">Try It Yourself!</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Fill the form and send a real POST request
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-secondary border border-border rounded-lg"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Post Content</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 bg-secondary border border-border rounded-lg h-24"
              placeholder="Enter post content"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">User ID</label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 bg-secondary border border-border rounded-lg"
            />
          </div>

          <div className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="text-xs font-semibold mb-2">📤 Request Body Preview:</div>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify({ title, body, userId: parseInt(userId) }, null, 2)}
            </pre>
          </div>

          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating post...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send POST Request
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="border border-green-500/30 rounded-lg overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Post Created Successfully!</h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            <div>
              <div className="font-semibold mb-2">📦 Created Resource</div>
              <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto border border-border">
                {JSON.stringify(response.data, null, 2)}
              </pre>
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-sm font-semibold mb-1">🎉 Success!</div>
                <div className="text-xs text-muted-foreground">
                  Server assigned ID <strong>{response.data.id}</strong> to your new post. You can now use this ID to reference, update, or delete this post.
                </div>
              </div>
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

      {/* Real Examples - Enhanced */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🌍 Real-World Examples</h3>
          <p className="text-sm text-muted-foreground mt-2">See how POST is used in apps you use every day</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Example 1: Social Media */}
          <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden hover:border-purple-500 transition-all">
            <button
              onClick={() => setActiveExample(activeExample === 1 ? 0 : 1)}
              className="w-full p-4 bg-purple-500/5 hover:bg-purple-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📱</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Social Media Post</div>
                    <div className="text-sm text-muted-foreground">Posting on Twitter, Instagram, Facebook</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeExample === 1 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeExample === 1 && (
              <div className="p-6 border-t border-border bg-background/50 animate-fade-in space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-border">
                  <div className="text-sm font-semibold mb-2">💡 What Happens:</div>
                  <div className="text-xs text-muted-foreground">When you type a tweet and click "Post", your app sends a POST request to create a new tweet on Twitter's servers.</div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📤 Request Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`POST https://api.twitter.com/tweets
Content-Type: application/json

{
  "text": "Just learned about POST requests! 🚀",
  "userId": "12345",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                  </pre>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📥 Response Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`HTTP/1.1 201 Created

{
  "id": "tweet_987654321",  ← Unique tweet ID
  "text": "Just learned about POST requests! 🚀",
  "userId": "12345",
  "likes": 0,
  "retweets": 0,
  "createdAt": "2024-01-15T10:30:00Z"
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
                    <div className="text-2xl mb-1">✍️</div>
                    <div className="text-xs font-semibold">You Type</div>
                    <div className="text-xs text-muted-foreground">Write your tweet</div>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 text-center">
                    <div className="text-2xl mb-1">📤</div>
                    <div className="text-xs font-semibold">POST Sent</div>
                    <div className="text-xs text-muted-foreground">Data to server</div>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30 text-center">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-xs font-semibold">Tweet Created</div>
                    <div className="text-xs text-muted-foreground">Visible to all</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Example 2: Shopping Cart */}
          <div className="border-2 border-blue-500/30 rounded-lg overflow-hidden hover:border-blue-500 transition-all">
            <button
              onClick={() => setActiveExample(activeExample === 2 ? 0 : 2)}
              className="w-full p-4 bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🛒</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Add to Cart</div>
                    <div className="text-sm text-muted-foreground">Adding items to shopping cart</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeExample === 2 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeExample === 2 && (
              <div className="p-6 border-t border-border bg-background/50 animate-fade-in space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-border">
                  <div className="text-sm font-semibold mb-2">💡 What Happens:</div>
                  <div className="text-xs text-muted-foreground">When you click "Add to Cart" on Amazon, a POST request creates a new cart item linking the product to your cart.</div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📤 Request Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`POST https://api.shop.com/cart/items
Content-Type: application/json

{
  "productId": "prod_12345",
  "quantity": 2,
  "size": "M",
  "color": "Blue",
  "userId": "user_789"
}`}
                  </pre>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📥 Response Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`HTTP/1.1 201 Created

{
  "cartItemId": "cart_item_555",  ← New cart entry
  "productId": "prod_12345",
  "productName": "Cool T-Shirt",
  "quantity": 2,
  "price": 29.99,
  "subtotal": 59.98,
  "addedAt": "2024-01-15T10:35:00Z"
}`}
                  </pre>
                </div>

                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="text-xs font-semibold mb-1">⚠️ Why POST not GET?</div>
                  <div className="text-xs text-muted-foreground">Adding to cart <strong>changes</strong> your cart state on the server. GET only reads, POST creates new cart entries.</div>
                </div>
              </div>
            )}
          </div>

          {/* Example 3: Form Submission */}
          <div className="border-2 border-green-500/30 rounded-lg overflow-hidden hover:border-green-500 transition-all">
            <button
              onClick={() => setActiveExample(activeExample === 3 ? 0 : 3)}
              className="w-full p-4 bg-green-500/5 hover:bg-green-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📝</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Contact Form</div>
                    <div className="text-sm text-muted-foreground">Submitting contact/signup forms</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeExample === 3 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeExample === 3 && (
              <div className="p-6 border-t border-border bg-background/50 animate-fade-in space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-border">
                  <div className="text-sm font-semibold mb-2">💡 What Happens:</div>
                  <div className="text-xs text-muted-foreground">When you fill a contact form and click "Submit", POST sends your message to the company's server.</div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📤 Request Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`POST https://company.com/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about your product",
  "message": "I'd like to know more about...",
  "phone": "+1234567890"
}`}
                  </pre>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📥 Response Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`HTTP/1.1 201 Created

{
  "messageId": "msg_abc123",  ← Ticket number
  "status": "received",
  "estimatedResponse": "24 hours",
  "confirmationEmail": "sent",
  "createdAt": "2024-01-15T10:40:00Z"
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="text-xs font-semibold mb-1">✅ What You Get:</div>
                    <div className="text-xs text-muted-foreground">Confirmation message with ticket ID</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="text-xs font-semibold mb-1">📧 Email Sent:</div>
                    <div className="text-xs text-muted-foreground">Confirmation email to your inbox</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Example 4: Chat Message */}
          <div className="border-2 border-orange-500/30 rounded-lg overflow-hidden hover:border-orange-500 transition-all">
            <button
              onClick={() => setActiveExample(activeExample === 4 ? 0 : 4)}
              className="w-full p-4 bg-orange-500/5 hover:bg-orange-500/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">💬</div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Send Message</div>
                    <div className="text-sm text-muted-foreground">Sending chat messages</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeExample === 4 ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </button>
            {activeExample === 4 && (
              <div className="p-6 border-t border-border bg-background/50 animate-fade-in space-y-4">
                <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-border">
                  <div className="text-sm font-semibold mb-2">💡 What Happens:</div>
                  <div className="text-xs text-muted-foreground">When you type and send a message in WhatsApp/Slack, POST creates a new message in the conversation.</div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📤 Request Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`POST https://api.chat.com/messages
Content-Type: application/json

{
  "conversationId": "conv_456",
  "senderId": "user_123",
  "text": "Hey! How are you?",
  "type": "text",
  "timestamp": "2024-01-15T10:45:00Z"
}`}
                  </pre>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">📥 Response Example:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`HTTP/1.1 201 Created

{
  "messageId": "msg_xyz789",  ← Message ID
  "conversationId": "conv_456",
  "senderId": "user_123",
  "text": "Hey! How are you?",
  "status": "sent",
  "deliveredAt": "2024-01-15T10:45:01Z",
  "readBy": []
}`}
                  </pre>
                </div>

                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="text-3xl mb-1">👤</div>
                    <div className="text-xs font-semibold">You</div>
                    <div className="text-xs text-muted-foreground">Type message</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl mb-1">🖥️</div>
                    <div className="text-xs font-semibold">Server</div>
                    <div className="text-xs text-muted-foreground">Stores message</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl mb-1">👥</div>
                    <div className="text-xs font-semibold">Recipient</div>
                    <div className="text-xs text-muted-foreground">Receives it</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Code Editor */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold">💻 Live Code Editor</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Edit the code and see the Contact Form in action! Try changing text, colors, or add new fields.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Code Editor */}
          <div className="border-r border-border">
            <div className="bg-secondary/50 p-3 border-b border-border flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-semibold">ContactForm.jsx</span>
            </div>
            <div className="relative">
              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                className="w-full h-[600px] p-4 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs resize-none focus:outline-none"
                spellCheck={false}
                style={{
                  tabSize: 2,
                  lineHeight: '1.6',
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace'
                }}
              />
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <div className="bg-secondary/50 p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-semibold">Live Preview</span>
              </div>
              <button
                onClick={() => setPreviewKey(prev => prev + 1)}
                className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Refresh
              </button>
            </div>
            <div className="h-[600px] overflow-auto p-6 bg-gradient-to-br from-background to-secondary/20">
              <LivePreview code={editorCode} key={previewKey} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-500/10 border-t border-border">
          <div className="flex items-start gap-2 text-sm">
            <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Try editing:</span>
              <span className="text-muted-foreground ml-2">
                Change "Contact Us" to "Get In Touch" • Change button color from blue-500 to purple-500 • Add a phone number field
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Production Example: Contact Form */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🏗️ Production Example: Contact Form</h3>
          <p className="text-sm text-muted-foreground mt-2">Complete React.js contact form with validation, state management, and API submission</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Section 1: UI Layout */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">1</span>
                UI Layout Component
              </h4>
              <p className="text-xs text-muted-foreground mt-1">Form structure with reusable input components</p>
            </div>
            <div className="p-4 space-y-3">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`// components/ContactForm.tsx
import { useState } from 'react';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { Button } from './Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          required
        />
        
        <TextArea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          rows={5}
          required
        />
        
        <Button type="submit" loading={loading}>
          Send Message
        </Button>
      </form>
      
      {success && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          ✅ Message sent successfully!
        </div>
      )}
    </div>
  );
};`}
              </pre>
            </div>
          </div>

          {/* Section 2: Reusable Input Component */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">2</span>
                Reusable Input Component
              </h4>
              <p className="text-xs text-muted-foreground mt-1">Clean, reusable input with error handling</p>
            </div>
            <div className="p-4 space-y-3">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`// components/Input.tsx
interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required
}: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={
          "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary " +
          (error ? "border-red-500" : "border-gray-300")
        }
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

// components/TextArea.tsx
interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  required?: boolean;
}

export const TextArea = ({
  label,
  name,
  value,
  onChange,
  error,
  rows = 4,
  required
}: TextAreaProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={
          "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary " +
          (error ? "border-red-500" : "border-gray-300")
        }
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};`}
              </pre>
            </div>
          </div>

          {/* Section 3: Form Validation */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">3</span>
                Form Validation Logic
              </h4>
              <p className="text-xs text-muted-foreground mt-1">Validate required fields and email format</p>
            </div>
            <div className="p-4 space-y-3">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`// utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (data: FormData) => {
  const errors: Partial<FormData> = {};
  
  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  // Subject validation
  if (!data.subject.trim()) {
    errors.subject = 'Subject is required';
  }
  
  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
};`}
              </pre>
            </div>
          </div>

          {/* Section 4: State Management & Handlers */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">4</span>
                State Management & Event Handlers
              </h4>
              <p className="text-xs text-muted-foreground mt-1">Handle form changes and submission</p>
            </div>
            <div className="p-4 space-y-3">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`// Inside ContactForm component

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  
  // Update form data
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
  
  // Clear error for this field
  if (errors[name as keyof FormData]) {
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate form
  const validationErrors = validateForm(formData);
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  
  // Submit form
  setLoading(true);
  setSuccess(false);
  
  try {
    await submitContactForm(formData);
    setSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  } catch (error) {
    setErrors({ message: 'Failed to send message. Please try again.' });
  } finally {
    setLoading(false);
  }
};`}
              </pre>
            </div>
          </div>

          {/* Section 5: API Submission */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">5</span>
                API Submission Service
              </h4>
              <p className="text-xs text-muted-foreground mt-1">POST request to backend API</p>
            </div>
            <div className="p-4 space-y-3">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`// services/contactService.ts

export const submitContactForm = async (data: FormData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  
  return response.json();
};

// Example API Response:
// {
//   "success": true,
//   "messageId": "msg_abc123",
//   "message": "Thank you! We'll respond within 24 hours."
// }`}
              </pre>
            </div>
          </div>

          {/* Section 6: Button Component */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs">6</span>
                Button Component with Loading State
              </h4>
              <p className="text-xs text-muted-foreground mt-1">Reusable button with loading indicator</p>
            </div>
            <div className="p-4 space-y-3">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`// components/Button.tsx
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  loading?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  type = 'button',
  loading = false,
  onClick
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={
        "w-full px-6 py-3 bg-primary text-white rounded-lg " +
        "font-semibold hover:opacity-90 disabled:opacity-50 " +
        "transition-all flex items-center justify-center gap-2"
      }
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {loading ? 'Sending...' : children}
    </button>
  );
};`}
              </pre>
            </div>
          </div>

          {/* Folder Structure */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <h4 className="font-bold">📁 Project Structure</h4>
            </div>
            <div className="p-4">
              <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
{`src/
├── components/
│   ├── ContactForm.tsx       # Main form component
│   ├── Input.tsx             # Reusable input
│   ├── TextArea.tsx          # Reusable textarea
│   └── Button.tsx            # Reusable button
├── services/
│   └── contactService.ts     # API calls
├── utils/
│   └── validation.ts         # Validation logic
└── types/
    └── form.ts               # TypeScript types`}
              </pre>
            </div>
          </div>

          {/* Key Features */}
          <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
            <h4 className="font-bold mb-3">✅ Production Features Included:</h4>
            <div className="grid md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>TypeScript for type safety</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Reusable components</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Form validation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Error handling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Loading states</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Success feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Clean architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Responsive design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-blue-500/30 rounded-lg p-6 bg-blue-500/5">
        <h3 className="text-xl font-bold mb-4">✅ Remember</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>POST <strong>creates</strong> new resources on the server</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Data sent in <strong>request body</strong> (not URL)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Not repeatable - each request creates a <strong>new item</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Status <strong>201</strong> means "Created" (success!)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Server assigns a unique <strong>ID</strong> to new resource</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Live Preview Component
const LivePreview = ({ code }: { code: string }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('✅ Message sent successfully!');
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('');
      }, 2000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-border rounded-lg bg-background shadow-lg">
      <h2 className="text-xl font-bold">Contact Us</h2>
      
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        className="w-full p-3 border border-border rounded-lg bg-secondary focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        className="w-full p-3 border border-border rounded-lg bg-secondary focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        className="w-full p-3 border border-border rounded-lg bg-secondary h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        required
      />
      
      <button
        type="submit"
        disabled={!!status}
        className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {status === 'Sending...' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'Sending...' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status && status !== 'Sending...' && (
        <div className="text-center font-semibold text-green-500 animate-fade-in">
          {status}
        </div>
      )}
    </form>
  );
};

export default PostRequest;
