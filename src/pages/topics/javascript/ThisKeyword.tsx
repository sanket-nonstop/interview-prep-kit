import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const thisKeywordCode = `// this Keyword: Context binding in JavaScript functions

// ✅ Method binding - this refers to the object
const user = {
  name: 'Alice',
  greet() {
    return \`Hello, I'm \${this.name}\`; // this = user object
  },
  
  // Arrow functions inherit this from enclosing scope
  greetArrow: () => {
    return \`Hello, I'm \${this.name}\`; // this = window/undefined
  }
};

console.log(user.greet()); // "Hello, I'm Alice"
console.log(user.greetArrow()); // "Hello, I'm undefined"

// ✅ Event handlers - common React pitfall
class Counter extends React.Component {
  state = { count: 0 };
  
  // ❌ Wrong: this is undefined in event handler
  handleClickWrong() {
    this.setState({ count: this.state.count + 1 }); // Error!
  }
  
  // ✅ Arrow function binds this correctly
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}

// ✅ Function binding methods
const api = {
  baseUrl: 'https://api.example.com',
  
  async fetchUser(id: string) {
    const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
    return response.json();
  }
};

// Method 1: bind()
const boundFetch = api.fetchUser.bind(api);
boundFetch('123'); // Works correctly

// Method 2: call() and apply()
api.fetchUser.call(api, '123'); // Works
api.fetchUser.apply(api, ['123']); // Works

// ✅ Constructor functions and classes
function Person(name: string) {
  this.name = name;
  this.greet = function() {
    return \`Hi, I'm \${this.name}\`;
  };
}

const person = new Person('Bob');
console.log(person.greet()); // "Hi, I'm Bob"

// ✅ Modern solution: Use arrow functions or explicit binding
const createTimer = (callback: () => void, delay: number) => {
  const timer = {
    remaining: delay,
    
    start() {
      const interval = setInterval(() => {
        this.remaining--; // Arrow function preserves this
        
        if (this.remaining <= 0) {
          clearInterval(interval);
          callback();
        }
      }, 1000);
    }
  };
  
  return timer;
};`;

const ThisKeyword = () => {
  return (
    <TopicLayout
      title="this Keyword"
      route="/javascript/this"
      category="javascript"
      explanation="The 'this' keyword refers to the execution context of a function. Its value depends on how the function is called: method calls, constructor calls, explicit binding, or arrow functions. Understanding 'this' is crucial for object-oriented JavaScript and React class components."
      code={thisKeywordCode}
      codeFilename="this-keyword.ts"
      whyItMatters="'this' binding is a classic JavaScript interview question that reveals deep language understanding. Interviewers test if you can debug context issues, understand arrow functions vs regular functions, and handle event binding in React. Essential for working with legacy codebases."
      mistakes={[
        "Using regular functions in React event handlers - 'this' becomes undefined in strict mode.",
        "Forgetting to bind methods when passing them as callbacks - loses original context.",
        "Mixing arrow functions and regular functions inconsistently in classes.",
        "Not understanding that arrow functions inherit 'this' from enclosing scope, not call site.",
      ]}
      practiceTask="Create a Calculator class with add, subtract, multiply methods. Make it work both as calculator.add(5) and as const add = calculator.add; add(5). Handle 'this' binding correctly in both scenarios."
    >
      <MultiExampleEditor
        title="🎯 Try It: 'this' Keyword"
        examples={[
          {
            title: "Method Context",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #1e293b; color: #e2e8f0; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .output { background: #334155; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #10b981; }
  .error { border-left-color: #ef4444; }
</style>
</head>
<body>
  <h2>🕹️ 'this' in Methods</h2>
  <button onclick="testMethod()">Call Method</button>
  <button onclick="testLostContext()">Lost Context</button>
  <button onclick="testArrowFix()">Arrow Fix</button>
  <div id="output"></div>
  
  <script>
    const counter = {
      count: 0,
      increment: function() {
        this.count++;
        return 'Count: ' + this.count;
      },
      incrementArrow: function() {
        setTimeout(() => {
          this.count++;
          show('Arrow preserves this: ' + this.count + ' ✅');
        }, 100);
      }
    };
    
    function testMethod() {
      show(counter.increment() + ' ✅<br>this = counter object');
    }
    
    function testLostContext() {
      const inc = counter.increment;
      try {
        inc();
      } catch(e) {
        show('Lost context! this = undefined ❌<br>' + e.message, true);
      }
    }
    
    function testArrowFix() {
      show('Waiting...');
      counter.incrementArrow();
    }
    
    function show(msg, isError) {
      document.getElementById('output').innerHTML = 
        '<div class="output' + (isError ? ' error' : '') + '">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "bind/call/apply",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .output { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; }
</style>
</head>
<body>
  <h2>🔗 Explicit Binding</h2>
  <button onclick="testCall()">call()</button>
  <button onclick="testApply()">apply()</button>
  <button onclick="testBind()">bind()</button>
  <div id="output"></div>
  
  <script>
    const person1 = { name: 'Alice' };
    const person2 = { name: 'Bob' };
    
    function greet(greeting, punctuation) {
      return greeting + ', I am ' + this.name + punctuation;
    }
    
    function testCall() {
      const msg1 = greet.call(person1, 'Hello', '!');
      const msg2 = greet.call(person2, 'Hi', '.');
      show('call() - pass args individually:<br>' + msg1 + '<br>' + msg2);
    }
    
    function testApply() {
      const msg1 = greet.apply(person1, ['Hey', '?']);
      const msg2 = greet.apply(person2, ['Yo', '!']);
      show('apply() - pass args as array:<br>' + msg1 + '<br>' + msg2);
    }
    
    function testBind() {
      const greetAlice = greet.bind(person1);
      const greetBob = greet.bind(person2);
      show('bind() - creates new function:<br>' + 
           greetAlice('Hello', '!') + '<br>' + 
           greetBob('Hi', '.'));
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="output">' + msg + '</div>';
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

export default ThisKeyword;