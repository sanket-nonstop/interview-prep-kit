import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Lightbulb, Play, ChevronDown } from 'lucide-react';

const PatchRequest = () => {
  const [title, setTitle] = useState('Partially Updated Title');
  const [postId, setPostId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);
  const [activeExample, setActiveExample] = useState(0);

  const sendRequest = async () => {
    setLoading(true);
    setError('');
    setResponse(null);
    const start = Date.now();

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setTime(Date.now() - start);
      setResponse({ status: res.status, statusText: res.statusText, data });
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
        <div className="text-6xl mb-4">✏️</div>
        <h1 className="text-4xl font-bold">
          PATCH <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Request</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Update only specific fields of a resource
        </p>
      </div>

      {/* What is PATCH */}
      <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-yellow-500/10">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">What is PATCH?</h2>
            <p className="text-muted-foreground mb-4">
              PATCH updates only specific fields. Send partial payload with changed fields - other fields stay untouched.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">✏️</div>
                <div className="font-semibold text-sm">Partial Update</div>
                <div className="text-xs text-muted-foreground">Only changed fields</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="font-semibold text-sm">Efficient</div>
                <div className="text-xs text-muted-foreground">Less data sent</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="font-semibold text-sm">Precise</div>
                <div className="text-xs text-muted-foreground">Others untouched</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How PATCH Works */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🔍 How PATCH Works</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between text-center">
            <div className="flex-1">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-sm font-semibold">Find Resource</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm font-semibold">Partial Payload</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <div className="text-4xl mb-2">✏️</div>
              <div className="text-sm font-semibold">Update Fields</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-sm font-semibold">200 OK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-bold">1. Try It Yourself!</h2>
          </div>
          <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="text-sm font-semibold mb-1">💡 What we're doing:</div>
            <div className="text-xs text-muted-foreground">
              Testing PATCH like in Postman. Enter a resource ID and only the field you want to update. PATCH will update just that field - all other fields remain unchanged!
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Method & URL */}
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold text-sm">PATCH</div>
            <div className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg font-mono text-sm">
              https://jsonplaceholder.typicode.com/posts/{postId}
            </div>
          </div>

          {/* Headers */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 px-4 py-2 border-b border-border">
              <span className="text-sm font-semibold">Headers</span>
            </div>
            <div className="p-4 bg-secondary/20">
              <div className="flex gap-2 text-xs font-mono">
                <span className="text-muted-foreground">Content-Type:</span>
                <span>application/json</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 px-4 py-2 border-b border-border">
              <span className="text-sm font-semibold">Body (Partial Payload)</span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold mb-1 block text-muted-foreground">Resource ID</label>
                <input
                  type="number"
                  value={postId}
                  onChange={(e) => setPostId(e.target.value)}
                  className="w-full p-2 bg-secondary border border-border rounded text-sm"
                  placeholder="Which resource to update?"
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block text-muted-foreground">title (only field to update)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-secondary border border-border rounded text-sm"
                  placeholder="New title value"
                />
                <div className="text-xs text-muted-foreground mt-1">💡 Only this field will change. body, userId stay same!</div>
              </div>
            </div>
          </div>

          {/* JSON Preview */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/50 px-4 py-2 border-b border-border">
              <span className="text-sm font-semibold">JSON Payload Preview</span>
            </div>
            <div className="p-4 bg-[#1e1e1e]">
              <pre className="text-xs text-[#d4d4d4] font-mono">
                {JSON.stringify({ title }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Comparison */}
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs">
            <div className="font-semibold mb-1">🔄 PATCH vs PUT</div>
            <div className="text-muted-foreground">
              <strong>PATCH:</strong> Send only {`{ title }`} → Other fields unchanged<br/>
              <strong>PUT:</strong> Send {`{ id, title, body, userId }`} → Missing fields removed
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send PATCH Request
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
              <h3 className="text-xl font-bold">Field Updated!</h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Status Code</span>
                </div>
                <div className="text-2xl font-bold text-green-500">{response.status}</div>
                <div className="text-xs text-muted-foreground">{response.statusText}</div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Response Time</span>
                </div>
                <div className="text-2xl font-bold text-blue-500">{time}ms</div>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">📦 Updated Resource</div>
              <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto border border-border">
                {JSON.stringify(response.data, null, 2)}
              </pre>
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-sm font-semibold mb-1">🎉 Notice!</div>
                <div className="text-xs text-muted-foreground">
                  Only "title" changed. Other fields (body, userId) stayed the same!
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

      {/* Real-World Examples */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🌍 Real-World Examples</h3>
        </div>
        <div className="p-6 space-y-3">
          {[
            { icon: '✅', title: 'Mark as Read', desc: 'Update only read status' },
            { icon: '❤️', title: 'Like Post', desc: 'Update only like count' },
            { icon: '📧', title: 'Update Email', desc: 'Change just email field' },
            { icon: '🔔', title: 'Toggle Notification', desc: 'Turn on/off notifications' }
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setActiveExample(activeExample === i + 1 ? 0 : i + 1)}
              className="w-full border border-border rounded-lg overflow-hidden hover:border-yellow-500 transition-all"
            >
              <div className="p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{example.icon}</div>
                    <div className="text-left">
                      <div className="font-bold">{example.title}</div>
                      <div className="text-sm text-muted-foreground">{example.desc}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeExample === i + 1 ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {activeExample === i + 1 && (
                <div className="p-4 border-t border-border bg-background/50 animate-fade-in space-y-3">
                  <div className="text-xs font-semibold mb-2">📤 Request:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
                    {getPatchExample(i + 1)}
                  </pre>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Remember */}
      <div className="border border-yellow-500/30 rounded-lg p-6 bg-yellow-500/5">
        <h3 className="text-xl font-bold mb-4">✅ Key Takeaways</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <span>PATCH updates <strong>only specified</strong> fields</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <span>Send <strong>partial payload</strong> with changed fields</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <span><strong>More efficient</strong> than PUT for small changes</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <span>Returns <strong>200 OK</strong> on success</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPatchExample = (id: number) => {
  const examples = {
    1: `PATCH /api/emails/123
{
  "read": true
}`,
    2: `PATCH /api/posts/456
{
  "likes": 42
}`,
    3: `PATCH /api/users/789
{
  "email": "newemail@example.com"
}`,
    4: `PATCH /api/settings
{
  "notifications": false
}`
  };
  return examples[id as keyof typeof examples] || '';
};

export default PatchRequest;
