import { TopicLayout } from '@/components/TopicLayout';

const listsKeysCode = `// Lists & Keys: Identity and reconciliation in React

// ✅ Proper key usage with stable IDs
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}> {/* Use stable ID from data */}
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ Bad: Using index as key (causes bugs with reordering)
function BadList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> {/* ❌ Breaks when items reorder */}
      ))}
    </ul>
  );
}

// ✅ Index as key is OK for static lists
function StaticList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> {/* ✅ OK if list never changes */}
      ))}
    </ul>
  );
}

// ✅ Complex list with component state
function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // State preserved correctly because of stable key
  return (
    <div>
      {isEditing ? (
        <input defaultValue={task.title} />
      ) : (
        <span>{task.title}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </div>
  );
}

// ✅ Generating stable keys for items without IDs
function CommentList({ comments }: { comments: string[] }) {
  return (
    <ul>
      {comments.map((comment) => {
        // Generate stable key from content (if content is unique)
        const key = comment.slice(0, 50) + comment.length;
        return <li key={key}>{comment}</li>;
      })}
    </ul>
  );
}

// ✅ Nested lists with compound keys
function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item) => (
              <li key={\`\${category.id}-\${item.id}\`}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ✅ Key helps React identify which items changed
function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: 'First' },
    { id: 2, text: 'Second' },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), text: 'New' }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.text}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addItem}>Add</button>
    </div>
  );
}`;

const ListsKeys = () => {
  return (
    <TopicLayout
      title="Lists & Keys"
      route="/react/lists-keys"
      category="react"
      explanation="Keys help React identify which items changed, added, or removed. Use stable IDs from data, not array index (unless list is static). Keys must be unique among siblings. React uses keys for efficient reconciliation and preserving component state."
      code={listsKeysCode}
      codeFilename="lists-keys.tsx"
      whyItMatters="Wrong keys cause bugs: lost state, wrong data, performance issues. Interviewers ask: 'Why not use index as key?', 'What happens without keys?', 'How does reconciliation work?' Shows understanding of React's rendering optimization."
      mistakes={[
        "Index as key with dynamic lists: Reordering breaks state and causes bugs.",
        "Non-unique keys: Duplicate keys confuse React, cause rendering issues.",
        "Random keys: Math.random() as key forces re-render every time.",
        "No keys: React warns and uses index, but you should be explicit.",
      ]}
      practiceTask="Create a sortable todo list where each item has a checkbox and input field. Use proper keys. Test that sorting preserves checkbox state and input focus. Compare behavior with index keys vs ID keys."
    />
  );
};

export default ListsKeys;