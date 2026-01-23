import { TopicLayout } from '@/components/TopicLayout';
import { LiveCodeEditor } from '@/components/LiveCodeEditor';

const webApisCode = `// Web Storage APIs: Client-side data persistence

// ✅ localStorage - Persistent storage
const userPreferences = {
  theme: 'dark',
  language: 'en',
  notifications: true
};

// Store data
localStorage.setItem('userPrefs', JSON.stringify(userPreferences));

// Retrieve data
const savedPrefs = JSON.parse(localStorage.getItem('userPrefs') || '{}');

// ✅ sessionStorage - Session-only storage
sessionStorage.setItem('currentSession', JSON.stringify({
  startTime: Date.now(),
  pageViews: 1
}));

// ✅ Safe storage utility functions
class StorageManager {
  static setItem(key: string, value: any, useSession = false): boolean {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage failed:', error);
      return false;
    }
  }
  
  static getItem<T>(key: string, defaultValue: T, useSession = false): T {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage retrieval failed:', error);
      return defaultValue;
    }
  }
  
  static removeItem(key: string, useSession = false): void {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  }
  
  static clear(useSession = false): void {
    const storage = useSession ? sessionStorage : localStorage;
    storage.clear();
  }
}

// ✅ React hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return StorageManager.getItem(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      StorageManager.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// ✅ IndexedDB for complex data
class IndexedDBManager {
  private dbName: string;
  private version: number;
  
  constructor(dbName: string, version = 1) {
    this.dbName = dbName;
    this.version = version;
  }
  
  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }
      };
    });
  }
  
  async addData(storeName: string, data: any): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.add(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async getData(storeName: string, key: any): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// ✅ Cookie utilities
class CookieManager {
  static set(name: string, value: string, days = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    document.cookie = \`\${name}=\${value};expires=\${expires.toUTCString()};path=/;SameSite=Strict\`;
  }
  
  static get(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  static delete(name: string): void {
    document.cookie = \`\${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;\`;
  }
}`;

const WebApis = () => {
  return (
    <div className="space-y-8">
      <TopicLayout
        title="Web Storage APIs"
        route="/html/web-apis"
        category="html"
        explanation="Web Storage APIs provide client-side data persistence. localStorage persists across sessions, sessionStorage lasts only for the session, IndexedDB handles complex data, and cookies work across domains. Each has specific use cases and limitations."
        code={webApisCode}
        codeFilename="web-storage.ts"
        whyItMatters="Client-side storage is essential for user experience and offline functionality. Interviewers test understanding of storage limitations, security considerations, and when to use each API. Critical for building responsive, user-friendly applications."
        mistakes={[
          "Not handling storage quota exceeded errors - can crash the application.",
          "Storing sensitive data in localStorage - it's not secure and persists indefinitely.",
          "Not checking for storage API availability - older browsers may not support them.",
          "Storing large objects without considering performance impact on JSON parsing.",
        ]}
        practiceTask="Build an offline-capable todo app using localStorage for data persistence, sessionStorage for UI state, and implement proper error handling for storage quota limits."
      />

      <div className="border-t pt-8">
        <LiveCodeEditor
          title="Try It Yourself: Web Storage"
          initialCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .container { background: white; padding: 30px; border-radius: 12px; max-width: 600px; }
    input { padding: 10px; border: 2px solid #D1D5DB; border-radius: 6px; width: 200px; margin-right: 10px; }
    button { padding: 10px 20px; background: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 5px; }
    button:hover { background: #2563EB; }
    .output { margin-top: 20px; padding: 15px; background: #F3F4F6; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>localStorage Demo</h2>
    <input id="nameInput" placeholder="Enter your name">
    <button onclick="saveName()">Save</button>
    <button onclick="loadName()">Load</button>
    <button onclick="clearName()">Clear</button>
    <div class="output" id="output">Saved name will appear here</div>
  </div>
  
  <script>
    function saveName() {
      const name = document.getElementById('nameInput').value;
      localStorage.setItem('userName', name);
      document.getElementById('output').textContent = 'Saved: ' + name;
    }
    
    function loadName() {
      const name = localStorage.getItem('userName');
      document.getElementById('output').textContent = name ? 'Loaded: ' + name : 'No name saved';
    }
    
    function clearName() {
      localStorage.removeItem('userName');
      document.getElementById('output').textContent = 'Cleared!';
    }
  </script>
</body>
</html>`}
          height="500px"
        />
      </div>
    </div>
  );
};

export default WebApis;