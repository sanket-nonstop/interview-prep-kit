import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const domCode = `// DOM Manipulation: Interacting with HTML elements

// ✅ Selecting elements
const elementById = document.getElementById('myElement');
const elementsByClass = document.getElementsByClassName('myClass');
const elementsByTag = document.getElementsByTagName('div');

// Modern selectors (preferred)
const singleElement = document.querySelector('.my-class');
const multipleElements = document.querySelectorAll('div.item');

// ✅ Creating and modifying elements
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'greeting';
newDiv.id = 'greeting-1';

// Setting attributes
newDiv.setAttribute('data-id', '123');
newDiv.setAttribute('aria-label', 'Greeting message');

// ✅ Adding elements to DOM
const container = document.querySelector('#container');
container?.appendChild(newDiv);

// Insert at specific position
const firstChild = container?.firstElementChild;
if (firstChild) {
  container?.insertBefore(newDiv, firstChild);
}

// Modern insertion methods
container?.prepend(newDiv); // Add as first child
container?.append(newDiv); // Add as last child
newDiv.insertAdjacentHTML('afterend', '<p>After the div</p>');

// ✅ Modifying content
const element = document.querySelector('#myElement');
if (element) {
  element.textContent = 'New text content'; // Safe, escapes HTML
  element.innerHTML = '<strong>Bold text</strong>'; // Can execute scripts
  
  // Safer alternative for HTML content
  element.insertAdjacentHTML('beforeend', '<span>Safe HTML</span>');
}

// ✅ Styling elements
if (element) {
  element.style.color = 'blue';
  element.style.backgroundColor = 'lightgray';
  element.style.fontSize = '16px';
  
  // Adding/removing classes
  element.classList.add('active', 'highlighted');
  element.classList.remove('inactive');
  element.classList.toggle('visible');
  
  // Check if class exists
  if (element.classList.contains('active')) {
    console.log('Element is active');
  }
}

// ✅ Event handling
const button = document.querySelector('#myButton');

// Add event listener
button?.addEventListener('click', function(event) {
  console.log('Button clicked!');
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop event bubbling
});

// Arrow function event handler
button?.addEventListener('click', (e) => {
  console.log('Clicked at:', e.clientX, e.clientY);
});

// Remove event listener
const handleClick = (e) => console.log('Clicked');
button?.addEventListener('click', handleClick);
button?.removeEventListener('click', handleClick);

// ✅ Event delegation (efficient for dynamic content)
const list = document.querySelector('#todoList');
list?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  
  if (target.classList.contains('delete-btn')) {
    const todoItem = target.closest('.todo-item');
    todoItem?.remove();
  }
  
  if (target.classList.contains('toggle-btn')) {
    const todoItem = target.closest('.todo-item');
    todoItem?.classList.toggle('completed');
  }
});

// ✅ Form handling
const form = document.querySelector('#contactForm') as HTMLFormElement;
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  console.log('Form data:', data);
  
  // Validate form
  const nameInput = form.querySelector('#name') as HTMLInputElement;
  if (!nameInput.value.trim()) {
    nameInput.classList.add('error');
    return;
  }
  
  // Submit form data
  fetch('/api/contact', {
    method: 'POST',
    body: formData
  });
});

// ✅ Working with attributes and data
const dataElement = document.querySelector('[data-user-id]');
if (dataElement) {
  const userId = dataElement.getAttribute('data-user-id');
  const userName = dataElement.dataset.userName; // data-user-name
  
  // Set data attributes
  dataElement.dataset.lastLogin = new Date().toISOString();
}

// ✅ Traversing the DOM
const currentElement = document.querySelector('.current');
if (currentElement) {
  const parent = currentElement.parentElement;
  const nextSibling = currentElement.nextElementSibling;
  const prevSibling = currentElement.previousElementSibling;
  const children = currentElement.children;
  const firstChild = currentElement.firstElementChild;
  const lastChild = currentElement.lastElementChild;
}

// ✅ Removing elements
const elementToRemove = document.querySelector('.remove-me');
elementToRemove?.remove(); // Modern way
// elementToRemove?.parentNode?.removeChild(elementToRemove); // Old way

// ✅ Cloning elements
const original = document.querySelector('.template');
const clone = original?.cloneNode(true) as HTMLElement; // Deep clone
if (clone) {
  clone.id = 'new-id'; // Change ID to avoid duplicates
  document.body.appendChild(clone);
}

// ✅ Measuring elements
const box = document.querySelector('.box');
if (box) {
  const rect = box.getBoundingClientRect();
  console.log('Position:', rect.left, rect.top);
  console.log('Size:', rect.width, rect.height);
  
  // Scroll position
  console.log('Scroll:', window.scrollX, window.scrollY);
  
  // Element dimensions
  console.log('Client size:', box.clientWidth, box.clientHeight);
  console.log('Offset size:', box.offsetWidth, box.offsetHeight);
}

// ✅ Document ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready');
  // Initialize your app here
});

// ✅ Modern DOM manipulation utility
class DOMHelper {
  static create(tag: string, className?: string, textContent?: string) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }
  
  static find(selector: string) {
    return document.querySelector(selector);
  }
  
  static findAll(selector: string) {
    return Array.from(document.querySelectorAll(selector));
  }
  
  static on(element: Element, event: string, handler: EventListener) {
    element.addEventListener(event, handler);
  }
  
  static off(element: Element, event: string, handler: EventListener) {
    element.removeEventListener(event, handler);
  }
}

// Usage
const newButton = DOMHelper.create('button', 'btn btn-primary', 'Click me');
DOMHelper.on(newButton, 'click', () => console.log('Clicked!'));`;

