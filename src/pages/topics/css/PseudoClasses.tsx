import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const pseudoClassesCode = `/* CSS Pseudo-classes: Select elements based on state */

/* ✅ User interaction pseudo-classes */
a:hover { color: blue; }
a:active { color: red; }
a:focus { outline: 2px solid blue; }
a:visited { color: purple; }

button:hover { background: #2563eb; }
button:active { transform: scale(0.95); }
button:focus { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); }
button:disabled { opacity: 0.5; cursor: not-allowed; }

/* ✅ Structural pseudo-classes */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f3f4f6; }
li:nth-child(even) { background: white; }
li:nth-child(3) { color: red; } /* 3rd element */
li:nth-child(3n) { color: blue; } /* Every 3rd */
li:nth-child(3n+1) { color: green; } /* 1st, 4th, 7th... */

/* ✅ Type-based selectors */
p:first-of-type { margin-top: 0; }
p:last-of-type { margin-bottom: 0; }
p:nth-of-type(2) { font-size: 1.2em; }

/* ✅ Form pseudo-classes */
input:focus { border-color: #3b82f6; }
input:valid { border-color: #10b981; }
input:invalid { border-color: #ef4444; }
input:required { border-left: 3px solid #f59e0b; }
input:optional { border-left: 3px solid #6b7280; }
input:checked + label { font-weight: bold; }
input:disabled { background: #f3f4f6; }

/* ✅ Content pseudo-classes */
p:empty { display: none; }
div:not(.active) { opacity: 0.5; }
div:only-child { margin: 0 auto; }

/* ✅ Link pseudo-classes (LVHA order) */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* ✅ Target pseudo-class */
:target { background: yellow; }

/* ✅ Root pseudo-class */
:root { --primary: #3b82f6; }`;

