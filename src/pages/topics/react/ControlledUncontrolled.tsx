import { TopicLayout } from '@/components/TopicLayout';

const controlledUncontrolledCode = `// Controlled vs Uncontrolled Components

// ✅ Controlled: React state controls input value
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// ✅ Uncontrolled: DOM controls value, access via ref
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

// ✅ Controlled form with validation
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(value.includes('@') ? '' : 'Invalid email');
  };

  return (
    <form>
      <input value={email} onChange={handleChange} />
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
}

// ✅ Uncontrolled form with FormData
function UncontrolledForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" defaultValue="" />
      <input name="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ Hybrid: Uncontrolled with validation on submit
function HybridForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const email = formData.get('email') as string;
    
    if (!email.includes('@')) {
      setErrors({ email: 'Invalid email' });
      return;
    }
    
    // Submit data
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="email" />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ File input (always uncontrolled)
function FileUpload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // Upload file
    }
  };

  return (
    <>
      <input type="file" ref={fileRef} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}`;

const ControlledUncontrolled = () => {
  return (
    <TopicLayout
      title="Controlled vs Uncontrolled Components"
      route="/react/controlled-uncontrolled"
      category="react"
      explanation="Controlled: React state controls input value via value prop. Uncontrolled: DOM controls value, access via ref. Controlled gives validation, formatting, dynamic behavior. Uncontrolled is simpler for basic forms. File inputs are always uncontrolled."
      code={controlledUncontrolledCode}
      codeFilename="controlled-uncontrolled.tsx"
      whyItMatters="Design decision affects form complexity and performance. Interviewers ask: 'When to use controlled vs uncontrolled?', 'How to validate forms?', 'Performance implications?' Shows understanding of React's data flow and form handling."
      mistakes={[
        "Mixing controlled and uncontrolled: Switching between value and defaultValue causes warnings.",
        "Controlled without onChange: Input becomes read-only. Always pair value with onChange.",
        "Uncontrolled for complex validation: Real-time validation needs controlled inputs.",
        "Overusing controlled: Simple forms don't need state for every input.",
      ]}
      practiceTask="Create a signup form with email (controlled with real-time validation), password (controlled with strength indicator), and avatar upload (uncontrolled). Show validation errors inline."
    />
  );
};

export default ControlledUncontrolled;