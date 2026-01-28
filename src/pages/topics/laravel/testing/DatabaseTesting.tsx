const DatabaseTesting = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Database Testing</h1>
        <p className="text-lg text-muted-foreground">Test database interactions</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🗄️ Database Assertions</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`public function test_database()
{
    // Assert record exists
    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com'
    ]);
    
    // Assert record missing
    $this->assertDatabaseMissing('users', [
        'email' => 'deleted@example.com'
    ]);
    
    // Assert count
    $this->assertDatabaseCount('users', 5);
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔄 Database Transactions</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`use Illuminate\\Foundation\\Testing\\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_example()
    {
        // Database is reset after each test
    }
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Use RefreshDatabase trait</li>
          <li>• Assert database state with helpers</li>
          <li>• Tests run in transactions</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseTesting;
