const Functions = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">PHP Functions</h1>
        <p className="text-lg text-muted-foreground">Reusable blocks of code</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Basic Function</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
function greet() {
  echo "Hello, World!";
}

greet(); // Hello, World!`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Parameters & Arguments</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
function greet($name) {
  return "Hello, $name!";
}

echo greet("Alice"); // Hello, Alice!

// Default parameters
function greet($name = "Guest") {
  return "Hello, $name!";
}

echo greet(); // Hello, Guest!`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔄 Return Values</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
function add($a, $b) {
  return $a + $b;
}

$result = add(5, 3); // 8

// Multiple return statements
function isAdult($age) {
  if ($age >= 18) {
    return true;
  }
  return false;
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Functions make code reusable</li>
          <li>• Use return to send values back</li>
          <li>• Parameters can have default values</li>
        </ul>
      </div>
    </div>
  );
};

export default Functions;
