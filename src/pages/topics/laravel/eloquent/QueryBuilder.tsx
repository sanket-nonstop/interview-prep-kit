const QueryBuilder = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Query Builder</h1>
        <p className="text-lg text-muted-foreground">Build database queries fluently</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔍 Basic Queries</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`use Illuminate\\Support\\Facades\\DB;

// Select all
$users = DB::table('users')->get();

// Where clause
$users = DB::table('users')
    ->where('active', 1)
    ->get();

// Order by
$users = DB::table('users')
    ->orderBy('name')
    ->get();`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✏️ Insert & Update</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Insert
DB::table('users')->insert([
    'name' => 'John',
    'email' => 'john@example.com'
]);

// Update
DB::table('users')
    ->where('id', 1)
    ->update(['name' => 'Jane']);`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Query Builder provides fluent interface</li>
          <li>• Chain methods to build complex queries</li>
          <li>• Automatically prevents SQL injection</li>
        </ul>
      </div>
    </div>
  );
};

export default QueryBuilder;
