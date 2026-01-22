import { TopicLayout } from '@/components/TopicLayout';

const prototypesCode = `// Prototypes & Classes: JavaScript's inheritance system

// ✅ Prototype-based inheritance (ES5 style)
function User(name, email) {
  this.name = name;
  this.email = email;
}

User.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

User.prototype.getEmailDomain = function() {
  return this.email.split('@')[1];
};

const user1 = new User('Alice', 'alice@example.com');
console.log(user1.greet()); // "Hello, I'm Alice"

// ✅ Modern class syntax (ES6+)
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
  
  // Static method
  static getKingdom() {
    return 'Animalia';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Canine'); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return \`\${this.name} barks\`;
  }
  
  // Private field (modern JavaScript)
  #secretTrick = 'roll over';
  
  performTrick() {
    return \`\${this.name} does: \${this.#secretTrick}\`;
  }
}

const dog = new Dog('Rex', 'Golden Retriever');
console.log(dog.speak()); // "Rex barks"

// ✅ Prototype chain inspection
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true

// ✅ Mixin pattern for multiple inheritance
const Flyable = {
  fly() {
    return \`\${this.name} is flying\`;
  }
};

const Swimmable = {
  swim() {
    return \`\${this.name} is swimming\`;
  }
};

class Duck extends Animal {
  constructor(name) {
    super(name, 'Bird');
  }
}

// Add mixins
Object.assign(Duck.prototype, Flyable, Swimmable);

const duck = new Duck('Donald');
console.log(duck.fly()); // "Donald is flying"
console.log(duck.swim()); // "Donald is swimming"

// ✅ Factory pattern with prototypes
function createApiClient(baseUrl) {
  const client = Object.create(ApiClient.prototype);
  client.baseUrl = baseUrl;
  client.headers = { 'Content-Type': 'application/json' };
  return client;
}

const ApiClient = {
  async get(endpoint) {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      headers: this.headers
    });
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

const api = createApiClient('https://api.example.com');`;

const Prototypes = () => {
  return (
    <TopicLayout
      title="Prototypes & Classes"
      route="/javascript/prototypes"
      category="javascript"
      explanation="JavaScript uses prototype-based inheritance where objects can inherit directly from other objects. ES6 classes are syntactic sugar over prototypes. Understanding the prototype chain, constructor functions, and inheritance patterns is crucial for object-oriented JavaScript."
      code={prototypesCode}
      codeFilename="prototypes.js"
      whyItMatters="Prototypes are fundamental to JavaScript's object system. Interviewers test understanding of inheritance, the prototype chain, and when to use classes vs factory functions. Essential for working with libraries, frameworks, and building scalable applications."
      mistakes={[
        "Modifying built-in prototypes - can break other code and libraries.",
        "Not understanding 'this' binding in prototype methods - context can be lost.",
        "Overusing inheritance - composition is often better than deep inheritance chains.",
        "Mixing class and prototype syntax inconsistently - stick to one pattern per codebase.",
      ]}
      practiceTask="Create a Shape class hierarchy with Circle, Rectangle, and Triangle subclasses. Implement area calculation, a Drawable mixin for rendering, and a factory function that creates shapes from configuration objects."
    />
  );
};

export default Prototypes;