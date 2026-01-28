const AccessorsMutators = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Accessors & Mutators</h1>
        <p className="text-lg text-muted-foreground">Transform model attributes</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📖 Accessors (Get)</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`use Illuminate\\Database\\Eloquent\\Casts\\Attribute;

class User extends Model
{
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucfirst($value),
        );
    }
}

// Usage
$user->name; // Automatically capitalized`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✏️ Mutators (Set)</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`protected function name(): Attribute
{
    return Attribute::make(
        set: fn ($value) => strtolower($value),
    );
}

// Usage
$user->name = 'JOHN'; // Stored as 'john'`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Accessors transform data when retrieving</li>
          <li>• Mutators transform data when setting</li>
          <li>• Use Attribute class for both</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessorsMutators;
