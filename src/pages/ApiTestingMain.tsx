import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Zap, Lightbulb, Rocket, CheckCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';

const methods = [
  { name: 'GET', route: '/api-testing/get', color: 'bg-green-500', desc: 'Retrieve data from server', icon: '📥', example: 'Like reading a book', detail: 'Fetch information without changing anything' },
  { name: 'POST', route: '/api-testing/post', color: 'bg-blue-500', desc: 'Create new resource', icon: '➕', example: 'Like adding a new contact', detail: 'Send data to create something new' },
  { name: 'PUT', route: '/api-testing/put', color: 'bg-orange-500', desc: 'Replace entire resource', icon: '🔄', example: 'Like rewriting a document', detail: 'Replace all data with new version' },
  { name: 'PATCH', route: '/api-testing/patch', color: 'bg-yellow-500', desc: 'Update partial resource', icon: '✏️', example: 'Like editing one paragraph', detail: 'Update only specific fields' },
  { name: 'DELETE', route: '/api-testing/delete', color: 'bg-red-500', desc: 'Remove resource', icon: '🗑️', example: 'Like deleting a file', detail: 'Permanently remove data' },
];

const ApiTestingMain = () => {
  const [activeTab, setActiveTab] = useState('restaurant');

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          <Code2 className="w-3 h-3" />
          Interactive Lab
        </div>
        <h1 className="text-5xl font-bold">
          API Testing <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Lab</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Learn how websites communicate with servers. Test real APIs with no coding required.
        </p>
      </div>

      {/* What is API - Interactive */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            What is an API?
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">API (Application Programming Interface)</strong> is a set of rules that allows different software applications to communicate with each other. Think of it as a messenger that takes your request, tells a system what you want, and brings back the response.
          </p>
          
          {/* Interactive Tabs */}
          <div className="flex gap-2 border-b border-border overflow-x-auto">
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'restaurant'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              🍽️ Restaurant Analogy
            </button>
            <button
              onClick={() => setActiveTab('realworld')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'realworld'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              🌍 Real Examples
            </button>
            <button
              onClick={() => setActiveTab('types')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'types'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              📚 API Types
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'flow'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              ⚡ How It Works
            </button>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'restaurant' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm"><strong>🏢 Restaurant Analogy:</strong> Imagine ordering food at a restaurant. You can't go into the kitchen and cook. Instead, you tell the waiter what you want, the waiter takes your order to the kitchen, and brings back your food. The waiter is the API!</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-5 border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all">
                    <div className="text-4xl mb-3">👤</div>
                    <h3 className="font-semibold mb-2">1. You (Client)</h3>
                    <p className="text-sm text-muted-foreground mb-3">Look at menu and decide what you want</p>
                    <div className="text-xs bg-blue-500/10 text-blue-600 px-2 py-1 rounded">Example: Opening Instagram app</div>
                  </div>
                  <div className="p-5 border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all">
                    <div className="text-4xl mb-3">🍽️</div>
                    <h3 className="font-semibold mb-2">2. API (Waiter)</h3>
                    <p className="text-sm text-muted-foreground mb-3">Takes order to kitchen and brings food back</p>
                    <div className="text-xs bg-purple-500/10 text-purple-600 px-2 py-1 rounded">Example: API fetches your feed</div>
                  </div>
                  <div className="p-5 border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all">
                    <div className="text-4xl mb-3">👨🍳</div>
                    <h3 className="font-semibold mb-2">3. Server (Kitchen)</h3>
                    <p className="text-sm text-muted-foreground mb-3">Prepares food and sends it back</p>
                    <div className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">Example: Server sends posts data</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'realworld' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg hover:border-green-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📱</span>
                    <h3 className="font-semibold">Social Media</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Instagram, Twitter use APIs to load posts, comments, likes in real-time</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💳</span>
                    <h3 className="font-semibold">Payment Processing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Stripe, PayPal APIs process transactions securely without storing card details</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🗺️</span>
                    <h3 className="font-semibold">Maps & Location</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Google Maps API shows directions, traffic, places in Uber, food delivery apps</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">☁️</span>
                    <h3 className="font-semibold">Weather Data</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Apps fetch forecasts from weather APIs in real-time</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-red-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔐</span>
                    <h3 className="font-semibold">Authentication</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">"Sign in with Google" uses OAuth API to login without sharing passwords</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-yellow-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📧</span>
                    <h3 className="font-semibold">Email Services</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">SendGrid, Mailchimp APIs send emails programmatically</p>
                </div>
              </div>
            )}

            {activeTab === 'types' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 border border-border rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🌍</span>
                    <h3 className="font-semibold">Web APIs (REST, GraphQL)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Most common type. Used by websites and mobile apps to fetch data over the internet.</p>
                  <div className="text-xs bg-blue-500/10 px-2 py-1 rounded"><strong>Example:</strong> Instagram loads posts using REST API</div>
                </div>
                <div className="p-5 border border-border rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📚</span>
                    <h3 className="font-semibold">Library/Framework APIs</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Functions provided by programming libraries like React, jQuery.</p>
                  <div className="text-xs bg-purple-500/10 px-2 py-1 rounded"><strong>Example:</strong> React's useState() manages state</div>
                </div>
                <div className="p-5 border border-border rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💻</span>
                    <h3 className="font-semibold">Operating System APIs</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Allow programs to interact with computer hardware and OS features.</p>
                  <div className="text-xs bg-green-500/10 px-2 py-1 rounded"><strong>Example:</strong> Windows API accesses files, printers</div>
                </div>
                <div className="p-5 border border-border rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🔌</span>
                    <h3 className="font-semibold">Hardware APIs</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Enable software to communicate with physical devices.</p>
                  <div className="text-xs bg-orange-500/10 px-2 py-1 rounded"><strong>Example:</strong> Camera API lets apps take photos</div>
                </div>
              </div>
            )}

            {activeTab === 'flow' && (
              <div className="space-y-4">
                <p className="text-muted-foreground">Every API interaction has 3 parts: <strong className="text-foreground">Request</strong>, <strong className="text-foreground">Processing</strong>, and <strong className="text-foreground">Response</strong></p>
                <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">📤 Request</h3>
                    <p className="text-sm text-muted-foreground mb-2">You ask for something</p>
                    <div className="text-xs bg-background/50 p-2 rounded font-mono">GET /posts</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">⚙️ Processing</h3>
                    <p className="text-sm text-muted-foreground mb-2">Server works on it</p>
                    <div className="text-xs bg-background/50 p-2 rounded">Finding posts in database...</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">📥 Response</h3>
                    <p className="text-sm text-muted-foreground mb-2">Server sends back data</p>
                    <div className="text-xs bg-background/50 p-2 rounded font-mono">200 OK + posts data</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why APIs Matter */}
      <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-secondary/30 to-transparent">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          Why APIs are Integral to Modern Development
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Speed Up Development</h3>
              <p className="text-xs text-muted-foreground">Use existing APIs instead of building from scratch. Why build a payment system when Stripe API exists?</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Connect Different Systems</h3>
              <p className="text-xs text-muted-foreground">APIs let apps talk to each other. Your fitness app syncs with your health app via APIs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Security & Control</h3>
              <p className="text-xs text-muted-foreground">APIs control what data you can access. You can't see other users' passwords, only what the API allows.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Scalability</h3>
              <p className="text-xs text-muted-foreground">One API serves millions of users. Instagram's API handles billions of requests daily.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Platform Independence</h3>
              <p className="text-xs text-muted-foreground">Same API works on web, mobile, desktop. Twitter's API serves all platforms.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Business Model</h3>
              <p className="text-xs text-muted-foreground">Companies monetize APIs. Google Maps API charges based on usage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { num: 1, title: 'Send Real Requests', desc: 'Click buttons to send actual API requests to a real server' },
            { num: 2, title: 'See Live Responses', desc: 'Watch the server respond with data in real-time' },
            { num: 3, title: 'Understand Status Codes', desc: 'Learn what 200 (success), 404 (not found), 500 (error) mean' },
            { num: 4, title: 'Inspect Headers & Body', desc: 'See the hidden information sent with every request' },
            { num: 5, title: 'Practice with Forms', desc: 'Fill out forms and send custom data to the server' },
            { num: 6, title: 'Build Confidence', desc: 'Understand how every app and website works behind the scenes' },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary text-sm">
                {item.num}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HTTP Methods */}
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            5 HTTP Methods to Master
          </h2>
          <p className="text-muted-foreground">
            Different ways to interact with a server - like CRUD operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {methods.map((method) => (
            <Link
              key={method.name}
              to={method.route}
              className="border border-border rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 ${method.color} rounded-lg flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {method.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.desc}</p>
                  <p className="text-xs text-muted-foreground italic mb-2">💡 {method.example}</p>
                  <p className="text-xs font-medium">{method.detail}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border border-primary/30 rounded-lg p-8 bg-gradient-to-r from-primary/5 to-accent/5 text-center space-y-4">
        <h3 className="text-xl font-bold">🚀 Ready to Start?</h3>
        <p className="text-muted-foreground">
          Click any method above to start testing! We recommend starting with <strong className="text-foreground">GET</strong> - it's the simplest and safest way to fetch data.
        </p>
        <Link
          to="/api-testing/get"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Start with GET <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ApiTestingMain;
