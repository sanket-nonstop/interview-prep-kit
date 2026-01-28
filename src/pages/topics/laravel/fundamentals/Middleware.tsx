const Middleware = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Laravel Middleware</h1>
        <p className="text-lg text-muted-foreground">Filter HTTP requests</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Creating Middleware</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`# Create middleware
php artisan make:middleware CheckAge`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Middleware Example</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
namespace App\\Http\\Middleware;

class CheckAge
{
    public function handle($request, Closure $next)
    {
        if ($request->age < 18) {
            return redirect('home');
        }
        
        return $next($request);
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔗 Applying Middleware</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// On route
Route::get('/admin', function () {
    //
})->middleware('auth');

// On controller
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Middleware filters requests before reaching routes</li>
          <li>• Use for authentication, logging, CORS</li>
          <li>• Apply to routes or controllers</li>
        </ul>
      </div>
    </div>
  );
};

export default Middleware;