const PseudoClasses = () => {
  return (
    <TopicLayout
      title="CSS Pseudo-classes"
      route="/css/pseudo-classes"
      category="css"
      explanation="Pseudo-classes select elements based on state or position. Use :hover, :focus, :active for interactions, :nth-child() for patterns, :valid/:invalid for forms, :first-child/:last-child for structure. Remember LVHA order for links."
      code={pseudoClassesCode}
      codeFilename="pseudo-classes.css"
      whyItMatters="Pseudo-classes enable dynamic styling without JavaScript. Interviewers test knowledge of nth-child patterns, form states, and specificity. Essential for interactive, accessible interfaces."
      mistakes={[
        "Wrong link order - use LVHA (:link, :visited, :hover, :active) to avoid specificity issues.",
        "Forgetting :focus styles - breaks keyboard navigation and accessibility.",
        "Confusing :nth-child() and :nth-of-type() - child counts all elements, of-type counts specific type.",
        "Not using :not() - leads to repetitive overrides instead of exclusion.",
      ]}
      practiceTask="Build a data table with alternating row colors using :nth-child(), highlight focused form inputs, create a navigation menu with hover effects, and style valid/invalid form states."
    >
      <MultiExampleEditor
        title="🎯 Try It: Pseudo-classes"
        examples={[
          {
            title: "Hover & Focus States",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 600px; margin: 0 auto; }
  
  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .btn {
    padding: 12px 24px;
    margin: 5px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .btn-primary {
    background: #3b82f6;
    color: white;
  }
  
  .btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
  
  .btn-primary:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.4);
  }
  
  .btn-primary:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  .btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
  
  .link {
    color: #3b82f6;
    text-decoration: none;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .link:hover {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .link:active {
    background: #bfdbfe;
  }
  
  .link:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  .link:visited {
    color: #8b5cf6;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s;
    margin: 10px 0;
  }
  
  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  input:hover {
    border-color: #9ca3af;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>Button States</h2>
      <button class="btn btn-primary">Hover Me</button>
      <button class="btn btn-primary" disabled>Disabled</button>
      <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">
        Try hovering, clicking, and tabbing (focus)
      </p>
    </div>

    <div class="card">
      <h2>Link States</h2>
      <p>
        <a href="#" class="link">Normal Link</a> |
        <a href="#visited" class="link">Visited Link</a>
      </p>
      <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">
        Links change color on hover, active, and visited states
      </p>
    </div>

    <div class="card">
      <h2>Input Focus</h2>
      <input type="text" placeholder="Click to focus">
      <input type="text" placeholder="Tab to this input">
      <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">
        Inputs highlight with blue border and shadow on focus
      </p>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "nth-child Patterns",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; margin: 0; }
  .container { max-width: 800px; margin: 0 auto; }
  h1 { color: white; text-align: center; margin-bottom: 30px; }
  
  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    margin-bottom: 20px;
  }
  
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .list li {
    padding: 15px;
    margin: 5px 0;
    border-radius: 8px;
    transition: all 0.3s;
  }
  
  .list li:hover {
    transform: translateX(10px);
  }
  
  /* Alternating colors */
  .zebra li:nth-child(odd) {
    background: #f3f4f6;
  }
  
  .zebra li:nth-child(even) {
    background: #e5e7eb;
  }
  
  /* Every 3rd element */
  .every-third li:nth-child(3n) {
    background: #dbeafe;
    border-left: 4px solid #3b82f6;
    font-weight: 600;
  }
  
  /* First and last */
  .first-last li:first-child {
    background: #d1fae5;
    border-left: 4px solid #10b981;
    font-weight: 600;
  }
  
  .first-last li:last-child {
    background: #fee2e2;
    border-left: 4px solid #ef4444;
    font-weight: 600;
  }
  
  /* Complex pattern */
  .pattern li:nth-child(3n+1) {
    background: #dbeafe;
  }
  
  .pattern li:nth-child(3n+2) {
    background: #fef3c7;
  }
  
  .pattern li:nth-child(3n) {
    background: #d1fae5;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>🎨 nth-child Patterns</h1>

    <div class="card">
      <h3>Zebra Stripes (odd/even)</h3>
      <ul class="list zebra">
        <li>Item 1 (odd)</li>
        <li>Item 2 (even)</li>
        <li>Item 3 (odd)</li>
        <li>Item 4 (even)</li>
        <li>Item 5 (odd)</li>
      </ul>
    </div>

    <div class="card">
      <h3>Every 3rd Element (3n)</h3>
      <ul class="list every-third">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3 ← Highlighted</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6 ← Highlighted</li>
      </ul>
    </div>

    <div class="card">
      <h3>First & Last Child</h3>
      <ul class="list first-last">
        <li>First Item (green)</li>
        <li>Middle Item</li>
        <li>Middle Item</li>
        <li>Last Item (red)</li>
      </ul>
    </div>

    <div class="card">
      <h3>Complex Pattern (3n+1, 3n+2, 3n)</h3>
      <ul class="list pattern">
        <li>Item 1 (blue)</li>
        <li>Item 2 (yellow)</li>
        <li>Item 3 (green)</li>
        <li>Item 4 (blue)</li>
        <li>Item 5 (yellow)</li>
        <li>Item 6 (green)</li>
      </ul>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Form States",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 600px; margin: 0 auto; }
  
  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #374151;
  }
  
  input, select {
    width: 100%;
    padding: 12px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  input:valid {
    border-color: #10b981;
  }
  
  input:invalid:not(:placeholder-shown) {
    border-color: #ef4444;
  }
  
  input:required {
    border-left: 4px solid #f59e0b;
  }
  
  input:optional {
    border-left: 4px solid #6b7280;
  }
  
  input:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  input[type="checkbox"]:checked + label {
    color: #3b82f6;
    font-weight: bold;
  }
  
  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .checkbox-group input {
    width: auto;
  }
  
  .checkbox-group label {
    margin: 0;
  }
  
  .info {
    background: #dbeafe;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    border-left: 4px solid #3b82f6;
    font-size: 14px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>Form Pseudo-classes</h2>
      
      <form>
        <div class="form-group">
          <label>Email (Required) *</label>
          <input type="email" placeholder="Enter email" required>
        </div>

        <div class="form-group">
          <label>Website (Optional)</label>
          <input type="url" placeholder="https://example.com">
        </div>

        <div class="form-group">
          <label>Age (18-100)</label>
          <input type="number" min="18" max="100" placeholder="Enter age">
        </div>

        <div class="form-group">
          <label>Disabled Input</label>
          <input type="text" value="Cannot edit" disabled>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="terms">
          <label for="terms">I agree to terms (check me)</label>
        </div>
      </form>

      <div class="info">
        <strong>💡 Form States:</strong><br>
        • Required fields have orange left border<br>
        • Valid inputs turn green<br>
        • Invalid inputs turn red<br>
        • Checked checkbox makes label blue & bold
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Advanced Selectors",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #1f2937; color: white; margin: 0; }
  .container { max-width: 800px; margin: 0 auto; }
  
  .card {
    background: #374151;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
  
  /* :not() selector */
  .buttons button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }
  
  .buttons button:not(.primary) {
    background: #6b7280;
    color: white;
  }
  
  .buttons button.primary {
    background: #3b82f6;
    color: white;
  }
  
  /* :first-of-type, :last-of-type */
  .content p:first-of-type {
    font-size: 1.2em;
    color: #60a5fa;
  }
  
  .content p:last-of-type {
    font-style: italic;
    color: #9ca3af;
  }
  
  /* :empty */
  .box {
    width: 100px;
    height: 100px;
    border: 2px solid #4b5563;
    border-radius: 8px;
    display: inline-block;
    margin: 10px;
    padding: 10px;
  }
  
  .box:empty {
    background: #ef4444;
  }
  
  .box:empty::before {
    content: "Empty";
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .box:not(:empty) {
    background: #10b981;
  }
  
  /* :only-child */
  .parent div:only-child {
    background: #f59e0b;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  
  .list {
    list-style: none;
    padding: 0;
  }
  
  .list li {
    padding: 10px;
    margin: 5px 0;
    background: #4b5563;
    border-radius: 6px;
  }
  
  .list li:hover:not(.disabled) {
    background: #3b82f6;
    transform: translateX(10px);
    transition: all 0.3s;
  }
  
  .list li.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>🎯 Advanced Pseudo-classes</h1>

    <div class="card">
      <h3>:not() Selector</h3>
      <div class="buttons">
        <button>Default</button>
        <button class="primary">Primary</button>
        <button>Default</button>
      </div>
      <p style="color: #9ca3af; font-size: 14px; margin-top: 10px;">
        All buttons except .primary are gray
      </p>
    </div>

    <div class="card">
      <h3>:first-of-type & :last-of-type</h3>
      <div class="content">
        <p>First paragraph is larger and blue</p>
        <p>Middle paragraph is normal</p>
        <p>Last paragraph is italic and gray</p>
      </div>
    </div>

    <div class="card">
      <h3>:empty Selector</h3>
      <div class="box"></div>
      <div class="box">Has Content</div>
      <div class="box"></div>
      <p style="color: #9ca3af; font-size: 14px; margin-top: 10px;">
        Empty boxes are red, filled boxes are green
      </p>
    </div>

    <div class="card">
      <h3>:only-child</h3>
      <div class="parent">
        <div>I'm the only child (orange)</div>
      </div>
    </div>

    <div class="card">
      <h3>:hover with :not()</h3>
      <ul class="list">
        <li>Hover me</li>
        <li class="disabled">Disabled (no hover)</li>
        <li>Hover me</li>
      </ul>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default PseudoClasses;
