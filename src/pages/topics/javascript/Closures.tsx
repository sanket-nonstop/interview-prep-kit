import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const closuresCode = `// Closure: A function that "remembers" its lexical scope
// even when executed outside that scope

// ✅ Real-world: Creating private state in modules
function createCounter() {
  let count = 0; // Private variable - not accessible outside
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2
// console.log(count); // ❌ ReferenceError - count is private

// ✅ React pattern: Stale closure fix with useCallback
const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  
  // This callback "closes over" the query variable
  const handleSearch = useCallback(() => {
    // query is captured in this closure
    console.log(\`Searching for: \${query}\`);
    fetchResults(query);
  }, [query]); // Re-create when query changes
  
  return <input onChange={(e) => setQuery(e.target.value)} />;
};

// ✅ Event handlers with data binding
function createButtonHandlers(buttons: string[]) {
  return buttons.map((label) => ({
    label,
    // Each handler closes over its own 'label'
    onClick: () => console.log(\`Clicked: \${label}\`),
  }));
}`;

const Closures = () => {
  return (
    <TopicLayout
      title="Closures"
      route="/javascript/closures"
      category="javascript"
      explanation="A closure is when a function retains access to variables from its outer scope, even after that outer function has returned. This enables private state, data encapsulation, and is the foundation of many React patterns like hooks and callbacks."
      code={closuresCode}
      codeFilename="closures.tsx"
      whyItMatters="Closures are fundamental to JavaScript and React. Interviewers use them to test if you understand scope, memory, and can debug issues like stale closures in useEffect/useCallback. It's a 'senior vs junior' differentiator question."
      mistakes={[
        "Loop + var trap: Using var in loops creates shared closure. Use let or forEach.",
        "Stale closures in React: Missing dependencies in useCallback/useEffect capture old values.",
        "Memory leaks: Closures holding references to large objects prevent garbage collection.",
        "Over-engineering: Creating closures when simple module patterns would suffice.",
      ]}
      practiceTask="Build a createBankAccount(initialBalance) function that returns deposit(), withdraw(), and getBalance() methods. Balance should be private and only modifiable through these methods. Add overdraft protection."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Closures"
        examples={[
          {
            title: "Counter",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; text-align: center; }
    .counter { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: inline-block; }
    .count { font-size: 48px; font-weight: bold; color: #3B82F6; margin: 20px 0; }
    button { padding: 12px 24px; margin: 5px; font-size: 16px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .inc { background: #10B981; color: white; }
    .dec { background: #EF4444; color: white; }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="counter">
    <h2>🔢 Closure Counter</h2>
    <div class="count" id="count">0</div>
    <button class="inc" onclick="increment()">➕ Increment</button>
    <button class="dec" onclick="decrement()">➖ Decrement</button>
  </div>
  
  <script>
    // Closure: count is private!
    const counter = (function() {
      let count = 0;
      return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
      };
    })();
    
    function increment() {
      document.getElementById('count').textContent = counter.increment();
    }
    
    function decrement() {
      document.getElementById('count').textContent = counter.decrement();
    }
  </script>
</body>
</html>`
          },
          {
            title: "Private Data",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .account { background: white; padding: 30px; border-radius: 12px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .balance { font-size: 32px; font-weight: bold; color: #10B981; margin: 20px 0; }
    input { padding: 10px; border: 2px solid #D1D5DB; border-radius: 6px; width: 100%; box-sizing: border-box; margin: 10px 0; }
    button { padding: 10px 20px; background: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 5px; }
    .msg { margin-top: 10px; padding: 10px; border-radius: 6px; }
    .success { background: #D1FAE5; color: #065F46; }
    .error { background: #FEE2E2; color: #991B1B; }
  </style>
</head>
<body>
  <div class="account">
    <h2>🏦 Bank Account</h2>
    <div class="balance">$<span id="balance">1000</span></div>
    <input type="number" id="amount" placeholder="Enter amount">
    <div>
      <button onclick="deposit()">Deposit</button>
      <button onclick="withdraw()">Withdraw</button>
    </div>
    <div id="message"></div>
  </div>
  
  <script>
    const account = (function(initial) {
      let balance = initial; // Private!
      return {
        deposit: (amt) => { balance += amt; return balance; },
        withdraw: (amt) => {
          if (amt > balance) return null;
          balance -= amt;
          return balance;
        },
        getBalance: () => balance
      };
    })(1000);
    
    function deposit() {
      const amt = parseFloat(document.getElementById('amount').value);
      const newBalance = account.deposit(amt);
      document.getElementById('balance').textContent = newBalance;
      showMessage('Deposited $' + amt, 'success');
    }
    
    function withdraw() {
      const amt = parseFloat(document.getElementById('amount').value);
      const newBalance = account.withdraw(amt);
      if (newBalance === null) {
        showMessage('Insufficient funds!', 'error');
      } else {
        document.getElementById('balance').textContent = newBalance;
        showMessage('Withdrew $' + amt, 'success');
      }
    }
    
    function showMessage(msg, type) {
      const el = document.getElementById('message');
      el.textContent = msg;
      el.className = 'msg ' + type;
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

export default Closures;
