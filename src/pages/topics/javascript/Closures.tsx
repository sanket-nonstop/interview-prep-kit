import { TopicLayout } from '@/components/TopicLayout';

const closuresCode = `// Closure: A function that "remembers" its lexical scope
// even when executed outside that scope

// ✅ Real-world: Creating private state in modules
function createCounter() {
  let count = 0; // Private variable - not accessible outside
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2
// console.log(count); // ❌ ReferenceError - count is private

// ✅ React pattern: Stale closure fix with useCallback
const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  
  // This callback "closes over" the query variable
  const handleSearch = useCallback(() => {
    // query is captured in this closure
    console.log(\`Searching for: \${query}\`);
    fetchResults(query);
  }, [query]); // Re-create when query changes
  
  return <input onChange={(e) => setQuery(e.target.value)} />;
};

// ✅ Event handlers with data binding
function createButtonHandlers(buttons: string[]) {
  return buttons.map((label) => ({
    label,
    // Each handler closes over its own 'label'
    onClick: () => console.log(\`Clicked: \${label}\`),
  }));
}`;

const Closures = () => {
  return (
    <TopicLayout
      title="Closures"
      route="/javascript/closures"
      category="javascript"
      explanation="A closure is when a function retains access to variables from its outer scope, even after that outer function has returned. This enables private state, data encapsulation, and is the foundation of many React patterns like hooks and callbacks."
      code={closuresCode}
      codeFilename="closures.tsx"
      whyItMatters="Closures are fundamental to JavaScript and React. Interviewers use them to test if you understand scope, memory, and can debug issues like stale closures in useEffect/useCallback. It's a 'senior vs junior' differentiator question."
      mistakes={[
        "Loop + var trap: Using var in loops creates shared closure. Use let or forEach.",
        "Stale closures in React: Missing dependencies in useCallback/useEffect capture old values.",
        "Memory leaks: Closures holding references to large objects prevent garbage collection.",
        "Over-engineering: Creating closures when simple module patterns would suffice.",
      ]}
      practiceTask="Build a createBankAccount(initialBalance) function that returns deposit(), withdraw(), and getBalance() methods. Balance should be private and only modifiable through these methods. Add overdraft protection."
    />
  );
};

export default Closures;
