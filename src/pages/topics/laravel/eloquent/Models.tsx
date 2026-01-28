const Models = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Models & Migrations</h1>
        <p className="text-lg text-muted-foreground">Work with database using Eloquent ORM</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Creating Model & Migration</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`# Create model with migration
php artisan make:model Post -m

# Create model with migration, controller, and factory
php artisan make:model Post -mcf`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Basic Model</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'user_id'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🗄️ Migration</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('content');
        $table->foreignId('user_id')->constrained();
        $table->timestamps();
    });
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔍 Querying Data</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Get all posts
$posts = Post::all();

// Find by ID
$post = Post::find(1);

// Where clause
$posts = Post::where('user_id', 1)->get();

// Create
Post::create([
    'title' => 'My Post',
    'content' => 'Content here'
]);`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Models represent database tables</li>
          <li>• Migrations define table structure</li>
          <li>• Eloquent provides simple database queries</li>
          <li>• Use fillable to allow mass assignment</li>
        </ul>
      </div>
    </div>
  );
};

export default Models;
