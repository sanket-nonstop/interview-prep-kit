const VariablesTypes = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Variables & Data Types</h1>
        <p className="text-lg text-muted-foreground">Store and work with different types of data in PHP</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📦 Data Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">String</h3>
            <pre className="text-sm bg-secondary/50 p-2 rounded"><code>{`$name = "John";
$city = 'New York';`}</code></pre>
          </div>
          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Integer</h3>
            <pre className="text-sm bg-secondary/50 p-2 rounded"><code>{`$age = 25;
$year = 2024;`}</code></pre>
          </div>
          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Float</h3>
            <pre className="text-sm bg-secondary/50 p-2 rounded"><code>{`$price = 19.99;
$pi = 3.14159;`}</code></pre>
          </div>
          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Boolean</h3>
            <pre className="text-sm bg-secondary/50 p-2 rounded"><code>{`$isActive = true;
$hasAccess = false;`}</code></pre>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔍 Type Checking</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`$value = "Hello";

var_dump($value);        // string(5) "Hello"
gettype($value);         // "string"
is_string($value);       // true
is_int($value);          // false`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔄 Type Casting</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`$num = "123";
$int = (int)$num;        // 123
$float = (float)$num;    // 123.0
$bool = (bool)$num;      // true
$str = (string)$int;     // "123"`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• PHP has 8 primitive data types</li>
          <li>• Variables are loosely typed (type can change)</li>
          <li>• Use var_dump() to inspect variable type and value</li>
          <li>• Type casting converts between types</li>
        </ul>
      </div>
    </div>
  );
};

export default VariablesTypes;
