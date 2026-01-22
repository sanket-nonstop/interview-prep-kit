import { TopicLayout } from '@/components/TopicLayout';

const conditionalRenderingCode = `// React Conditional Rendering: Displaying content based on conditions

// ✅ Basic Conditional Rendering with if/else
const UserGreeting: React.FC<{ user: User | null }> = ({ user }) => {
  if (user) {
    return <h1>Welcome back, {user.name}!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
};

// ✅ Ternary Operator (Inline Conditional)
const LoginStatus: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};

// ✅ Logical AND Operator (&&)
const Notification: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {message && (
        <div className="notification">
          {message}
        </div>
      )}
    </div>
  );
};

// ✅ Multiple Conditions
const UserStatus: React.FC<{ user: User | null; loading: boolean; error: string | null }> = ({
  user,
  loading,
  error
}) => {
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  
  if (!user) {
    return <div className="empty">No user found</div>;
  }
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// ✅ Switch Statement Pattern
const StatusBadge: React.FC<{ status: 'pending' | 'approved' | 'rejected' | 'draft' }> = ({ status }) => {
  const renderStatus = () => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-yellow">Pending Review</span>;
      case 'approved':
        return <span className="badge badge-green">Approved</span>;
      case 'rejected':
        return <span className="badge badge-red">Rejected</span>;
      case 'draft':
        return <span className="badge badge-gray">Draft</span>;
      default:
        return <span className="badge badge-gray">Unknown</span>;
    }
  };
  
  return <div>{renderStatus()}</div>;
};

// ✅ Conditional Rendering with Arrays
const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ✅ Conditional Rendering with Complex Logic
const ProductCard: React.FC<{ product: Product; user: User | null }> = ({ product, user }) => {
  const canPurchase = user && user.isActive && product.inStock;
  const showDiscount = product.discount > 0;
  const isPremiumUser = user?.subscription === 'premium';
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      
      {/* Price with conditional discount */}
      <div className="price">
        {showDiscount ? (
          <>
            <span className="original-price">\${product.price}</span>
            <span className="discounted-price">
              \${(product.price * (1 - product.discount / 100)).toFixed(2)}
            </span>
          </>
        ) : (
          <span>\${product.price}</span>
        )}
      </div>
      
      {/* Stock status */}
      {!product.inStock && (
        <div className="out-of-stock">Out of Stock</div>
      )}
      
      {/* Premium badge */}
      {isPremiumUser && (
        <div className="premium-badge">Premium Member</div>
      )}
      
      {/* Purchase button */}
      {canPurchase ? (
        <button className="btn-primary">Add to Cart</button>
      ) : (
        <button className="btn-disabled" disabled>
          {!user ? 'Login to Purchase' : 
           !user.isActive ? 'Account Inactive' : 
           'Out of Stock'}
        </button>
      )}
    </div>
  );
};

// ✅ Conditional Rendering with Custom Hook
const usePermissions = (user: User | null) => {
  return {
    canEdit: user?.role === 'admin' || user?.role === 'editor',
    canDelete: user?.role === 'admin',
    canView: !!user,
    isOwner: (itemUserId: string) => user?.id === itemUserId
  };
};

const PostActions: React.FC<{ post: Post; user: User | null }> = ({ post, user }) => {
  const permissions = usePermissions(user);
  
  return (
    <div className="post-actions">
      {permissions.canView && (
        <button>View Details</button>
      )}
      
      {(permissions.canEdit || permissions.isOwner(post.authorId)) && (
        <button>Edit</button>
      )}
      
      {(permissions.canDelete || permissions.isOwner(post.authorId)) && (
        <button className="danger">Delete</button>
      )}
    </div>
  );
};

// ✅ Conditional Rendering with Fragments
const ConditionalFragment: React.FC<{ showExtra: boolean }> = ({ showExtra }) => {
  return (
    <div>
      <h1>Main Content</h1>
      
      {showExtra && (
        <>
          <p>Extra paragraph 1</p>
          <p>Extra paragraph 2</p>
          <button>Extra button</button>
        </>
      )}
    </div>
  );
};

// ✅ Conditional Styling
const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}> = ({ children, variant = 'primary', disabled = false, loading = false }) => {
  return (
    <button
      className={\`btn \${variant ? \`btn-\${variant}\` : ''} \${disabled ? 'disabled' : ''} \${loading ? 'loading' : ''}\`}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

// ✅ Conditional Rendering Performance Optimization
const ExpensiveComponent: React.FC<{ shouldRender: boolean; data: any[] }> = ({ 
  shouldRender, 
  data 
}) => {
  // Use early return to avoid expensive computations
  if (!shouldRender) {
    return null;
  }
  
  // Expensive computation only runs when needed
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }, [data]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

// ✅ Conditional Rendering Patterns
const ConditionalPatterns: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Pattern 1: Guard clauses
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;
  
  // Pattern 2: Render props pattern
  const ConditionalWrapper: React.FC<{
    condition: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }> = ({ condition, children, fallback = null }) => {
    return condition ? <>{children}</> : <>{fallback}</>;
  };
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      
      {/* Using the wrapper */}
      <ConditionalWrapper 
        condition={user.isAdmin}
        fallback={<p>Access denied</p>}
      >
        <AdminPanel />
      </ConditionalWrapper>
      
      {/* Modal rendering */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p>Modal content</p>
        </Modal>
      )}
    </div>
  );
};

// ✅ Common Conditional Rendering Mistakes
const ConditionalMistakes: React.FC = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  
  return (
    <div>
      {/* ❌ Wrong: 0 will render as "0" */}
      {count && <div>Count: {count}</div>}
      
      {/* ✅ Correct: Convert to boolean */}
      {count > 0 && <div>Count: {count}</div>}
      {!!count && <div>Count: {count}</div>}
      
      {/* ❌ Wrong: Empty array is truthy */}
      {items && <div>Items: {items.length}</div>}
      
      {/* ✅ Correct: Check array length */}
      {items.length > 0 && <div>Items: {items.length}</div>}
      
      {/* ❌ Wrong: String "false" is truthy */}
      {"false" && <div>This will render!</div>}
      
      {/* ✅ Correct: Use actual boolean */}
      {false && <div>This won't render</div>}
    </div>
  );
};`;

const ConditionalRendering = () => {
  return (
    <TopicLayout
      title="Conditional Rendering"
      route="/react/conditional-rendering"
      category="react"
      explanation="Conditional rendering in React displays different content based on conditions using if/else statements, ternary operators, logical AND (&&), or early returns. Choose the right pattern based on complexity and readability requirements."
      code={conditionalRenderingCode}
      codeFilename="conditional-rendering.tsx"
      whyItMatters="Conditional rendering is essential for dynamic UIs. Interviewers test understanding of different patterns, performance implications, and common pitfalls. Critical for building responsive, user-friendly interfaces that adapt to different states."
      mistakes={[
        "Using falsy values that render as text - 0, empty string render visibly.",
        "Not handling loading and error states - poor user experience.",
        "Overusing ternary operators - makes code hard to read.",
        "Not optimizing conditional renders - unnecessary computations and re-renders.",
      ]}
      practiceTask="Build a user dashboard that conditionally renders different sections based on user role, loading states, error states, and feature flags. Include proper fallbacks and loading indicators."
    />
  );
};

export default ConditionalRendering;