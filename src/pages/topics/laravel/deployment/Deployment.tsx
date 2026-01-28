const Deployment = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Deployment Best Practices</h1>
        <p className="text-lg text-muted-foreground">Deploy Laravel to production</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🚀 Deployment Checklist</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-muted-foreground">Set APP_ENV=production</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-muted-foreground">Set APP_DEBUG=false</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-muted-foreground">Run php artisan config:cache</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-muted-foreground">Run php artisan route:cache</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-muted-foreground">Run composer install --optimize-autoloader</span>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔒 Security</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`# Generate app key
php artisan key:generate

# Set proper permissions
chmod -R 755 storage bootstrap/cache

# Use HTTPS
APP_URL=https://yourdomain.com`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Always disable debug in production</li>
          <li>• Cache config and routes</li>
          <li>• Use environment variables for secrets</li>
        </ul>
      </div>
    </div>
  );
};

export default Deployment;
