import { TopicLayout } from '@/components/TopicLayout';

const flattenArrayCode = `// Flatten Array: Convert nested arrays into single-level array

// ✅ Modern approach using Array.flat()
const nestedArray = [1, [2, 3], [4, [5, 6]], 7];
const flattened = nestedArray.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7]

// ✅ Recursive implementation from scratch
function flattenArray<T>(arr: (T | T[])[]): T[] {
  const result: T[] = [];
  
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

// ✅ Iterative approach (avoids recursion stack limits)
function flattenIterative<T>(arr: (T | T[])[]): T[] {
  const result: T[] = [];
  const stack = [...arr];
  
  while (stack.length > 0) {
    const next = stack.pop();
    
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next!);
    }
  }
  
  return result.reverse(); // Reverse to maintain original order
}

// ✅ Flatten with depth control
function flattenWithDepth<T>(arr: (T | T[])[], depth: number): (T | T[])[] {
  if (depth === 0) return arr;
  
  return arr.reduce<(T | T[])[]>((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flattenWithDepth(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

// ✅ Real-world use case: Flatten menu structure
interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
}

function flattenMenu(menu: MenuItem[]): MenuItem[] {
  return menu.reduce<MenuItem[]>((acc, item) => {
    acc.push({ id: item.id, label: item.label });
    
    if (item.children) {
      acc.push(...flattenMenu(item.children));
    }
    
    return acc;
  }, []);
}

// ✅ Flatten object paths
function flattenObjectPaths(obj: Record<string, any>, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObjectPaths(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    
    return acc;
  }, {} as Record<string, any>);
}`;

const FlattenArray = () => {
  return (
    <TopicLayout
      title="Flatten Array Pattern"
      route="/javascript/patterns/flatten-array"
      category="javascript"
      explanation="Array flattening converts nested arrays into a single-level array. Essential for data processing, tree structure manipulation, and working with deeply nested API responses or menu systems."
      code={flattenArrayCode}
      codeFilename="flatten-array.ts"
      whyItMatters="Common in data transformation and tree traversal problems. Interviewers ask: 'Flatten nested array without built-in methods', 'Handle infinite nesting', 'Flatten object properties'. Tests recursion understanding and edge case handling."
      mistakes={[
        "Not handling infinite depth: Fixed depth limits fail with deeply nested data.",
        "Stack overflow with recursion: Large arrays need iterative approach.",
        "Mutating original array: Should return new array, not modify input.",
        "Wrong order with iterative: Stack-based approach can reverse order without correction.",
      ]}
      practiceTask="Create a function that flattens a nested comment thread structure where each comment can have replies. Should preserve the hierarchical order and include depth information for each comment."
    />
  );
};

export default FlattenArray;