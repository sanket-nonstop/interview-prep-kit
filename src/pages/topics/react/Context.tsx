import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Context;