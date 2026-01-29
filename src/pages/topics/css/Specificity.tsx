import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const specificityCode = `/* CSS Specificity & Cascade: Understanding CSS priority rules */

/* ✅ Specificity hierarchy (from lowest to highest):
   1. Universal selector (*) - 0,0,0,0
   2. Type selectors (div, p) - 0,0,0,1
   3. Class selectors (.class) - 0,0,1,0
   4. ID selectors (#id) - 0,1,0,0
   5. Inline styles - 1,0,0,0
   6. !important - overrides everything
*/

/* Type selector - specificity: 0,0,0,1 */
p {
  color: black;
  font-size: 16px;
}

/* Class selector - specificity: 0,0,1,0 */
.text-primary {
  color: blue; /* Wins over p selector */
}

/* ID selector - specificity: 0,1,0,0 */
#main-title {
  color: red; /* Wins over .text-primary */
}

/* Combined selectors - specificity: 0,0,1,1 */
div.text-primary {
  color: green; /* More specific than .text-primary alone */
}

/* Multiple classes - specificity: 0,0,2,0 */
.card.featured {
  background: yellow;
}

/* ✅ Cascade order matters when specificity is equal */
.button {
  background: blue;
}

.button {
  background: red; /* This wins - same specificity, later in source */
}

/* ✅ Managing specificity in large projects */

/* Low specificity base styles */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}

/* Modifier classes with same specificity level */
.btn--primary {
  background: #007bff;
  color: white;
}

.btn--secondary {
  background: #6c757d;
  color: white;
}

.btn--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* ✅ CSS Custom Properties (CSS Variables) */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 1rem;
  --spacing-unit: 0.5rem;
}

.component {
  color: var(--primary-color);
  font-size: var(--font-size-base);
  padding: calc(var(--spacing-unit) * 2);
}

/* ✅ Avoiding specificity wars */

/* Bad: High specificity, hard to override */
.sidebar .widget .title h3 {
  color: red;
}

/* Good: Lower specificity, easier to manage */
.widget-title {
  color: red;
}

/* ✅ Using CSS Modules or styled-components approach */
.card {
  /* Base card styles */
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card__header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.card__body {
  padding: 1rem;
}

.card__footer {
  padding: 1rem;
  background: #f8f9fa;
}

/* ✅ Utility classes with consistent specificity */
.text-center { text-align: center !important; }
.text-left { text-align: left !important; }
.text-right { text-align: right !important; }

.mb-0 { margin-bottom: 0 !important; }
.mb-1 { margin-bottom: 0.25rem !important; }
.mb-2 { margin-bottom: 0.5rem !important; }

/* ✅ Modern CSS with layers (CSS Cascade Layers) */
@layer base, components, utilities;

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }
}

@layer components {
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}

@layer utilities {
  .text-center {
    text-align: center;
  }
}

/* ✅ Debugging specificity */
/* Use browser dev tools to see computed specificity */
/* Or use online calculators like specificity.keegan.st */

/* Example of specificity calculation:
   #nav .menu li a:hover
   = 1 ID + 1 class + 2 elements + 1 pseudo-class
   = 0,1,2,2
*/`;

