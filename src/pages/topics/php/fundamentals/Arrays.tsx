const Arrays = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">PHP Arrays</h1>
        <p className="text-lg text-muted-foreground">Store multiple values in one variable</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📦 Indexed Arrays</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
$fruits = ["Apple", "Banana", "Orange"];

echo $fruits[0]; // Apple
echo $fruits[1]; // Banana

// Add item
$fruits[] = "Mango";`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔑 Associative Arrays</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
$person = [
  "name" => "John",
  "age" => 25,
  "city" => "New York"
];

echo $person["name"]; // John
echo $person["age"];  // 25`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔧 Array Functions</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
$numbers = [1, 2, 3, 4, 5];

count($numbers);        // 5
array_push($numbers, 6); // Add to end
array_pop($numbers);     // Remove from end
in_array(3, $numbers);   // true
sort($numbers);          // Sort ascending`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Indexed arrays use numbers as keys</li>
          <li>• Associative arrays use strings as keys</li>
          <li>• PHP has many built-in array functions</li>
        </ul>
      </div>
    </div>
  );
};

export default Arrays;
