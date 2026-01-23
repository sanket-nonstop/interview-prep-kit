import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const functionsCode = `// JavaScript Functions: Declaration, expression, arrow functions

// ✅ Function declarations - hoisted
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Alice')); // Works before declaration due to hoisting

// ✅ Function expressions - not hoisted
const sayHello = function(name) {
  return \`Hi, \${name}!\`;
};

// console.log(sayGoodbye('Bob')); // ❌ ReferenceError
const sayGoodbye = function(name) {
  return \`Goodbye, \${name}!\`;
};

// ✅ Arrow functions - concise syntax, lexical this
const add = (a, b) => a + b;
const square = x => x * x; // Single parameter, no parentheses needed
const logMessage = () => console.log('Hello'); // No parameters

// ✅ Arrow functions vs regular functions - 'this' binding
const obj = {
  name: 'Alice',
  
  // Regular function - 'this' refers to obj
  regularMethod: function() {
    return \`Regular: \${this.name}\`;
  },
  
  // Arrow function - 'this' refers to enclosing scope
  arrowMethod: () => {
    return \`Arrow: \${this.name}\`; // 'this' is undefined or global
  },
  
  // Method with callback
  delayedGreeting: function() {
    // Arrow function preserves 'this' from enclosing scope
    setTimeout(() => {
      console.log(\`Hello, \${this.name}\`); // 'this' refers to obj
    }, 1000);
    
    // Regular function loses 'this' context
    setTimeout(function() {
      console.log(\`Hello, \${this.name}\`); // 'this' is undefined
    }, 1000);
  }
};

// ✅ Function parameters and default values
function createUser(name, age = 18, role = 'user') {
  return { name, age, role };
}

console.log(createUser('Bob')); // { name: 'Bob', age: 18, role: 'user' }
console.log(createUser('Alice', 25, 'admin')); // { name: 'Alice', age: 25, role: 'admin' }

// ✅ Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// ✅ Higher-order functions
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12

// ✅ Immediately Invoked Function Expression (IIFE)
(function() {
  const privateVariable = 'I am private';
  console.log('IIFE executed');
})();

// ✅ React function components
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const handleClick = () => {
    console.log(\`Clicked on \${user.name}\`);
  };
  
  return (
    <div onClick={handleClick}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

// ✅ Event handlers in React
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  
  // Arrow function for event handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', email);
  };
  
  // Inline arrow function (use sparingly)
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

// ✅ Callback functions
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'Sample Data' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log('Received:', data);
});

// ✅ Function composition
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const compose = (f, g) => x => f(g(x));

const addOneThenDouble = compose(multiplyByTwo, addOne);
console.log(addOneThenDouble(3)); // 8 (3 + 1 = 4, 4 * 2 = 8)

// ✅ Recursive functions
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120

// ✅ Function methods: call, apply, bind
const person = { name: 'Alice' };

function introduce(greeting, punctuation) {
  return \`\${greeting}, I'm \${this.name}\${punctuation}\`;
}

console.log(introduce.call(person, 'Hello', '!')); // "Hello, I'm Alice!"
console.log(introduce.apply(person, ['Hi', '.'])); // "Hi, I'm Alice."

const boundIntroduce = introduce.bind(person, 'Hey');
console.log(boundIntroduce('?')); // "Hey, I'm Alice?"`;

const Functions = () => {
  return (
    <TopicLayout
      title="Functions"
      route="/javascript/functions"
      category="javascript"
      explanation="JavaScript functions can be declared as function declarations (hoisted), function expressions, or arrow functions. Each has different behavior with 'this' binding, hoisting, and syntax. Understanding these differences is crucial for React development."
      code={functionsCode}
      codeFilename="functions.js"
      whyItMatters="Functions are the building blocks of JavaScript and React. Interviewers test understanding of different function types, 'this' binding, hoisting, and when to use each type. Essential for writing clean, predictable code."
      mistakes={[
        "Using arrow functions for object methods - loses 'this' context.",
        "Not understanding hoisting differences between declarations and expressions.",
        "Creating new functions in render methods - causes unnecessary re-renders.",
        "Confusing 'this' binding in different function types.",
      ]}
      practiceTask="Create a calculator object with methods using different function types, demonstrate 'this' binding issues, and fix them using appropriate function syntax."
    >
      <MultiExampleEditor
        title="🎯 Try It: Functions"
        examples={[
          {
            title: "Function Types",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .output { background: #1e293b; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #10b981; }
</style>
</head>
<body>
  <h2>🔧 Function Declaration vs Expression vs Arrow</h2>
  <button onclick="testDeclaration()">Declaration</button>
  <button onclick="testExpression()">Expression</button>
  <button onclick="testArrow()">Arrow</button>
  <div id="output"></div>
  
  <script>
    // Function Declaration (hoisted)
    function greet(name) {
      return 'Hello, ' + name + '!';
    }
    
    // Function Expression (not hoisted)
    const sayHi = function(name) {
      return 'Hi, ' + name + '!';
    };
    
    // Arrow Function (concise, lexical this)
    const sayHey = (name) => 'Hey, ' + name + '!';
    
    function testDeclaration() {
      show('Function Declaration: ' + greet('Alice') + '<br>Hoisted: Can call before definition');
    }
    
    function testExpression() {
      show('Function Expression: ' + sayHi('Bob') + '<br>Not hoisted: Must define before use');
    }
    
    function testArrow() {
      const nums = [1, 2, 3];
      const doubled = nums.map(n => n * 2);
      show('Arrow Function: ' + sayHey('Charlie') + '<br>Doubled: [' + doubled + ']<br>Concise syntax!');
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="output">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "'this' Binding",
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
  <h2>🎯 'this' Binding Demo</h2>
  <button onclick="testRegular()">Regular Method</button>
  <button onclick="testArrowMethod()">Arrow Method</button>
  <button onclick="testCallback()">Callback Issue</button>
  <div id="output"></div>
  
  <script>
    const user = {
      name: 'Alice',
      regularMethod: function() {
        return 'Regular: Hello, ' + this.name;
      },
      arrowMethod: () => {
        return 'Arrow: Hello, ' + (typeof this.name === 'undefined' ? 'undefined' : this.name);
      },
      delayedGreeting: function() {
        setTimeout(() => {
          show('Arrow in callback: Hello, ' + this.name + ' ✅');
        }, 100);
      }
    };
    
    function testRegular() {
      show(user.regularMethod() + ' ✅<br>this = user object');
    }
    
    function testArrowMethod() {
      show(user.arrowMethod() + ' ❌<br>Arrow functions inherit this from parent scope', true);
    }
    
    function testCallback() {
      show('Waiting for callback...');
      user.delayedGreeting();
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

export default Functions;