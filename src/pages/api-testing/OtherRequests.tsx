import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const PutRequest = () => {
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
      setResponse({ status: res.status, statusText: res.statusText, data });
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
        <p className="text-muted-foreground">Replace entire resource with new data</p>
      </div>

      <div className="topic-card p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Post ID to Update</label>
          <input type="number" value={postId} onChange={(e) => setPostId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg h-24" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">User ID</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg" />
        </div>
        <button onClick={sendRequest} disabled={loading}
          className="w-full p-4 bg-orange-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Updating...' : 'Send PUT Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-orange-500" />
              <span className="font-semibold text-lg">Status: {response.status} {response.statusText}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{time}ms</span>
            </div>
          </div>
          <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="topic-card p-4 bg-destructive/10 border-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5 text-destructive" />
          <span className="text-destructive">{error}</span>
        </div>
      )}

      <div className="topic-card p-6">
        <h3 className="font-semibold mb-3">🎯 Key Points</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• PUT replaces the entire resource</li>
          <li>• Idempotent: Same request multiple times = same result</li>
          <li>• Must send all fields, missing fields will be removed</li>
          <li>• Status 200 = Success</li>
        </ul>
      </div>
    </div>
  );
};

export const PatchRequest = () => {
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
      setResponse({ status: res.status, statusText: res.statusText, data });
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
        <p className="text-muted-foreground">Update only specific fields of a resource</p>
      </div>

      <div className="topic-card p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Post ID to Update</label>
          <input type="number" value={postId} onChange={(e) => setPostId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Title (only field to update)</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg" />
        </div>
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="text-xs font-semibold mb-2">Request Body (partial update):</div>
          <pre className="text-xs">{JSON.stringify({ title }, null, 2)}</pre>
        </div>
        <button onClick={sendRequest} disabled={loading}
          className="w-full p-4 bg-yellow-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-600 disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Updating...' : 'Send PATCH Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-lg">Status: {response.status} {response.statusText}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{time}ms</span>
            </div>
          </div>
          <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="topic-card p-4 bg-destructive/10 border-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5 text-destructive" />
          <span className="text-destructive">{error}</span>
        </div>
      )}

      <div className="topic-card p-6">
        <h3 className="font-semibold mb-3">🎯 Key Points</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• PATCH updates only specified fields</li>
          <li>• Other fields remain unchanged</li>
          <li>• More efficient than PUT for partial updates</li>
          <li>• Status 200 = Success</li>
        </ul>
      </div>
    </div>
  );
};

export const DeleteRequest = () => {
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
      setResponse({ status: res.status, statusText: res.statusText });
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
        <p className="text-muted-foreground">Remove resources from the server</p>
      </div>

      <div className="topic-card p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Post ID to Delete</label>
          <input type="number" value={postId} onChange={(e) => setPostId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg" />
        </div>
        <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-sm">
          ⚠️ This will delete post #{postId}. This action cannot be undone (in a real API).
        </div>
        <button onClick={sendRequest} disabled={loading}
          className="w-full p-4 bg-red-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-600 disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Deleting...' : 'Send DELETE Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-red-500" />
              <span className="font-semibold text-lg">Status: {response.status} {response.statusText}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{time}ms</span>
            </div>
          </div>
          <div className="text-green-500 font-semibold">✓ Resource deleted successfully</div>
        </div>
      )}

      {error && (
        <div className="topic-card p-4 bg-destructive/10 border-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5 text-destructive" />
          <span className="text-destructive">{error}</span>
        </div>
      )}

      <div className="topic-card p-6">
        <h3 className="font-semibold mb-3">🎯 Key Points</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• DELETE removes resources from server</li>
          <li>• Idempotent: Deleting same resource multiple times = same result</li>
          <li>• Status 200/204 = Success, 404 = Not Found</li>
          <li>• No request body needed</li>
        </ul>
      </div>
    </div>
  );
};
