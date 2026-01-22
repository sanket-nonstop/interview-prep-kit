import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default DOM;