const Specificity = () => {
  return (
    <TopicLayout
      title="Specificity & Cascade"
      route="/css/specificity"
      category="css"
      explanation="CSS specificity determines which styles apply when multiple rules target the same element. The cascade resolves conflicts using specificity, source order, and importance. Understanding these rules is crucial for maintainable CSS architecture."
      code={specificityCode}
      codeFilename="specificity.css"
      whyItMatters="Specificity issues cause many CSS bugs and maintenance problems. Interviewers test understanding of the cascade, specificity calculation, and strategies for managing complex stylesheets. Essential for writing scalable, maintainable CSS."
      mistakes={[
        "Overusing !important - makes styles hard to override and maintain.",
        "Writing overly specific selectors - creates specificity wars and brittle code.",
        "Not understanding cascade order - styles don't apply as expected.",
        "Mixing different CSS methodologies - creates inconsistent specificity patterns.",
      ]}
      practiceTask="Debug a stylesheet with conflicting styles, calculate specificity values for complex selectors, and refactor high-specificity CSS into a maintainable BEM or utility-first architecture."
    >
      <MultiExampleEditor
        title="🎯 Try It: CSS Specificity"
        examples={[
          {
            title: "Specificity Battle",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  /* Type selector: 0,0,0,1 */
  p { color: black; font-size: 16px; }
  
  /* Class selector: 0,0,1,0 - WINS over type */
  .text-blue { color: blue; }
  
  /* ID selector: 0,1,0,0 - WINS over class */
  #special { color: red; }
  
  /* Combined: 0,0,1,1 */
  p.text-blue { color: green; font-weight: bold; }
  
  /* Multiple classes: 0,0,2,0 */
  .text-blue.highlight { background: yellow; padding: 4px; }
  
  body { margin: 0; padding: 40px; font-family: system-ui; background: #f3f4f6; }
  .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-top: 0; }
</style>
</head>
<body>
  <div class="container">
    <h2>🎯 Specificity Examples</h2>
    <p>Black text (type selector)</p>
    <p class="text-blue">Blue text (class wins)</p>
    <p id="special">Red text (ID wins)</p>
    <p class="text-blue">Green bold (p.class wins)</p>
    <p class="text-blue highlight">Blue on yellow (2 classes)</p>
  </div>
</body>
</html>`
          },
          {
            title: "Cascade Order",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 600px; margin: 0 auto; }
  
  /* First declaration */
  .btn { background: blue; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 10px; }
  
  /* Same specificity - LATER WINS */
  .btn { background: #10b981; }
  
  /* Modifier with same specificity level */
  .btn-primary { background: #3b82f6; }
  .btn-danger { background: #ef4444; }
  
  /* Source order matters! */
  .btn-primary { box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
  
  h2 { color: white; text-align: center; }
</style>
</head>
<body>
  <div class="container">
    <h2>📋 Cascade Order Demo</h2>
    <button class="btn">Green (later rule wins)</button>
    <button class="btn btn-primary">Blue (modifier)</button>
    <button class="btn btn-danger">Red (modifier)</button>
  </div>
</body>
</html>`
          },
          {
            title: "BEM Methodology",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #f5f5f5; }
  
  /* Block */
  .card { background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px; margin: 20px auto; }
  
  /* Element */
  .card__header { padding-bottom: 15px; border-bottom: 2px solid #e5e7eb; margin-bottom: 15px; }
  .card__title { font-size: 1.5rem; color: #1f2937; margin: 0; }
  .card__body { color: #6b7280; line-height: 1.6; }
  .card__footer { padding-top: 15px; border-top: 1px solid #e5e7eb; margin-top: 15px; display: flex; gap: 10px; }
  
  /* Modifier */
  .card--featured { border: 3px solid #3b82f6; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2); }
  .card--featured .card__title { color: #3b82f6; }
  
  .card--dark { background: #1f2937; color: white; }
  .card--dark .card__title { color: white; }
  .card--dark .card__body { color: #d1d5db; }
  
  /* Button variations */
  .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
  .btn--primary { background: #3b82f6; color: white; }
  .btn--secondary { background: #6b7280; color: white; }
  
  .info { background: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px auto; max-width: 600px; }
</style>
</head>
<body>
  <div class="info">
    <strong>BEM (Block Element Modifier)</strong><br>
    Low specificity (all classes) = Easy to override<br>
    Consistent naming = Easy to maintain
  </div>
  
  <div class="card">
    <div class="card__header">
      <h2 class="card__title">Normal Card</h2>
    </div>
    <div class="card__body">
      This is a standard card using BEM methodology.
    </div>
    <div class="card__footer">
      <button class="btn btn--primary">Primary</button>
      <button class="btn btn--secondary">Secondary</button>
    </div>
  </div>
  
  <div class="card card--featured">
    <div class="card__header">
      <h2 class="card__title">Featured Card</h2>
    </div>
    <div class="card__body">
      Modified with .card--featured for special styling.
    </div>
    <div class="card__footer">
      <button class="btn btn--primary">Action</button>
    </div>
  </div>
  
  <div class="card card--dark">
    <div class="card__header">
      <h2 class="card__title">Dark Card</h2>
    </div>
    <div class="card__body">
      Modified with .card--dark for dark theme.
    </div>
    <div class="card__footer">
      <button class="btn btn--primary">Action</button>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Specificity Debugging",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 800px; margin: 0 auto; }
  h1 { color: white; text-align: center; margin-bottom: 30px; }
  
  .card { background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; }
  
  /* Specificity: 0,0,0,1 */
  p { color: black; background: #f3f4f6; padding: 10px; border-radius: 4px; }
  
  /* Specificity: 0,0,1,0 - WINS */
  .text-blue { color: blue; background: #dbeafe; }
  
  /* Specificity: 0,0,1,1 - WINS over .text-blue */
  p.text-blue { color: green; background: #d1fae5; font-weight: bold; }
  
  /* Specificity: 0,1,0,0 - WINS over everything */
  #special { color: red; background: #fee2e2; }
  
  .specificity-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  .specificity-table th, .specificity-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
  .specificity-table th { background: #f3f4f6; font-weight: 600; }
  .specificity-table tr:hover { background: #f9fafb; }
  
  .code { background: #1f2937; color: #10b981; padding: 2px 6px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 0.875rem; }
</style>
</head>
<body>
  <div class="container">
    <h1>🔍 Specificity Debugging</h1>
    
    <div class="card">
      <h2>Live Examples</h2>
      <p>Black text (p selector)</p>
      <p class="text-blue">Green text (p.text-blue wins)</p>
      <p id="special" class="text-blue">Red text (ID wins all)</p>
      
      <table class="specificity-table">
        <thead>
          <tr>
            <th>Selector</th>
            <th>Specificity</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="code">p</span></td>
            <td>0,0,0,1</td>
            <td>❌ Loses</td>
          </tr>
          <tr>
            <td><span class="code">.text-blue</span></td>
            <td>0,0,1,0</td>
            <td>❌ Loses to p.text-blue</td>
          </tr>
          <tr>
            <td><span class="code">p.text-blue</span></td>
            <td>0,0,1,1</td>
            <td>✅ Wins (higher than class alone)</td>
          </tr>
          <tr>
            <td><span class="code">#special</span></td>
            <td>0,1,0,0</td>
            <td>✅ Wins (ID beats everything)</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="card">
      <h3>💡 Debugging Tips</h3>
      <ul style="line-height: 2;">
        <li>Use browser DevTools to see computed styles</li>
        <li>Look for crossed-out rules (overridden)</li>
        <li>Check specificity calculator tools</li>
        <li>Avoid !important unless absolutely necessary</li>
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

export default Specificity;