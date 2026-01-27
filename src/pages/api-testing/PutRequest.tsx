import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, HelpCircle, Info, RefreshCw } from 'lucide-react';

const PutRequest = () => {
  const [title, setTitle] = useState('Updated Post Title');
  const [body, setBody] = useState('This is the completely updated content');
  const [userId, setUserId] = useState('1');
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(postId), title, body, userId: parseInt(userId) }),
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
      <div className="topic-card p-6 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">🔄</span> PUT Request Testing
        </h1>
        <p className="text-muted-foreground text-lg">Replace entire resource with new data</p>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          What is a PUT Request?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p className="text-base">
            Think of PUT like <strong className="text-foreground">rewriting an entire document</strong>. You replace everything with new content, not just edit parts.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🔄</div>
              <div className="text-xs font-semibold text-foreground">Full Replace</div>
              <div className="text-xs">Replaces entire resource</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🔁</div>
              <div className="text-xs font-semibold text-foreground">Idempotent</div>
              <div className="text-xs">Same result every time</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-xs font-semibold text-foreground">All Fields</div>
              <div className="text-xs">Must send complete data</div>
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
          PUT replaces the entire resource. You must provide ALL fields, or missing ones will be removed!
        </p>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 1: Which Post to Update?</label>
          <input 
            type="number" 
            value={postId} 
            onChange={(e) => setPostId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 Enter the ID of the post you want to replace</div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 2: New Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 3: New Body</label>
          <textarea 
            value={body} 
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg h-24"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 4: User ID</label>
          <input 
            type="number" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <div className="text-xs font-semibold mb-2 text-foreground">📤 Request Body (Complete Replacement):</div>
          <pre className="text-xs overflow-x-auto bg-background p-2 rounded">
            {JSON.stringify({ id: parseInt(postId), title, body, userId: parseInt(userId) }, null, 2)}
          </pre>
        </div>

        <button 
          onClick={sendRequest} 
          disabled={loading}
          className="w-full p-4 bg-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Updating...' : 'Send PUT Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">✅ Resource Updated!</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-orange-500" />
              <div>
                <div className="font-semibold text-lg text-foreground">Status: {response.status} {response.statusText}</div>
                <div className="text-xs text-muted-foreground">✅ Resource replaced successfully</div>
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
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 font-bold text-sm">1</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Replaces Entire Resource</div>
              <div className="text-xs text-muted-foreground">PUT overwrites everything. Missing fields will be removed or set to null</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 font-bold text-sm">2</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Idempotent</div>
              <div className="text-xs text-muted-foreground">Sending same PUT request 10 times = same result as sending once</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 font-bold text-sm">3</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Must Send All Fields</div>
              <div className="text-xs text-muted-foreground">Unlike PATCH, you need to include every field in the request body</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-500 font-bold text-sm">4</div>
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
            <div className="text-xl mb-1">👤</div>
            <div className="font-semibold text-sm text-foreground">Update Profile</div>
            <div className="text-xs text-muted-foreground">Replacing entire user profile with new information</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📄</div>
            <div className="font-semibold text-sm text-foreground">Replace Document</div>
            <div className="text-xs text-muted-foreground">Overwriting a document with completely new version</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">⚙️</div>
            <div className="font-semibold text-sm text-foreground">Update Settings</div>
            <div className="text-xs text-muted-foreground">Replacing all app settings with new configuration</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">🖼️</div>
            <div className="font-semibold text-sm text-foreground">Replace Image</div>
            <div className="text-xs text-muted-foreground">Uploading new image to replace existing one</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutRequest;
