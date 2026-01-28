const MagicMethods = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Magic Methods</h1>
        <p className="text-lg text-muted-foreground">Special methods that start with __</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✨ Common Magic Methods</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
class User {
    private $data = [];
    
    public function __construct() {
        // Called when object is created
    }
    
    public function __get($name) {
        return $this->data[$name] ?? null;
    }
    
    public function __set($name, $value) {
        $this->data[$name] = $value;
    }
    
    public function __toString() {
        return json_encode($this->data);
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Magic methods start with __</li>
          <li>• __construct runs on object creation</li>
          <li>• __get/__set for property access</li>
        </ul>
      </div>
    </div>
  );
};

export default MagicMethods;
