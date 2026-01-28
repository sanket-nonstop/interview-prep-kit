const XssCsrf = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">XSS & CSRF Protection</h1>
        <p className="text-lg text-muted-foreground">Prevent common web attacks</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🛡️ XSS Prevention</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
// Escape output
$name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
echo $name;

// Or use htmlentities
$comment = htmlentities($_POST['comment']);`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔒 CSRF Protection</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
// Generate token
session_start();
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// In form
echo '<input type="hidden" name="csrf_token" value="' . $_SESSION['csrf_token'] . '">';

// Verify token
if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('Invalid CSRF token');
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Always escape user output</li>
          <li>• Use CSRF tokens for forms</li>
          <li>• Validate all user input</li>
        </ul>
      </div>
    </div>
  );
};

export default XssCsrf;
