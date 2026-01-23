import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const componentsCode = `// React Components: Building blocks of React applications

// ✅ Function Component (modern approach)
const Welcome: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// ✅ Component with props and TypeScript
interface UserProps {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: () => void;
  showEmail?: boolean;
}

const UserCard: React.FC<UserProps> = ({ 
  user, 
  onEdit, 
  showEmail = false 
}) => {
  return (
    <div className="user-card">
      {user.avatar && (
        <img src={user.avatar} alt={user.name} className="avatar" />
      )}
      <h3>{user.name}</h3>
      {showEmail && <p>{user.email}</p>}
      {onEdit && (
        <button onClick={onEdit} className="edit-btn">
          Edit
        </button>
      )}
    </div>
  );
};

// ✅ Component with children
const Card: React.FC<{ 
  title: string; 
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => {
  return (
    <div className={\`card \${className}\`}>
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

// Usage
const App = () => (
  <Card title="User Information">
    <UserCard 
      user={{ id: 1, name: 'Alice', email: 'alice@example.com' }}
      showEmail={true}
    />
  </Card>
);

// ✅ Component with state
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="counter-buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

// ✅ Controlled component (form input)
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      
      <button type="submit">Send Message</button>
    </form>
  );
};

// ✅ Component with conditional rendering
const UserStatus: React.FC<{ user: User | null; loading: boolean }> = ({ 
  user, 
  loading 
}) => {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!user) {
    return <div className="error">User not found</div>;
  }
  
  return (
    <div className="user-status">
      <h2>Welcome back, {user.name}!</h2>
      <p>Last login: {user.lastLogin}</p>
    </div>
  );
};

// ✅ List rendering with keys
const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  if (todos.length === 0) {
    return <p>No todos yet. Add one above!</p>;
  }
  
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
          <span>{todo.text}</span>
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

// ✅ Component composition
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const Header: React.FC = () => (
  <header className="header">
    <h1>My App</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
);

const Footer: React.FC = () => (
  <footer className="footer">
    <p>&copy; 2024 My App. All rights reserved.</p>
  </footer>
);

// ✅ Event handling
const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', disabled = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!disabled) {
      onClick();
    }
  };
  
  return (
    <button
      className={\`btn btn-\${variant} \${disabled ? 'disabled' : ''}\`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ✅ Default props pattern
const Avatar: React.FC<{
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}> = ({ src, alt, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };
  
  return (
    <img
      src={src || '/default-avatar.png'}
      alt={alt}
      className={\`rounded-full \${sizeClasses[size]}\`}
    />
  );
};`;

const Components = () => {
  return (
    <TopicLayout
      title="Components Basics"
      route="/react/components"
      category="react"
      explanation="React components are reusable pieces of UI that accept props and return JSX. Function components are the modern standard. Components can have state, handle events, render conditionally, and compose together to build complex UIs."
      code={componentsCode}
      codeFilename="components.tsx"
      whyItMatters="Components are the foundation of React. Interviewers test understanding of props, state, event handling, conditional rendering, and component composition. Essential for building any React application."
      mistakes={[
        "Not using keys in list rendering - causes React reconciliation issues.",
        "Mutating props - props should be treated as read-only.",
        "Creating components inside other components - causes unnecessary re-renders.",
        "Not handling edge cases like empty states or loading states.",
      ]}
      practiceTask="Build a reusable Modal component that accepts title, children, and onClose props. Include proper event handling, conditional rendering, and accessibility features."
    >
      <MultiExampleEditor
        title="🎯 Try It: React Components"
        examples={[
          {
            title: "Component Composition",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; margin: 20px 0; }
  .user-card { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 8px; margin: 10px 0; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
</style>
</head>
<body>
  <div class="card">
    <h2>🧩 Component Composition</h2>
    <div id="root"></div>
  </div>
  
  <script>
    // Simulating React components
    function UserCard({ name, email, role }) {
      return \`
        <div class="user-card">
          <h3>👤 \${name}</h3>
          <p>📧 \${email}</p>
          <p>🎯 Role: \${role}</p>
        </div>
      \`;
    }
    
    function UserList({ users }) {
      return users.map(user => UserCard(user)).join('');
    }
    
    const users = [
      { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
      { name: 'Bob', email: 'bob@example.com', role: 'User' },
      { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' }
    ];
    
    document.getElementById('root').innerHTML = UserList({ users });
  </script>
</body>
</html>`
          },
          {
            title: "State & Events",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 500px; margin: 0 auto; text-align: center; }
  .counter { background: #1e293b; padding: 40px; border-radius: 12px; margin: 20px 0; }
  .count { font-size: 72px; font-weight: bold; color: #3b82f6; margin: 20px 0; }
  button { background: #3b82f6; color: white; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; margin: 5px; font-size: 16px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .reset { background: #ef4444; }
  .reset:hover { background: #dc2626; }
</style>
</head>
<body>
  <div class="container">
    <h2>🔢 Counter Component</h2>
    <div class="counter">
      <div class="count" id="count">0</div>
      <button onclick="increment()">+ Increment</button>
      <button onclick="decrement()">- Decrement</button>
      <button class="reset" onclick="reset()">Reset</button>
    </div>
  </div>
  
  <script>
    // Component state
    let count = 0;
    
    function increment() {
      count++;
      render();
    }
    
    function decrement() {
      count--;
      render();
    }
    
    function reset() {
      count = 0;
      render();
    }
    
    function render() {
      document.getElementById('count').textContent = count;
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

export default Components;