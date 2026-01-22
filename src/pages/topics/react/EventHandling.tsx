import { TopicLayout } from '@/components/TopicLayout';

const eventHandlingCode = `// React Event Handling: Managing user interactions

// ✅ Basic event handling
const Button: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!');
    console.log('Event type:', e.type);
    console.log('Target:', e.target);
    console.log('Current target:', e.currentTarget);
  };
  
  return <button onClick={handleClick}>Click me</button>;
};

// ✅ Form event handling
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };
  
  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          required
        />
      </div>
      
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
};

// ✅ Keyboard event handling
const SearchInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          setQuery(suggestions[selectedIndex]);
          setSuggestions([]);
          setSelectedIndex(-1);
        }
        break;
        
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mock suggestions
    if (value.length > 0) {
      setSuggestions([
        \`\${value} suggestion 1\`,
        \`\${value} suggestion 2\`,
        \`\${value} suggestion 3\`
      ]);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  };
  
  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="search-input"
      />
      
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => {
                setQuery(suggestion);
                setSuggestions([]);
                setSelectedIndex(-1);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ✅ Mouse events
const DraggableBox: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  return (
    <div
      className="draggable-box"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 100,
        height: 100,
        backgroundColor: isDragging ? 'lightblue' : 'lightgray',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      Drag me!
    </div>
  );
};

// ✅ Event delegation pattern
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: true }
  ]);
  
  // Single event handler for all todo actions
  const handleTodoAction = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const todoId = target.closest('[data-todo-id]')?.getAttribute('data-todo-id');
    
    if (!todoId) return;
    
    const id = parseInt(todoId);
    
    if (target.classList.contains('toggle-btn')) {
      setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } else if (target.classList.contains('delete-btn')) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  };
  
  return (
    <ul className="todo-list" onClick={handleTodoAction}>
      {todos.map(todo => (
        <li key={todo.id} data-todo-id={todo.id} className="todo-item">
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button className="toggle-btn">
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button className="delete-btn">Delete</button>
        </li>
      ))}
    </ul>
  );
};

// ✅ Custom event hook
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback]);
  
  return ref;
};

// Usage of custom hook
const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const modalRef = useClickOutside(onClose);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <h2>Modal Title</h2>
        <p>Modal content goes here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// ✅ Preventing default and stopping propagation
const LinkButton: React.FC<{ href: string; onClick?: () => void }> = ({ 
  href, 
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault(); // Don't navigate
      onClick();
    }
  };
  
  return (
    <a href={href} onClick={handleClick}>
      Click me
    </a>
  );
};

// ✅ Debounced input
const DebouncedInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
};`;

const EventHandling = () => {
  return (
    <TopicLayout
      title="Event Handling"
      route="/react/events"
      category="react"
      explanation="React event handling uses SyntheticEvents that wrap native DOM events. Handle form submissions, keyboard navigation, mouse interactions, and custom events. Use event delegation and custom hooks for complex interactions."
      code={eventHandlingCode}
      codeFilename="events.tsx"
      whyItMatters="Event handling is essential for interactive React applications. Interviewers test understanding of SyntheticEvents, event delegation, preventing defaults, and performance optimization. Critical for building responsive user interfaces."
      mistakes={[
        "Not preventing default behavior when needed - forms submit unexpectedly.",
        "Creating new event handlers in render - causes unnecessary re-renders.",
        "Not cleaning up event listeners - causes memory leaks.",
        "Forgetting to handle keyboard accessibility - breaks screen reader navigation.",
      ]}
      practiceTask="Build an accessible dropdown menu with keyboard navigation (arrow keys, enter, escape), click outside to close, and proper ARIA attributes."
    />
  );
};

export default EventHandling;