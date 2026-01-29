import { useState } from 'react';
import { Send, Loader2, CheckCircle2, XCircle, Clock, Lightbulb, Play, Code2, Eye, ChevronDown } from 'lucide-react';

const PostRequest = () => {
  const [title, setTitle] = useState('My Awesome Post');
  const [body, setBody] = useState('This is the content of my post');
  const [userId, setUserId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);
  const [activeExample, setActiveExample] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [editorCode, setEditorCode] = useState(`import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // POST request with payload
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
        data,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 1, title: 'UI Layout Component', color: 'blue' },
    { id: 2, title: 'Reusable Input Component', color: 'purple' },
    { id: 3, title: 'Form Validation Logic', color: 'orange' },
    { id: 4, title: 'State Management', color: 'green' },
    { id: 5, title: 'API Submission Service', color: 'red' },
    { id: 6, title: 'Button Component', color: 'pink' }
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="text-6xl mb-4">➕</div>
        <h1 className="text-4xl font-bold">
          POST <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Request</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Send data (payload) to create new resources on the server
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
              POST sends data (payload) to create new resources. Fill a form, click submit - your data goes to the server and you get a confirmation with an ID.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">📦</div>
                <div className="font-semibold text-sm">Payload</div>
                <div className="text-xs text-muted-foreground">Data in body</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">✨</div>
                <div className="font-semibold text-sm">Creates</div>
                <div className="text-xs text-muted-foreground">New resource</div>
              </div>
              <div className="p-3 border border-border rounded-lg text-center">
                <div className="text-2xl mb-1">✅</div>
                <div className="font-semibold text-sm">Response</div>
                <div className="text-xs text-muted-foreground">201 + ID</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How POST Works */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">🔍 How POST Works</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between text-center">
            <div className="flex-1">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-sm font-semibold">Fill Form</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm font-semibold">Create Payload</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm font-semibold">POST Request</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="flex-1">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-sm font-semibold">201 + ID</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">1. Try It Yourself!</h2>
          </div>
          <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-sm font-semibold mb-1">💡 What we're doing:</div>
            <div className="text-xs text-muted-foreground">
              This is like Postman - a tool developers use to test APIs. Fill the form below to create your payload (request body), then click Send to make a real POST request to a test API. You'll see the response with the new resource ID the server creates.
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Method & URL */}
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm">POST</div>
            <div className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg font-mono text-sm">
              https://jsonplaceholder.typicode.com/posts
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
              <span className="text-sm font-semibold">Body (Payload)</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1 block text-muted-foreground">title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 bg-secondary border border-border rounded text-sm"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block text-muted-foreground">userId</label>
                  <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full p-2 bg-secondary border border-border rounded text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block text-muted-foreground">body</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full p-2 bg-secondary border border-border rounded text-sm h-20"
                  placeholder="Enter content"
                />
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
                {JSON.stringify({ title, body, userId: parseInt(userId) }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
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
              <h3 className="text-xl font-bold">Resource Created!</h3>
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
              <div className="font-semibold mb-2">📦 Response Payload</div>
              <pre className="bg-secondary p-4 rounded-lg text-xs overflow-x-auto border border-border">
                {JSON.stringify(response.data, null, 2)}
              </pre>
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-sm font-semibold mb-1">🎉 Server assigned ID: {response.data.id}</div>
                <div className="text-xs text-muted-foreground">
                  You can now use this ID to reference, update, or delete this resource
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
            { icon: '📱', title: 'Social Media Post', desc: 'Creating tweets, Instagram posts' },
            { icon: '🛒', title: 'Add to Cart', desc: 'Adding items to shopping cart' },
            { icon: '📝', title: 'Form Submission', desc: 'Contact forms, signup forms' },
            { icon: '💬', title: 'Send Message', desc: 'Chat messages, comments' }
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setActiveExample(activeExample === i + 1 ? 0 : i + 1)}
              className="w-full border border-border rounded-lg overflow-hidden hover:border-purple-500 transition-all"
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
                  <div className="text-xs font-semibold mb-2">📤 Request Payload:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
                    {getExamplePayload(i + 1)}
                  </pre>
                  <div className="text-xs font-semibold mb-2">📥 Response:</div>
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
                    {getExampleResponse(i + 1)}
                  </pre>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live Code Editor */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold">2. 💻 Live Code Editor</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Edit the code and see the Contact Form with validation in action!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          <div className="border-r border-border">
            <div className="bg-secondary/50 p-3 border-b border-border flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span className="text-sm font-semibold">ContactForm.jsx</span>
            </div>
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
              <LivePreview key={previewKey} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-500/10 border-t border-border">
          <div className="flex items-start gap-2 text-sm">
            <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Try it:</span>
              <span className="text-muted-foreground ml-2">
                Submit empty form to see validation • Enter invalid email • Fill correctly and submit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Production Example */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b border-border">
          <h3 className="text-xl font-bold">3. 🏗️ Production Code Example</h3>
          <p className="text-sm text-muted-foreground mt-2">Complete React.js contact form - Click sections to expand</p>
        </div>

        <div className="p-6 space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveSection(activeSection === section.id ? 0 : section.id)}
                className="w-full p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full bg-${section.color}-500 text-white flex items-center justify-center text-xs font-bold`}>
                      {section.id}
                    </span>
                    <span className="font-semibold">{section.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {activeSection === section.id && (
                <div className="p-4 border-t border-border bg-background/50 animate-fade-in">
                  <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto border border-border">
                    {getSectionCode(section.id)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Remember */}
      <div className="border border-blue-500/30 rounded-lg p-6 bg-blue-500/5">
        <h3 className="text-xl font-bold mb-4">✅ Key Takeaways</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>POST sends <strong>payload</strong> (data) in request body</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span><strong>Creates</strong> new resources on server</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Returns <strong>201 Created</strong> status with resource ID</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Not idempotent - each request creates <strong>new item</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LivePreview = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { name: '', email: '', message: '' };
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.message) return;
    
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('✅ Sent!');
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('');
      }, 2000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-border rounded-lg bg-background shadow-lg">
      <h2 className="text-xl font-bold">Contact Us</h2>
      
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, name: e.target.value }));
            setErrors(prev => ({ ...prev, name: '' }));
          }}
          className={`w-full p-3 border rounded-lg bg-secondary focus:ring-2 focus:outline-none ${
            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'
          }`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, email: e.target.value }));
            setErrors(prev => ({ ...prev, email: '' }));
          }}
          className={`w-full p-3 border rounded-lg bg-secondary focus:ring-2 focus:outline-none ${
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'
          }`}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, message: e.target.value }));
            setErrors(prev => ({ ...prev, message: '' }));
          }}
          className={`w-full p-3 border rounded-lg bg-secondary h-24 focus:ring-2 focus:outline-none resize-none ${
            errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-blue-500'
          }`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>
      
      <button
        type="submit"
        disabled={!!status}
        className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {status === 'Sending...' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'Sending...' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status && status !== 'Sending...' && (
        <div className="text-center font-semibold text-green-500 animate-fade-in">{status}</div>
      )}
    </form>
  );
};

