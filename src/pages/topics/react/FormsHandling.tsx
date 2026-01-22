import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default FormsHandling;