const DOM = () => {
  return (
    <TopicLayout
      title="DOM Manipulation"
      route="/javascript/dom"
      category="javascript"
      explanation="DOM manipulation allows JavaScript to interact with HTML elements. Use modern methods like querySelector, addEventListener, and classList. Understand event handling, element creation, and traversal for dynamic web pages."
      code={domCode}
      codeFilename="dom.js"
      whyItMatters="DOM manipulation is fundamental for interactive web pages. While React handles most DOM operations, understanding vanilla DOM is crucial for debugging, working with third-party libraries, and technical interviews."
      mistakes={[
        "Using innerHTML with user input - creates XSS vulnerabilities.",
        "Not checking if elements exist before manipulating them.",
        "Adding event listeners without removing them - causes memory leaks.",
        "Using old methods like getElementById when querySelector is more flexible.",
      ]}
      practiceTask="Build a dynamic todo list using vanilla JavaScript: add/remove items, toggle completion, filter by status, and persist data in localStorage."
    >
      <MultiExampleEditor
        title="🎯 Try It: DOM Manipulation"
        examples={[
          {
            title: "Dynamic Element Creation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; margin: 10px 0; font-size: 16px; background: #1e293b; color: white; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
  .item { background: #1e293b; padding: 15px; border-radius: 8px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid #10b981; }
  .delete { background: #ef4444; }
  .delete:hover { background: #dc2626; }
</style>
</head>
<body>
  <div class="container">
    <h2>📦 DOM Element Creation</h2>
    <input id="itemInput" placeholder="Enter item name..." />
    <button onclick="addItem()">Add Item</button>
    <div id="itemList"></div>
  </div>
  
  <script>
    function addItem() {
      const input = document.getElementById('itemInput');
      const text = input.value.trim();
      if (!text) return;
      
      // Create elements
      const item = document.createElement('div');
      item.className = 'item';
      
      const span = document.createElement('span');
      span.textContent = text;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete';
      deleteBtn.onclick = () => item.remove();
      
      item.appendChild(span);
      item.appendChild(deleteBtn);
      
      document.getElementById('itemList').appendChild(item);
      input.value = '';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Event Delegation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .todo { background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; }
  .todo.done { opacity: 0.6; text-decoration: line-through; }
  .toggle { background: #10b981; color: white; }
  .delete { background: #ef4444; color: white; }
</style>
</head>
<body>
  <div class="card">
    <h2>🎯 Event Delegation Demo</h2>
    <button onclick="addTodo()">Add Random Todo</button>
    <div id="todoList"></div>
    <p style="font-size: 12px; opacity: 0.8;">Click todos to toggle, delete button to remove</p>
  </div>
  
  <script>
    const todos = ['Learn DOM', 'Build Project', 'Practice Coding'];
    let counter = 0;
    
    // Event delegation - one listener for all todos
    document.getElementById('todoList').addEventListener('click', (e) => {
      const todo = e.target.closest('.todo');
      if (!todo) return;
      
      if (e.target.classList.contains('delete')) {
        todo.remove();
      } else if (e.target.classList.contains('toggle') || e.target === todo) {
        todo.classList.toggle('done');
      }
    });
    
    function addTodo() {
      const text = todos[counter % todos.length] + ' ' + (++counter);
      const html = \`
        <div class="todo">
          <span class="toggle" style="cursor:pointer;flex:1">\${text}</span>
          <button class="delete">Delete</button>
        </div>
      \`;
      document.getElementById('todoList').insertAdjacentHTML('beforeend', html);
    }
    
    // Add initial todos
    addTodo();
    addTodo();
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default DOM;