const getSectionCode = (id: number) => {
  const codes = {
    1: `// components/ContactForm.tsx
import { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" value={formData.name} 
        onChange={handleChange} error={errors.name} />
      <Input name="email" type="email" value={formData.email}
        onChange={handleChange} error={errors.email} />
      <TextArea name="message" value={formData.message}
        onChange={handleChange} error={errors.message} />
      <Button type="submit" loading={loading}>Send</Button>
    </form>
  );
};`,
    2: `// components/Input.tsx
interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

export const Input = ({ name, value, onChange, error, type = 'text' }: InputProps) => (
  <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={\`w-full p-3 border rounded-lg \${error ? 'border-red-500' : 'border-gray-300'}\`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);`,
    3: `// utils/validation.ts
export const validateEmail = (email: string) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};

export const validateForm = (data: FormData) => {
  const errors: any = {};
  
  if (!data.name.trim()) errors.name = 'Name required';
  if (!data.email.trim()) errors.email = 'Email required';
  else if (!validateEmail(data.email)) errors.email = 'Invalid email';
  if (!data.message.trim()) errors.message = 'Message required';
  
  return errors;
};`,
    4: `// State management
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validateForm(formData);
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  
  setLoading(true);
  await submitForm(formData);
  setLoading(false);
};`,
    5: `// services/api.ts
export const submitForm = async (data: FormData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // ← Payload
  });
  
  if (!response.ok) throw new Error('Failed');
  return response.json();
};

// Response: { success: true, id: "msg_123" }`,
    6: `// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit';
}

export const Button = ({ children, loading, type = 'button' }: ButtonProps) => (
  <button
    type={type}
    disabled={loading}
    className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
  >
    {loading ? 'Sending...' : children}
  </button>
);`
  };
  return codes[id as keyof typeof codes] || '';
};

const getExamplePayload = (id: number) => {
  const payloads = {
    1: `POST /api/tweets
{
  "text": "Just learned POST requests! 🚀",
  "userId": "12345"
}`,
    2: `POST /api/cart/items
{
  "productId": "prod_123",
  "quantity": 2,
  "userId": "user_789"
}`,
    3: `POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}`,
    4: `POST /api/messages
{
  "conversationId": "conv_456",
  "text": "Hey! How are you?",
  "senderId": "user_123"
}`
  };
  return payloads[id as keyof typeof payloads] || '';
};

const getExampleResponse = (id: number) => {
  const responses = {
    1: `201 Created
{
  "id": "tweet_987654",
  "text": "Just learned POST requests! 🚀",
  "likes": 0,
  "createdAt": "2024-01-15T10:30:00Z"
}`,
    2: `201 Created
{
  "cartItemId": "cart_555",
  "productName": "Cool T-Shirt",
  "quantity": 2,
  "subtotal": 59.98
}`,
    3: `201 Created
{
  "messageId": "msg_abc123",
  "status": "received",
  "estimatedResponse": "24 hours"
}`,
    4: `201 Created
{
  "messageId": "msg_xyz789",
  "status": "sent",
  "deliveredAt": "2024-01-15T10:45:01Z"
}`
  };
  return responses[id as keyof typeof responses] || '';
};

export default PostRequest;
