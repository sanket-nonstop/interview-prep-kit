const Superglobals = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">PHP Superglobals</h1>
        <p className="text-lg text-muted-foreground">Built-in global variables</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🌐 Common Superglobals</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">$_GET</code>
            <p className="text-xs text-muted-foreground mt-1">URL parameters</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">$_POST</code>
            <p className="text-xs text-muted-foreground mt-1">Form data</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">$_SESSION</code>
            <p className="text-xs text-muted-foreground mt-1">Session variables</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">$_COOKIE</code>
            <p className="text-xs text-muted-foreground mt-1">Cookie data</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 $_GET Example</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// URL: page.php?name=John&age=25

$name = $_GET['name']; // John
$age = $_GET['age'];   // 25

echo "Hello, $name! You are $age years old.";`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📮 $_POST Example</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// Form submitted with POST method

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  // Process login
}`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Superglobals are available everywhere</li>
          <li>• $_GET for URL parameters</li>
          <li>• $_POST for form submissions</li>
          <li>• Always validate user input</li>
        </ul>
      </div>
    </div>
  );
};

export default Superglobals;
