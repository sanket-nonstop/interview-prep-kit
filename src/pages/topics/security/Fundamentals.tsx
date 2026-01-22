import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Security;