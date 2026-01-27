import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const dataAttributesCode = `// Data Attributes: Store custom data in HTML elements

// ✅ Basic data attributes
<div 
  data-user-id="12345"
  data-user-role="admin"
  data-user-active="true"
>
  User Profile
</div>

// ✅ Accessing with JavaScript
const element = document.querySelector('[data-user-id]');

// Using dataset API
console.log(element.dataset.userId);      // "12345"
console.log(element.dataset.userRole);    // "admin"
console.log(element.dataset.userActive);  // "true"

// Setting data attributes
element.dataset.userEmail = "user@example.com";
element.dataset.lastLogin = new Date().toISOString();

// ✅ CSS styling with data attributes
<button data-status="active">Active</button>
<button data-status="inactive">Inactive</button>

/* CSS */
[data-status="active"] {
  background: green;
  color: white;
}

[data-status="inactive"] {
  background: gray;
  color: white;
}

// ✅ React component with data attributes
function ProductCard(props) {
  const product = props.product;
  
  const handleClick = (e) => {
    const card = e.currentTarget;
    const productId = card.dataset.productId;
    const category = card.dataset.category;
    
    console.log('Product ' + productId + ' in ' + category);
  };

  return React.createElement('div', {
    className: 'product-card',
    'data-product-id': product.id,
    'data-category': product.category,
    'data-price': product.price,
    onClick: handleClick
  }, [
    React.createElement('h3', null, product.name),
    React.createElement('p', null, '$' + product.price)
  ]);
}

// ✅ Filtering with data attributes
<div class="products">
  <div data-category="electronics" data-price="999">Laptop</div>
  <div data-category="clothing" data-price="49">T-Shirt</div>
  <div data-category="electronics" data-price="599">Phone</div>
</div>

// Filter by category
const electronics = document.querySelectorAll('[data-category="electronics"]');

// Filter by price range
const affordable = document.querySelectorAll('[data-price]');
const filtered = Array.from(affordable).filter(el => 
  parseInt(el.dataset.price) < 500
);

// ✅ State management with data attributes
<button 
  data-loading="false"
  data-disabled="false"
  onclick="handleSubmit(this)"
>
  Submit
</button>

function handleSubmit(button) {
  button.dataset.loading = "true";
  button.textContent = "Loading...";
  
  fetch('/api/submit')
    .then(() => {
      button.dataset.loading = "false";
      button.textContent = "Success!";
    });
}`;

