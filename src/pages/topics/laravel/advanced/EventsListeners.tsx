const EventsListeners = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Events & Listeners</h1>
        <p className="text-lg text-muted-foreground">Decouple application logic</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📢 Creating Event</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`php artisan make:event UserRegistered

class UserRegistered
{
    public function __construct(public User $user)
    {
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">👂 Creating Listener</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`php artisan make:listener SendWelcomeEmail

class SendWelcomeEmail
{
    public function handle(UserRegistered $event)
    {
        Mail::to($event->user)->send(new WelcomeEmail());
    }
}

// Dispatch event
event(new UserRegistered($user));`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Events decouple application logic</li>
          <li>• Listeners respond to events</li>
          <li>• Use event() to dispatch</li>
        </ul>
      </div>
    </div>
  );
};

export default EventsListeners;
