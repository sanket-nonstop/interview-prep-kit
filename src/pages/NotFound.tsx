import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, BookOpen, Code2, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { title: 'JavaScript Fundamentals', path: '/javascript/fundamentals/variables/', icon: '⚡' },
    { title: 'React Hooks', path: '/react/hooks/useState/', icon: '⚛️' },
    { title: 'CSS Flexbox', path: '/css/layout/flexbox/', icon: '🌈' },
    { title: 'API Testing Lab', path: '/api-testing/', icon: '🧪' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
            <span className="text-6xl font-bold text-primary">404</span>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/roadmap/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all font-semibold border border-border"
          >
            <Compass className="w-4 h-4" />
            View Roadmap
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="topic-card p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Popular Topics</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {popularPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{page.icon}</span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {page.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Need help?</strong> Use the search bar or sidebar navigation to find what you're looking for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
