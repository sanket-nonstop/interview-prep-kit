const Authentication = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Authentication & Hashing</h1>
        <p className="text-lg text-muted-foreground">Secure password handling</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔐 Password Hashing</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
// Hash password
$password = 'user_password';
$hash = password_hash($password, PASSWORD_DEFAULT);

// Store $hash in database`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✅ Password Verification</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
// Verify password
$inputPassword = $_POST['password'];
$storedHash = $user['password']; // from database

if (password_verify($inputPassword, $storedHash)) {
    // Password is correct
    $_SESSION['user_id'] = $user['id'];
} else {
    // Password is wrong
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Never store plain text passwords</li>
          <li>• Use password_hash() for hashing</li>
          <li>• Use password_verify() to check passwords</li>
        </ul>
      </div>
    </div>
  );
};

export default Authentication;
