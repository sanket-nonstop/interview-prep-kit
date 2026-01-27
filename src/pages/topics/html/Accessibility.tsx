import { TopicLayout } from '@/components/TopicLayout';
import { LiveCodeEditor } from '@/components/LiveCodeEditor';

const accessibilityCode = `<!-- Accessibility (a11y): Building inclusive web experiences -->

<!-- ✅ Semantic HTML structure -->
<header role="banner">
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <!-- Skip link for keyboard users -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <section id="main-content">
    <h1>Page Title</h1>
    
    <!-- Proper heading hierarchy -->
    <article>
      <h2>Article Title</h2>
      <p>Article content...</p>
      
      <h3>Subsection</h3>
      <p>More content...</p>
    </article>
  </section>
</main>

<!-- ✅ Interactive elements with ARIA -->
<button 
  aria-expanded="false" 
  aria-controls="dropdown-menu"
  aria-haspopup="true"
  onclick="toggleDropdown()"
>
  Menu
  <span aria-hidden="true">▼</span>
</button>

<ul id="dropdown-menu" role="menu" aria-hidden="true">
  <li role="menuitem"><a href="/profile">Profile</a></li>
  <li role="menuitem"><a href="/settings">Settings</a></li>
  <li role="menuitem"><a href="/logout">Logout</a></li>
</ul>

<!-- ✅ Form accessibility -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    
    <div class="form-group">
      <label for="name">Full Name *</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        required 
        aria-describedby="name-error"
        aria-invalid="false"
      />
      <div id="name-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password"
        aria-describedby="password-help"
      />
      <div id="password-help" class="help-text">
        Must be at least 8 characters with numbers and symbols
      </div>
    </div>
  </fieldset>
</form>

<!-- ✅ Images with proper alt text -->
<img 
  src="chart.png" 
  alt="Sales increased 25% from January to March 2024"
  role="img"
/>

<!-- Decorative image -->
<img src="decoration.png" alt="" role="presentation" />

<!-- ✅ React accessibility patterns -->
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: ReactNode }> = ({
  isOpen,
  onClose,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Focus management
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Escape key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">Modal Title</h2>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="close-button"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// ✅ Custom hook for announcements
const useAnnouncer = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);
  
  return announce;
};

// ✅ Accessible data table
<table role="table" aria-label="Sales data">
  <caption>Quarterly sales data for 2024</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>$100,000</td>
      <td>+15%</td>
    </tr>
  </tbody>
</table>`;

const Accessibility = () => {
  return (
    <TopicLayout
      title="Accessibility (a11y)"
      route="/html/accessibility"
      category="html"
      explanation="Web accessibility ensures all users, including those with disabilities, can use your website. Use semantic HTML, ARIA attributes, proper focus management, keyboard navigation, and screen reader support. Follow WCAG guidelines for inclusive design."
      code={accessibilityCode}
      codeFilename="accessibility.html"
      whyItMatters="Accessibility is legally required in many jurisdictions and morally essential for inclusive web experiences. Interviewers test understanding of ARIA, keyboard navigation, and screen reader compatibility. Critical for building products that serve all users."
      mistakes={[
        "Using div/span instead of semantic HTML - breaks screen reader navigation.",
        "Missing alt text or using generic descriptions like 'image' - provide meaningful context.",
        "Poor focus management in SPAs - users lose track of where they are.",
        "Color-only information - always provide text or pattern alternatives.",
      ]}
      practiceTask="Build an accessible data dashboard with sortable tables, filterable charts, keyboard navigation, screen reader announcements, and proper focus management. Test with actual screen reader software."
    >
      <LiveCodeEditor
        title="Try It Yourself: Accessible HTML"
        initialCode={`<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .skip-link { position: absolute; top: -40px; left: 0; background: #000; color: #fff; padding: 8px; }
    .skip-link:focus { top: 0; }
    button { padding: 10px 20px; background: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; }
    button:focus { outline: 2px solid #1E40AF; outline-offset: 2px; }
  </style>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  
  <header>
    <h1>Accessible Page</h1>
    <nav aria-label="Main navigation">
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  
  <main id="main">
    <article>
      <h2>Article Title</h2>
      <p>This page demonstrates accessibility features.</p>
      <button aria-label="Like this article">👍</button>
    </article>
  </main>
</body>
</html>`}
        height="500px"
      />
    </TopicLayout>
  );
};

export default Accessibility;