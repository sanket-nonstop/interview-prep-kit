import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default TypeScript;