import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Variables & Scope"
        examples={[
          {
            title: "var vs let vs const",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: 'Courier New', monospace; background: #1e293b; color: #e2e8f0; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { background: #2563eb; }
  .output { background: #334155; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #10b981; font-size: 14px; }
  .error { border-left-color: #ef4444; }
</style>
</head>
<body>
  <h2>🔍 var vs let vs const</h2>
  <button onclick="testVar()">Test var</button>
  <button onclick="testLet()">Test let</button>
  <button onclick="testConst()">Test const</button>
  <div id="output"></div>
  
  <script>
    function testVar() {
      var x = 1;
      if (true) {
        var x = 2; // Same variable!
      }
      show('var x after block: ' + x + ' (function scoped)');
    }
    
    function testLet() {
      let y = 1;
      if (true) {
        let y = 2; // Different variable!
        show('let y inside block: ' + y);
      }
      show('let y after block: ' + y + ' (block scoped)');
    }
    
    function testConst() {
      const obj = { count: 0 };
      obj.count++; // ✅ Allowed
      show('const obj modified: ' + JSON.stringify(obj));
      try {
        obj = {}; // ❌ Error
      } catch(e) {
        show('Cannot reassign const: ' + e.message, true);
      }
    }
    
    function show(msg, isError) {
      const div = document.createElement('div');
      div.className = 'output' + (isError ? ' error' : '');
      div.textContent = msg;
      document.getElementById('output').appendChild(div);
    }
  </script>
</body>
</html>`
          },
          {
            title: "Loop Closure Bug",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  .container { max-width: 600px; margin: 0 auto; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 10px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .output { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; }
  .bug { border: 2px solid #ef4444; }
  .fixed { border: 2px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <h2>🐛 Classic Loop Closure Bug</h2>
    <button onclick="buggyLoop()">Buggy (var)</button>
    <button onclick="fixedLoop()">Fixed (let)</button>
    <div id="output"></div>
  </div>
  
  <script>
    function buggyLoop() {
      const output = [];
      for (var i = 0; i < 3; i++) {
        setTimeout(() => {
          output.push('var i = ' + i);
          if (output.length === 3) {
            show(output.join('<br>'), true);
          }
        }, 100);
      }
    }
    
    function fixedLoop() {
      const output = [];
      for (let j = 0; j < 3; j++) {
        setTimeout(() => {
          output.push('let j = ' + j);
          if (output.length === 3) {
            show(output.join('<br>'), false);
          }
        }, 100);
      }
    }
    
    function show(msg, isBug) {
      document.getElementById('output').innerHTML = 
        '<div class="output ' + (isBug ? 'bug' : 'fixed') + '">' + 
        (isBug ? '❌ Bug: All print 3!' : '✅ Fixed: Prints 0, 1, 2') + 
        '<br><br>' + msg + '</div>';
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

export default Variables;