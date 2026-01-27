import { TopicLayout } from '@/components/TopicLayout';

export const StatusCodes = () => (
  <TopicLayout title="Status Codes" route="/miscellaneous/http-networking/status-codes" category="javascript"
    explanation="HTTP status codes indicate the result of an HTTP request. Grouped into 5 classes: 1xx (Info), 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)."
    code={`// Common Status Codes
200 OK - Request succeeded
201 Created - Resource created successfully
204 No Content - Success but no content to return

301 Moved Permanently - Resource permanently moved
302 Found - Temporary redirect
304 Not Modified - Cached version is still valid

400 Bad Request - Invalid request syntax
401 Unauthorized - Authentication required
403 Forbidden - Server refuses request
404 Not Found - Resource doesn't exist
409 Conflict - Request conflicts with current state

500 Internal Server Error - Generic server error
502 Bad Gateway - Invalid response from upstream
503 Service Unavailable - Server temporarily unavailable

// Handling in fetch
fetch('/api/data')
  .then(res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    return res.json();
  })
  .catch(err => console.error(err));`}
    whyItMatters="Understanding status codes is essential for API design and debugging. Interviewers test your knowledge of proper HTTP semantics."
    mistakes={['Using 200 for errors', 'Not differentiating 401 vs 403', 'Returning 500 for client errors', 'Using 200 with error in body']}
    practiceTask="Design error handling for a REST API. Which status codes would you use for: invalid input, unauthorized access, resource not found, server crash?" />
);

export const Headers = () => (
  <TopicLayout title="Headers" route="/miscellaneous/http-networking/headers" category="javascript"
    explanation="HTTP headers pass additional information between client and server. Common headers: Content-Type, Authorization, Cache-Control, CORS headers."
    code={`// Request Headers
fetch('/api/data', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'Accept': 'application/json',
    'User-Agent': 'MyApp/1.0'
  }
});

// Response Headers (server-side)
res.setHeader('Content-Type', 'application/json');
res.setHeader('Cache-Control', 'max-age=3600');
res.setHeader('X-Custom-Header', 'value');

// Common Headers
Content-Type: application/json | text/html | multipart/form-data
Authorization: Bearer <token> | Basic <credentials>
Cache-Control: no-cache | max-age=3600 | public | private
Accept: application/json | text/html
Cookie: sessionId=abc123
Set-Cookie: sessionId=abc123; HttpOnly; Secure`}
    whyItMatters="Headers control caching, authentication, content negotiation, and security. Critical for building secure, performant APIs."
    mistakes={['Not setting Content-Type', 'Exposing sensitive data in headers', 'Not using HttpOnly for cookies', 'Ignoring CORS headers']}
    practiceTask="Implement JWT authentication using Authorization header. How would you handle token refresh?" />
);

export const CORS = () => (
  <TopicLayout title="CORS" route="/miscellaneous/http-networking/cors" category="javascript"
    explanation="Cross-Origin Resource Sharing (CORS) is a security mechanism that allows/restricts resources to be requested from another domain."
    code={`// Server-side CORS setup (Express)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Client-side with credentials
fetch('https://api.example.com/data', {
  method: 'POST',
  credentials: 'include', // Send cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: 'value' })
});

// Preflight Request (OPTIONS)
// Browser automatically sends OPTIONS before actual request
// if it's a "non-simple" request (custom headers, methods other than GET/POST)`}
    whyItMatters="CORS errors are common in web development. Understanding preflight requests and proper configuration is essential."
    mistakes={['Using wildcard (*) with credentials', 'Not handling OPTIONS preflight', 'Exposing all origins in production', 'Not understanding simple vs preflight requests']}
    practiceTask="Your frontend (localhost:3000) can't access API (localhost:5000). Explain why and how to fix it." />
);

export const WebSockets = () => (
  <TopicLayout title="WebSockets" route="/miscellaneous/http-networking/websockets" category="javascript"
    explanation="WebSockets provide full-duplex communication over a single TCP connection. Unlike HTTP, both client and server can send messages anytime."
    code={`// Client-side
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'join', room: 'chat' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onerror = (error) => console.error('Error:', error);
ws.onclose = () => console.log('Disconnected');

// Server-side (Node.js with ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});`}
    whyItMatters="WebSockets enable real-time features: chat, live updates, gaming. Understanding when to use WebSockets vs HTTP polling is key."
    mistakes={['Not handling reconnection', 'Not validating messages', 'Using WebSockets when HTTP would suffice', 'Not implementing heartbeat/ping-pong']}
    practiceTask="Build a simple chat app with WebSockets. How would you handle disconnections and message history?" />
);

export const RESTvsGraphQL = () => (
  <TopicLayout title="REST vs GraphQL" route="/miscellaneous/http-networking/rest-graphql" category="javascript"
    explanation="REST uses multiple endpoints with fixed responses. GraphQL uses a single endpoint where clients specify exactly what data they need."
    code={`// REST API
GET /api/users/123
GET /api/users/123/posts
GET /api/posts/456/comments
// Multiple requests, over-fetching data

// GraphQL Query
query {
  user(id: 123) {
    name
    email
    posts {
      title
      comments { text author }
    }
  }
}
// Single request, exact data needed

// GraphQL Mutation
mutation {
  createPost(title: "Hello", content: "World") {
    id
    title
  }
}

// REST: /api/posts (POST)
// GraphQL: Single endpoint /graphql (POST)`}
    whyItMatters="Choosing between REST and GraphQL impacts API design, performance, and developer experience. Common interview topic."
    mistakes={['Using GraphQL for simple CRUD', 'Not understanding N+1 query problem in GraphQL', 'Thinking GraphQL replaces REST entirely', 'Not caching GraphQL responses']}
    practiceTask="When would you choose REST over GraphQL? List 3 scenarios for each." />
);

export default { StatusCodes, Headers, CORS, WebSockets, RESTvsGraphQL };
