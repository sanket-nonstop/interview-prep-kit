import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const modulesCode = `// ES Modules: Modern JavaScript module system

// ✅ Named exports
// utils.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

export const API_BASE_URL = 'https://api.example.com';

// ✅ Default export
// UserService.ts
class UserService {
  private baseUrl = API_BASE_URL;
  
  async getUser(id: string) {
    const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
    return response.json();
  }
  
  async updateUser(id: string, data: Partial<User>) {
    const response = await fetch(\`\${this.baseUrl}/users/\${id}\`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

export default UserService;

// ✅ Mixed exports
// constants.ts
export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745'
} as const;

export type ColorKey = keyof typeof COLORS;

const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  isDevelopment: process.env.NODE_ENV === 'development'
};

export default config;

// ✅ Importing patterns
// app.ts
import UserService from './UserService'; // Default import
import { formatCurrency, debounce, API_BASE_URL } from './utils'; // Named imports
import config, { COLORS, type ColorKey } from './constants'; // Mixed imports

// Namespace import
import * as utils from './utils';
console.log(utils.formatCurrency(100));

// Dynamic imports for code splitting
const loadUserModule = async () => {
  const { default: UserService } = await import('./UserService');
  return new UserService();
};

// ✅ Re-exports for barrel pattern
// index.ts (barrel file)
export { formatCurrency, debounce } from './utils';
export { default as UserService } from './UserService';
export { COLORS } from './constants';
export type { ColorKey } from './constants';

// ✅ Module patterns in React
// hooks/index.ts
export { default as useLocalStorage } from './useLocalStorage';
export { default as useDebounce } from './useDebounce';
export { default as useFetch } from './useFetch';

// components/index.ts
export { default as Button } from './Button';
export { default as Modal } from './Modal';
export { default as Form } from './Form';

// Usage
import { useLocalStorage, useDebounce } from '@/hooks';
import { Button, Modal } from '@/components';`;

const Modules = () => {
  return (
    <TopicLayout
      title="ES Modules"
      route="/javascript/modules"
      category="javascript"
      explanation="ES Modules provide a standardized way to organize and share JavaScript code. Use named exports for utilities, default exports for main classes/components, and dynamic imports for code splitting. Barrel files (index.ts) create clean import paths."
      code={modulesCode}
      codeFilename="modules.ts"
      whyItMatters="ES Modules are the foundation of modern JavaScript applications. Interviewers test understanding of import/export patterns, code organization, and tree shaking. Essential for building maintainable, scalable applications with proper dependency management."
      mistakes={[
        "Mixing CommonJS and ES modules - stick to ES modules in modern applications.",
        "Not using barrel files - leads to long, messy import paths.",
        "Circular dependencies - can cause runtime errors and make code hard to understand.",
        "Not leveraging dynamic imports - missing opportunities for code splitting and performance.",
      ]}
      practiceTask="Organize a React app with proper module structure: create barrel files for components and hooks, implement dynamic imports for route-based code splitting, and set up a utils module with tree-shakable exports."
    >
      <MultiExampleEditor
        title="🎯 Try It: ES Modules"
        examples={[
          {
            title: "Named Exports",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #1e293b; color: #e2e8f0; }
  .code { background: #334155; padding: 15px; border-radius: 8px; margin: 10px 0; font-family: 'Courier New'; font-size: 14px; border-left: 4px solid #3b82f6; }
  .output { background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  button:hover { background: #2563eb; }
</style>
</head>
<body>
  <h2>📦 Named Exports Demo</h2>
  <div class="code">
    // utils.js<br>
    export const add = (a, b) => a + b;<br>
    export const multiply = (a, b) => a * b;<br>
    <br>
    // app.js<br>
    import { add, multiply } from './utils';
  </div>
  <button onclick="testNamedExports()">Test Named Exports</button>
  <div id="output"></div>
  
  <script type="module">
    // Simulating named exports
    const utils = {
      add: (a, b) => a + b,
      multiply: (a, b) => a * b,
      subtract: (a, b) => a - b
    };
    
    window.testNamedExports = function() {
      const result1 = utils.add(5, 3);
      const result2 = utils.multiply(4, 7);
      const result3 = utils.subtract(10, 4);
      
      document.getElementById('output').innerHTML = 
        '<div class="output">' +
        '✅ add(5, 3) = ' + result1 + '<br>' +
        '✅ multiply(4, 7) = ' + result2 + '<br>' +
        '✅ subtract(10, 4) = ' + result3 +
        '</div>';
    };
  </script>
</body>
</html>`
          },
          {
            title: "Default vs Named",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; margin: 15px 0; }
  .code { background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; font-family: 'Courier New'; font-size: 13px; margin: 10px 0; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .success { color: #10b981; font-weight: bold; }
</style>
</head>
<body>
  <h2>🎯 Default vs Named Exports</h2>
  
  <div class="card">
    <strong>Default Export:</strong>
    <div class="code">
      export default class User { }<br>
      import User from './User';
    </div>
  </div>
  
  <div class="card">
    <strong>Named Exports:</strong>
    <div class="code">
      export const formatDate = () => { }<br>
      import { formatDate } from './utils';
    </div>
  </div>
  
  <div class="card">
    <strong>Mixed:</strong>
    <div class="code">
      export default config;<br>
      export const API_URL = '...';<br>
      import config, { API_URL } from './config';
    </div>
  </div>
  
  <button onclick="showExample()">Show Example</button>
  <div id="output"></div>
  
  <script type="module">
    window.showExample = function() {
      document.getElementById('output').innerHTML = 
        '<div class="card">' +
        '<span class="success">✅ Best Practice:</span><br>' +
        'Use default export for main class/component<br>' +
        'Use named exports for utilities<br>' +
        'Enables tree-shaking and clear imports!' +
        '</div>';
    };
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Modules;