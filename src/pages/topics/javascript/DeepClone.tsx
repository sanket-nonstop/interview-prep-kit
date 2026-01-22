import { TopicLayout } from '@/components/TopicLayout';

const deepCloneCode = `// Deep Clone: Create independent copies of nested objects

// ✅ Production deep clone with circular reference handling
function deepClone<T>(obj: T, seen = new WeakMap()): T {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') return obj;
  
  // Handle circular references
  if (seen.has(obj as object)) return seen.get(obj as object);
  
  // Handle Date
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  
  // Handle Array
  if (Array.isArray(obj)) {
    const cloned: any[] = [];
    seen.set(obj as object, cloned);
    obj.forEach((item, index) => {
      cloned[index] = deepClone(item, seen);
    });
    return cloned as T;
  }
  
  // Handle Object
  const cloned = {} as T;
  seen.set(obj as object, cloned);
  
  Object.keys(obj).forEach(key => {
    (cloned as any)[key] = deepClone((obj as any)[key], seen);
  });
  
  return cloned;
}

// ✅ Modern approach using structuredClone (Node 17+, modern browsers)
function modernDeepClone<T>(obj: T): T {
  try {
    return structuredClone(obj);
  } catch {
    // Fallback for unsupported environments
    return deepClone(obj);
  }
}

// ✅ JSON method (limited but fast for simple objects)
function jsonDeepClone<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    throw new Error('Object contains non-serializable values');
  }
}

// ✅ React state immutable updates
function updateNestedState(state: UserState, userId: string, updates: Partial<User>) {
  return {
    ...state,
    users: state.users.map(user => 
      user.id === userId 
        ? { ...user, ...updates }
        : user
    )
  };
}

// ✅ Deep merge utility
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = deepClone(target);
  
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });
  
  return result;
}`;

const DeepClone = () => {
  return (
    <TopicLayout
      title="Deep Clone Pattern"
      route="/javascript/patterns/deep-clone"
      category="javascript"
      explanation="Deep cloning creates completely independent copies of nested objects, preventing unintended mutations. Critical for immutable state management, avoiding reference sharing bugs, and implementing undo/redo functionality."
      code={deepCloneCode}
      codeFilename="deep-clone.ts"
      whyItMatters="Essential for React state management and preventing mutation bugs. Interviewers test: 'Implement deep clone from scratch', 'Handle circular references', 'What are the limitations of JSON.parse/stringify?' Shows understanding of object references and immutability."
      mistakes={[
        "Using JSON.parse/stringify: Loses functions, dates, undefined, and circular refs.",
        "Shallow copy with spread: {...obj} only copies first level, nested objects still shared.",
        "Not handling circular references: Causes infinite recursion and stack overflow.",
        "Missing special object types: Dates, RegExp, Maps, Sets need special handling.",
      ]}
      practiceTask="Create a deep clone function that handles circular references, Date objects, and Arrays. Test it with a complex nested object that references itself. Compare performance with JSON method."
    />
  );
};

export default DeepClone;