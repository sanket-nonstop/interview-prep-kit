import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Controlled vs Uncontrolled"
        examples={[
          {
            title: "Controlled Input",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid #3b82f6; border-radius: 8px; margin: 10px 0; font-size: 16px; background: #334155; color: white; }
  .value { background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 15px 0; font-weight: 600; }
  .error { background: #ef4444; color: white; padding: 10px; border-radius: 6px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>✅ Controlled Input</h2>
    <p>React state controls the value</p>
    <input id="controlled" placeholder="Type here..." oninput="handleChange(event)" />
    <div class="value">Current Value: <span id="display"></span></div>
    <div class="error" id="error" style="display:none;"></div>
  </div>
  
  <script>
    let value = '';
    
    function handleChange(e) {
      value = e.target.value;
      document.getElementById('display').textContent = value;
      
      // Real-time validation
      if (value.length > 0 && value.length < 3) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = 'Must be at least 3 characters';
      } else {
        document.getElementById('error').style.display = 'none';
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Uncontrolled Input",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: none; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; margin-top: 10px; }
  .result { background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin-top: 15px; }
</style>
</head>
<body>
  <div class="card">
    <h2>📝 Uncontrolled Form</h2>
    <p>DOM controls the value, access via ref</p>
    <form onsubmit="handleSubmit(event)">
      <input id="name" name="name" placeholder="Name" />
      <input id="email" name="email" type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
    <div class="result" id="result"></div>
  </div>
  
  <script>
    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      document.getElementById('result').innerHTML = 
        '<strong>Submitted:</strong><br>' + 
        'Name: ' + data.name + '<br>' +
        'Email: ' + data.email;
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

export default ControlledUncontrolled;