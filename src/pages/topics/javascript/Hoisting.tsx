import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const hoistingCode = `// JavaScript Hoisting: Variable and function declarations are moved to the top

// ✅ Variable Hoisting with var
console.log(hoistedVar); // undefined (not ReferenceError)
var hoistedVar = 'I am hoisted';
console.log(hoistedVar); // 'I am hoisted'

// What actually happens (conceptually):
// var hoistedVar; // Declaration hoisted to top
// console.log(hoistedVar); // undefined
// hoistedVar = 'I am hoisted'; // Assignment stays in place

// ✅ Function Declaration Hoisting
console.log(hoistedFunction()); // 'I am hoisted!' (works!)

function hoistedFunction() {
  return 'I am hoisted!';
}

// Function declarations are fully hoisted (both declaration and definition)

// ✅ let and const Hoisting (Temporal Dead Zone)
// console.log(letVar); // ReferenceError: Cannot access before initialization
// console.log(constVar); // ReferenceError: Cannot access before initialization

let letVar = 'I am let';
const constVar = 'I am const';

// let and const are hoisted but not initialized (Temporal Dead Zone)

// ✅ Function Expression Hoisting
console.log(funcExpression); // undefined
// console.log(funcExpression()); // TypeError: funcExpression is not a function

var funcExpression = function() {
  return 'I am a function expression';
};

console.log(funcExpression()); // 'I am a function expression'

// ✅ Arrow Function Hoisting
console.log(arrowFunc); // undefined
// console.log(arrowFunc()); // TypeError: arrowFunc is not a function

var arrowFunc = () => {
  return 'I am an arrow function';
};

// ✅ Hoisting in Different Scopes
function scopeExample() {
  console.log(innerVar); // undefined (hoisted within function scope)
  
  if (true) {
    var innerVar = 'Function scoped';
    let blockVar = 'Block scoped';
  }
  
  console.log(innerVar); // 'Function scoped'
  // console.log(blockVar); // ReferenceError: blockVar is not defined
}

// ✅ Class Hoisting
// console.log(new MyClass()); // ReferenceError: Cannot access before initialization

class MyClass {
  constructor() {
    this.name = 'MyClass';
  }
}

console.log(new MyClass()); // Works after declaration

// ✅ Hoisting with Function Parameters
function parameterExample(param = defaultValue) {
  // console.log(defaultValue); // ReferenceError if used before declaration
  var defaultValue = 'default';
  return param;
}

// ✅ Complex Hoisting Example
var name = 'Global';

function complexExample() {
  console.log('1:', name); // undefined (local var hoisted)
  console.log('2:', age); // undefined (local var hoisted)
  // console.log('3:', city); // ReferenceError (let in TDZ)
  
  var name = 'Local';
  var age = 25;
  let city = 'New York';
  
  console.log('4:', name); // 'Local'
  console.log('5:', age); // 25
  console.log('6:', city); // 'New York'
  
  function innerFunction() {
    console.log('7:', name); // 'Local' (closure)
  }
  
  innerFunction();
}

complexExample();

// ✅ Hoisting in Loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var i:', i); // 3, 3, 3 (var is hoisted and shared)
  }, 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let j:', j); // 0, 1, 2 (let creates new binding each iteration)
  }, 100);
}

// ✅ Hoisting Best Practices
function bestPractices() {
  // ✅ Declare variables at the top
  var name, age, city;
  let userPreferences;
  const API_URL = 'https://api.example.com';
  
  // ✅ Use function declarations for main functions
  function processUser(userData) {
    return {
      ...userData,
      processed: true
    };
  }
  
  // ✅ Use const for functions that don't need hoisting
  const utilityFunction = () => {
    return 'utility';
  };
  
  // Initialize variables
  name = 'Alice';
  age = 30;
  city = 'Boston';
  
  return processUser({ name, age, city });
}

// ✅ React Component Hoisting Patterns
const ReactHoistingExample: React.FC = () => {
  // ✅ Hooks must be at the top level (not hoisted, but consistent order)
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // ✅ Event handlers can be declared after JSX (function declarations)
  function handleClick() {
    setCount(prev => prev + 1);
  }
  
  // ✅ Or use const with arrow functions (not hoisted)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      
      <input 
        value={name}
        onChange={handleNameChange}
        placeholder="Enter name"
      />
    </div>
  );
};

// ✅ Hoisting Gotchas and Interview Questions
function hoistingQuiz() {
  // Question 1: What gets logged?
  console.log(a); // ?
  console.log(b); // ?
  // console.log(c); // ?
  
  var a = 1;
  let b = 2;
  const c = 3;
  
  // Answer: undefined, ReferenceError, ReferenceError
  
  // Question 2: What gets logged?
  console.log(typeof undeclaredVar); // 'undefined'
  console.log(typeof declaredVar); // 'undefined'
  // console.log(typeof letVar); // ReferenceError
  
  var declaredVar = 'declared';
  let letVar = 'let variable';
  
  // Question 3: Function hoisting
  console.log(func1()); // ?
  // console.log(func2()); // ?
  
  function func1() {
    return 'func1';
  }
  
  var func2 = function() {
    return 'func2';
  };
  
  // Answer: 'func1', TypeError
}

// ✅ Practical Hoisting Example
function practicalExample() {
  // This pattern avoids hoisting confusion
  
  // 1. Declare all variables at top
  var users, processedUsers, errorMessage;
  
  // 2. Declare functions
  function processUser(user) {
    return {
      ...user,
      fullName: \`\${user.firstName} \${user.lastName}\`,
      processed: true
    };
  }
  
  function handleError(error) {
    errorMessage = error.message;
    console.error('Processing error:', error);
  }
  
  // 3. Main logic
  try {
    users = fetchUsers(); // Assume this function exists
    processedUsers = users.map(processUser);
    return processedUsers;
  } catch (error) {
    handleError(error);
    return [];
  }
}

// ✅ Modern JavaScript Hoisting Alternatives
function modernAlternatives() {
  // Use const/let instead of var
  const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
  };
  
  // Use arrow functions for utilities
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };
  
  // Use function declarations for main functions
  function processData(data) {
    return data
      .filter(item => item.isValid)
      .map(item => ({
        ...item,
        formattedDate: formatDate(item.date)
      }));
  }
  
  return { processData, config };
}`;

