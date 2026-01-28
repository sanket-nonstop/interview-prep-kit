const Optimization = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Performance Optimization</h1>
        <p className="text-lg text-muted-foreground">Speed up your Laravel app</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">⚡ Optimization Commands</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔍 Query Optimization</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Eager loading
$posts = Post::with('user', 'comments')->get();

// Select specific columns
$users = User::select('id', 'name')->get();

// Chunk large datasets
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        //
    }
});`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Cache config and routes in production</li>
          <li>• Use eager loading to avoid N+1 queries</li>
          <li>• Chunk large datasets</li>
        </ul>
      </div>
    </div>
  );
};

export default Optimization;
