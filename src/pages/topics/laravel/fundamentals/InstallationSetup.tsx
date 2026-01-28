const InstallationSetup = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Laravel Installation & Setup</h1>
        <p className="text-lg text-muted-foreground">Get started with Laravel framework</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🚀 Installation</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`# Create new Laravel project
composer create-project laravel/laravel my-app

# Navigate to project
cd my-app

# Start development server
php artisan serve`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📁 Project Structure</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`my-app/
├── app/              # Application core
├── config/           # Configuration files
├── database/         # Migrations, seeders
├── public/           # Public files
├── resources/        # Views, CSS, JS
├── routes/           # Route definitions
└── .env              # Environment variables`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">⚙️ Environment Setup</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`# .env file
APP_NAME=MyApp
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=my_database
DB_USERNAME=root
DB_PASSWORD=`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Laravel requires PHP 8.1+ and Composer</li>
          <li>• Use composer create-project to install</li>
          <li>• Configure .env for database settings</li>
          <li>• php artisan serve starts dev server</li>
        </ul>
      </div>
    </div>
  );
};

export default InstallationSetup;
