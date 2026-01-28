const Authorization = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Authorization (Gates/Policies)</h1>
        <p className="text-lg text-muted-foreground">Control user permissions</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🚪 Gates</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Define gate
Gate::define('update-post', function ($user, $post) {
    return $user->id === $post->user_id;
});

// Check authorization
if (Gate::allows('update-post', $post)) {
    // User can update
}

// In controller
$this->authorize('update-post', $post);`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📋 Policies</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Create policy
php artisan make:policy PostPolicy

class PostPolicy
{
    public function update(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }
}

// Use in controller
$this->authorize('update', $post);`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Gates for simple authorization</li>
          <li>• Policies for model-based authorization</li>
          <li>• Use authorize() to check permissions</li>
        </ul>
      </div>
    </div>
  );
};

export default Authorization;
