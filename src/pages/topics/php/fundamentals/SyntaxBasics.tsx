const SyntaxBasics = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">PHP Syntax & Basics</h1>
        <p className="text-lg text-muted-foreground">Learn the fundamental syntax of PHP</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 PHP Tags</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
  echo "Hello, World!";
?>`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔤 Variables</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
  $name = "John";
  $age = 25;
  echo "My name is $name";
?>`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• PHP code runs on the server</li>
          <li>• Variables start with $</li>
          <li>• Use echo to output content</li>
        </ul>
      </div>
    </div>
  );
};

export default SyntaxBasics;
