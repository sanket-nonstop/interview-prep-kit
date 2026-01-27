import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Lightbulb, Zap, BookOpen, MessageSquare, Server, Globe, CheckCircle } from 'lucide-react';

const methods = [
  { name: 'GET', route: '/api-testing/get', color: 'bg-green-500', desc: 'Retrieve data from server', icon: '📥', example: 'Like reading a book', detail: 'Fetch information without changing anything' },
  { name: 'POST', route: '/api-testing/post', color: 'bg-blue-500', desc: 'Create new resource', icon: '➕', example: 'Like adding a new contact', detail: 'Send data to create something new' },
  { name: 'PUT', route: '/api-testing/put', color: 'bg-orange-500', desc: 'Replace entire resource', icon: '🔄', example: 'Like rewriting a document', detail: 'Replace all data with new version' },
  { name: 'PATCH', route: '/api-testing/patch', color: 'bg-yellow-500', desc: 'Update partial resource', icon: '✏️', example: 'Like editing one paragraph', detail: 'Update only specific fields' },
  { name: 'DELETE', route: '/api-testing/delete', color: 'bg-red-500', desc: 'Remove resource', icon: '🗑️', example: 'Like deleting a file', detail: 'Permanently remove data' },
];

const ApiTestingMain = () => {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="topic-card p-8 mb-8 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">API Testing Lab</h1>
            <p className="text-sm text-muted-foreground mt-1">Learn by doing - No coding required!</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to your interactive API playground! Here you'll learn how websites and apps communicate with servers.
          Think of APIs as messengers that carry requests and bring back responses - just like ordering food through an app!
        </p>
      </div>

      {/* What is an API Section */}
      <div className="topic-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          What is an API?
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="text-base leading-relaxed">
            <strong className="text-foreground">API (Application Programming Interface)</strong> is a set of rules that allows different software applications to communicate with each other.
            Think of it as a <strong className="text-primary">messenger</strong> that takes your request, tells a system what you want, and brings back the response.
          </p>
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
            <div className="font-semibold text-foreground mb-2">🏢 Restaurant Analogy:</div>
            <p className="text-sm">Imagine ordering food at a restaurant. You (the customer) can't go into the kitchen and cook. Instead, you tell the waiter what you want, the waiter takes your order to the kitchen, and brings back your food. The waiter is the API!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="p-5 bg-background/50 rounded-lg border-2 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="text-4xl mb-3 text-center">👤</div>
              <div className="font-bold text-base text-foreground mb-2 text-center">1. You (Client)</div>
              <div className="text-sm text-center mb-3">You look at the menu and decide what you want</div>
              <div className="text-xs bg-blue-500/10 p-2 rounded">Example: Opening Instagram app</div>
            </div>
            <div className="p-5 bg-background/50 rounded-lg border-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="text-4xl mb-3 text-center">🍽️</div>
              <div className="font-bold text-base text-foreground mb-2 text-center">2. Waiter (API)</div>
              <div className="text-sm text-center mb-3">Takes your order to the kitchen and brings back food</div>
              <div className="text-xs bg-purple-500/10 p-2 rounded">Example: API fetches your feed</div>
            </div>
            <div className="p-5 bg-background/50 rounded-lg border-2 border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="text-4xl mb-3 text-center">👨‍🍳</div>
              <div className="font-bold text-base text-foreground mb-2 text-center">3. Kitchen (Server)</div>
              <div className="text-sm text-center mb-3">Prepares your food and sends it back</div>
              <div className="text-xs bg-green-500/10 p-2 rounded">Example: Server sends posts data</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 mt-6">🌐 Different Forms of APIs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                Web APIs (REST, GraphQL)
              </div>
              <p className="text-sm mb-2">Most common type. Used by websites and mobile apps to fetch data over the internet.</p>
              <div className="text-xs bg-blue-500/10 p-2 rounded"><strong className="text-foreground">Example:</strong> Instagram loads posts using REST API</div>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-xl">📚</span>
                Library/Framework APIs
              </div>
              <p className="text-sm mb-2">Functions provided by programming libraries like React, jQuery.</p>
              <div className="text-xs bg-purple-500/10 p-2 rounded"><strong className="text-foreground">Example:</strong> React's useState() manages state</div>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-xl">💻</span>
                Operating System APIs
              </div>
              <p className="text-sm mb-2">Allow programs to interact with computer hardware and OS features.</p>
              <div className="text-xs bg-green-500/10 p-2 rounded"><strong className="text-foreground">Example:</strong> Windows API accesses files, printers</div>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-xl">🔌</span>
                Hardware APIs
              </div>
              <p className="text-sm mb-2">Enable software to communicate with physical devices.</p>
              <div className="text-xs bg-orange-500/10 p-2 rounded"><strong className="text-foreground">Example:</strong> Camera API lets apps take photos</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 mt-6">💼 Common Use Cases</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="font-semibold text-foreground mb-1 text-sm">📱 Social Media</div>
              <div className="text-xs">Load posts, like content, post comments</div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="font-semibold text-foreground mb-1 text-sm">💳 Payment Processing</div>
              <div className="text-xs">Stripe, PayPal handle transactions</div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="font-semibold text-foreground mb-1 text-sm">🗺️ Maps & Location</div>
              <div className="text-xs">Google Maps shows directions, traffic</div>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <div className="font-semibold text-foreground mb-1 text-sm">☁️ Weather Data</div>
              <div className="text-xs">Apps fetch forecasts from weather APIs</div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="font-semibold text-foreground mb-1 text-sm">🔐 Authentication</div>
              <div className="text-xs">"Sign in with Google" uses OAuth API</div>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <div className="font-semibold text-foreground mb-1 text-sm">📧 Email Services</div>
              <div className="text-xs">SendGrid, Mailchimp send emails</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 mt-6">⚡ Why APIs are Integral to Modern Development</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="text-xl flex-shrink-0">🚀</div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Speed Up Development</div>
                <div className="text-xs">Use existing APIs instead of building from scratch. Why build a payment system when Stripe API exists?</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="text-xl flex-shrink-0">🔗</div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Connect Different Systems</div>
                <div className="text-xs">APIs let apps talk to each other. Your fitness app syncs with your health app via APIs.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="text-xl flex-shrink-0">🔒</div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Security & Control</div>
                <div className="text-xs">APIs control what data you can access. You can't see other users' passwords, only what the API allows.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="text-xl flex-shrink-0">📈</div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Scalability</div>
                <div className="text-xs">One API serves millions of users. Instagram's API handles billions of requests daily.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="text-xl flex-shrink-0">🌍</div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Platform Independence</div>
                <div className="text-xs">Same API works on web, mobile, desktop. Twitter's API serves all platforms.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="text-xl flex-shrink-0">💰</div>
              <div>
                <div className="font-semibold text-foreground text-sm mb-1">Business Model</div>
                <div className="text-xs">Companies monetize APIs. Google Maps API charges based on usage.</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/30">
            <div className="font-semibold text-foreground mb-2">💡 Bottom Line</div>
            <div className="text-sm"><strong className="text-foreground">Every modern app uses APIs.</strong> When you check weather, order food, watch Netflix, or send a message - APIs work behind the scenes. Understanding APIs is essential because they're the backbone of how software communicates.</div>
          </div>
        </div>
      </div>

      {/* How API Communication Works */}
      <div className="topic-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          How Does API Communication Work?
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">Every API interaction has 3 parts: <strong className="text-foreground">Request</strong>, <strong className="text-foreground">Processing</strong>, and <strong className="text-foreground">Response</strong></p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg border-2 border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <div className="font-bold text-foreground">1. REQUEST</div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">You ask for something</div>
              <div className="text-xs bg-background/50 p-2 rounded font-mono mb-1">GET /posts</div>
              <div className="text-xs text-muted-foreground">"Give me all posts"</div>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border-2 border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-purple-500" />
                <div className="font-bold text-foreground">2. PROCESSING</div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Server works on it</div>
              <div className="text-xs bg-background/50 p-2 rounded mb-1">⚙️ Finding posts...</div>
              <div className="text-xs text-muted-foreground">Database query running</div>
            </div>

            <div className="p-4 bg-green-500/10 rounded-lg border-2 border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="font-bold text-foreground">3. RESPONSE</div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Server sends back data</div>
              <div className="text-xs bg-background/50 p-2 rounded font-mono mb-1">200 OK</div>
              <div className="text-xs text-muted-foreground">✅ Here are 100 posts</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground mb-2">📤 What's in a Request?</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Method:</strong> What action (GET, POST, etc.)</li>
                <li>• <strong>URL:</strong> Where to send it</li>
                <li>• <strong>Headers:</strong> Extra info (like authentication)</li>
                <li>• <strong>Body:</strong> Data you're sending (for POST/PUT)</li>
              </ul>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground mb-2">📥 What's in a Response?</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>Status Code:</strong> Success or error (200, 404, etc.)</li>
                <li>• <strong>Headers:</strong> Info about the response</li>
                <li>• <strong>Body:</strong> The actual data you requested</li>
                <li>• <strong>Time:</strong> How long it took</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* HTTP Methods Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          5 Ways to Talk to a Server (HTTP Methods)
        </h2>
        <p className="text-muted-foreground mb-4">
          Just like you can read, write, edit, or delete a document, APIs have 5 main actions called <strong className="text-foreground">HTTP Methods</strong>:
        </p>
        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30 mb-6">
          <div className="font-semibold text-foreground mb-2">💡 Think of it like a File Manager:</div>
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="p-2 bg-background/50 rounded text-center">
              <div className="font-bold text-green-500">GET</div>
              <div className="text-muted-foreground">Open & Read</div>
            </div>
            <div className="p-2 bg-background/50 rounded text-center">
              <div className="font-bold text-blue-500">POST</div>
              <div className="text-muted-foreground">Create New</div>
            </div>
            <div className="p-2 bg-background/50 rounded text-center">
              <div className="font-bold text-orange-500">PUT</div>
              <div className="text-muted-foreground">Replace All</div>
            </div>
            <div className="p-2 bg-background/50 rounded text-center">
              <div className="font-bold text-yellow-500">PATCH</div>
              <div className="text-muted-foreground">Edit Part</div>
            </div>
            <div className="p-2 bg-background/50 rounded text-center">
              <div className="font-bold text-red-500">DELETE</div>
              <div className="text-muted-foreground">Remove</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {methods.map((method) => (
            <Link
              key={method.name}
              to={method.route}
              className="topic-card p-6 group hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-14 h-14 ${method.color} rounded-lg flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {method.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">{method.desc}</p>
                    <p className="text-xs text-muted-foreground italic mb-2">💡 {method.example}</p>
                    <p className="text-xs text-foreground font-medium">{method.detail}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="topic-card p-6 mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          What You'll Learn (Step by Step)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">1</div>
              <div>
                <div className="font-semibold text-sm text-foreground">Send Real Requests</div>
                <div className="text-xs text-muted-foreground">Click buttons to send actual API requests to a real server</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">2</div>
              <div>
                <div className="font-semibold text-sm text-foreground">See Live Responses</div>
                <div className="text-xs text-muted-foreground">Watch the server respond with data in real-time</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">3</div>
              <div>
                <div className="font-semibold text-sm text-foreground">Understand Status Codes</div>
                <div className="text-xs text-muted-foreground">Learn what 200 (success), 404 (not found), 500 (error) mean</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">4</div>
              <div>
                <div className="font-semibold text-sm text-foreground">Inspect Headers & Body</div>
                <div className="text-xs text-muted-foreground">See the hidden information sent with every request</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">5</div>
              <div>
                <div className="font-semibold text-sm text-foreground">Practice with Forms</div>
                <div className="text-xs text-muted-foreground">Fill out forms and send custom data to the server</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">6</div>
              <div>
                <div className="font-semibold text-sm text-foreground">Build Confidence</div>
                <div className="text-xs text-muted-foreground">Understand how every app and website works behind the scenes</div>
              </div>
            </div>
          </div>




        </div>
      </div>

      {/* Getting Started */}
      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h3 className="text-xl font-bold text-foreground mb-3">🚀 Ready to Start?</h3>
        <p className="text-muted-foreground mb-4">
          Click on any HTTP method above to start testing! We recommend starting with <strong className="text-foreground">GET</strong> -
          it's the simplest and safest way to fetch data.
        </p>
        <div className="flex gap-3">
          <Link to="/api-testing/get" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Start with GET →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApiTestingMain;
