import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const typescriptCode = `// TypeScript Fundamentals: Type safety for JavaScript

// ✅ Basic types and interfaces
interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

type UserRole = 'admin' | 'user' | 'moderator'; // Union types

// ✅ Generic types for reusability
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  return fetch(url).then(res => res.json());
}

// Usage with type inference
const users = await fetchData<User[]>('/api/users');
const user = await fetchData<User>('/api/users/1');

// ✅ React component typing
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  disabled = false, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ✅ Discriminated unions for type safety
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: User[] };
type ErrorState = { status: 'error'; error: string };
type AsyncState = LoadingState | SuccessState | ErrorState;

const UserList: React.FC<{ state: AsyncState }> = ({ state }) => {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return (
        <div>
          {state.data.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      );
    case 'error':
      return <div>Error: {state.error}</div>;
  }
};

// ✅ Utility types
type UserUpdate = Partial<User>; // All properties optional
type UserSummary = Pick<User, 'id' | 'name'>; // Only id and name

// ✅ Type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}`;

const TypeScript = () => {
  return (
    <TopicLayout
      title="TypeScript Fundamentals"
      route="/typescript/fundamentals"
      category="javascript"
      explanation="TypeScript adds static type checking to JavaScript, catching errors at compile time. Use interfaces for object shapes, generics for reusability, utility types for transformations, and discriminated unions for type-safe state management."
      code={typescriptCode}
      codeFilename="typescript.ts"
      whyItMatters="TypeScript is standard in modern frontend development. Interviewers test understanding of type systems, generic programming, and how TypeScript improves code quality and developer experience. Essential for large-scale applications."
      mistakes={[
        "Using 'any' everywhere - defeats the purpose of TypeScript's type safety.",
        "Not leveraging utility types - writing verbose type definitions manually.",
        "Ignoring strict mode - missing many type safety benefits.",
        "Over-engineering types - making simple things unnecessarily complex.",
      ]}
      practiceTask="Build a type-safe API client with generic CRUD operations, proper error handling types, and React components with full TypeScript integration."
    >
      <MultiExampleEditor
        title="🎯 Try It: TypeScript"
        examples={[
          {
            title: "Type Safety Demo",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .code { background: #334155; padding: 15px; border-radius: 8px; margin: 15px 0; font-family: 'Courier New'; font-size: 14px; }
  .error { background: #7f1d1d; border: 2px solid #ef4444; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .success { background: #14532d; border: 2px solid #10b981; padding: 15px; border-radius: 8px; margin: 15px 0; }
  .type { color: #3b82f6; }
</style>
</head>
<body>
  <div class="card">
    <h2>🛡️ TypeScript Type Safety</h2>
    <div class="code">
      <span class="type">interface</span> User {<br>
      &nbsp;&nbsp;id: <span class="type">string</span>;<br>
      &nbsp;&nbsp;name: <span class="type">string</span>;<br>
      &nbsp;&nbsp;email: <span class="type">string</span>;<br>
      }
    </div>
    <div class="error">
      <strong>❌ Without TypeScript:</strong><br>
      user.naem // Typo! Runtime error
    </div>
    <div class="success">
      <strong>✅ With TypeScript:</strong><br>
      user.name // Caught at compile time!
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Generic Types",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .code { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: 'Courier New'; font-size: 14px; }
  .highlight { color: #fbbf24; }
  .example { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>🎯 Generic Types</h2>
    <div class="code">
      function fetchData<span class="highlight">&lt;T&gt;</span>(url: string): Promise<span class="highlight">&lt;T&gt;</span> {<br>
      &nbsp;&nbsp;return fetch(url).then(r => r.json());<br>
      }
    </div>
    <div class="example">
      <strong>Usage:</strong><br>
      const users = await fetchData<span class="highlight">&lt;User[]&gt;</span>('/api/users');<br>
      const post = await fetchData<span class="highlight">&lt;Post&gt;</span>('/api/posts/1');
    </div>
    <p style="font-size: 14px; opacity: 0.8;">✅ Generics provide type safety while keeping code reusable</p>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default TypeScript;