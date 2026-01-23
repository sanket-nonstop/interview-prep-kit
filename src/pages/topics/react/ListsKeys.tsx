import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Lists & Keys"
        examples={[
          {
            title: "Proper Keys",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .container { max-width: 600px; margin: 0 auto; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; }
  button { background: white; color: #667eea; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; font-weight: 600; }
  button:hover { transform: scale(1.05); }
  .item { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; }
  .delete { background: #ef4444; color: white; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>🔑 Keys Demo</h2>
      <button onclick="addItem()">Add Item</button>
      <button onclick="shuffleItems()">Shuffle</button>
      <div id="list"></div>
    </div>
  </div>
  
  <script>
    let items = [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' }
    ];
    
    function addItem() {
      items.push({ id: Date.now(), text: \`Item \${items.length + 1}\` });
      render();
    }
    
    function deleteItem(id) {
      items = items.filter(item => item.id !== id);
      render();
    }
    
    function shuffleItems() {
      items = items.sort(() => Math.random() - 0.5);
      render();
    }
    
    function render() {
      document.getElementById('list').innerHTML = items.map(item => \`
        <div class="item" data-key="\${item.id}">
          <span>\${item.text} (ID: \${item.id})</span>
          <button class="delete" onclick="deleteItem(\${item.id})">Delete</button>
        </div>
      \`).join('');
    }
    
    render();
  </script>
</body>
</html>`
          },
          {
            title: "Index vs ID Keys",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 700px; margin: 0 auto; }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .column { background: #1e293b; padding: 20px; border-radius: 12px; }
  button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 5px; }
  .item { background: #334155; padding: 10px; border-radius: 6px; margin: 8px 0; }
  .bad { border-left: 4px solid #ef4444; }
  .good { border-left: 4px solid #10b981; }
</style>
</head>
<body>
  <div class="container">
    <h2>⚠️ Index vs ID Keys</h2>
    <div class="columns">
      <div class="column">
        <h3>❌ Bad: Index Keys</h3>
        <button onclick="addBad()">Add to Top</button>
        <div id="badList"></div>
      </div>
      <div class="column">
        <h3>✅ Good: ID Keys</h3>
        <button onclick="addGood()">Add to Top</button>
        <div id="goodList"></div>
      </div>
    </div>
  </div>
  
  <script>
    let badItems = ['A', 'B', 'C'];
    let goodItems = [{ id: 1, text: 'A' }, { id: 2, text: 'B' }, { id: 3, text: 'C' }];
    
    function addBad() {
      badItems.unshift('NEW');
      renderBad();
    }
    
    function addGood() {
      goodItems.unshift({ id: Date.now(), text: 'NEW' });
      renderGood();
    }
    
    function renderBad() {
      document.getElementById('badList').innerHTML = badItems.map((item, index) => \`
        <div class="item bad">Index \${index}: \${item}</div>
      \`).join('');
    }
    
    function renderGood() {
      document.getElementById('goodList').innerHTML = goodItems.map(item => \`
        <div class="item good">ID \${item.id}: \${item.text}</div>
      \`).join('');
    }
    
    renderBad();
    renderGood();
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default ListsKeys;