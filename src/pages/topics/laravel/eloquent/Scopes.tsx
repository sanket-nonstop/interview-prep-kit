const Scopes = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Query Scopes</h1>
        <p className="text-lg text-muted-foreground">Reusable query constraints</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔍 Local Scopes</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`class Post extends Model
{
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
    
    public function scopePopular($query)
    {
        return $query->where('views', '>', 1000);
    }
}

// Usage
$posts = Post::active()->popular()->get();`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Dynamic Scopes</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`public function scopeOfType($query, $type)
{
    return $query->where('type', $type);
}

// Usage
$posts = Post::ofType('tutorial')->get();`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Scopes make queries reusable</li>
          <li>• Prefix methods with scope</li>
          <li>• Chain multiple scopes together</li>
        </ul>
      </div>
    </div>
  );
};

export default Scopes;
