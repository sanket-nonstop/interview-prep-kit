import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const securityCode = `// Web Security: Frontend security best practices

// ✅ XSS Prevention
const SafeUserContent: React.FC<{ content: string }> = ({ content }) => {
  // React automatically escapes content
  return <div>{content}</div>; // Safe by default
  
  // ❌ Dangerous - never use dangerouslySetInnerHTML with user content
  // return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

// Safe HTML sanitization when needed
import DOMPurify from 'dompurify';

const SanitizedContent: React.FC<{ html: string }> = ({ html }) => {
  const sanitizedHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

// ✅ CSRF Protection
const SecureForm: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    // Get CSRF token from meta tag or API
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    setCsrfToken(token || '');
  }, []);
  
  const handleSubmit = async (formData: FormData) => {
    await fetch('/api/secure-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  };
  
  return (
    <form action={handleSubmit}>
      <input type="hidden" name="_token" value={csrfToken} />
      <input type="text" name="data" required />
      <button type="submit">Submit</button>
    </form>
  );
};

// ✅ Content Security Policy (CSP)
// In HTML head or server headers:
// <meta http-equiv="Content-Security-Policy" 
//       content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">

// ✅ Secure authentication
const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  
  const login = async (credentials: LoginCredentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      
      // Store access token in memory (more secure)
      setToken(accessToken);
      
      // Store refresh token in httpOnly cookie (server-side)
      // Never store sensitive tokens in localStorage
    }
  };
  
  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setToken(null);
  };
  
  return { token, login, logout };
};

// ✅ Input validation and sanitization
const validateInput = (input: string, type: 'email' | 'text' | 'number') => {
  const patterns = {
    email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    text: /^[a-zA-Z0-9\\s-_.,!?]+$/,
    number: /^\\d+$/,
  };
  
  // Sanitize input
  const sanitized = input.trim().slice(0, 1000); // Limit length
  
  // Validate pattern
  if (!patterns[type].test(sanitized)) {
    throw new Error(\`Invalid \${type} format\`);
  }
  
  return sanitized;
};

// ✅ Secure API requests
const secureApiClient = {
  async request(url: string, options: RequestInit = {}) {
    const token = getAuthToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: \`Bearer \${token}\` }),
        ...options.headers,
      },
    };
    
    const response = await fetch(url, config);
    
    // Handle token expiration
    if (response.status === 401) {
      await refreshToken();
      // Retry request with new token
      return this.request(url, options);
    }
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    
    return response.json();
  }
};

// ✅ Secure data handling
const SecureDataComponent: React.FC = () => {
  const [sensitiveData, setSensitiveData] = useState<string>('');
  
  // Clear sensitive data on unmount
  useEffect(() => {
    return () => {
      setSensitiveData(''); // Clear from memory
    };
  }, []);
  
  const handleSensitiveInput = (value: string) => {
    // Validate and sanitize
    const cleaned = validateInput(value, 'text');
    setSensitiveData(cleaned);
  };
  
  return (
    <div>
      <input
        type="password"
        autoComplete="current-password"
        onChange={(e) => handleSensitiveInput(e.target.value)}
      />
    </div>
  );
};

// ✅ Secure file uploads
const SecureFileUpload: React.FC = () => {
  const handleFileUpload = async (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File too large');
    }
    
    // Create secure form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', Date.now().toString());
    
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': getCsrfToken(),
      },
    });
  };
  
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
      }}
    />
  );
};`;

const Security = () => {
  return (
    <TopicLayout
      title="Web Security"
      route="/security/fundamentals"
      category="javascript"
      explanation="Frontend security protects against XSS, CSRF, and other attacks. Use React's built-in XSS protection, implement CSRF tokens, validate all inputs, use Content Security Policy, and handle authentication tokens securely."
      code={securityCode}
      codeFilename="security.tsx"
      whyItMatters="Security vulnerabilities can compromise user data and business reputation. Interviewers test understanding of common attacks, prevention techniques, and secure coding practices. Essential for building trustworthy applications."
      mistakes={[
        "Using dangerouslySetInnerHTML with user content - opens XSS vulnerabilities.",
        "Storing sensitive tokens in localStorage - accessible to XSS attacks.",
        "Not validating user inputs - allows injection attacks.",
        "Missing CSRF protection - enables cross-site request forgery.",
      ]}
      practiceTask="Secure a React app by implementing XSS prevention, CSRF protection, input validation, secure authentication flow, and Content Security Policy headers."
    >
      <MultiExampleEditor
        title="🎯 Try It: Security"
        examples={[
          {
            title: "XSS Prevention",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; margin: 10px 0; font-size: 16px; background: #334155; color: white; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  .safe { background: #14532d; border: 2px solid #10b981; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .unsafe { background: #7f1d1d; border: 2px solid #ef4444; padding: 15px; border-radius: 8px; margin: 15px 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>🔒 XSS Prevention</h2>
    <input id="userInput" placeholder="Try entering <script>alert('XSS')</script>" />
    <button onclick="renderSafe()">Render Safe (Escaped)</button>
    <button onclick="renderUnsafe()">Render Unsafe (Dangerous)</button>
    <div class="safe" id="safe"></div>
    <div class="unsafe" id="unsafe"></div>
  </div>
  
  <script>
    function renderSafe() {
      const input = document.getElementById('userInput').value;
      // Safe: textContent escapes HTML
      document.getElementById('safe').textContent = '✅ Safe: ' + input;
    }
    
    function renderUnsafe() {
      const input = document.getElementById('userInput').value;
      // Unsafe: innerHTML can execute scripts
      document.getElementById('unsafe').innerHTML = '⚠️ Unsafe: ' + input;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Input Validation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid transparent; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  input.error { border-color: #ef4444; }
  .error-msg { color: #fca5a5; font-size: 14px; margin: -5px 0 10px 0; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; margin-top: 10px; }
  .success { background: rgba(16, 185, 129, 0.2); padding: 15px; border-radius: 8px; margin-top: 15px; border: 2px solid #10b981; }
</style>
</head>
<body>
  <div class="card">
    <h2>✅ Input Validation</h2>
    <form onsubmit="handleSubmit(event)">
      <input id="email" type="text" placeholder="Email" />
      <div class="error-msg" id="emailError"></div>
      
      <input id="password" type="password" placeholder="Password" />
      <div class="error-msg" id="passwordError"></div>
      
      <button type="submit">Submit</button>
    </form>
    <div id="output"></div>
  </div>
  
  <script>
    function validateEmail(email) {
      const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!email) return 'Email is required';
      if (!pattern.test(email)) return 'Invalid email format';
      if (email.length > 100) return 'Email too long';
      return null;
    }
    
    function validatePassword(password) {
      if (!password) return 'Password is required';
      if (password.length < 8) return 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(password)) return 'Must contain uppercase letter';
      if (!/[0-9]/.test(password)) return 'Must contain number';
      return null;
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      
      document.getElementById('emailError').textContent = emailError || '';
      document.getElementById('passwordError').textContent = passwordError || '';
      
      document.getElementById('email').className = emailError ? 'error' : '';
      document.getElementById('password').className = passwordError ? 'error' : '';
      
      if (!emailError && !passwordError) {
        document.getElementById('output').innerHTML = 
          '<div class="success">✅ Validation passed! Data is safe to submit.</div>';
      }
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Security;