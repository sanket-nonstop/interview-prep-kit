import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Database } from 'lucide-react';

const endpoints = [
  { name: 'Get All Posts', url: 'https://jsonplaceholder.typicode.com/posts', desc: 'Fetch list of posts' },
  { name: 'Get Single Post', url: 'https://jsonplaceholder.typicode.com/posts/1', desc: 'Fetch specific post' },
  { name: 'Get User', url: 'https://jsonplaceholder.typicode.com/users/1', desc: 'Fetch user details' },
  { name: 'Get Comments', url: 'https://jsonplaceholder.typicode.com/comments?postId=1', desc: 'Fetch post comments' },
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
      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-3xl">📥</span> GET Request Testing
        </h1>
        <p className="text-muted-foreground">Retrieve data from server without modifying anything</p>
      </div>

      <div className="topic-card p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">Select Endpoint</label>
          <div className="grid md:grid-cols-2 gap-2">
            {endpoints.map((ep) => (
              <button
                key={ep.url}
                onClick={() => setUrl(ep.url)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  url === ep.url ? 'border-green-500 bg-green-500/10' : 'border-border hover:border-green-500/50'
                }`}
              >
                <div className="font-semibold text-sm">{ep.name}</div>
                <div className="text-xs text-muted-foreground">{ep.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 bg-secondary border border-border rounded-lg font-mono text-sm"
          />
        </div>

        <button
          onClick={sendRequest}
          disabled={loading}
          className="w-full p-4 bg-green-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {loading ? 'Sending...' : 'Send GET Request'}
        </button>
      </div>

      {response && (
        <div className="space-y-4">
          <div className="topic-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="font-semibold text-lg">Status: {response.status} {response.statusText}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{time}ms</span>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span>{response.totalItems} items</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-semibold mb-2">Response Headers</div>
                <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto">
                  {JSON.stringify(response.headers, null, 2)}
                </pre>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">
                  Response Body {response.isArray && `(showing 3 of ${response.totalItems})`}
                </div>
                <pre className="bg-secondary p-3 rounded-lg text-xs overflow-x-auto max-h-96">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            </div>
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
          <li>• GET requests retrieve data without modifying server state</li>
          <li>• Safe & Idempotent: Multiple identical requests have same effect</li>
          <li>• Data passed via URL query parameters (?key=value)</li>
          <li>• Responses can be cached by browsers</li>
          <li>• Status 200 = Success, 404 = Not Found</li>
        </ul>
      </div>
    </div>
  );
};

export default GetRequest;
