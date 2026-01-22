import { TopicLayout } from '@/components/TopicLayout';

const jsxVirtualDomCode = `// JSX & Virtual DOM: React's rendering system

// ✅ JSX Fundamentals
const JSXBasics: React.FC = () => {
  const name = 'Alice';
  const isLoggedIn = true;
  const items = ['apple', 'banana', 'orange'];
  
  return (
    <div className="container">
      {/* JSX expressions */}
      <h1>Hello, {name}!</h1>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      
      {/* Conditional rendering */}
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <p>Please log in</p>
      )}
      
      {/* List rendering */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* JSX attributes */}
      <input 
        type="text"
        className="form-input"
        placeholder="Enter text..."
        disabled={!isLoggedIn}
      />
      
      {/* Event handlers */}
      <button onClick={() => console.log('Clicked!')}>
        Click me
      </button>
    </div>
  );
};

// ✅ JSX Compilation (Babel transforms JSX to React.createElement)
// JSX:
const element = <h1 className="greeting">Hello, world!</h1>;

// Compiles to:
const elementCompiled = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// Complex JSX compilation
const complexElement = (
  <div className="container">
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// Compiles to:
const complexElementCompiled = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Content')
);

// ✅ Virtual DOM Representation
const virtualDomExample = {
  // Virtual DOM is a JavaScript object representation of real DOM
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: {
          children: 'Hello, World!'
        }
      },
      {
        type: 'p',
        props: {
          className: 'description',
          children: 'This is a paragraph'
        }
      }
    ]
  }
};

// ✅ React Reconciliation Process
const ReconciliationExample: React.FC = () => {
  const [items, setItems] = useState(['A', 'B', 'C']);
  
  const addItem = () => {
    setItems(prev => [...prev, String.fromCharCode(65 + prev.length)]);
  };
  
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };
  
  const moveItem = (from: number, to: number) => {
    setItems(prev => {
      const newItems = [...prev];
      const [moved] = newItems.splice(from, 1);
      newItems.splice(to, 0, moved);
      return newItems;
    });
  };
  
  return (
    <div>
      <h2>Reconciliation Demo</h2>
      <button onClick={addItem}>Add Item</button>
      
      <ul>
        {items.map((item, index) => (
          <li key={item}> {/* Key helps React identify elements */}
            {item}
            <button onClick={() => removeItem(index)}>Remove</button>
            {index > 0 && (
              <button onClick={() => moveItem(index, index - 1)}>
                Move Up
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ React Fiber (Modern Reconciliation)
// Fiber enables:
// 1. Incremental rendering
// 2. Ability to pause, abort, or reuse work
// 3. Priority-based updates
// 4. Concurrent features

const FiberExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [urgent, setUrgent] = useState(0);
  
  // High priority update
  const handleUrgentClick = () => {
    setUrgent(prev => prev + 1);
  };
  
  // Normal priority update
  const handleNormalClick = () => {
    setCount(prev => prev + 1);
  };
  
  // Simulate expensive computation
  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += i;
    }
    return result;
  }, [count]);
  
  return (
    <div>
      <h2>Fiber Priority Demo</h2>
      <p>Urgent: {urgent}</p>
      <p>Count: {count}</p>
      <p>Expensive: {expensiveValue}</p>
      
      <button onClick={handleUrgentClick}>Urgent Update</button>
      <button onClick={handleNormalClick}>Normal Update</button>
    </div>
  );
};

// ✅ JSX Best Practices
const JSXBestPractices: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  // ✅ Extract complex JSX into variables
  const loadingSpinner = (
    <div className="spinner">
      <div className="spinner-circle"></div>
      <p>Loading...</p>
    </div>
  );
  
  const userProfile = user && (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
  
  // ✅ Use fragments to avoid wrapper divs
  const fragmentExample = (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
  
  // ✅ Conditional rendering patterns
  const conditionalRendering = (
    <div>
      {/* Short-circuit evaluation */}
      {user && <p>Welcome, {user.name}!</p>}
      
      {/* Ternary operator */}
      {loading ? loadingSpinner : userProfile}
      
      {/* Logical AND with boolean conversion */}
      {!!user && <button>Edit Profile</button>}
      
      {/* Multiple conditions */}
      {user && !loading && user.isActive && (
        <div className="active-user">User is active</div>
      )}
    </div>
  );
  
  return (
    <div>
      {conditionalRendering}
      {fragmentExample}
    </div>
  );
};

// ✅ Virtual DOM Diffing Algorithm
const DiffingExample: React.FC = () => {
  const [version, setVersion] = useState(1);
  
  // React compares these trees and updates only differences
  const renderVersion1 = () => (
    <div>
      <h1>Version 1</h1>
      <p>Original content</p>
      <ul>
        <li key="a">Item A</li>
        <li key="b">Item B</li>
      </ul>
    </div>
  );
  
  const renderVersion2 = () => (
    <div>
      <h1>Version 2</h1> {/* Text changed */}
      <p>Updated content</p> {/* Text changed */}
      <ul>
        <li key="a">Item A</li> {/* Unchanged */}
        <li key="b">Item B Modified</li> {/* Text changed */}
        <li key="c">Item C</li> {/* New element */}
      </ul>
    </div>
  );
  
  return (
    <div>
      <button onClick={() => setVersion(version === 1 ? 2 : 1)}>
        Switch Version
      </button>
      {version === 1 ? renderVersion1() : renderVersion2()}
    </div>
  );
};

// ✅ Performance Optimization with Keys
const KeysExample: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: true }
  ]);
  
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: \`New todo \${todos.length + 1}\`,
      completed: false
    };
    setTodos(prev => [newTodo, ...prev]); // Add to beginning
  };
  
  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      
      {/* ❌ Bad: Using index as key */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}> {/* Don't do this! */}
            <input type="checkbox" defaultChecked={todo.completed} />
            {todo.text}
          </li>
        ))}
      </ul>
      
      {/* ✅ Good: Using stable unique key */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}> {/* Stable unique identifier */}
            <input type="checkbox" defaultChecked={todo.completed} />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ JSX Gotchas and Common Mistakes
const JSXGotchas: React.FC = () => {
  return (
    <div>
      {/* ❌ className, not class */}
      <div className="container">Content</div>
      
      {/* ❌ htmlFor, not for */}
      <label htmlFor="input-id">Label</label>
      <input id="input-id" />
      
      {/* ❌ Self-closing tags must be closed */}
      <img src="image.jpg" alt="Description" />
      <br />
      
      {/* ❌ Boolean attributes */}
      <input disabled={true} /> {/* or just disabled */}
      <input disabled={false} /> {/* or omit entirely */}
      
      {/* ❌ Style object, not string */}
      <div style={{ color: 'red', fontSize: '16px' }}>Styled</div>
      
      {/* ❌ Prevent XSS with dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: '<p>HTML content</p>' }} />
    </div>
  );
};`;

const JSXVirtualDOM = () => {
  return (
    <TopicLayout
      title="JSX & Virtual DOM"
      route="/react/jsx-virtual-dom"
      category="react"
      explanation="JSX is a syntax extension that compiles to React.createElement calls. Virtual DOM is a JavaScript representation of the real DOM that enables efficient updates through reconciliation. React compares virtual DOM trees and updates only changed elements."
      code={jsxVirtualDomCode}
      codeFilename="jsx-virtual-dom.tsx"
      whyItMatters="JSX and Virtual DOM are core React concepts. Interviewers test understanding of JSX compilation, reconciliation process, keys importance, and performance implications. Essential for writing efficient React applications."
      mistakes={[
        "Using array index as key in dynamic lists - breaks reconciliation.",
        "Not understanding JSX compilation - confusion about React scope.",
        "Forgetting JSX differences from HTML - className, htmlFor, self-closing tags.",
        "Not optimizing reconciliation - unnecessary re-renders and poor performance.",
      ]}
      practiceTask="Build a dynamic list component that demonstrates proper key usage, explain the reconciliation process when items are added/removed/reordered, and optimize rendering performance."
    />
  );
};

export default JSXVirtualDOM;