const DataAttributes = () => {
  return (
    <TopicLayout
      title="Data Attributes"
      route="/html/data-attributes"
      category="html"
      explanation="Data attributes (data-*) store custom data in HTML elements. Access via JavaScript dataset API or CSS attribute selectors. Use for storing IDs, states, configuration, or any custom metadata without affecting semantics or styling."
      code={dataAttributesCode}
      codeFilename="data-attributes.html"
      whyItMatters="Data attributes are essential for storing metadata, managing state, and connecting HTML with JavaScript. Interviewers test understanding of dataset API, CSS selectors, and practical use cases. Critical for building interactive, data-driven applications."
      mistakes={[
        "Using data attributes for large data - store in JavaScript objects instead.",
        "Not using camelCase in dataset - data-user-name becomes dataset.userName.",
        "Storing sensitive data - data attributes are visible in HTML source.",
        "Using for styling only - use classes instead, data attributes for data.",
      ]}
      practiceTask="Build a product filter system using data attributes for category, price, and rating. Implement filtering, sorting, and click tracking. Use CSS to style based on data-status attribute."
    >
      <MultiExampleEditor
        title="🎯 Try It: Data Attributes"
        examples={[
          {
            title: "Basic Usage",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .card { background: white; padding: 20px; border-radius: 8px; margin: 10px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s; }
  .card:hover { transform: translateY(-2px); }
  .info { margin-top: 20px; padding: 20px; background: #dbeafe; border-radius: 8px; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin: 5px; }
  [data-role="admin"] .badge { background: #ef4444; color: white; }
  [data-role="user"] .badge { background: #10b981; color: white; }
  [data-active="true"] { border-left: 4px solid #10b981; }
  [data-active="false"] { border-left: 4px solid #ef4444; opacity: 0.6; }
</style>
</head>
<body>
  <h1>User Management</h1>

  <div class="card" 
       data-user-id="101" 
       data-role="admin" 
       data-active="true"
       onclick="showUserInfo(this)">
    <h3>John Doe</h3>
    <span class="badge">Admin</span>
    <p>john@example.com</p>
  </div>

  <div class="card" 
       data-user-id="102" 
       data-role="user" 
       data-active="true"
       onclick="showUserInfo(this)">
    <h3>Jane Smith</h3>
    <span class="badge">User</span>
    <p>jane@example.com</p>
  </div>

  <div class="card" 
       data-user-id="103" 
       data-role="user" 
       data-active="false"
       onclick="showUserInfo(this)">
    <h3>Bob Johnson</h3>
    <span class="badge">User</span>
    <p>bob@example.com (Inactive)</p>
  </div>

  <div class="info" id="info">
    Click a user card to see details
  </div>

  <script>
    function showUserInfo(card) {
      const userId = card.dataset.userId;
      const role = card.dataset.role;
      const active = card.dataset.active;
      
      document.getElementById('info').innerHTML = 
        '<strong>User Details:</strong><br>' +
        'ID: ' + userId + '<br>' +
        'Role: ' + role + '<br>' +
        'Active: ' + active;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Product Filter",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f9fafb; }
  .filters { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .filters button { padding: 10px 20px; margin: 5px; border: 2px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; transition: all 0.3s; }
  .filters button.active { background: #3b82f6; color: white; border-color: #3b82f6; }
  .products { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
  .product { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
  .product:hover { transform: translateY(-5px); }
  .product.hidden { display: none; }
  .price { font-size: 24px; font-weight: bold; color: #10b981; margin: 10px 0; }
  .category { display: inline-block; padding: 4px 12px; background: #dbeafe; color: #1e40af; border-radius: 12px; font-size: 12px; }
</style>
</head>
<body>
  <h1>Product Catalog</h1>

  <div class="filters">
    <strong>Filter by Category:</strong><br>
    <button onclick="filterProducts('all')" class="active">All</button>
    <button onclick="filterProducts('electronics')">Electronics</button>
    <button onclick="filterProducts('clothing')">Clothing</button>
    <button onclick="filterProducts('books')">Books</button>
  </div>

  <div class="products">
    <div class="product" data-category="electronics" data-price="999">
      <h3>Laptop</h3>
      <span class="category">Electronics</span>
      <div class="price">$999</div>
    </div>

    <div class="product" data-category="clothing" data-price="49">
      <h3>T-Shirt</h3>
      <span class="category">Clothing</span>
      <div class="price">$49</div>
    </div>

    <div class="product" data-category="electronics" data-price="599">
      <h3>Smartphone</h3>
      <span class="category">Electronics</span>
      <div class="price">$599</div>
    </div>

    <div class="product" data-category="books" data-price="29">
      <h3>JavaScript Book</h3>
      <span class="category">Books</span>
      <div class="price">$29</div>
    </div>

    <div class="product" data-category="clothing" data-price="89">
      <h3>Jacket</h3>
      <span class="category">Clothing</span>
      <div class="price">$89</div>
    </div>

    <div class="product" data-category="books" data-price="39">
      <h3>React Guide</h3>
      <span class="category">Books</span>
      <div class="price">$39</div>
    </div>
  </div>

  <script>
    function filterProducts(category) {
      const products = document.querySelectorAll('.product');
      const buttons = document.querySelectorAll('.filters button');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.classList.remove('hidden');
        } else {
          product.classList.add('hidden');
        }
      });
    }
  </script>
</body>
</html>`
          },
          {
            title: "Interactive Tabs",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .tabs { display: flex; background: #f3f4f6; }
  .tab { flex: 1; padding: 20px; text-align: center; cursor: pointer; border: none; background: transparent; font-size: 16px; font-weight: 600; color: #6b7280; transition: all 0.3s; }
  .tab:hover { background: #e5e7eb; }
  .tab[data-active="true"] { background: white; color: #3b82f6; border-bottom: 3px solid #3b82f6; }
  .content { padding: 40px; }
  .tab-panel { display: none; }
  .tab-panel[data-active="true"] { display: block; animation: fadeIn 0.3s; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  h2 { color: #1f2937; margin-bottom: 15px; }
  p { color: #6b7280; line-height: 1.6; }
  .feature { padding: 15px; background: #f9fafb; border-radius: 8px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="container">
    <div class="tabs">
      <button class="tab" data-tab="overview" data-active="true" onclick="switchTab('overview')">
        📋 Overview
      </button>
      <button class="tab" data-tab="features" data-active="false" onclick="switchTab('features')">
        ⚡ Features
      </button>
      <button class="tab" data-tab="pricing" data-active="false" onclick="switchTab('pricing')">
        💰 Pricing
      </button>
    </div>

    <div class="content">
      <div class="tab-panel" data-panel="overview" data-active="true">
        <h2>Product Overview</h2>
        <p>Welcome to our amazing product! This tab system uses data attributes to manage state and switching between different content panels.</p>
        <div class="feature">
          <strong>✅ Easy to Use:</strong> Simple and intuitive interface
        </div>
        <div class="feature">
          <strong>✅ Fast Performance:</strong> Optimized for speed
        </div>
      </div>

      <div class="tab-panel" data-panel="features" data-active="false">
        <h2>Key Features</h2>
        <div class="feature">🚀 Lightning Fast</div>
        <div class="feature">🔒 Secure & Private</div>
        <div class="feature">📱 Mobile Responsive</div>
        <div class="feature">🎨 Beautiful Design</div>
        <div class="feature">⚙️ Highly Customizable</div>
      </div>

      <div class="tab-panel" data-panel="pricing" data-active="false">
        <h2>Pricing Plans</h2>
        <div class="feature">
          <strong>Free Plan:</strong> $0/month - Perfect for getting started
        </div>
        <div class="feature">
          <strong>Pro Plan:</strong> $29/month - For professionals
        </div>
        <div class="feature">
          <strong>Enterprise:</strong> Custom pricing - For large teams
        </div>
      </div>
    </div>
  </div>

  <script>
    function switchTab(tabName) {
      const tabs = document.querySelectorAll('.tab');
      const panels = document.querySelectorAll('.tab-panel');
      
      tabs.forEach(tab => {
        tab.dataset.active = tab.dataset.tab === tabName ? 'true' : 'false';
      });
      
      panels.forEach(panel => {
        panel.dataset.active = panel.dataset.panel === tabName ? 'true' : 'false';
      });
    }
  </script>
</body>
</html>`
          },
          {
            title: "State Management",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #1f2937; color: white; }
  .container { max-width: 600px; margin: 0 auto; }
  .card { background: #374151; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
  button { padding: 12px 24px; margin: 5px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.3s; }
  button[data-loading="true"] { background: #6b7280; cursor: not-allowed; }
  button[data-loading="false"] { background: #3b82f6; color: white; }
  button[data-loading="false"]:hover { background: #2563eb; transform: scale(1.05); }
  .status { padding: 15px; border-radius: 8px; margin-top: 15px; }
  [data-status="idle"] { background: #374151; }
  [data-status="loading"] { background: #f59e0b; color: #1f2937; }
  [data-status="success"] { background: #10b981; color: white; }
  [data-status="error"] { background: #ef4444; color: white; }
  .counter { font-size: 48px; font-weight: bold; text-align: center; margin: 20px 0; }
  .controls { text-align: center; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>Button State Management</h2>
      <button id="submitBtn" data-loading="false" onclick="handleSubmit()">
        Submit Form
      </button>
      <div id="statusBox" class="status" data-status="idle">
        Ready to submit
      </div>
    </div>

    <div class="card">
      <h2>Counter with Data Attributes</h2>
      <div class="counter" id="counter" data-count="0">0</div>
      <div class="controls">
        <button data-loading="false" onclick="increment()">➕ Increment</button>
        <button data-loading="false" onclick="decrement()">➖ Decrement</button>
        <button data-loading="false" onclick="reset()">🔄 Reset</button>
      </div>
    </div>
  </div>

  <script>
    function handleSubmit() {
      const btn = document.getElementById('submitBtn');
      const status = document.getElementById('statusBox');
      
      btn.dataset.loading = 'true';
      btn.textContent = 'Loading...';
      status.dataset.status = 'loading';
      status.textContent = 'Submitting...';
      
      setTimeout(() => {
        const success = Math.random() > 0.3;
        
        btn.dataset.loading = 'false';
        btn.textContent = 'Submit Form';
        
        if (success) {
          status.dataset.status = 'success';
          status.textContent = '✅ Success! Form submitted.';
        } else {
          status.dataset.status = 'error';
          status.textContent = '❌ Error! Please try again.';
        }
        
        setTimeout(() => {
          status.dataset.status = 'idle';
          status.textContent = 'Ready to submit';
        }, 3000);
      }, 2000);
    }

    function increment() {
      const counter = document.getElementById('counter');
      const count = parseInt(counter.dataset.count) + 1;
      counter.dataset.count = count;
      counter.textContent = count;
    }

    function decrement() {
      const counter = document.getElementById('counter');
      const count = parseInt(counter.dataset.count) - 1;
      counter.dataset.count = count;
      counter.textContent = count;
    }

    function reset() {
      const counter = document.getElementById('counter');
      counter.dataset.count = 0;
      counter.textContent = 0;
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

export default DataAttributes;
