import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const iframesCode = `<!-- Iframes: Embedding external content -->

<!-- ✅ Basic iframe -->
<iframe 
  src="https://example.com"
  width="800"
  height="600"
  title="Example Website"
>
  Your browser doesn't support iframes.
</iframe>

<!-- ✅ Secure iframe with sandbox -->
<iframe 
  src="https://untrusted-site.com"
  sandbox="allow-scripts allow-same-origin"
  title="Sandboxed Content"
></iframe>

<!-- Sandbox options:
  - allow-scripts: Allow JavaScript
  - allow-same-origin: Allow same-origin access
  - allow-forms: Allow form submission
  - allow-popups: Allow popups
  - allow-top-navigation: Allow navigation of top frame
-->

<!-- ✅ Responsive iframe -->
<div class="iframe-container">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allowfullscreen
    title="YouTube Video"
  ></iframe>
</div>

<style>
.iframe-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<!-- ✅ PostMessage communication -->
<!-- Parent page -->
<iframe id="myFrame" src="child.html"></iframe>

<script>
const iframe = document.getElementById('myFrame');

// Send message to iframe
iframe.contentWindow.postMessage({
  type: 'greeting',
  message: 'Hello from parent!'
}, '*');

// Receive message from iframe
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://trusted-domain.com') return;
  
  console.log('Received:', event.data);
});
</script>

<!-- Child page (inside iframe) -->
<script>
// Receive message from parent
window.addEventListener('message', (event) => {
  console.log('Parent says:', event.data);
  
  // Send response back
  event.source.postMessage({
    type: 'response',
    message: 'Hello from iframe!'
  }, event.origin);
});
</script>

<!-- ✅ Loading attribute -->
<iframe 
  src="https://example.com"
  loading="lazy"
  title="Lazy loaded iframe"
></iframe>

<!-- ✅ CSP and X-Frame-Options -->
<!-- Prevent your site from being iframed -->
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'none'">

<!-- Or allow specific domains -->
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://trusted.com">`;

