import { TopicLayout } from '@/components/TopicLayout';

const executionContextCode = `// JavaScript Execution Context: How JavaScript executes code

// ✅ Global Execution Context
var globalVar = 'I am global';
let globalLet = 'I am also global';
const globalConst = 'I am global too';

function globalFunction() {
  return 'Global function';
}

// Global object (window in browsers, global in Node.js)
console.log(window.globalVar); // 'I am global'
console.log(window.globalLet); // undefined (let/const not on global object)

// ✅ Function Execution Context
function outerFunction(x) {
  var outerVar = 'I am outer';
  let outerLet = 'Outer let';
  
  function innerFunction(y) {
    var innerVar = 'I am inner';
    let innerLet = 'Inner let';
    
    // Access to outer scope (closure)
    console.log(outerVar); // 'I am outer'
    console.log(outerLet); // 'Outer let'
    console.log(x); // Parameter from outer function
    
    return innerVar + ' ' + y;
  }
  
  return innerFunction;
}

const closureFunction = outerFunction('outer param');
console.log(closureFunction('inner param'));

// ✅ Execution Context Phases
function demonstratePhases() {
  // Creation Phase:
  // 1. Create Variable Object (VO)
  // 2. Create Scope Chain
  // 3. Set 'this' value
  
  console.log(hoistedVar); // undefined (not error)
  console.log(hoistedFunction()); // 'I am hoisted'
  
  // Execution Phase:
  var hoistedVar = 'Now I have a value';
  
  function hoistedFunction() {
    return 'I am hoisted';
  }
  
  console.log(hoistedVar); // 'Now I have a value'
}

// ✅ Scope Chain Resolution
var scope = 'global';

function first() {
  var scope = 'first';
  
  function second() {
    var scope = 'second';
    
    function third() {
      // Scope chain: third -> second -> first -> global
      console.log(scope); // 'second' (closest scope)
    }
    
    third();
  }
  
  second();
}

first();

// ✅ 'this' Context in Different Scenarios
const thisExamples = {
  // Global context
  globalThis: function() {
    console.log(this); // Window object (or undefined in strict mode)
  },
  
  // Object method
  objectMethod: function() {
    console.log(this); // thisExamples object
  },
  
  // Arrow function (lexical this)
  arrowMethod: () => {
    console.log(this); // Window object (inherits from enclosing scope)
  },
  
  // Method with nested function
  nestedFunction: function() {
    console.log('Outer this:', this); // thisExamples object
    
    function inner() {
      console.log('Inner this:', this); // Window object (or undefined)
    }
    
    const innerArrow = () => {
      console.log('Arrow this:', this); // thisExamples object (lexical)
    };
    
    inner();
    innerArrow();
  }
};

// ✅ Call Stack Visualization
function first() {
  console.log('First function start');
  second();
  console.log('First function end');
}

function second() {
  console.log('Second function start');
  third();
  console.log('Second function end');
}

function third() {
  console.log('Third function');
  // Call stack: third -> second -> first -> global
}

first();

// ✅ Execution Context in Async Operations
console.log('1: Synchronous');

setTimeout(() => {
  console.log('2: Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Promise callback');
});

console.log('4: Synchronous');

// Output: 1, 4, 3, 2 (microtasks before macrotasks)

// ✅ Block Scope (ES6+)
function blockScopeExample() {
  var functionScoped = 'Function scoped';
  
  if (true) {
    var functionScoped2 = 'Also function scoped';
    let blockScoped = 'Block scoped';
    const alsoBlockScoped = 'Also block scoped';
    
    console.log(blockScoped); // Accessible
  }
  
  console.log(functionScoped2); // Accessible
  // console.log(blockScoped); // ReferenceError
}

// ✅ Temporal Dead Zone
function temporalDeadZoneExample() {
  console.log(typeof undeclaredVar); // 'undefined'
  // console.log(typeof letVar); // ReferenceError (TDZ)
  
  let letVar = 'Now accessible';
  console.log(letVar); // 'Now accessible'
}

// ✅ React Context and Execution Context
const ReactExecutionExample: React.FC = () => {
  const [count, setCount] = useState(0);
  
  // Each render creates new execution context
  const handleClick = () => {
    console.log('Current count:', count); // Closure over current count
    
    // This creates a new execution context
    setCount(prevCount => {
      console.log('Previous count:', prevCount);
      return prevCount + 1;
    });
  };
  
  // useEffect creates its own execution context
  useEffect(() => {
    console.log('Effect execution context, count:', count);
    
    const timer = setTimeout(() => {
      // This callback has its own execution context
      console.log('Timer callback, count:', count);
    }, 1000);
    
    return () => {
      // Cleanup execution context
      clearTimeout(timer);
    };
  }, [count]);
  
  return <button onClick={handleClick}>Count: {count}</button>;
};

// ✅ Debugging Execution Context
function debugExecutionContext() {
  var a = 1;
  let b = 2;
  const c = 3;
  
  function inner() {
    var d = 4;
    
    // Use debugger to inspect execution context
    debugger;
    
    console.log('Variables in scope:', { a, b, c, d });
  }
  
  inner();
}

// ✅ Memory and Execution Context
function memoryAndContext() {
  // Each function call creates new execution context
  function recursive(n) {
    if (n <= 0) return 0;
    
    // Each recursive call adds to call stack
    return n + recursive(n - 1);
  }
  
  // Stack overflow with too many contexts
  try {
    recursive(10000);
  } catch (error) {
    console.log('Stack overflow:', error.message);
  }
}

// ✅ Execution Context Best Practices
const bestPractices = {
  // Avoid deeply nested functions
  avoidDeepNesting: function() {
    // Instead of deep nesting, use composition
    const processData = (data) => data.map(transform).filter(validate);
    const transform = (item) => ({ ...item, processed: true });
    const validate = (item) => item.isValid;
    
    return { processData };
  },
  
  // Use arrow functions for lexical this
  useLexicalThis: function() {
    return {
      value: 42,
      getValue: () => this.value, // Inherits this from enclosing scope
      getValueMethod: function() { return this.value; } // Own this
    };
  },
  
  // Minimize global variables
  minimizeGlobals: (function() {
    // Use IIFE to create private scope
    let privateVar = 'private';
    
    return {
      getPrivate: () => privateVar,
      setPrivate: (value) => { privateVar = value; }
    };
  })()
};`;

const ExecutionContext = () => {
  return (
    <TopicLayout
      title="Execution Context"
      route="/javascript/execution-context"
      category="javascript"
      explanation="Execution context is the environment where JavaScript code is executed. It includes variable object, scope chain, and 'this' binding. Understanding execution context explains hoisting, closures, scope resolution, and the call stack."
      code={executionContextCode}
      codeFilename="execution-context.js"
      whyItMatters="Execution context is fundamental to understanding how JavaScript works. Interviewers test knowledge of hoisting, scope chain, 'this' binding, and closures. Essential for debugging and writing predictable JavaScript code."
      mistakes={[
        "Not understanding hoisting behavior - leads to unexpected undefined values.",
        "Confusing function scope with block scope - var vs let/const issues.",
        "Not grasping 'this' binding rules - context loss in callbacks.",
        "Creating too many nested scopes - performance and readability issues.",
      ]}
      practiceTask="Debug a complex JavaScript function with multiple scopes, explain the execution context at each step, and fix 'this' binding issues in event handlers."
    />
  );
};

export default ExecutionContext;