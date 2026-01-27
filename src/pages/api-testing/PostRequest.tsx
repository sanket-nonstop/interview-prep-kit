import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

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
      <div className="topic-card p-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">➕</span> POST Request Testing
        </h1>
        <p className="text-muted-foreground">Create new resources on the server</p>
      </div>

      <div className="topic-card p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg h-24"
            placeholder="Enter post content"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg"
          />
        </div>

        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="text-xs font-semibold mb-2">Request Body Preview:</div>
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify({ title, body, userId: parseInt(userId) }, null, 2)}
          </pre>
        </div>

        <button
          onClick={sendRequest}
          disabled={loading}
          className="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Creating...' : 'Send POST Request'}
        </button>
      </div>

      {response && (
        <div className="topic-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-lg">Status: {response.status} {response.statusText}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{time}ms</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Created Resource</div>
            <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
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
          <li>• POST creates new resources on the server</li>
          <li>• Not idempotent: Multiple requests create multiple resources</li>
          <li>• Data sent in request body (JSON format)</li>
          <li>• Status 201 = Created, 200 = Success</li>
          <li>• Server typically returns the created resource with ID</li>
        </ul>
      </div>
    </div>
  );
};

export default PostRequest;
