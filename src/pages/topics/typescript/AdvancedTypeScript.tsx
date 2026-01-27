import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const advancedTSCode = `// Advanced TypeScript: Generics, Mapped Types, Conditional Types

// ✅ Generic Constraints
interface HasId {
  id: string;
}

function findById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// ✅ Multiple Type Parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const result = merge({ name: 'John' }, { age: 30 });
// Type: { name: string } & { age: number }

// ✅ Mapped Types - Transform Existing Types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Industry Pattern: Deep Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface User {
  id: string;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

const update: DeepPartial<User> = {
  profile: {
    address: {
      city: 'New York' // Only city, rest optional
    }
  }
};

// ✅ Conditional Types
type IsArray<T> = T extends any[] ? true : false;
type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<string>; // false

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: '1', name: 'John' };
}

type UserType = ReturnType<typeof getUser>;
// Type: { id: string; name: string }

// ✅ Template Literal Types (TS 4.1+)
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = \`on\${Capitalize<EventName>}\`;
// Result: 'onClick' | 'onFocus' | 'onBlur'

// ✅ Recursive Types - Tree Structures
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2 },
    { value: 3, children: [{ value: 4 }] }
  ]
};

// ✅ Discriminated Unions with Exhaustive Checks
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.size ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    default:
      // Exhaustive check - TypeScript error if new shape added
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// ✅ Branded Types - Nominal Typing
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function getUserById(id: UserId) { /* ... */ }
function getProductById(id: ProductId) { /* ... */ }

const userId = '123' as UserId;
const productId = '456' as ProductId;

getUserById(userId); // ✅ OK
getUserById(productId); // ❌ Error: Type mismatch

// ✅ Builder Pattern with TypeScript
class QueryBuilder<T> {
  private filters: Array<(item: T) => boolean> = [];
  
  where(predicate: (item: T) => boolean): this {
    this.filters.push(predicate);
    return this;
  }
  
  execute(data: T[]): T[] {
    return data.filter(item => 
      this.filters.every(filter => filter(item))
    );
  }
}

const results = new QueryBuilder<User>()
  .where(u => u.age > 18)
  .where(u => u.email.includes('@'))
  .execute(users);`;

const AdvancedTypeScript = () => {
  return (
    <TopicLayout
      title="Advanced TypeScript"
      route="/typescript/advanced/generics-mapped-types"
      category="typescript"
      explanation="Advanced TypeScript features: generic constraints, mapped types for transformations, conditional types for logic, template literals, recursive types, and branded types for nominal typing. These patterns enable type-safe, flexible APIs."
      code={advancedTSCode}
      codeFilename="AdvancedTypeScript.ts"
      whyItMatters="Senior roles require advanced TypeScript. Interviewers test: generic constraints, mapped types, conditional types, and discriminated unions. These patterns are used in libraries like React Query, Zod, and tRPC. Shows deep type system understanding."
      mistakes={[
        "Overusing 'any' in generics: Use constraints (T extends X) for type safety",
        "Not using infer: Conditional types need 'infer' to extract types",
        "Missing exhaustive checks: Use 'never' to catch unhandled union cases",
        "Ignoring template literals: They're powerful for string manipulation types"
      ]}
      practiceTask="Build a type-safe form builder: Create a generic Form<T> class that infers field types from schema, validates at compile time, and provides autocomplete for field names. Include nested objects and array fields."
    >
      <MultiExampleEditor
        title="🎯 Try It: Advanced TypeScript"
        examples={[
          {
            title: "Mapped Types",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: 'Monaco', monospace; background: #1e1e1e; color: #d4d4d4; }
  .container { max-width: 800px; margin: 0 auto; }
  .code-block { background: #252526; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #007acc; }
  .keyword { color: #569cd6; }
  .type { color: #4ec9b0; }
  .string { color: #ce9178; }
  h2 { color: #4ec9b0; }
  .example { background: #2d2d30; padding: 15px; border-radius: 6px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="container">
    <h2>🔧 Mapped Types</h2>
    
    <div class="code-block">
      <span class="keyword">type</span> <span class="type">Readonly</span>&lt;T&gt; = {<br>
      &nbsp;&nbsp;<span class="keyword">readonly</span> [K <span class="keyword">in keyof</span> T]: T[K];<br>
      };
    </div>
    
    <div class="example">
      <strong>Before:</strong><br>
      <span class="keyword">interface</span> <span class="type">User</span> {<br>
      &nbsp;&nbsp;id: <span class="type">string</span>;<br>
      &nbsp;&nbsp;name: <span class="type">string</span>;<br>
      }
    </div>
    
    <div class="example">
      <strong>After:</strong><br>
      <span class="keyword">type</span> <span class="type">ReadonlyUser</span> = <span class="type">Readonly</span>&lt;<span class="type">User</span>&gt;;<br>
      <span class="comment">// All properties become readonly!</span>
    </div>
    
    <p style="color: #608b4e;">✅ Mapped types transform existing types without duplication</p>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default AdvancedTypeScript;
