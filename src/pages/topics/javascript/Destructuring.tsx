import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const destructuringCode = `// Destructuring & Spread: Modern JavaScript syntax for cleaner code

// ✅ Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];

// Basic destructuring
const [primary, secondary] = colors;
console.log(primary); // 'red'
console.log(secondary); // 'green'

// Skip elements
const [first, , third] = colors;
console.log(third); // 'blue'

// Rest operator
const [head, ...tail] = colors;
console.log(tail); // ['green', 'blue', 'yellow']

// Default values
const [a, b, c, d, e = 'default'] = colors;
console.log(e); // 'default'

// ✅ Object destructuring
const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Basic destructuring
const { name, email } = user;

// Rename variables
const { name: userName, email: userEmail } = user;

// Default values
const { age = 25, status = 'active' } = user;

// Nested destructuring
const { address: { city, country } } = user;

// ✅ Function parameter destructuring
const createUser = ({ name, email, age = 18 }: {
  name: string;
  email: string;
  age?: number;
}) => {
  return { id: Date.now(), name, email, age };
};

// React props destructuring
const UserCard: React.FC<{
  user: User;
  showEmail?: boolean;
  onEdit?: () => void;
}> = ({ user, showEmail = false, onEdit }) => {
  const { name, email, avatar } = user;
  
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      {showEmail && <p>{email}</p>}
      {onEdit && <button onClick={onEdit}>Edit</button>}
    </div>
  );
};

// ✅ Spread operator with arrays
const numbers = [1, 2, 3];
const moreNumbers = [4, 5, 6];

// Combine arrays
const allNumbers = [...numbers, ...moreNumbers];
// [1, 2, 3, 4, 5, 6]

// Copy array
const numbersCopy = [...numbers];

// Add elements
const extendedNumbers = [0, ...numbers, 4];
// [0, 1, 2, 3, 4]

// ✅ Spread operator with objects
const baseConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

const devConfig = {
  ...baseConfig,
  apiUrl: 'http://localhost:3000', // Override
  debug: true // Add new property
};

// ✅ React state updates with spread
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    
    // Add to array
    setTodos(prev => [...prev, newTodo]);
  };
  
  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed } // Update object
        : todo
    ));
  };
  
  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  return <div>{/* Component JSX */}</div>;
};

// ✅ Advanced patterns
// Dynamic object keys
const createApiEndpoints = (baseUrl: string) => {
  const endpoints = ['users', 'posts', 'comments'];
  
  return endpoints.reduce((acc, endpoint) => ({
    ...acc,
    [endpoint]: \`\${baseUrl}/\${endpoint}\`
  }), {});
};

// Conditional spreading
const buildUserPayload = (user: User, includePrivate = false) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    ...(includePrivate && {
      ssn: user.ssn,
      internalNotes: user.internalNotes
    })
  };
};

// Rest in object destructuring
const { password, ...publicUserData } = user;
// Exclude password, keep everything else

// Function with rest parameters
const sum = (...numbers: number[]): number => {
  return numbers.reduce((total, num) => total + num, 0);
};

console.log(sum(1, 2, 3, 4, 5)); // 15`;

const Destructuring = () => {
  return (
    <TopicLayout
      title="Destructuring & Spread"
      route="/javascript/destructuring"
      category="javascript"
      explanation="Destructuring extracts values from arrays and objects into variables. Spread operator expands arrays/objects into individual elements. These features enable cleaner, more readable code and are essential for modern JavaScript and React development."
      code={destructuringCode}
      codeFilename="destructuring.js"
      whyItMatters="Destructuring and spread are fundamental to modern JavaScript and React. Interviewers test understanding of these patterns for cleaner code, immutable updates, and function parameters. Essential for working with APIs, state management, and component props."
      mistakes={[
        "Mutating objects/arrays instead of using spread for immutable updates.",
        "Over-destructuring - extracting too many properties makes code less readable.",
        "Not using default values - can lead to undefined variables and runtime errors.",
        "Destructuring in wrong scope - can cause performance issues in render functions.",
      ]}
      practiceTask="Build a form component that uses destructuring for props and event handlers, spread operator for state updates, and rest parameters for flexible validation functions."
    >
      <MultiExampleEditor
        title="🎯 Try It: Destructuring & Spread"
        examples={[
          {
            title: "Array Destructuring",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; border: 1px solid rgba(255,255,255,0.2); }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  code { background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; }
</style>
</head>
<body>
  <h2>📦 Array Destructuring</h2>
  <button onclick="basicDestructure()">Basic</button>
  <button onclick="skipElements()">Skip Elements</button>
  <button onclick="restOperator()">Rest Operator</button>
  <div id="output"></div>
  
  <script>
    function basicDestructure() {
      const colors = ['red', 'green', 'blue', 'yellow'];
      const [first, second] = colors;
      show(\`First: <code>\${first}</code><br>Second: <code>\${second}</code>\`);
    }
    
    function skipElements() {
      const colors = ['red', 'green', 'blue', 'yellow'];
      const [first, , third] = colors;
      show(\`First: <code>\${first}</code><br>Third: <code>\${third}</code><br>Skipped green!\`);
    }
    
    function restOperator() {
      const numbers = [1, 2, 3, 4, 5];
      const [head, ...tail] = numbers;
      show(\`Head: <code>\${head}</code><br>Tail: <code>[\${tail.join(', ')}]</code>\`);
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="card">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Object Destructuring",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
  .card { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; border: 1px solid rgba(255,255,255,0.3); }
  button { background: white; color: #f5576c; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  code { background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; font-family: 'Courier New'; }
</style>
</head>
<body>
  <h2>📦 Object Destructuring</h2>
  <button onclick="basicObj()">Basic</button>
  <button onclick="renameVars()">Rename</button>
  <button onclick="nestedObj()">Nested</button>
  <div id="output"></div>
  
  <script>
    const user = {
      name: 'Alice',
      email: 'alice@example.com',
      age: 28,
      address: { city: 'NYC', country: 'USA' }
    };
    
    function basicObj() {
      const { name, email } = user;
      show(\`Name: <code>\${name}</code><br>Email: <code>\${email}</code>\`);
    }
    
    function renameVars() {
      const { name: userName, email: userEmail } = user;
      show(\`userName: <code>\${userName}</code><br>userEmail: <code>\${userEmail}</code>\`);
    }
    
    function nestedObj() {
      const { address: { city, country } } = user;
      show(\`City: <code>\${city}</code><br>Country: <code>\${country}</code><br>Extracted from nested object!\`);
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="card">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Destructuring;