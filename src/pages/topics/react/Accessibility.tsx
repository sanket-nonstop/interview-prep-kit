import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Accessibility;