import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const cssVariablesCode = `/* CSS Variables (Custom Properties): Reusable values */

/* ✅ Define variables in :root */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --spacing: 1rem;
  --border-radius: 8px;
  --font-size-base: 16px;
  --font-size-large: 24px;
}

/* ✅ Use variables */
.button {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}

/* ✅ Fallback values */
.element {
  color: var(--undefined-color, #000); /* Falls back to black */
}

/* ✅ Dark theme with variables */
[data-theme="dark"] {
  --primary-color: #60a5fa;
  --text-color: #f3f4f6;
  --bg-color: #1f2937;
}

/* ✅ Responsive variables */
@media (max-width: 768px) {
  :root {
    --spacing: 0.5rem;
    --font-size-base: 14px;
  }
}

/* ✅ Component-scoped variables */
.card {
  --card-padding: 2rem;
  --card-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
}

/* ✅ JavaScript integration */
const root = document.documentElement;

// Get variable value
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--primary-color');

// Set variable value
root.style.setProperty('--primary-color', '#ef4444');

/* ✅ Calculations with variables */
:root {
  --base-size: 16px;
  --large-size: calc(var(--base-size) * 1.5);
  --xlarge-size: calc(var(--base-size) * 2);
}

/* ✅ Color variations */
:root {
  --color-h: 220;
  --color-s: 90%;
  --color-l: 50%;
}

.element {
  background: hsl(var(--color-h), var(--color-s), var(--color-l));
}

.element-light {
  background: hsl(var(--color-h), var(--color-s), 70%);
}`;

