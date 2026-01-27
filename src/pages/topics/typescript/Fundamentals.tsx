import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const typescriptCode = `// TypeScript Fundamentals: Type safety for JavaScript

// ✅ Basic Types
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ['a', 'b', 'c'];
let tuple: [string, number] = ['John', 30];

// ✅ Interfaces vs Types
interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // Optional
  readonly createdAt: Date; // Read-only
}

type UserRole = 'admin' | 'user' | 'moderator'; // Union
type ID = string | number; // Union types

// ✅ Function Types
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

const add = (a: number, b: number): number => a + b;

// Function with optional and default params
function createUser(
  name: string,
  age?: number,
  role: UserRole = 'user'
): User {
  return {
    id: Math.random().toString(),
    name,
    email: \`\${name}@example.com\`,
    age,
    createdAt: new Date()
  };
}

// ✅ Generics - Reusable Type-Safe Code
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

// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };
const userName = getProperty(user, 'name'); // Type: string

// ✅ Utility Types - Built-in Type Transformations
type UserUpdate = Partial<User>; // All properties optional
type UserRequired = Required<User>; // All properties required
type UserSummary = Pick<User, 'id' | 'name'>; // Only id and name
type UserWithoutEmail = Omit<User, 'email'>; // Exclude email
type UserReadonly = Readonly<User>; // All properties readonly

// ✅ Discriminated Unions - Type-Safe State
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; error: string };
type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data; // TypeScript knows data exists
    case 'error':
      return state.error; // TypeScript knows error exists
  }
}

// ✅ Type Guards - Runtime Type Checking
function isUser(obj: any): obj is User {
  return obj && 
    typeof obj.id === 'string' && 
    typeof obj.name === 'string' &&
    typeof obj.email === 'string';
}

function processData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name); // TypeScript knows it's User
  }
}

// ✅ React + TypeScript
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

// ✅ Advanced: Mapped Types
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// Result: { id: string | null; name: string | null; ... }

// ✅ Advanced: Conditional Types
type IsString<T> = T extends string ? true : false;
type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false`;

const TypeScript = () => {
  return (
    <TopicLayout
      title="TypeScript Fundamentals"
      route="/typescript/fundamentals"
      category="javascript"
      explanation="TypeScript adds static type checking to JavaScript. Master: basic types, interfaces, generics, utility types, discriminated unions, and type guards. These patterns catch bugs at compile time and improve code maintainability."
      code={typescriptCode}
      codeFilename="typescript.ts"
      whyItMatters="TypeScript is mandatory in modern frontend. 80%+ of React jobs require it. Interviewers test: generic constraints, utility types, discriminated unions, and React integration. Shows you write production-quality, maintainable code."
      mistakes={[
        "Using 'any' everywhere: Defeats type safety. Use 'unknown' and type guards instead",
        "Not using strict mode: Missing null checks and implicit any errors",
        "Ignoring utility types: Writing Partial<T>, Pick<T> manually is verbose",
        "Wrong interface vs type: Use interface for objects, type for unions/primitives",
        "Not leveraging type inference: Let TypeScript infer when obvious"
      ]}
      practiceTask="Build a type-safe Todo app: Create interfaces for Todo, use discriminated unions for filter states (all/active/completed), implement generic CRUD functions, add React components with full TypeScript props, and use utility types for updates."
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