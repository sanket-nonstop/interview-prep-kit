import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const formsCode = `// Forms Handling & Validation in React

// ✅ Controlled form with validation
function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    await submitForm(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="text-red-500">{errors.email}</span>}
      
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <span className="text-red-500">{errors.password}</span>}
      
      <button type="submit">Sign Up</button>
    </form>
  );
}

// ✅ Custom form hook
function useForm<T>(initialValues: T, validate: (values: T) => Record<string, string>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      await onSubmit(values);
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

// Usage
function LoginForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    (values) => {
      const errors: Record<string, string> = {};
      if (!values.email) errors.email = 'Required';
      if (!values.password) errors.password = 'Required';
      return errors;
    }
  );

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(async (data) => {
        await login(data);
      });
    }}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      
      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}

// ✅ React Hook Form (production approach)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

type FormData = z.infer<typeof schema>;

function ModernForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ Large form performance optimization
function LargeForm() {
  const [formData, setFormData] = useState(initialLargeFormData);

  // Debounce validation
  const debouncedValidate = useMemo(
    () => debounce((data) => validateForm(data), 300),
    []
  );

  const handleChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    debouncedValidate({ ...formData, [field]: value });
  }, [formData, debouncedValidate]);

  return (
    <form>
      {/* Split into sections, only re-render changed section */}
      <FormSection1 data={formData.section1} onChange={handleChange} />
      <FormSection2 data={formData.section2} onChange={handleChange} />
    </form>
  );
}`;

