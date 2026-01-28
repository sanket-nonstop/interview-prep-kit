const Routing = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Laravel Routing</h1>
        <p className="text-lg text-muted-foreground">Define URL patterns and handle requests</p>
      </div>

      <div className="topic-card p-6 mb-6 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <h2 className="text-2xl font-bold text-foreground mb-3">🛣️ What is Routing?</h2>
        <p className="text-muted-foreground mb-3">
          Routing determines how your application responds to different URLs. When someone visits a URL, 
          Laravel matches it to a route and executes the corresponding code.
        </p>
        <div className="bg-background/50 p-4 rounded-lg border border-border">
          <div className="font-semibold text-foreground mb-2">💡 Think of it like a GPS:</div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <strong>URL:</strong> The destination address</li>
            <li>• <strong>Route:</strong> The path to get there</li>
            <li>• <strong>Controller:</strong> What happens when you arrive</li>
          </ul>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Basic Routes</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// routes/web.php

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return 'About Page';
});

Route::get('/contact', function () {
    return view('contact');
});`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 HTTP Methods</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
            <code className="text-sm text-foreground">Route::get()</code>
            <p className="text-xs text-muted-foreground mt-1">Retrieve data</p>
          </div>
          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
            <code className="text-sm text-foreground">Route::post()</code>
            <p className="text-xs text-muted-foreground mt-1">Submit data</p>
          </div>
          <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/30">
            <code className="text-sm text-foreground">Route::put()</code>
            <p className="text-xs text-muted-foreground mt-1">Update data</p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
            <code className="text-sm text-foreground">Route::delete()</code>
            <p className="text-xs text-muted-foreground mt-1">Delete data</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔗 Route Parameters</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Required parameter
Route::get('/user/{id}', function ($id) {
    return "User ID: " . $id;
});

// Optional parameter
Route::get('/post/{id?}', function ($id = null) {
    return $id ? "Post $id" : "All posts";
});

// Multiple parameters
Route::get('/post/{category}/{id}', function ($category, $id) {
    return "Category: $category, Post: $id";
});`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🏷️ Named Routes</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Define named route
Route::get('/profile', function () {
    return view('profile');
})->name('profile');

// Generate URL
$url = route('profile');

// Redirect to named route
return redirect()->route('profile');`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Routes are defined in routes/web.php</li>
          <li>• Use Route::get(), post(), put(), delete() for different HTTP methods</li>
          <li>• Route parameters are wrapped in curly braces</li>
          <li>• Named routes make URL generation easier</li>
        </ul>
      </div>
    </div>
  );
};

export default Routing;
