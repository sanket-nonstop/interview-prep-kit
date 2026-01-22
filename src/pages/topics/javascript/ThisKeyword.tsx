import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default ThisKeyword;