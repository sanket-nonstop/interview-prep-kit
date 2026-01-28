const Notifications = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Notifications</h1>
        <p className="text-lg text-muted-foreground">Send notifications via multiple channels</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📧 Creating Notification</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`php artisan make:notification InvoicePaid

class InvoicePaid extends Notification
{
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }
    
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('Invoice paid!')
            ->action('View Invoice', url('/'));
    }
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔔 Sending Notifications</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Send to user
$user->notify(new InvoicePaid($invoice));

// Send to multiple users
Notification::send($users, new InvoicePaid($invoice));`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Send via mail, SMS, database, etc.</li>
          <li>• Use notify() on user model</li>
          <li>• Queue notifications for better performance</li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
