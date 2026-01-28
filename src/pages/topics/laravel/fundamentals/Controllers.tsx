const Controllers = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Laravel Controllers</h1>
        <p className="text-lg text-muted-foreground">Organize request handling logic</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Creating a Controller</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`# Create controller
php artisan make:controller UserController`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Basic Controller</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
namespace App\\Http\\Controllers;

class UserController extends Controller
{
    public function index()
    {
        return view('users.index');
    }
    
    public function show($id)
    {
        $user = User::find($id);
        return view('users.show', compact('user'));
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔗 Route to Controller</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// routes/web.php
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Controllers organize request logic</li>
          <li>• Use artisan to generate controllers</li>
          <li>• Link routes to controller methods</li>
        </ul>
      </div>
    </div>
  );
};

export default Controllers;
