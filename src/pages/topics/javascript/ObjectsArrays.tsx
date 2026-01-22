import { TopicLayout } from '@/components/TopicLayout';

const objectsArraysCode = `// JavaScript Objects & Arrays: Core data structures

// ✅ Object creation and manipulation
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

// Property access
console.log(user.name); // Dot notation
console.log(user['email']); // Bracket notation

// Dynamic property access
const prop = 'age';
console.log(user[prop]); // 25

// Adding/modifying properties
user.city = 'New York';
user['country'] = 'USA';

// ✅ Object methods and 'this'
const calculator = {
  value: 0,
  add(num) {
    this.value += num;
    return this; // Method chaining
  },
  multiply(num) {
    this.value *= num;
    return this;
  },
  getValue() {
    return this.value;
  }
};

console.log(calculator.add(5).multiply(2).getValue()); // 10

// ✅ Object destructuring
const { name, age, email } = user;
console.log(name, age, email);

// Destructuring with renaming
const { name: userName, age: userAge } = user;

// Nested destructuring
const userProfile = {
  personal: { name: 'Bob', age: 30 },
  contact: { email: 'bob@example.com', phone: '123-456-7890' }
};

const { personal: { name: personName }, contact: { email: contactEmail } } = userProfile;

// ✅ Array creation and methods
const numbers = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'orange'];

// Adding elements
fruits.push('grape'); // Add to end
fruits.unshift('mango'); // Add to beginning

// Removing elements
const lastFruit = fruits.pop(); // Remove from end
const firstFruit = fruits.shift(); // Remove from beginning

// Finding elements
const foundFruit = fruits.find(fruit => fruit === 'banana');
const fruitIndex = fruits.findIndex(fruit => fruit === 'orange');

// ✅ Array iteration methods
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((total, num) => total + num, 0);

// forEach for side effects
numbers.forEach((num, index) => {
  console.log(\`Index \${index}: \${num}\`);
});

// ✅ Array destructuring
const [first, second, ...rest] = numbers;
console.log(first, second, rest); // 1, 2, [3, 4, 5]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1

// ✅ Spread operator with objects and arrays
const originalUser = { name: 'Alice', age: 25 };
const updatedUser = { ...originalUser, age: 26, city: 'Boston' };

const originalNumbers = [1, 2, 3];
const moreNumbers = [...originalNumbers, 4, 5, 6];

// ✅ Object.keys, Object.values, Object.entries
const userKeys = Object.keys(user);
const userValues = Object.values(user);
const userEntries = Object.entries(user);

userEntries.forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// ✅ React patterns with objects and arrays
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: true }
  ]);
  
  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos(prev => [...prev, newTodo]);
  };
  
  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// ✅ Checking if property exists
console.log('name' in user); // true
console.log(user.hasOwnProperty('age')); // true
console.log(user.city !== undefined); // true

// ✅ Object comparison gotcha
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false (different references)
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)); // true (shallow comparison)

// ✅ Array methods chaining
const processedData = numbers
  .filter(num => num > 2)
  .map(num => num * 2)
  .reduce((sum, num) => sum + num, 0);

// ✅ Shallow vs deep copy
const shallowCopy = { ...user };
const deepCopy = JSON.parse(JSON.stringify(user)); // Simple deep copy

// For complex objects, use libraries like Lodash
// const deepCopy = _.cloneDeep(user);`;

const ObjectsArrays = () => {
  return (
    <TopicLayout
      title="Objects & Arrays"
      route="/javascript/objects-arrays"
      category="javascript"
      explanation="Objects and arrays are fundamental JavaScript data structures. Objects store key-value pairs, arrays store ordered lists. Understanding property access, array methods, destructuring, and the spread operator is essential for modern JavaScript development."
      code={objectsArraysCode}
      codeFilename="objects-arrays.js"
      whyItMatters="Objects and arrays are used constantly in JavaScript and React. Interviewers test understanding of data manipulation, immutability patterns, and common methods. Essential for state management and data processing."
      mistakes={[
        "Mutating state directly in React - always create new objects/arrays.",
        "Using == instead of === for object comparison - objects are compared by reference.",
        "Not understanding shallow vs deep copying - can lead to unexpected mutations.",
        "Forgetting that array methods like map/filter return new arrays.",
      ]}
      practiceTask="Build a shopping cart that adds, removes, and updates items using immutable patterns. Implement search and filtering functionality using array methods."
    />
  );
};

export default ObjectsArrays;