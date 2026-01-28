const PhpunitTesting = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">PHPUnit Testing</h1>
        <p className="text-lg text-muted-foreground">Write unit tests for Laravel</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🧪 Creating Test</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`php artisan make:test UserTest --unit

class UserTest extends TestCase
{
    public function test_user_can_be_created()
    {
        $user = User::factory()->create();
        
        $this->assertDatabaseHas('users', [
            'email' => $user->email
        ]);
    }
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">▶️ Running Tests</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`# Run all tests
php artisan test

# Run specific test
php artisan test --filter UserTest`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• PHPUnit is Laravel's testing framework</li>
          <li>• Use factories to create test data</li>
          <li>• Assertions verify expected behavior</li>
        </ul>
      </div>
    </div>
  );
};

export default PhpunitTesting;
