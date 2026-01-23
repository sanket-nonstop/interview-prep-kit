import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Prototypes & Classes"
        examples={[
          {
            title: "Class Inheritance",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: 'Courier New', monospace; background: #1e293b; color: #e2e8f0; }
  .output { background: #334155; padding: 20px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3b82f6; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
</style>
</head>
<body>
  <h2>🐾 Animal Class Hierarchy</h2>
  <button onclick="createDog()">Create Dog</button>
  <button onclick="createCat()">Create Cat</button>
  <div id="output"></div>
  
  <script>
    class Animal {
      constructor(name, species) {
        this.name = name;
        this.species = species;
      }
      speak() {
        return \`\${this.name} makes a sound\`;
      }
      info() {
        return \`\${this.name} is a \${this.species}\`;
      }
    }
    
    class Dog extends Animal {
      constructor(name, breed) {
        super(name, 'Dog');
        this.breed = breed;
      }
      speak() {
        return \`\${this.name} barks: Woof! 🐕\`;
      }
      fetch() {
        return \`\${this.name} fetches the ball!\`;
      }
    }
    
    class Cat extends Animal {
      constructor(name) {
        super(name, 'Cat');
      }
      speak() {
        return \`\${this.name} meows: Meow! 🐈\`;
      }
    }
    
    function createDog() {
      const dog = new Dog('Rex', 'Golden Retriever');
      show(dog.info() + '<br>' + dog.speak() + '<br>' + dog.fetch());
    }
    
    function createCat() {
      const cat = new Cat('Whiskers');
      show(cat.info() + '<br>' + cat.speak());
    }
    
    function show(msg) {
      document.getElementById('output').innerHTML = '<div class="output">' + msg + '</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Prototype Chain",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: 'Courier New', monospace; background: #0f172a; color: #e2e8f0; }
  .output { background: #1e293b; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #10b981; }
  button { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #059669; }
  .chain { color: #fbbf24; }
</style>
</head>
<body>
  <h2>🔗 Prototype Chain Explorer</h2>
  <button onclick="exploreChain()">Explore Chain</button>
  <button onclick="addMethod()">Add Prototype Method</button>
  <div id="output"></div>
  
  <script>
    function User(name, email) {
      this.name = name;
      this.email = email;
    }
    
    User.prototype.greet = function() {
      return \`Hello, I'm \${this.name}\`;
    };
    
    const user = new User('Alice', 'alice@example.com');
    
    function exploreChain() {
      let output = '<div class="output">';
      output += '<strong>Object Properties:</strong><br>';
      output += \`name: \${user.name}<br>\`;
      output += \`email: \${user.email}<br><br>\`;
      output += '<strong class="chain">Prototype Chain:</strong><br>';
      output += \`user.greet(): \${user.greet()}<br>\`;
      output += \`instanceof User: \${user instanceof User}<br>\`;
      output += \`instanceof Object: \${user instanceof Object}<br>\`;
      output += \`Has own property 'name': \${user.hasOwnProperty('name')}<br>\`;
      output += \`Has own property 'greet': \${user.hasOwnProperty('greet')}<br>\`;
      output += '</div>';
      document.getElementById('output').innerHTML = output;
    }
    
    function addMethod() {
      User.prototype.getEmailDomain = function() {
        return this.email.split('@')[1];
      };
      let output = '<div class="output">';
      output += '✅ Added getEmailDomain() to prototype!<br><br>';
      output += \`Domain: \${user.getEmailDomain()}<br>\`;
      output += 'All User instances now have this method!';
      output += '</div>';
      document.getElementById('output').innerHTML = output;
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

export default Prototypes;