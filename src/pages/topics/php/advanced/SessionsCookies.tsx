const SessionsCookies = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Sessions & Cookies</h1>
        <p className="text-lg text-muted-foreground">Store user data across requests</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔐 Sessions</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// Start session
session_start();

// Set session data
$_SESSION['user_id'] = 123;
$_SESSION['username'] = 'john';

// Get session data
$userId = $_SESSION['user_id'];

// Destroy session
session_destroy();`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🍪 Cookies</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// Set cookie (expires in 1 day)
setcookie('username', 'john', time() + 86400, '/');

// Get cookie
$username = $_COOKIE['username'];

// Delete cookie
setcookie('username', '', time() - 3600, '/');`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Sessions store data on server</li>
          <li>• Cookies store data on client</li>
          <li>• Always start session before using $_SESSION</li>
        </ul>
      </div>
    </div>
  );
};

export default SessionsCookies;
