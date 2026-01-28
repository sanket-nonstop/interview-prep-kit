const PhpValidation = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Input Validation & Sanitization</h1>
        <p className="text-lg text-muted-foreground">Clean and validate user input</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✅ Validation</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
$email = $_POST['email'];

// Validate email
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email";
}

// Validate integer
if (filter_var($age, FILTER_VALIDATE_INT)) {
    echo "Valid integer";
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🧹 Sanitization</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// Sanitize email
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

// Sanitize string
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);

// Remove HTML tags
$text = strip_tags($_POST['text']);`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Always validate user input</li>
          <li>• Sanitize before storing</li>
          <li>• Use filter_var() functions</li>
        </ul>
      </div>
    </div>
  );
};

export default PhpValidation;
