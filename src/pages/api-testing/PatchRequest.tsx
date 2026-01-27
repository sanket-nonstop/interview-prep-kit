import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, HelpCircle, Info, Edit } from 'lucide-react';

const PatchRequest = () => {
  const [title, setTitle] = useState('Partially Updated Title');
  const [postId, setPostId] = useState('1');
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
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setTime(Date.now() - start);
      setResponse({ 
        status: res.status, 
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data 
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-6">
      <div className="topic-card p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">✏️</span> PATCH Request Testing
        </h1>
        <p className="text-muted-foreground text-lg">Update only specific fields of a resource</p>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          What is a PATCH Request?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p className="text-base">
            Think of PATCH like <strong className="text-foreground">editing one paragraph in a document</strong>. You only change what you need, everything else stays the same.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">✏️</div>
              <div className="text-xs font-semibold text-foreground">Partial Update</div>
              <div className="text-xs">Only changes specified fields</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-semibold text-foreground">Efficient</div>
              <div className="text-xs">Send only what changes</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xs font-semibold text-foreground">Precise</div>
              <div className="text-xs">Other fields untouched</div>
            </div>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Try It Yourself!</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          PATCH only updates the fields you send. Other fields remain unchanged on the server!
        </p>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 1: Which Post to Update?</label>
          <input 
            type="number" 
            value={postId} 
            onChange={(e) => setPostId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 Enter the ID of the post you want to partially update</div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 2: New Title (Only Field to Update)</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 Only this field will be updated. Body, userId, etc. stay the same!</div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <div className="text-xs font-semibold mb-2 text-foreground">📤 Request Body (Partial Update):</div>
          <div className="text-xs text-muted-foreground mb-2">Notice: We're only sending the title field!</div>
          <pre className="text-xs overflow-x-auto bg-background p-2 rounded">
            {JSON.stringify({ title }, null, 2)}
          </pre>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg text-sm">
          <div className="font-semibold text-foreground mb-1">💡 PATCH vs PUT</div>
          <div className="text-xs text-muted-foreground">
            <strong>PATCH:</strong> Send only changed fields (title) → Other fields stay same<br/>
            <strong>PUT:</strong> Send ALL fields (title, body, userId) → Missing fields removed
          </div>
        </div>

        <button 
          onClick={sendRequest} 
          disabled={loading}
          className="w-full p-4 bg-yellow-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-600 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Updating...' : 'Send PATCH Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">✅ Field Updated!</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="font-semibold text-lg text-foreground">Status: {response.status} {response.statusText}</div>
                <div className="text-xs text-muted-foreground">✅ Partial update successful</div>
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
          <div>
            <div className="text-sm font-semibold mb-2">📝 Updated Resource</div>
            <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto border border-border">
              {JSON.stringify(response.data, null, 2)}
            </pre>
            <div className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm">
              <div className="font-semibold text-foreground mb-1">🎉 Notice!</div>
              <div className="text-xs text-muted-foreground">Only the "title" field changed. Other fields (body, userId) remained the same!</div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="topic-card p-4 bg-destructive/10 border-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5 text-destructive" />
          <div>
            <div className="font-semibold text-destructive">Error occurred</div>
            <div className="text-sm text-destructive">{error}</div>
          </div>
        </div>
      )}

      <div className="topic-card p-6">
        <h3 className="font-semibold mb-3 text-lg">🎯 Key Things to Remember</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold text-sm">1</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Partial Updates Only</div>
              <div className="text-xs text-muted-foreground">PATCH only modifies the fields you send. Everything else stays unchanged</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold text-sm">2</div>
            <div>
              <div className="font-semibold text-sm text-foreground">More Efficient Than PUT</div>
              <div className="text-xs text-muted-foreground">Send less data over the network. Perfect for updating one or two fields</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold text-sm">3</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Not Always Idempotent</div>
              <div className="text-xs text-muted-foreground">Depends on implementation, but usually safe to repeat</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-500 font-bold text-sm">4</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Status Codes</div>
              <div className="text-xs text-muted-foreground">200 = Success, 404 = Not Found, 400 = Bad Request</div>
            </div>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <h3 className="font-semibold mb-3 text-lg">🌍 Real-World Examples</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">✅</div>
            <div className="font-semibold text-sm text-foreground">Mark as Read</div>
            <div className="text-xs text-muted-foreground">Update only the "read" status of an email without changing anything else</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">❤️</div>
            <div className="font-semibold text-sm text-foreground">Like/Unlike Post</div>
            <div className="text-xs text-muted-foreground">Update only the like count without touching post content</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📧</div>
            <div className="font-semibold text-sm text-foreground">Update Email</div>
            <div className="text-xs text-muted-foreground">Change just your email address in profile, keep everything else</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">🔔</div>
            <div className="font-semibold text-sm text-foreground">Toggle Notification</div>
            <div className="text-xs text-muted-foreground">Turn notifications on/off without changing other settings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchRequest;
