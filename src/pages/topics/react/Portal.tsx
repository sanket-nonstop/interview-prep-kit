import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const portalCode = `// Portals: Render children into DOM node outside parent hierarchy

import { createPortal } from 'react-dom';

// ✅ Modal with Portal - Industry Standard
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';
    
    // ESC key to close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

// ✅ Toast Notifications with Portal
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = (message: string, type: Toast['type']) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };
  
  return createPortal(
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={\`toast toast-\${toast.type}\`}>
          {toast.message}
        </div>
      ))}
    </div>,
    document.getElementById('toast-root')!
  );
}

// ✅ Tooltip with Portal - Positioned Correctly
interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };
  
  const handleMouseEnter = () => {
    updatePosition();
    setShow(true);
  };
  
  return (
    <>
      {React.cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: () => setShow(false)
      })}
      
      {show && createPortal(
        <div 
          className="tooltip"
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}

// ✅ Drawer/Sidebar with Portal
function Drawer({ isOpen, onClose, children }: ModalProps) {
  return createPortal(
    <div className={\`drawer \${isOpen ? 'open' : ''}\`}>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-content">
        {children}
      </div>
    </div>,
    document.getElementById('drawer-root')!
  );
}`;

const Portal = () => {
  return (
    <TopicLayout
      title="Portals"
      route="/react/advanced/portals"
      category="react"
      explanation="Portals provide a way to render children into a DOM node that exists outside the parent component's DOM hierarchy. Essential for modals, tooltips, and overlays that need to break out of overflow:hidden containers."
      code={portalCode}
      codeFilename="Portal.tsx"
      whyItMatters="Every production app needs modals, tooltips, or notifications. Portals solve z-index hell and CSS containment issues. Understanding portals shows you can build accessible, properly-layered UIs. Critical for component libraries and design systems."
      mistakes={[
        "Forgetting to create portal root in HTML: Add <div id='modal-root'></div>",
        "Not handling focus trap: Modals should trap focus for accessibility",
        "Memory leaks: Always cleanup event listeners in useEffect",
        "Missing backdrop click: Users expect clicking outside to close"
      ]}
      practiceTask="Build a <ContextMenu> component using portals that appears at cursor position on right-click. Handle edge cases: near screen edges, nested menus, and closing on outside click or ESC key."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Portals"
        examples={[
          {
            title: "Modal Portal",
            code: `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial; padding: 40px; background: #f0f4f8; }
    .app { background: white; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    button { padding: 12px 24px; background: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
    button:hover { background: #2563EB; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 12px; max-width: 400px; position: relative; animation: slideIn 0.3s; }
    @keyframes slideIn { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .modal-close { position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer; color: #666; }
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
  <script type="text/babel">
    const { useState } = React;
    const { createPortal } = ReactDOM;
    
    function Modal({ isOpen, onClose, children }) {
      if (!isOpen) return null;
      
      return createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>
            {children}
          </div>
        </div>,
        document.getElementById('modal-root')
      );
    }
    
    function App() {
      const [isOpen, setIsOpen] = useState(false);
      
      return (
        <div className="app">
          <h1>🚪 Portal Modal</h1>
          <p>Click button to open modal rendered via Portal</p>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
          
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h2>✨ Modal Content</h2>
            <p>This is rendered outside the parent DOM hierarchy!</p>
            <p>Press ESC or click outside to close.</p>
          </Modal>
        </div>
      );
    }
    
    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Portal;
