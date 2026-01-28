const Relationships = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Eloquent Relationships</h1>
        <p className="text-lg text-muted-foreground">Define relationships between models</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">👤 One to Many</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// User has many posts
class User extends Model {
    public function posts() {
        return $this->hasMany(Post::class);
    }
}

// Post belongs to user
class Post extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }
}

// Usage
$user = User::find(1);
$posts = $user->posts;`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔗 Many to Many</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
class User extends Model {
    public function roles() {
        return $this->belongsToMany(Role::class);
    }
}

class Role extends Model {
    public function users() {
        return $this->belongsToMany(User::class);
    }
}

// Usage
$user->roles()->attach($roleId);
$user->roles()->detach($roleId);`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• hasMany / belongsTo for one-to-many</li>
          <li>• belongsToMany for many-to-many</li>
          <li>• Eloquent handles relationship queries</li>
        </ul>
      </div>
    </div>
  );
};

export default Relationships;