const Hoisting = () => {
  return (
    <TopicLayout
      title="Hoisting"
      route="/javascript/hoisting"
      category="javascript"
      explanation="Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during compilation. var declarations are hoisted and initialized with undefined, while let/const are hoisted but remain in the Temporal Dead Zone until declaration."
      code={hoistingCode}
      codeFilename="hoisting.js"
      whyItMatters="Hoisting is a fundamental JavaScript concept frequently tested in interviews. Understanding hoisting explains unexpected behavior with variables and functions, and helps write more predictable code. Essential for debugging and code organization."
      mistakes={[
        "Assuming let/const work like var - they're hoisted but not accessible before declaration.",
        "Using variables before declaration - leads to undefined values or ReferenceErrors.",
        "Not understanding function vs variable hoisting - functions are fully hoisted.",
        "Confusing hoisting with scope - they're related but different concepts.",
      ]}
      practiceTask="Debug code with hoisting issues, explain the execution order of declarations and assignments, and refactor code to avoid hoisting-related bugs."
    >
      <MultiExampleEditor
        title="🎯 Try It: Hoisting"
        examples={[
          {
            title: "Variable Hoisting",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: 'Courier New', monospace; background: #0f172a; color: #e2e8f0; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .output { background: #1e293b; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #10b981; font-size: 14px; }
  .error { border-left-color: #ef4444; }
</style>
</head>
<body>
  <h2>⬆️ Variable Hoisting</h2>
  <button onclick="testVar()">var Hoisting</button>
  <button onclick="testLet()">let TDZ</button>
  <button onclick="testFunction()">Function Hoisting</button>
  <div id="output"></div>
  
  <script>
    function testVar() {
      show('Before declaration: ' + typeof hoistedVar + '<br>');
      var hoistedVar = 'I am hoisted';
      show('After declaration: ' + hoistedVar + '<br><br>var is hoisted as undefined');
    }
    
    function testLet() {
      try {
        show('Trying to access let before declaration...');
        console.log(hoistedLet);
        let hoistedLet = 'I am not accessible';
      } catch(e) {
        show('ReferenceError: ' + e.message + '<br><br>let/const in Temporal Dead Zone!', true);
      }
    }
    
    function testFunction() {
      show('Calling before declaration: ' + hoistedFunc() + '<br><br>Function declarations are fully hoisted!');
      
      function hoistedFunc() {
        return 'I work!';
      }
    }
    
    function show(msg, isError) {
      const div = document.createElement('div');
      div.className = 'output' + (isError ? ' error' : '');
      div.innerHTML = msg;
      document.getElementById('output').appendChild(div);
    }
  </script>
</body>
</html>`
          },
          {
            title: "Function Hoisting",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
  button { background: white; color: #f5576c; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .output { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; }
  .error { border: 2px solid #fbbf24; }
</style>
</head>
<body>
  <h2>🎭 Function vs Expression</h2>
  <button onclick="testDeclaration()">Declaration</button>
  <button onclick="testExpression()">Expression</button>
  <button onclick="testArrow()">Arrow</button>
  <div id="output"></div>
  
  <script>
    function testDeclaration() {
      show('Function declaration works: ' + declaredFunc() + ' ✅<br>Fully hoisted!');
      
      function declaredFunc() {
        return 'I am hoisted';
      }
    }
    
    function testExpression() {
      try {
        show('Trying function expression...');
        expressionFunc();
      } catch(e) {
        show('TypeError: ' + e.message + ' ❌<br>Variable hoisted as undefined, not the function!', true);
      }
      
      var expressionFunc = function() {
        return 'I am not hoisted';
      };
    }
    
    function testArrow() {
      try {
        arrowFunc();
      } catch(e) {
        show('Arrow function: ' + e.message + ' ❌<br>Same as function expression!', true);
      }
      
      var arrowFunc = () => 'Not hoisted';
    }
    
    function show(msg, isError) {
      document.getElementById('output').innerHTML = 
        '<div class="output' + (isError ? ' error' : '') + '">' + msg + '</div>';
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

export default Hoisting;