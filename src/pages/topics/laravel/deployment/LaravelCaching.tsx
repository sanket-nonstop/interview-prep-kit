const LaravelCaching = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Caching Strategies</h1>
        <p className="text-lg text-muted-foreground">Improve performance with caching</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">💾 Basic Caching</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`use Illuminate\\Support\\Facades\\Cache;

// Store in cache
Cache::put('key', 'value', 3600); // 1 hour

// Retrieve from cache
$value = Cache::get('key');

// Remember (get or store)
$users = Cache::remember('users', 3600, function () {
    return User::all();
});`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🗑️ Cache Management</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Forget cache
Cache::forget('key');

// Clear all cache
Cache::flush();

// Check if exists
if (Cache::has('key')) {
    // Key exists
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Cache expensive operations</li>
          <li>• Use remember() for automatic caching</li>
          <li>• Clear cache when data changes</li>
        </ul>
      </div>
    </div>
  );
};

export default LaravelCaching;
