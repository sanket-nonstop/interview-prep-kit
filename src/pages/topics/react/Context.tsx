import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const contextCode = `// Context API: Share state without prop drilling
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Theme context with TypeScript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// ✅ User authentication context
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const userData = await response.json();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ✅ Using contexts in components
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  return (
    <header className={\`header \${theme}\`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      {user ? (
        <div>
          Welcome, {user.name}!
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginForm />
      )}
    </header>
  );
};`;

const Context = () => {
  return (
    <TopicLayout
      title="Context API"
      route="/react/context"
      category="react"
      explanation="Context API provides a way to share data between components without prop drilling. Create context with createContext(), provide values with Provider, and consume with useContext(). Best for global state like themes, auth, or settings that many components need."
      code={contextCode}
      codeFilename="context.tsx"
      whyItMatters="Context API is React's built-in state management solution. Interviewers test if you understand when to use Context vs props, how to avoid performance issues, and can build reusable context patterns. Essential for avoiding prop drilling in large apps."
      mistakes={[
        "Overusing Context - not every state needs to be global. Use props for component-specific data.",
        "Not providing default values - always handle undefined context gracefully with custom hooks.",
        "Creating too many contexts - group related state together to avoid provider hell.",
        "Putting everything in one context - causes unnecessary re-renders when any value changes.",
      ]}
      practiceTask="Build a ShoppingCart context that manages items, quantities, and total price. Include addItem, removeItem, updateQuantity, and clearCart methods. Create a custom hook and handle edge cases like duplicate items."
    >
      <MultiExampleEditor
        title="🎯 Try It: Context API"
        examples={[
          {
            title: "Theme Context",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; transition: all 0.3s; }
  body.light { background: #f3f4f6; color: #1f2937; }
  body.dark { background: #1f2937; color: #f3f4f6; }
  .card { padding: 30px; border-radius: 12px; margin: 20px 0; transition: all 0.3s; }
  .light .card { background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .dark .card { background: #374151; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
  button { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 16px; }
  .light button { background: #3b82f6; color: white; }
  .dark button { background: #10b981; color: white; }
  button:hover { transform: scale(1.05); }
</style>
</head>
<body class="light">
  <div class="card">
    <h2>🎨 Theme Context Demo</h2>
    <p>Context provides theme to all components</p>
    <button onclick="toggleTheme()">🌙 Toggle Theme</button>
    <div class="card">
      <h3>Nested Component</h3>
      <p>I also get the theme from context!</p>
    </div>
  </div>
  
  <script>
    // Simulating Context
    let theme = 'light';
    
    function toggleTheme() {
      theme = theme === 'light' ? 'dark' : 'light';
      document.body.className = theme;
      console.log('🎯 Theme changed to:', theme);
    }
  </script>
</body>
</html>`
          },
          {
            title: "User Auth Context",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; margin: 20px 0; }
  input { width: 100%; padding: 12px; border: none; border-radius: 6px; margin: 10px 0; font-size: 16px; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .logout { background: #ef4444; color: white; }
  .user-info { background: #10b981; padding: 15px; border-radius: 8px; margin: 15px 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>🔐 Auth Context Demo</h2>
    <div id="loginForm">
      <input id="email" type="email" placeholder="Email" value="user@example.com" />
      <button onclick="login()">Login</button>
    </div>
    <div id="userArea" style="display:none;">
      <div class="user-info">
        <strong>👤 <span id="userName"></span></strong><br>
        📧 <span id="userEmail"></span>
      </div>
      <button class="logout" onclick="logout()">Logout</button>
    </div>
  </div>
  
  <script>
    // Simulating Auth Context
    let user = null;
    
    function login() {
      const email = document.getElementById('email').value;
      user = {
        name: email.split('@')[0],
        email: email
      };
      updateUI();
    }
    
    function logout() {
      user = null;
      updateUI();
    }
    
    function updateUI() {
      if (user) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('userArea').style.display = 'block';
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
      } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('userArea').style.display = 'none';
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

export default Context;