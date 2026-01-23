import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: useState"
        examples={[
          {
            title: "Counter",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .counter { background: white; padding: 40px; border-radius: 16px; text-align: center; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .count { font-size: 64px; font-weight: bold; color: #3B82F6; margin: 20px 0; }
    button { padding: 15px 30px; margin: 5px; font-size: 18px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .inc { background: #10B981; color: white; }
    .dec { background: #EF4444; color: white; }
    .reset { background: #6B7280; color: white; }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;
    
    function Counter() {
      const [count, setCount] = useState(0);
      
      return (
        <div className="counter">
          <h2>🔢 useState Counter</h2>
          <div className="count">{count}</div>
          <button className="dec" onClick={() => setCount(count - 1)}>➖</button>
          <button className="reset" onClick={() => setCount(0)}>Reset</button>
          <button className="inc" onClick={() => setCount(count + 1)}>➕</button>
        </div>
      );
    }
    
    ReactDOM.render(<Counter />, document.getElementById('root'));
  </script>
</body>
</html>`
          },
          {
            title: "Form State",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .form-container { background: white; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { width: 100%; padding: 10px; border: 2px solid #D1D5DB; border-radius: 6px; font-size: 16px; box-sizing: border-box; }
    input:focus { outline: none; border-color: #3B82F6; }
    button { width: 100%; padding: 12px; background: #3B82F6; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; }
    button:hover { background: #2563EB; }
    .output { margin-top: 20px; padding: 15px; background: #F3F4F6; border-radius: 8px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React;
    
    function Form() {
      const [form, setForm] = useState({ name: '', email: '' });
      const [submitted, setSubmitted] = useState(null);
      
      const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(form);
      };
      
      return (
        <div className="form-container">
          <h2>📝 Form State</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          {submitted && (
            <div className="output">
              <strong>✅ Submitted!</strong><br/>
              Name: {submitted.name}<br/>
              Email: {submitted.email}
            </div>
          )}
        </div>
      );
    }
    
    ReactDOM.render(<Form />, document.getElementById('root'));
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default UseState;
