import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Modules;