const CssVariables = () => {
  return (
    <TopicLayout
      title="CSS Variables"
      route="/css/variables"
      category="css"
      explanation="CSS Variables (Custom Properties) store reusable values. Define with -- prefix, use with var(). Support theming, responsive design, and JavaScript updates. Scope to :root for global or specific selectors for local variables."
      code={cssVariablesCode}
      codeFilename="variables.css"
      whyItMatters="CSS Variables enable dynamic theming, reduce code duplication, and allow runtime updates. Interviewers test understanding of scope, fallbacks, and practical use cases. Essential for maintainable, scalable stylesheets."
      mistakes={[
        "Not using :root for global variables - limits reusability across components.",
        "Missing fallback values - breaks when variable is undefined.",
        "Overusing variables - not everything needs to be a variable, use for repeated values.",
        "Not understanding scope - variables inherit from parent elements.",
      ]}
      practiceTask="Build a theme switcher with light/dark modes using CSS variables. Include color scheme, spacing, and typography. Add JavaScript to toggle themes and persist user preference in localStorage."
    >
      <MultiExampleEditor
        title="🎯 Try It: CSS Variables"
        examples={[
          {
            title: "Basic Usage",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --primary: #3b82f6;
    --secondary: #10b981;
    --danger: #ef4444;
    --spacing: 1rem;
    --radius: 8px;
  }

  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 600px; margin: 0 auto; }
  
  .btn {
    padding: var(--spacing);
    border: none;
    border-radius: var(--radius);
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin: 5px;
    transition: transform 0.2s;
  }
  
  .btn:hover { transform: scale(1.05); }
  
  .btn-primary { background: var(--primary); }
  .btn-secondary { background: var(--secondary); }
  .btn-danger { background: var(--danger); }
  
  .card {
    background: white;
    padding: calc(var(--spacing) * 2);
    border-radius: var(--radius);
    margin: var(--spacing) 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .info {
    background: #dbeafe;
    padding: var(--spacing);
    border-radius: var(--radius);
    border-left: 4px solid var(--primary);
    margin-top: var(--spacing);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>CSS Variables Demo</h2>
      <p>All colors and spacing use CSS variables!</p>
      
      <button class="btn btn-primary">Primary Button</button>
      <button class="btn btn-secondary">Secondary Button</button>
      <button class="btn btn-danger">Danger Button</button>
      
      <div class="info">
        <strong>💡 Benefits:</strong><br>
        • Change one variable, update everywhere<br>
        • Easy to maintain and scale<br>
        • No preprocessor needed
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Theme Switcher",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --bg: #ffffff;
    --text: #1f2937;
    --card-bg: #f9fafb;
    --border: #e5e7eb;
    --primary: #3b82f6;
  }

  [data-theme="dark"] {
    --bg: #1f2937;
    --text: #f3f4f6;
    --card-bg: #374151;
    --border: #4b5563;
    --primary: #60a5fa;
  }

  body {
    font-family: system-ui;
    padding: 40px;
    background: var(--bg);
    color: var(--text);
    transition: all 0.3s;
    margin: 0;
  }

  .container { max-width: 600px; margin: 0 auto; }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: var(--card-bg);
    border-radius: 12px;
    margin-bottom: 20px;
    border: 2px solid var(--border);
  }
  
  .theme-toggle {
    padding: 10px 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }
  
  .card {
    background: var(--card-bg);
    padding: 30px;
    border-radius: 12px;
    border: 2px solid var(--border);
    margin: 20px 0;
  }
  
  .feature {
    padding: 15px;
    background: var(--bg);
    border-radius: 8px;
    margin: 10px 0;
    border-left: 4px solid var(--primary);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Theme Switcher</h2>
      <button class="theme-toggle" onclick="toggleTheme()">
        🌓 Toggle Theme
      </button>
    </div>

    <div class="card">
      <h3>Dynamic Theming</h3>
      <p>Click the button to switch between light and dark themes!</p>
      
      <div class="feature">
        ✅ Smooth transitions
      </div>
      <div class="feature">
        ✅ All colors update instantly
      </div>
      <div class="feature">
        ✅ Uses CSS variables only
      </div>
    </div>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>`
          },
          {
            title: "Responsive Variables",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  :root {
    --container-width: 1200px;
    --spacing: 2rem;
    --font-size: 18px;
    --card-columns: 3;
  }

  @media (max-width: 1024px) {
    :root {
      --container-width: 900px;
      --spacing: 1.5rem;
      --font-size: 16px;
      --card-columns: 2;
    }
  }

  @media (max-width: 768px) {
    :root {
      --container-width: 100%;
      --spacing: 1rem;
      --font-size: 14px;
      --card-columns: 1;
    }
  }

  body {
    font-family: system-ui;
    padding: var(--spacing);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    min-height: 100vh;
  }

  .container {
    max-width: var(--container-width);
    margin: 0 auto;
  }

  h1 {
    color: white;
    font-size: calc(var(--font-size) * 2);
    margin-bottom: var(--spacing);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--card-columns), 1fr);
    gap: var(--spacing);
  }

  .card {
    background: white;
    padding: var(--spacing);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .card h3 {
    font-size: calc(var(--font-size) * 1.2);
    margin-bottom: calc(var(--spacing) / 2);
  }

  .card p {
    font-size: var(--font-size);
    color: #6b7280;
  }

  .info {
    background: white;
    padding: var(--spacing);
    border-radius: 12px;
    margin-top: var(--spacing);
    text-align: center;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>📱 Responsive Variables</h1>

    <div class="grid">
      <div class="card">
        <h3>Card 1</h3>
        <p>Resize window to see layout change!</p>
      </div>
      <div class="card">
        <h3>Card 2</h3>
        <p>Spacing and font sizes adapt automatically.</p>
      </div>
      <div class="card">
        <h3>Card 3</h3>
        <p>Grid columns change based on screen size.</p>
      </div>
    </div>

    <div class="info">
      <strong>💡 Breakpoints:</strong><br>
      Desktop: 3 columns | Tablet: 2 columns | Mobile: 1 column
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "JavaScript Control",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --primary-h: 220;
    --primary-s: 90%;
    --primary-l: 50%;
    --size: 100px;
  }

  body {
    font-family: system-ui;
    padding: 40px;
    background: #f3f4f6;
    margin: 0;
  }

  .container { max-width: 600px; margin: 0 auto; }

  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }

  .box {
    width: var(--size);
    height: var(--size);
    background: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
    border-radius: 12px;
    margin: 20px auto;
    transition: all 0.3s;
  }

  .controls {
    display: grid;
    gap: 15px;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .control-group label {
    min-width: 80px;
    font-weight: 600;
  }

  input[type="range"] {
    flex: 1;
    cursor: pointer;
  }

  .value {
    min-width: 60px;
    text-align: right;
    font-weight: bold;
    color: #3b82f6;
  }

  button {
    padding: 12px 24px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 10px;
  }

  button:hover { background: #2563eb; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>🎨 Dynamic CSS Variables</h2>
      <div class="box"></div>

      <div class="controls">
        <div class="control-group">
          <label>Hue:</label>
          <input type="range" id="hue" min="0" max="360" value="220" oninput="updateColor()">
          <span class="value" id="hueValue">220</span>
        </div>

        <div class="control-group">
          <label>Saturation:</label>
          <input type="range" id="sat" min="0" max="100" value="90" oninput="updateColor()">
          <span class="value" id="satValue">90%</span>
        </div>

        <div class="control-group">
          <label>Lightness:</label>
          <input type="range" id="light" min="0" max="100" value="50" oninput="updateColor()">
          <span class="value" id="lightValue">50%</span>
        </div>

        <div class="control-group">
          <label>Size:</label>
          <input type="range" id="size" min="50" max="300" value="100" oninput="updateSize()">
          <span class="value" id="sizeValue">100px</span>
        </div>

        <button onclick="randomize()">🎲 Randomize</button>
      </div>
    </div>
  </div>

  <script>
    const root = document.documentElement;

    function updateColor() {
      const h = document.getElementById('hue').value;
      const s = document.getElementById('sat').value;
      const l = document.getElementById('light').value;

      root.style.setProperty('--primary-h', h);
      root.style.setProperty('--primary-s', s + '%');
      root.style.setProperty('--primary-l', l + '%');

      document.getElementById('hueValue').textContent = h;
      document.getElementById('satValue').textContent = s + '%';
      document.getElementById('lightValue').textContent = l + '%';
    }

    function updateSize() {
      const size = document.getElementById('size').value;
      root.style.setProperty('--size', size + 'px');
      document.getElementById('sizeValue').textContent = size + 'px';
    }

    function randomize() {
      document.getElementById('hue').value = Math.random() * 360;
      document.getElementById('sat').value = 50 + Math.random() * 50;
      document.getElementById('light').value = 30 + Math.random() * 40;
      document.getElementById('size').value = 100 + Math.random() * 150;
      updateColor();
      updateSize();
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

export default CssVariables;
