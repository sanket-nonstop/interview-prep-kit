import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const compoundComponentsCode = `// Compound Components: Flexible, composable component APIs

// ✅ Basic compound component pattern
const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList = ({ children }: { children: React.ReactNode }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab = ({ index, children }: { index: number; children: React.ReactNode }) => {
  const { activeIndex, setActiveIndex } = useTabsContext();
  
  return (
    <button
      className={activeIndex === index ? 'active' : ''}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children }: { children: React.ReactNode }) => {
  return <div className="tab-panels">{children}</div>;
};

const TabPanel = ({ index, children }: { index: number; children: React.ReactNode }) => {
  const { activeIndex } = useTabsContext();
  return activeIndex === index ? <div>{children}</div> : null;
};

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// ✅ Usage: Flexible and readable
function App() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab index={0}>Profile</Tabs.Tab>
        <Tabs.Tab index={1}>Settings</Tabs.Tab>
        <Tabs.Tab index={2}>Billing</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panels>
        <Tabs.Panel index={0}><ProfileContent /></Tabs.Panel>
        <Tabs.Panel index={1}><SettingsContent /></Tabs.Panel>
        <Tabs.Panel index={2}><BillingContent /></Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}

// ✅ Accordion compound component
const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  
  const toggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ 
  id, 
  children 
}: { 
  id: string; 
  children: React.ReactNode 
}) => {
  return (
    <AccordionItemContext.Provider value={{ id }}>
      <div className="accordion-item">{children}</div>
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger = ({ children }: { children: React.ReactNode }) => {
  const { id } = useAccordionItemContext();
  const { toggle } = useAccordionContext();
  
  return (
    <button onClick={() => toggle(id)}>
      {children}
    </button>
  );
};

const AccordionContent = ({ children }: { children: React.ReactNode }) => {
  const { id } = useAccordionItemContext();
  const { openItems } = useAccordionContext();
  
  return openItems.has(id) ? <div>{children}</div> : null;
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// ✅ Usage
function FAQ() {
  return (
    <Accordion>
      <Accordion.Item id="1">
        <Accordion.Trigger>What is React?</Accordion.Trigger>
        <Accordion.Content>React is a JavaScript library...</Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item id="2">
        <Accordion.Trigger>What are hooks?</Accordion.Trigger>
        <Accordion.Content>Hooks are functions that...</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

// ✅ Select compound component
const Select = ({ children, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useSelectContext();
  return <button onClick={() => setIsOpen(!isOpen)}>{children}</button>;
};

const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSelectContext();
  return isOpen ? <div className="select-content">{children}</div> : null;
};

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const { onChange, setIsOpen } = useSelectContext();
  
  return (
    <div
      onClick={() => {
        onChange(value);
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;`;

const CompoundComponents = () => {
  return (
    <TopicLayout
      title="Compound Components Pattern"
      route="/react/compound-components"
      category="react"
      explanation="Compound components share implicit state through Context. Parent component manages state, child components access it without props. Creates flexible, composable APIs. Used by libraries like Radix UI, Headless UI. Better than prop drilling for complex components."
      code={compoundComponentsCode}
      codeFilename="compound-components.tsx"
      whyItMatters="Creates reusable, flexible component APIs. Interviewers ask: 'How to build flexible components?', 'What are compound components?', 'Context vs props?' Shows advanced React patterns and API design skills."
      mistakes={[
        "Not using Context: Passing props through every level defeats the purpose.",
        "Too much flexibility: Sometimes simple props are better than compound pattern.",
        "Missing TypeScript: Context types ensure correct usage of compound components.",
        "No validation: Check if child components are used within correct parent.",
      ]}
      practiceTask="Create a compound Menu component with Menu, MenuButton, MenuList, and MenuItem. Clicking button toggles menu, clicking item closes menu and calls callback. Use Context for state sharing. Add keyboard navigation (arrow keys, Enter, Escape)."
    >
      <MultiExampleEditor
        title="🎯 Try It: Compound Components"
        examples={[
          {
            title: "Tabs Component",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 600px; margin: 0 auto; }
  .tabs { background: #1e293b; border-radius: 12px; overflow: hidden; }
  .tab-list { display: flex; background: #334155; }
  .tab { flex: 1; padding: 15px; border: none; background: transparent; color: #94a3b8; cursor: pointer; font-weight: 600; transition: all 0.2s; }
  .tab.active { background: #1e293b; color: #3b82f6; border-bottom: 3px solid #3b82f6; }
  .tab:hover { background: #475569; }
  .tab-panel { padding: 30px; }
</style>
</head>
<body>
  <div class="container">
    <h2>📑 Compound Tabs Component</h2>
    <div class="tabs">
      <div class="tab-list">
        <button class="tab active" onclick="switchTab(0)">Profile</button>
        <button class="tab" onclick="switchTab(1)">Settings</button>
        <button class="tab" onclick="switchTab(2)">Billing</button>
      </div>
      <div class="tab-panel" id="panel0">👤 Profile content - Edit your personal information</div>
      <div class="tab-panel" id="panel1" style="display:none">⚙️ Settings content - Configure your preferences</div>
      <div class="tab-panel" id="panel2" style="display:none">💳 Billing content - Manage your subscription</div>
    </div>
  </div>
  
  <script>
    let activeTab = 0;
    
    function switchTab(index) {
      for (let i = 0; i < 3; i++) {
        document.getElementById('panel' + i).style.display = 'none';
      }
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.getElementById('panel' + index).style.display = 'block';
      document.querySelectorAll('.tab')[index].classList.add('active');
      activeTab = index;
    }
  </script>
</body>
</html>`
          },
          {
            title: "Accordion Component",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .accordion-item { background: rgba(255,255,255,0.1); border-radius: 8px; margin: 10px 0; overflow: hidden; }
  .accordion-trigger { width: 100%; padding: 15px; background: transparent; border: none; color: white; text-align: left; cursor: pointer; font-weight: 600; font-size: 16px; display: flex; justify-content: space-between; align-items: center; }
  .accordion-trigger:hover { background: rgba(255,255,255,0.1); }
  .accordion-content { padding: 0 15px; max-height: 0; overflow: hidden; transition: all 0.3s; }
  .accordion-content.open { padding: 15px; max-height: 200px; }
</style>
</head>
<body>
  <div class="card">
    <h2>📋 Compound Accordion</h2>
    
    <div class="accordion-item">
      <button class="accordion-trigger" onclick="toggle(0)">What is React? <span id="icon0">▼</span></button>
      <div class="accordion-content" id="content0">React is a JavaScript library for building user interfaces with components.</div>
    </div>
    
    <div class="accordion-item">
      <button class="accordion-trigger" onclick="toggle(1)">What are hooks? <span id="icon1">▼</span></button>
      <div class="accordion-content" id="content1">Hooks are functions that let you use state and lifecycle features in function components.</div>
    </div>
    
    <div class="accordion-item">
      <button class="accordion-trigger" onclick="toggle(2)">What is JSX? <span id="icon2">▼</span></button>
      <div class="accordion-content" id="content2">JSX is a syntax extension that lets you write HTML-like code in JavaScript.</div>
    </div>
  </div>
  
  <script>
    function toggle(index) {
      const content = document.getElementById('content' + index);
      const icon = document.getElementById('icon' + index);
      
      if (content.classList.contains('open')) {
        content.classList.remove('open');
        icon.textContent = '▼';
      } else {
        content.classList.add('open');
        icon.textContent = '▲';
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

export default CompoundComponents;