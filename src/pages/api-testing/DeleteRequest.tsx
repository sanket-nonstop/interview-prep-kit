import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, HelpCircle, Info, Trash2, AlertTriangle } from 'lucide-react';

const DeleteRequest = () => {
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
        method: 'DELETE',
      });
      setTime(Date.now() - start);
      setResponse({ 
        status: res.status, 
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries())
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-6">
      <div className="topic-card p-6 bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">🗑️</span> DELETE Request Testing
        </h1>
        <p className="text-muted-foreground text-lg">Remove resources from the server permanently</p>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          What is a DELETE Request?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p className="text-base">
            Think of DELETE like <strong className="text-foreground">deleting a file from your computer</strong>. Once it's gone, it's gone (unless you have a backup).
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🗑️</div>
              <div className="text-xs font-semibold text-foreground">Removes Data</div>
              <div className="text-xs">Permanently deletes resource</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">🔁</div>
              <div className="text-xs font-semibold text-foreground">Idempotent</div>
              <div className="text-xs">Same result every time</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-2xl mb-1">⚠️</div>
              <div className="text-xs font-semibold text-foreground">Irreversible</div>
              <div className="text-xs">Cannot be undone</div>
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
          DELETE removes a resource from the server. In a real application, this action cannot be undone!
        </p>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Step 1: Which Post to Delete?</label>
          <input 
            type="number" 
            value={postId} 
            onChange={(e) => setPostId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
          <div className="text-xs text-muted-foreground mt-1">💡 Enter the ID of the post you want to delete</div>
        </div>

        <div className="bg-red-500/10 border-2 border-red-500/30 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground text-sm mb-1">⚠️ Warning: Destructive Action</div>
              <div className="text-xs text-muted-foreground">
                This will permanently delete post #{postId}. In a real API, this action cannot be undone. 
                Always double-check before deleting!
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <div className="text-xs font-semibold mb-2 text-foreground">📤 Request Details:</div>
          <div className="text-xs text-muted-foreground mb-2">DELETE requests typically don't have a request body</div>
          <div className="bg-background p-2 rounded">
            <div className="text-xs font-mono">
              <div><strong>Method:</strong> DELETE</div>
              <div><strong>URL:</strong> /posts/{postId}</div>
              <div><strong>Body:</strong> (empty)</div>
            </div>
          </div>
        </div>

        <button 
          onClick={sendRequest} 
          disabled={loading}
          className="w-full p-4 bg-red-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-600 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
          {loading ? 'Deleting...' : 'Send DELETE Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">✅ Resource Deleted!</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-red-500" />
              <div>
                <div className="font-semibold text-lg text-foreground">Status: {response.status} {response.statusText}</div>
                <div className="text-xs text-muted-foreground">
                  {response.status === 200 ? '✅ Resource deleted successfully' : 
                   response.status === 204 ? '✅ Deleted (No Content)' : 
                   '✅ Request completed'}
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
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="font-semibold text-foreground mb-1">✓ Post #{postId} has been deleted</div>
            <div className="text-xs text-muted-foreground">
              The resource no longer exists on the server. If you try to GET this post now, you'll receive a 404 Not Found error.
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">📦 Response Headers</div>
            <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto border border-border">
              {JSON.stringify(response.headers, null, 2)}
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
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-sm">1</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Permanently Removes Resource</div>
              <div className="text-xs text-muted-foreground">DELETE removes data from the server. In real apps, this is usually irreversible</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-sm">2</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Idempotent</div>
              <div className="text-xs text-muted-foreground">Deleting same resource multiple times = same result (it's gone)</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-sm">3</div>
            <div>
              <div className="font-semibold text-sm text-foreground">No Request Body</div>
              <div className="text-xs text-muted-foreground">DELETE requests typically don't need a body, just the resource ID in the URL</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-sm">4</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Status Codes</div>
              <div className="text-xs text-muted-foreground">200 = Success with body, 204 = Success no content, 404 = Not Found</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-sm">5</div>
            <div>
              <div className="font-semibold text-sm text-foreground">Use With Caution</div>
              <div className="text-xs text-muted-foreground">Always confirm before deleting. Many apps show "Are you sure?" dialogs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <h3 className="font-semibold mb-3 text-lg">🌍 Real-World Examples</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📧</div>
            <div className="font-semibold text-sm text-foreground">Delete Email</div>
            <div className="text-xs text-muted-foreground">Moving email to trash or permanently deleting it</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">👤</div>
            <div className="font-semibold text-sm text-foreground">Delete Account</div>
            <div className="text-xs text-muted-foreground">Removing user account and all associated data</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">🗑️</div>
            <div className="font-semibold text-sm text-foreground">Remove from Cart</div>
            <div className="text-xs text-muted-foreground">Deleting items from shopping cart</div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="text-xl mb-1">📝</div>
            <div className="font-semibold text-sm text-foreground">Delete Post/Comment</div>
            <div className="text-xs text-muted-foreground">Removing your post or comment from social media</div>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 bg-yellow-500/10 border border-yellow-500/30">
        <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Best Practices for DELETE
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <div>Always show confirmation dialog before deleting</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <div>Consider "soft delete" (mark as deleted) instead of permanent deletion</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <div>Implement undo functionality when possible</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <div>Log deletion actions for audit trails</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500">•</span>
            <div>Check user permissions before allowing deletion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequest;
