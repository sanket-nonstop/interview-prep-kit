import { TopicLayout } from '@/components/TopicLayout';

const useStateCode = `// useState: Local component state management

import { useState, useCallback } from 'react';

// ✅ Functional updates for derived state
function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ Wrong: Race condition with stale closures
  // const increment = () => setCount(count + 1);
  
  // ✅ Correct: Functional update always uses latest state
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  
  return (
    <div className="flex gap-2">
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

// ✅ Lazy initialization for expensive computations
function ExpensiveComponent() {
  // Function runs only on first render
  const [data, setData] = useState(() => {
    return computeExpensiveInitialValue();
  });
  
  return <div>{data}</div>;
}

// ✅ Object state with proper updates
interface FormState {
  name: string;
  email: string;
  age: number;
}

function Form() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    age: 0,
  });
  
  // ✅ Spread previous state, update specific field
  const updateField = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  
  return (
    <input
      value={form.name}
      onChange={(e) => updateField('name', e.target.value)}
    />
  );
}`;

const UseState = () => {
  return (
    <TopicLayout
      title="useState Hook"
      route="/react/hooks/useState"
      category="react"
      explanation="useState manages local component state. The key insight: state updates are asynchronous and batched. Use functional updates when new state depends on previous state to avoid stale closure bugs."
      code={useStateCode}
      codeFilename="useState.tsx"
      whyItMatters="useState is the most basic React hook, but incorrect usage causes subtle bugs. Interviewers look for: functional updates vs direct updates, lazy initialization, proper object/array immutability. These show production experience."
      mistakes={[
        "Direct mutation: form.name = 'new' doesn't trigger re-render. Always create new references.",
        "Missing functional update: count + 1 in rapid clicks causes missed updates.",
        "Too many useState calls: Related state should often be grouped in one object.",
        "Expensive initial state: useState(expensiveFn()) runs every render. Use lazy init.",
      ]}
      practiceTask="Build a useToggle() custom hook that returns [value, toggle, setTrue, setFalse]. Then use it to manage a modal's open/close state. Handle edge cases like rapid toggling."
    />
  );
};

export default UseState;
