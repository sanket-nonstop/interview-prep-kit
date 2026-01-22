import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default CompoundComponents;