const Iframes = () => {
  return (
    <TopicLayout
      title="Iframes & Embedding"
      route="/html/iframes"
      category="html"
      explanation="Iframes embed external content in your page. Use sandbox attribute for security, postMessage for communication, loading='lazy' for performance. Always validate origins and use CSP headers to prevent clickjacking attacks."
      code={iframesCode}
      codeFilename="iframes.html"
      whyItMatters="Iframes are used for embedding maps, videos, ads, and third-party widgets. Interviewers test security knowledge (sandbox, CSP), communication (postMessage), and performance (lazy loading). Critical for integrating external content safely."
      mistakes={[
        "No sandbox attribute - allows malicious scripts to run unrestricted.",
        "Not validating message origins - vulnerable to XSS attacks via postMessage.",
        "Missing title attribute - breaks screen reader accessibility.",
        "Not making iframes responsive - breaks on mobile devices.",
      ]}
      practiceTask="Build a secure iframe wrapper component that validates origins, implements postMessage communication, handles loading states, and makes embedded content responsive with proper aspect ratios."
    >
      <MultiExampleEditor
        title="🎯 Try It: Iframes"
        examples={[
          {
            title: "Basic Iframe",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-bottom: 15px; }
  iframe { width: 100%; height: 400px; border: 2px solid #e5e7eb; border-radius: 8px; }
  .info { background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>📄 Embedded HTML Content</h2>
      <iframe 
        srcdoc="<html><body style='font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center;'><h1>Hello from Iframe!</h1><p>This content is embedded using the srcdoc attribute.</p><button style='padding: 10px 20px; background: white; color: #667eea; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;'>Click Me</button></body></html>"
        title="Embedded Content"
      ></iframe>
      <div class="info">
        <strong>✅ Best Practices:</strong><br>
        • Always include title attribute<br>
        • Specify width and height<br>
        • Provide fallback content
      </div>
    </div>

    <div class="card">
      <h2>🗺️ Embedded Map</h2>
      <iframe 
        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
        title="OpenStreetMap"
      ></iframe>
      <div class="info">
        <strong>💡 Common Use Cases:</strong><br>
        • Embedding maps (Google Maps, OpenStreetMap)<br>
        • Video players (YouTube, Vimeo)<br>
        • Social media feeds<br>
        • Third-party widgets
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Secure Sandbox",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #1f2937; color: white; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: #374151; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
  h2 { margin-bottom: 15px; }
  iframe { width: 100%; height: 300px; border: 2px solid #4b5563; border-radius: 8px; background: white; }
  .warning { background: #7f1d1d; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ef4444; }
  .success { background: #065f46; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #10b981; }
  button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>❌ Unsafe Iframe (No Sandbox)</h2>
      <iframe 
        id="unsafeFrame"
        srcdoc="<html><body style='padding: 20px; font-family: system-ui;'><h2>Unsafe Content</h2><p>This iframe can run any script!</p><button onclick='alert(\"I can access parent!\")'>Click Me</button><script>console.log('Unrestricted script running');</script></body></html>"
        title="Unsafe iframe"
      ></iframe>
      <div class="warning">
        <strong>⚠️ Security Risk:</strong><br>
        • Can run malicious scripts<br>
        • Can access parent window<br>
        • Can navigate top frame<br>
        • Can submit forms
      </div>
    </div>

    <div class="card">
      <h2>✅ Safe Iframe (With Sandbox)</h2>
      <iframe 
        sandbox="allow-scripts"
        srcdoc="<html><body style='padding: 20px; font-family: system-ui;'><h2>Sandboxed Content</h2><p>This iframe is restricted by sandbox!</p><button onclick='alert(\"I am sandboxed!\")'>Click Me</button><script>console.log('Sandboxed script');</script></body></html>"
        title="Sandboxed iframe"
      ></iframe>
      <div class="success">
        <strong>✅ Security Features:</strong><br>
        • Scripts run in isolated context<br>
        • Cannot access parent window<br>
        • Cannot navigate top frame<br>
        • Cannot submit forms (unless allowed)
      </div>
    </div>

    <div class="card">
      <h2>🔒 Sandbox Permissions</h2>
      <div style="background: #4b5563; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 14px;">
        sandbox=""  // Most restrictive<br>
        sandbox="allow-scripts"  // Allow JS<br>
        sandbox="allow-same-origin"  // Allow same origin<br>
        sandbox="allow-forms"  // Allow form submission<br>
        sandbox="allow-popups"  // Allow popups<br>
        sandbox="allow-scripts allow-same-origin"  // Multiple
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "PostMessage Communication",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  h2 { color: #1f2937; margin-bottom: 15px; }
  iframe { width: 100%; height: 200px; border: 2px solid #e5e7eb; border-radius: 8px; }
  .controls { margin-top: 20px; }
  button { padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .messages { background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 15px; max-height: 200px; overflow-y: auto; }
  .message { padding: 10px; background: #dbeafe; border-radius: 6px; margin: 5px 0; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>💬 Parent-Iframe Communication</h2>
      <iframe 
        id="childFrame"
        sandbox="allow-scripts"
        srcdoc="<html><body style='padding: 20px; font-family: system-ui; background: #f0fdf4;'><h3>Child Iframe</h3><button onclick='sendToParent()' style='padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;'>Send to Parent</button><div id='childMessages' style='margin-top: 15px; padding: 15px; background: white; border-radius: 6px;'></div><script>function sendToParent() { window.parent.postMessage({ from: \"child\", message: \"Hello from iframe!\", timestamp: new Date().toLocaleTimeString() }, \"*\"); } window.addEventListener(\"message\", (e) => { document.getElementById(\"childMessages\").innerHTML += \"<div style='padding: 8px; background: #dbeafe; border-radius: 4px; margin: 5px 0;'>Parent: \" + e.data.message + \"</div>\"; });</script></body></html>"
        title="Child frame"
      ></iframe>

      <div class="controls">
        <button onclick="sendToChild()">📤 Send to Iframe</button>
        <button onclick="clearMessages()">🗑️ Clear Messages</button>
      </div>

      <div class="messages" id="messages">
        <strong>📨 Messages:</strong>
      </div>
    </div>
  </div>

  <script>
    const iframe = document.getElementById('childFrame');
    const messagesDiv = document.getElementById('messages');

    function sendToChild() {
      iframe.contentWindow.postMessage({
        from: 'parent',
        message: 'Hello from parent!',
        timestamp: new Date().toLocaleTimeString()
      }, '*');
      
      addMessage('Sent to iframe: Hello from parent!');
    }

    window.addEventListener('message', (event) => {
      if (event.data.from === 'child') {
        addMessage('Received from iframe: ' + event.data.message);
      }
    });

    function addMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'message';
      msg.textContent = text;
      messagesDiv.appendChild(msg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function clearMessages() {
      messagesDiv.innerHTML = '<strong>📨 Messages:</strong>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Responsive Iframe",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: system-ui; padding: 20px; background: #f3f4f6; margin: 0; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-bottom: 15px; }
  
  /* 16:9 Aspect Ratio */
  .iframe-16-9 { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; }
  .iframe-16-9 iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
  
  /* 4:3 Aspect Ratio */
  .iframe-4-3 { position: relative; padding-bottom: 75%; height: 0; overflow: hidden; border-radius: 8px; }
  .iframe-4-3 iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
  
  /* 1:1 Square */
  .iframe-1-1 { position: relative; padding-bottom: 100%; height: 0; overflow: hidden; border-radius: 8px; }
  .iframe-1-1 iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
  
  .info { background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #3b82f6; font-size: 14px; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>📺 16:9 Aspect Ratio (Video)</h2>
      <div class="iframe-16-9">
        <iframe 
          srcdoc="<html><body style='margin: 0; padding: 40px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; text-align: center;'><div><h1>16:9 Ratio</h1><p>Perfect for videos</p></div></body></html>"
          title="16:9 content"
        ></iframe>
      </div>
      <div class="info">
        <strong>💡 Usage:</strong> YouTube, Vimeo, video embeds<br>
        <code>padding-bottom: 56.25%</code> (9/16 * 100)
      </div>
    </div>

    <div class="card">
      <h2>📱 4:3 Aspect Ratio</h2>
      <div class="iframe-4-3">
        <iframe 
          srcdoc="<html><body style='margin: 0; padding: 40px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; text-align: center;'><div><h1>4:3 Ratio</h1><p>Classic format</p></div></body></html>"
          title="4:3 content"
        ></iframe>
      </div>
      <div class="info">
        <strong>💡 Usage:</strong> Classic presentations, older content<br>
        <code>padding-bottom: 75%</code> (3/4 * 100)
      </div>
    </div>

    <div class="card">
      <h2>⬜ 1:1 Square</h2>
      <div class="iframe-1-1">
        <iframe 
          srcdoc="<html><body style='margin: 0; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; text-align: center;'><div><h1>1:1 Ratio</h1><p>Square format</p></div></body></html>"
          title="1:1 content"
        ></iframe>
      </div>
      <div class="info">
        <strong>💡 Usage:</strong> Instagram posts, profile pictures<br>
        <code>padding-bottom: 100%</code> (1/1 * 100)
      </div>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Iframes;
