const QueuesJobs = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Queues & Jobs</h1>
        <p className="text-lg text-muted-foreground">Process tasks in background</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Creating Job</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`php artisan make:job ProcessVideo

class ProcessVideo implements ShouldQueue
{
    public function __construct(public Video $video)
    {
    }
    
    public function handle()
    {
        // Process video
    }
}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🚀 Dispatching Jobs</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Dispatch to queue
ProcessVideo::dispatch($video);

// Dispatch with delay
ProcessVideo::dispatch($video)->delay(now()->addMinutes(10));

// Run queue worker
php artisan queue:work`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Jobs run in background</li>
          <li>• Improves response time</li>
          <li>• Use queue:work to process jobs</li>
        </ul>
      </div>
    </div>
  );
};

export default QueuesJobs;
