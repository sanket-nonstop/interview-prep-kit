const Namespaces = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Namespaces & Autoloading</h1>
        <p className="text-lg text-muted-foreground">Organize code and avoid naming conflicts</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📦 Namespaces</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
namespace App\\Models;

class User {
    // Class code
}

// Using the class
use App\\Models\\User;
$user = new User();`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔄 Autoloading</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// composer.json
{
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    }
}

// Run: composer dump-autoload`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Namespaces prevent naming conflicts</li>
          <li>• Use PSR-4 autoloading standard</li>
          <li>• Composer handles autoloading</li>
        </ul>
      </div>
    </div>
  );
};

export default Namespaces;
