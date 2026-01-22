import { TopicLayout } from '@/components/TopicLayout';

const variablesCode = `// JavaScript Variables & Scope: var, let, const fundamentals

// ✅ Variable declarations and differences
// var - function scoped, hoisted, can be redeclared
var name = 'John';
var name = 'Jane'; // ✅ Allowed
console.log(name); // 'Jane'

// let - block scoped, hoisted but not initialized, cannot be redeclared
let age = 25;
// let age = 30; // ❌ SyntaxError: Identifier 'age' has already been declared
age = 30; // ✅ Allowed

// const - block scoped, must be initialized, cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // ❌ TypeError: Assignment to constant variable
const user = { name: 'Alice' };
user.name = 'Bob'; // ✅ Allowed - object properties can be modified

// ✅ Hoisting behavior
console.log(hoistedVar); // undefined (not error)
var hoistedVar = 'I am hoisted';

// console.log(hoistedLet); // ❌ ReferenceError: Cannot access before initialization
let hoistedLet = 'I am not accessible before declaration';

// ✅ Block scope vs function scope
function scopeExample() {
  if (true) {
    var functionScoped = 'I am function scoped';
    let blockScoped = 'I am block scoped';
    const alsoBlockScoped = 'Me too';
  }
  
  console.log(functionScoped); // ✅ 'I am function scoped'
  // console.log(blockScoped); // ❌ ReferenceError
  // console.log(alsoBlockScoped); // ❌ ReferenceError
}

// ✅ Temporal Dead Zone
function temporalDeadZone() {
  // console.log(myLet); // ❌ ReferenceError: Cannot access before initialization
  
  let myLet = 'Now I exist';
  console.log(myLet); // ✅ 'Now I exist'
}

// ✅ Loop variable gotcha
// Problem with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var:', i); // Prints: 3, 3, 3
  }, 100);
}

// Solution with let
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let:', j); // Prints: 0, 1, 2
  }, 100);
}

// ✅ Global scope pollution
var globalVar = 'I pollute global scope';
window.globalVar; // Available on window object

let globalLet = 'I do not pollute global scope';
// window.globalLet; // undefined

// ✅ Best practices in React
const UserComponent: React.FC = () => {
  // ✅ Use const for values that don't change
  const API_URL = 'https://api.example.com';
  
  // ✅ Use let for values that will change
  let userCount = 0;
  
  // ✅ Use const for objects/arrays (content can change)
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // ✅ Block scoped variables in useEffect
    const controller = new AbortController();
    
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal
        });
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    };
    
    fetchUsers();
    
    return () => {
      controller.abort(); // Cleanup
    };
  }, []);
  
  return <div>User count: {users.length}</div>;
};

// ✅ Module scope
const moduleVariable = 'I am module scoped';

export const exportedFunction = () => {
  return moduleVariable; // Accessible within module
};

// ✅ Common interview patterns
function variableQuiz() {
  console.log(a); // undefined (hoisted)
  console.log(b); // ReferenceError
  console.log(c); // ReferenceError
  
  var a = 1;
  let b = 2;
  const c = 3;
}`;

const Variables = () => {
  return (
    <TopicLayout
      title="Variables & Scope"
      route="/javascript/variables"
      category="javascript"
      explanation="JavaScript has three ways to declare variables: var (function-scoped, hoisted), let (block-scoped), and const (block-scoped, immutable binding). Understanding scope, hoisting, and the temporal dead zone is fundamental to avoiding common bugs."
      code={variablesCode}
      codeFilename="variables.js"
      whyItMatters="Variable declarations and scope are fundamental JavaScript concepts tested in every interview. Understanding the differences between var, let, and const helps avoid common bugs and demonstrates solid JavaScript knowledge."
      mistakes={[
        "Using var in modern JavaScript - prefer let and const for better scope control.",
        "Not understanding hoisting - can lead to unexpected undefined values.",
        "Forgetting block scope - let and const are not accessible outside their block.",
        "Trying to reassign const variables - only the binding is immutable, not the value.",
      ]}
      practiceTask="Fix a buggy loop that uses var instead of let, explain why the bug occurs, and demonstrate the difference between const with primitives vs objects."
    />
  );
};

export default Variables;