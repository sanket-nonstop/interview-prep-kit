const LaravelAuthentication = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Authentication (Sanctum/Passport)</h1>
        <p className="text-lg text-muted-foreground">API authentication in Laravel</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔐 Laravel Sanctum</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Install Sanctum
composer require laravel/sanctum

// Generate token
$token = $user->createToken('token-name')->plainTextToken;

// Protect routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎫 Login Example</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    
    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;
        
        return response()->json(['token' => $token]);
    }
    
    return response()->json(['error' => 'Unauthorized'], 401);
}`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Sanctum for SPA and mobile apps</li>
          <li>• Passport for OAuth2 server</li>
          <li>• Tokens authenticate API requests</li>
        </ul>
      </div>
    </div>
  );
};

export default LaravelAuthentication;
