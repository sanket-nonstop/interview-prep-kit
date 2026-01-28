const Validation = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Form Validation</h1>
        <p className="text-lg text-muted-foreground">Validate user input in Laravel</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✅ Basic Validation</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|max:255',
        'email' => 'required|email|unique:users',
        'age' => 'required|integer|min:18',
        'password' => 'required|min:8|confirmed'
    ]);
    
    // Data is valid, proceed
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔧 Common Rules</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">required</code>
            <p className="text-xs text-muted-foreground mt-1">Field must be present</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">email</code>
            <p className="text-xs text-muted-foreground mt-1">Valid email format</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">unique:table</code>
            <p className="text-xs text-muted-foreground mt-1">Unique in database</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <code className="text-sm text-primary">min:value</code>
            <p className="text-xs text-muted-foreground mt-1">Minimum length/value</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Use validate() method on request</li>
          <li>• Laravel has many built-in rules</li>
          <li>• Validation errors auto-redirect back</li>
        </ul>
      </div>
    </div>
  );
};

export default Validation;
