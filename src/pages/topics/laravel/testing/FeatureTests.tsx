const FeatureTests = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Feature Tests</h1>
        <p className="text-lg text-muted-foreground">Test application features end-to-end</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 HTTP Tests</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`php artisan make:test PostTest

class PostTest extends TestCase
{
    public function test_user_can_create_post()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->post('/posts', [
            'title' => 'Test Post',
            'content' => 'Test content'
        ]);
        
        $response->assertStatus(201);
        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post'
        ]);
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✅ Assertions</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`$response->assertStatus(200);
$response->assertJson(['success' => true]);
$response->assertRedirect('/home');
$response->assertSee('Welcome');`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Feature tests test entire features</li>
          <li>• Use actingAs() to authenticate</li>
          <li>• Assert HTTP responses and database</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureTests;
