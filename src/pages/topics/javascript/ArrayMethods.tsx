import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const arrayMethodsCode = `// Array Methods: Essential data manipulation in JavaScript

// ✅ map() - Transform each element
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

const userNames = users.map(user => user.name);
// ['Alice', 'Bob']

// ✅ filter() - Select elements that match condition
const adults = users.filter(user => user.age >= 18);
const activeUsers = users.filter(user => user.status === 'active');

// ✅ reduce() - Accumulate values into single result
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
// 55

const usersByAge = users.reduce((acc, user) => {
  acc[user.age] = user;
  return acc;
}, {} as Record<number, typeof users[0]>);

// ✅ find() & findIndex() - Locate specific elements
const user = users.find(u => u.id === 2);
const userIndex = users.findIndex(u => u.name === 'Alice');

// ✅ some() & every() - Boolean checks
const hasAdults = users.some(user => user.age >= 18); // true
const allAdults = users.every(user => user.age >= 18); // true

// ✅ Real-world: Processing API data
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const processProducts = (products: Product[]) => {
  // Chain methods for complex operations
  return products
    .filter(p => p.inStock) // Only available products
    .filter(p => p.price > 0) // Valid prices
    .map(p => ({
      ...p,
      displayPrice: \`$\${p.price.toFixed(2)}\`,
      slug: p.name.toLowerCase().replace(/\\s+/g, '-'),
    }))
    .sort((a, b) => a.price - b.price); // Sort by price
};

// ✅ Advanced: Group by category
const groupByCategory = (products: Product[]) => {
  return products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {} as Record<string, Product[]>);
};

// ✅ Performance tip: Early returns
const findExpensiveProduct = (products: Product[], threshold: number) => {
  // Use find() instead of filter()[0] for better performance
  return products.find(p => p.price > threshold);
};`;

const ArrayMethods = () => {
  return (
    <TopicLayout
      title="Array Methods"
      route="/javascript/array-methods"
      category="javascript"
      explanation="Array methods like map, filter, reduce, find are essential for functional programming in JavaScript. They create new arrays instead of mutating originals, making code predictable and easier to debug. Master chaining these methods for complex data transformations."
      code={arrayMethodsCode}
      codeFilename="array-methods.ts"
      whyItMatters="Array methods are used constantly in React and modern JavaScript. Interviewers test if you can manipulate data efficiently, understand functional programming concepts, and avoid common performance pitfalls. Essential for processing API responses and state management."
      mistakes={[
        "Using forEach() when you need a return value - use map() or reduce() instead.",
        "Mutating arrays with push/splice - use spread operator or concat for immutability.",
        "Using filter().length > 0 instead of some() - some() is more efficient and semantic.",
        "Chaining too many methods - consider performance implications with large datasets.",
      ]}
      practiceTask="Build a product search function that filters by category, price range, and availability. Sort results by relevance score. Use method chaining and return both filtered products and summary statistics (count, average price, categories)."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Array Methods"
        examples={[
          {
            title: "Map & Filter",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .container { background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
    button { padding: 12px 24px; background: #3B82F6; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 5px; }
    .result { margin-top: 15px; padding: 15px; background: #F3F4F6; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🗺️ Array Methods</h2>
    <button onclick="demoMap()">Map</button>
    <button onclick="demoFilter()">Filter</button>
    <button onclick="demoReduce()">Reduce</button>
    <div id="result" class="result"></div>
  </div>
  <script>
    const numbers = [1, 2, 3, 4, 5];
    
    function demoMap() {
      const doubled = numbers.map(n => n * 2);
      document.getElementById('result').innerHTML = 
        \`Original: [\${numbers}]<br>Doubled: [\${doubled}]\`;
    }
    
    function demoFilter() {
      const evens = numbers.filter(n => n % 2 === 0);
      document.getElementById('result').innerHTML = 
        \`Original: [\${numbers}]<br>Evens: [\${evens}]\`;
    }
    
    function demoReduce() {
      const sum = numbers.reduce((acc, n) => acc + n, 0);
      document.getElementById('result').innerHTML = 
        \`Original: [\${numbers}]<br>Sum: \${sum}\`;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Find & Some",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .container { background: white; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
    button { padding: 12px 24px; background: #10B981; color: white; border: none; border-radius: 8px; cursor: pointer; margin: 5px; }
    .result { margin-top: 15px; padding: 15px; background: #F3F4F6; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔍 Search Methods</h2>
    <button onclick="demoFind()">Find</button>
    <button onclick="demoSome()">Some</button>
    <button onclick="demoEvery()">Every</button>
    <div id="result" class="result"></div>
  </div>
  <script>
    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ];
    
    function demoFind() {
      const user = users.find(u => u.age > 28);
      document.getElementById('result').innerHTML = 
        \`Found: \${user.name} (age \${user.age})\`;
    }
    
    function demoSome() {
      const hasAdult = users.some(u => u.age >= 30);
      document.getElementById('result').innerHTML = 
        \`Has adult (30+)? \${hasAdult ? '✅ Yes' : '❌ No'}\`;
    }
    
    function demoEvery() {
      const allAdults = users.every(u => u.age >= 18);
      document.getElementById('result').innerHTML = 
        \`All adults (18+)? \${allAdults ? '✅ Yes' : '❌ No'}\`;
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

export default ArrayMethods;