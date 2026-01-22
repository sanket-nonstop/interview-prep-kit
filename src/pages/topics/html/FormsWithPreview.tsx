import { TopicLayout } from '@/components/TopicLayout';
import { StepByStepPreview } from '@/components/StepByStepPreview';

const formSteps = [
  {
    title: 'Step 1: Basic Input',
    description: 'Start with a simple text input field',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #F9FAFB; }
    input { padding: 10px; font-size: 16px; border: 2px solid #D1D5DB; border-radius: 6px; }
  </style>
</head>
<body>
  <input type="text" placeholder="Enter your name">
</body>
</html>`,
    highlight: 'A single input field appears with placeholder text',
  },
  {
    title: 'Step 2: Add Label',
    description: 'Add a label to describe the input',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #F9FAFB; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { padding: 10px; font-size: 16px; border: 2px solid #D1D5DB; border-radius: 6px; width: 300px; }
  </style>
</head>
<body>
  <label for="name">Name:</label>
  <input id="name" type="text" placeholder="Enter your name">
</body>
</html>`,
    highlight: 'Label appears above input, connected with "for" and "id"',
  },
  {
    title: 'Step 3: Wrap in Form',
    description: 'Put inputs inside a <form> element',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #F9FAFB; }
    form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 400px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { padding: 10px; font-size: 16px; border: 2px solid #D1D5DB; border-radius: 6px; width: 100%; box-sizing: border-box; }
  </style>
</head>
<body>
  <form>
    <label for="name">Name:</label>
    <input id="name" type="text" placeholder="Enter your name">
  </form>
</body>
</html>`,
    highlight: 'Form now has a white card background with shadow',
  },
  {
    title: 'Step 4: Add Email Field',
    description: 'Add another input for email',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #F9FAFB; }
    form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 400px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { padding: 10px; font-size: 16px; border: 2px solid #D1D5DB; border-radius: 6px; width: 100%; box-sizing: border-box; }
  </style>
</head>
<body>
  <form>
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" type="text" placeholder="Enter your name">
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input id="email" type="email" placeholder="Enter your email">
    </div>
  </form>
</body>
</html>`,
    highlight: 'Second field added with proper spacing between fields',
  },
  {
    title: 'Step 5: Add Submit Button',
    description: 'Add a button to submit the form',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #F9FAFB; }
    form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 400px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { padding: 10px; font-size: 16px; border: 2px solid #D1D5DB; border-radius: 6px; width: 100%; box-sizing: border-box; }
    button { background: #3B82F6; color: white; padding: 12px 24px; font-size: 16px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; width: 100%; }
    button:hover { background: #2563EB; }
  </style>
</head>
<body>
  <form>
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" type="text" placeholder="Enter your name">
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input id="email" type="email" placeholder="Enter your email">
    </div>
    
    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
    highlight: 'Blue submit button appears at bottom, full width',
  },
  {
    title: 'Step 6: Add Focus Styles',
    description: 'Improve UX with focus states',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #F9FAFB; }
    form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 400px; }
    h2 { margin-top: 0; color: #1F2937; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { padding: 10px; font-size: 16px; border: 2px solid #D1D5DB; border-radius: 6px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; }
    input:focus { outline: none; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    button { background: #3B82F6; color: white; padding: 12px 24px; font-size: 16px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; width: 100%; transition: background 0.2s; }
    button:hover { background: #2563EB; }
  </style>
</head>
<body>
  <form>
    <h2>Contact Us</h2>
    
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" type="text" placeholder="Enter your name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input id="email" type="email" placeholder="Enter your email" required>
    </div>
    
    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
    highlight: 'Click inputs to see blue focus ring - professional form complete!',
  },
];

const formsCode = `// HTML Forms: Collect user input

// ✅ Basic form structure
<form>
  <label for="email">Email:</label>
  <input id="email" type="email" required>
  <button type="submit">Submit</button>
</form>

// ✅ Form with validation
<form>
  <label for="name">Name:</label>
  <input id="name" type="text" required minlength="3">
  
  <label for="email">Email:</label>
  <input id="email" type="email" required>
  
  <label for="age">Age:</label>
  <input id="age" type="number" min="18" max="100">
  
  <button type="submit">Submit</button>
</form>

// ✅ Different input types
<input type="text">      <!-- Text input -->
<input type="email">     <!-- Email validation -->
<input type="password">  <!-- Hidden text -->
<input type="number">    <!-- Numeric input -->
<input type="date">      <!-- Date picker -->
<input type="checkbox">  <!-- Checkbox -->
<input type="radio">     <!-- Radio button -->
<textarea></textarea>    <!-- Multi-line text -->
<select></select>        <!-- Dropdown -->`;

const FormsWithPreview = () => {
  return (
    <div className="space-y-8">
      <TopicLayout
        title="Forms & Validation"
        route="/html/forms"
        category="html"
        explanation="HTML forms collect user input. Key elements: <form> wrapper, <label> for accessibility, <input> for data entry, <button> for submission. Use type attribute for validation (email, number, date). Required attribute makes fields mandatory."
        code={formsCode}
        codeFilename="forms.html"
        whyItMatters="Forms are essential for user interaction. Interviewers ask: 'How to validate forms?', 'Label and input connection?', 'Different input types?' Shows understanding of user input and accessibility."
        mistakes={[
          "Missing labels: Every input needs a label for accessibility.",
          "No form wrapper: Inputs should be inside <form> for proper submission.",
          "Wrong input types: Use type='email' for emails, not type='text'.",
          "Missing required attribute: Users can submit empty forms without validation.",
        ]}
        practiceTask="Create a signup form with name, email, password, and confirm password fields. Add validation: email format, password min 8 chars, passwords must match. Style with focus states."
      />

      <div className="border-t pt-8">
        <StepByStepPreview
          title="Building a Form Step by Step"
          steps={formSteps}
        />
      </div>
    </div>
  );
};

export default FormsWithPreview;