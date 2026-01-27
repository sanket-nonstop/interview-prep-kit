import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const API_BASE = 'https://jsonplaceholder.typicode.com';

const methods = [
  { name: 'GET', color: 'bg-green-500', desc: 'Fetch data' },
  { name: 'POST', color: 'bg-blue-500', desc: 'Create new' },
  { name: 'PUT', color: 'bg-orange-500', desc: 'Replace all' },
  { name: 'PATCH', color: 'bg-yellow-500', desc: 'Update part' },
  { name: 'DELETE', color: 'bg-red-500', desc: 'Remove' },
];

export const ApiTester = () => {
  const [method, setMethod] = useState('GET');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');

  const testApi = async () => {
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const options: RequestInit = { method };
      
      if (method === 'POST') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ title: 'New Post', body: 'Content', userId: 1 });
      }
      
      if (method === 'PUT' || method === 'PATCH') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ title: 'Updated Title', body: 'Updated Content' });
      }

      const endpoint = method === 'GET' ? `${API_BASE}/posts/1` : 
                       method === 'POST' ? `${API_BASE}/posts` : 
                       `${API_BASE}/posts/1`;

      const res = await fetch(endpoint, options);
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {methods.map((m) => (
          <button
            key={m.name}
            onClick={() => setMethod(m.name)}
            className={cn(
              'p-4 rounded-lg border-2 transition-all text-white font-bold',
              method === m.name ? `${m.color} scale-105 shadow-lg` : 'bg-secondary text-foreground border-border hover:border-primary'
            )}
          >
            <div className="text-lg">{m.name}</div>
            <div className="text-xs opacity-80">{m.desc}</div>
          </button>
        ))}
      </div>

      <button
        onClick={testApi}
        disabled={loading}
        className="w-full p-4 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {loading ? 'Sending Request...' : `Send ${method} Request`}
      </button>

      {response && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-lg">Response: {response.status}</span>
          </div>
          <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-destructive" />
          <span className="text-destructive">{error}</span>
        </div>
      )}

      <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
        <div className="font-semibold">What's happening:</div>
        <div className="space-y-1 text-muted-foreground">
          <div>• <span className="font-medium">GET:</span> Fetches post #1</div>
          <div>• <span className="font-medium">POST:</span> Creates a new post</div>
          <div>• <span className="font-medium">PUT:</span> Replaces entire post #1</div>
          <div>• <span className="font-medium">PATCH:</span> Updates part of post #1</div>
          <div>• <span className="font-medium">DELETE:</span> Removes post #1</div>
        </div>
      </div>
    </div>
  );
};
