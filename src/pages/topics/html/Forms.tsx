import { TopicLayout } from '@/components/TopicLayout';
import { LiveCodeEditor } from '@/components/LiveCodeEditor';

const formsCode = `<!-- HTML Forms & Validation: Accessible, semantic form handling -->

<!-- ✅ Semantic form structure -->
<form action="/api/contact" method="POST" novalidate>
  <fieldset>
    <legend>Contact Information</legend>
    
    <!-- Required field with proper labeling -->
    <div class="form-group">
      <label for="email">Email Address *</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        required 
        aria-describedby="email-error"
        autocomplete="email"
      />
      <div id="email-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <!-- Select with proper grouping -->
    <div class="form-group">
      <label for="country">Country</label>
      <select id="country" name="country" required>
        <option value="">Choose a country</option>
        <optgroup label="North America">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
        </optgroup>
      </select>
    </div>
    
    <!-- Radio buttons with fieldset -->
    <fieldset class="form-group">
      <legend>Preferred Contact Method</legend>
      <div class="radio-group">
        <input type="radio" id="contact-email" name="contact-method" value="email" checked>
        <label for="contact-email">Email</label>
      </div>
      <div class="radio-group">
        <input type="radio" id="contact-phone" name="contact-method" value="phone">
        <label for="contact-phone">Phone</label>
      </div>
    </fieldset>
    
    <!-- Textarea with character limit -->
    <div class="form-group">
      <label for="message">Message</label>
      <textarea 
        id="message" 
        name="message" 
        rows="4" 
        maxlength="500"
        aria-describedby="message-count"
        placeholder="Tell us how we can help..."
      ></textarea>
      <div id="message-count" class="char-count">0/500 characters</div>
    </div>
    
    <!-- Checkbox with terms -->
    <div class="form-group">
      <input type="checkbox" id="terms" name="terms" required>
      <label for="terms">
        I agree to the <a href="/terms" target="_blank">Terms of Service</a> *
      </label>
    </div>
  </fieldset>
  
  <div class="form-actions">
    <button type="submit" class="btn-primary">Send Message</button>
    <button type="reset" class="btn-secondary">Clear Form</button>
  </div>
</form>

<!-- ✅ React form with validation -->
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    contactMethod: 'email'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Success handling
        setFormData({ email: '', message: '', contactMethod: 'email' });
        toast.success('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={errors.email ? 'error' : ''}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" className="error-message" role="alert">
            {errors.email}
          </div>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};`;

const Forms = () => {
  return (
    <div className="space-y-8">
      <TopicLayout
        title="Forms & Validation"
        route="/html/forms"
        category="html"
        explanation="HTML forms collect user input with proper semantic structure, accessibility features, and validation. Use appropriate input types, labels, fieldsets, and ARIA attributes. Implement both client-side and server-side validation for security and user experience."
        code={formsCode}
        codeFilename="forms.html"
        whyItMatters="Forms are critical for user interaction and data collection. Interviewers test understanding of accessibility, validation strategies, and security considerations. Essential for building usable, secure web applications that work for all users."
        mistakes={[
          "Missing labels or using placeholder as labels - breaks screen reader accessibility.",
          "Client-side validation only - always validate on the server for security.",
          "Not providing clear error messages - users need specific, actionable feedback.",
          "Ignoring keyboard navigation - forms must be fully accessible via keyboard.",
        ]}
        practiceTask="Build a multi-step registration form with email verification, password strength validation, file upload, and proper error handling. Ensure full keyboard accessibility and screen reader support."
      />

      <div className="border-t pt-8">
        <LiveCodeEditor
          title="Try It Yourself: HTML Forms"
          initialCode={`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    form { background: white; padding: 30px; border-radius: 12px; max-width: 500px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input, textarea, select { width: 100%; padding: 10px; border: 2px solid #D1D5DB; border-radius: 6px; font-size: 16px; box-sizing: border-box; }
    input:focus, textarea:focus, select:focus { outline: none; border-color: #3B82F6; }
    button { background: #3B82F6; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; width: 100%; }
    button:hover { background: #2563EB; }
  </style>
</head>
<body>
  <form>
    <h2>Contact Form</h2>
    
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" required>
    </div>
    
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" rows="4" required></textarea>
    </div>
    
    <button type="submit">Send Message</button>
  </form>
</body>
</html>`}
          height="500px"
        />
      </div>
    </div>
  );
};

export default Forms;