const FormsHandling = () => {
  return (
    <TopicLayout
      title="Forms Handling & Validation"
      route="/react/forms-handling"
      category="react"
      explanation="Forms in React: controlled (state-driven) or uncontrolled (ref-based). Validation can be inline, on blur, or on submit. For large forms, use React Hook Form for performance. Debounce validation, split into sections, memoize components to prevent unnecessary re-renders."
      code={formsCode}
      codeFilename="forms-handling.tsx"
      whyItMatters="Forms are everywhere in apps. Interviewers ask: 'How to handle forms?', 'Validation strategies?', 'Performance with large forms?' Shows practical React skills and understanding of performance optimization."
      mistakes={[
        "Re-rendering entire form on every keystroke: Use field-level state or React Hook Form.",
        "Validating on every change: Debounce validation or validate on blur/submit.",
        "Not showing errors clearly: Users need immediate feedback on what's wrong.",
        "Missing loading states: Disable submit button and show spinner during submission.",
      ]}
      practiceTask="Create a multi-step form (3 steps) with validation. Each step has 3-4 fields. Validate on blur, show errors inline. Add progress indicator. Use React Hook Form with Zod schema validation. Ensure only current step re-renders on input change."
    >
      <MultiExampleEditor
        title="🎯 Try It: Form Handling"
        examples={[
          {
            title: "Controlled Form",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto; }
  input { width: 100%; padding: 12px; border: 2px solid transparent; border-radius: 8px; margin: 10px 0; font-size: 16px; }
  input.error { border-color: #ef4444; }
  .error-msg { color: #fca5a5; font-size: 14px; margin: -5px 0 10px; }
  button { background: white; color: #667eea; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; margin-top: 10px; }
  button:hover { transform: scale(1.02); }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  .success { background: #10b981; color: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
</style>
</head>
<body>
  <div class="card">
    <h2>📝 Controlled Form</h2>
    <form id="signupForm" onsubmit="handleSubmit(event)">
      <input id="email" type="email" placeholder="Email" required />
      <div id="emailError" class="error-msg"></div>
      
      <input id="password" type="password" placeholder="Password (8+ chars)" required />
      <div id="passwordError" class="error-msg"></div>
      
      <input id="confirm" type="password" placeholder="Confirm Password" required />
      <div id="confirmError" class="error-msg"></div>
      
      <button type="submit">Sign Up</button>
    </form>
    <div id="output"></div>
  </div>
  
  <script>
    function validateEmail(email) {
      return email.includes('@') && email.includes('.');
    }
    
    function handleSubmit(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirm').value;
      
      let isValid = true;
      
      // Clear errors
      document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
      document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
      
      // Validate email
      if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = '❌ Invalid email format';
        document.getElementById('email').classList.add('error');
        isValid = false;
      }
      
      // Validate password
      if (password.length < 8) {
        document.getElementById('passwordError').textContent = '❌ Password must be 8+ characters';
        document.getElementById('password').classList.add('error');
        isValid = false;
      }
      
      // Validate confirm
      if (password !== confirm) {
        document.getElementById('confirmError').textContent = '❌ Passwords do not match';
        document.getElementById('confirm').classList.add('error');
        isValid = false;
      }
      
      if (isValid) {
        document.getElementById('output').innerHTML = \`
          <div class="success">
            ✅ Form submitted successfully!<br>
            Email: \${email}
          </div>
        \`;
        document.getElementById('signupForm').reset();
      }
    }
  </script>
</body>
</html>`
          },
          {
            title: "Real-time Validation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .container { max-width: 500px; margin: 0 auto; }
  .form-group { margin: 20px 0; }
  label { display: block; margin-bottom: 5px; font-weight: 600; }
  input { width: 100%; padding: 12px; border: 2px solid #334155; border-radius: 8px; font-size: 16px; background: #1e293b; color: white; }
  input.valid { border-color: #10b981; }
  input.invalid { border-color: #ef4444; }
  .feedback { font-size: 14px; margin-top: 5px; }
  .feedback.valid { color: #10b981; }
  .feedback.invalid { color: #ef4444; }
  button { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; width: 100%; }
  button:disabled { opacity: 0.5; }
</style>
</head>
<body>
  <div class="container">
    <h2>✅ Real-time Validation</h2>
    <form id="form">
      <div class="form-group">
        <label>Username (3-20 chars)</label>
        <input id="username" oninput="validateUsername()" />
        <div id="usernameFeedback" class="feedback"></div>
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input id="email" type="email" oninput="validateEmail()" />
        <div id="emailFeedback" class="feedback"></div>
      </div>
      
      <button type="submit" id="submitBtn" disabled>Submit</button>
    </form>
  </div>
  
  <script>
    let validations = { username: false, email: false };
    
    function validateUsername() {
      const input = document.getElementById('username');
      const feedback = document.getElementById('usernameFeedback');
      const value = input.value;
      
      if (value.length === 0) {
        input.className = '';
        feedback.textContent = '';
        validations.username = false;
      } else if (value.length < 3) {
        input.className = 'invalid';
        feedback.className = 'feedback invalid';
        feedback.textContent = '❌ Too short';
        validations.username = false;
      } else if (value.length > 20) {
        input.className = 'invalid';
        feedback.className = 'feedback invalid';
        feedback.textContent = '❌ Too long';
        validations.username = false;
      } else {
        input.className = 'valid';
        feedback.className = 'feedback valid';
        feedback.textContent = '✅ Valid username';
        validations.username = true;
      }
      updateSubmitButton();
    }
    
    function validateEmail() {
      const input = document.getElementById('email');
      const feedback = document.getElementById('emailFeedback');
      const value = input.value;
      
      if (value.length === 0) {
        input.className = '';
        feedback.textContent = '';
        validations.email = false;
      } else if (value.includes('@') && value.includes('.')) {
        input.className = 'valid';
        feedback.className = 'feedback valid';
        feedback.textContent = '✅ Valid email';
        validations.email = true;
      } else {
        input.className = 'invalid';
        feedback.className = 'feedback invalid';
        feedback.textContent = '❌ Invalid email';
        validations.email = false;
      }
      updateSubmitButton();
    }
    
    function updateSubmitButton() {
      document.getElementById('submitBtn').disabled = 
        !validations.username || !validations.email;
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

export default FormsHandling;