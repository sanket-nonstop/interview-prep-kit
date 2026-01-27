import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const accessibilityCode = `// Accessibility (A11y) Basics in React

// ✅ Semantic HTML for accessibility
function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" required />
      
      <label htmlFor="password">Password</label>
      <input id="password" type="password" required />
      
      <button type="submit">Sign In</button>
    </form>
  );
}

// ✅ ARIA labels for screen readers
function IconButton() {
  return (
    <button aria-label="Close dialog">
      <XIcon /> {/* Icon without text */}
    </button>
  );
}

// ✅ Keyboard navigation
function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Trap focus inside modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      <p>Modal content</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// ✅ Focus management
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="search"
      aria-label="Search topics"
      placeholder="Search..."
    />
  );
}

// ✅ Skip to main content link
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <nav>Navigation</nav>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}

// ✅ Accessible dropdown menu
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      
      {isOpen && (
        <ul role="menu">
          <li role="menuitem">
            <button onClick={() => console.log('Profile')}>Profile</button>
          </li>
          <li role="menuitem">
            <button onClick={() => console.log('Settings')}>Settings</button>
          </li>
        </ul>
      )}
    </div>
  );
}

// ✅ Live regions for dynamic content
function Notifications() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <button onClick={() => setMessage('Item added to cart')}>
        Add to Cart
      </button>
      
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>
    </div>
  );
}

// ✅ Color contrast and visual indicators
function Button({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  return (
    <button
      className={
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500'
      }
    >
      Click me
    </button>
  );
}`;

const Accessibility = () => {
  return (
    <TopicLayout
      title="Accessibility (A11y) Basics"
      route="/react/accessibility"
      category="react"
      explanation="Accessibility makes apps usable for everyone, including people with disabilities. Key principles: semantic HTML, keyboard navigation, ARIA labels, focus management, color contrast. Screen readers rely on proper HTML structure and ARIA attributes."
      code={accessibilityCode}
      codeFilename="accessibility.tsx"
      whyItMatters="Legal requirement in many countries. Good UX for all users. Interviewers ask: 'How to make components accessible?', 'What is ARIA?', 'Keyboard navigation?' Shows professional development practices and empathy for users."
      mistakes={[
        "Divs for everything: Use semantic HTML (button, nav, main, article).",
        "Missing labels: Every input needs associated label or aria-label.",
        "No keyboard support: All interactive elements must work with keyboard.",
        "Poor color contrast: Text must be readable for visually impaired users.",
      ]}
      practiceTask="Create an accessible modal dialog: trap focus inside, close on Escape, return focus to trigger button on close, add proper ARIA attributes (role, aria-modal, aria-labelledby). Test with keyboard only (no mouse)."
    >
      <MultiExampleEditor
        title="🎯 Try It: Accessibility"
        examples={[
          {
            title: "Semantic HTML & ARIA",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  label { display: block; margin: 15px 0 5px; font-weight: 600; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; font-size: 16px; background: #1e293b; color: white; }
  input:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin: 15px 5px 0 0; font-weight: 600; }
  button:hover { background: #2563eb; }
  button:focus { outline: 2px solid #10b981; outline-offset: 2px; }
  .icon-btn { width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
  .output { background: #1e293b; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <h1>♿ Accessibility Demo</h1>
    
    <form onsubmit="handleSubmit(event)">
      <label for="username">Username</label>
      <input id="username" type="text" required aria-required="true" />
      
      <label for="email">Email</label>
      <input id="email" type="email" required aria-required="true" />
      
      <button type="submit">Submit Form</button>
      <button type="button" class="icon-btn" aria-label="Close form" onclick="closeForm()">✕</button>
    </form>
    
    <div id="output" role="status" aria-live="polite"></div>
  </div>
  
  <script>
    function handleSubmit(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      document.getElementById('output').innerHTML = 
        '<div class="output">✅ Form submitted!<br>Username: ' + username + '<br>Email: ' + email + '</div>';
    }
    
    function closeForm() {
      document.getElementById('output').innerHTML = 
        '<div class="output">❌ Form closed (icon button with aria-label)</div>';
    }
  </script>
</body>
</html>`
          },
          {
            title: "Keyboard Navigation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  .menu { background: rgba(255,255,255,0.2); border-radius: 8px; margin: 20px 0; }
  .menu-item { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; }
  .menu-item:last-child { border-bottom: none; }
  .menu-item:hover, .menu-item:focus { background: rgba(255,255,255,0.2); outline: none; }
  .menu-item:focus { box-shadow: inset 0 0 0 2px #fbbf24; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; }
  button:focus { outline: 2px solid #fbbf24; outline-offset: 2px; }
  .info { background: rgba(251, 191, 36, 0.2); padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h2>⌨️ Keyboard Navigation</h2>
    <p>Use Tab to navigate, Enter to select</p>
    
    <button onclick="toggleMenu()">Toggle Menu</button>
    
    <div id="menu" role="menu" style="display: none;">
      <div class="menu">
        <div class="menu-item" role="menuitem" tabindex="0" onclick="select('Profile')" onkeypress="handleKey(event, 'Profile')">👤 Profile</div>
        <div class="menu-item" role="menuitem" tabindex="0" onclick="select('Settings')" onkeypress="handleKey(event, 'Settings')">⚙️ Settings</div>
        <div class="menu-item" role="menuitem" tabindex="0" onclick="select('Logout')" onkeypress="handleKey(event, 'Logout')">🚪 Logout</div>
      </div>
    </div>
    
    <div class="info" id="output">Press Tab to navigate between items</div>
  </div>
  
  <script>
    function toggleMenu() {
      const menu = document.getElementById('menu');
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      if (menu.style.display === 'block') {
        menu.querySelector('.menu-item').focus();
      }
    }
    
    function select(item) {
      document.getElementById('output').textContent = '✅ Selected: ' + item;
    }
    
    function handleKey(e, item) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(item);
      }
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

export default Accessibility;