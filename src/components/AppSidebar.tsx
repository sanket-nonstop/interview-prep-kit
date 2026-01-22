import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, BookOpen, Menu, X } from 'lucide-react';
import { topicsData, getCategoryColor } from '@/data/topics';
import { cn } from '@/lib/utils';

export const AppSidebar = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    topicsData.map((c) => c.id)
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isActive = (route: string) => location.pathname === route;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold">FE</span>
          </div>
          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
            Frontend Prep
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3">
        {/* Home & Roadmap */}
        <div className="mb-4">
          <Link
            to="/"
            className={cn('nav-link', isActive('/') && 'active')}
            onClick={() => setMobileOpen(false)}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            to="/roadmap"
            className={cn('nav-link', isActive('/roadmap') && 'active')}
            onClick={() => setMobileOpen(false)}
          >
            <BookOpen className="w-4 h-4" />
            Full Roadmap
          </Link>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {topicsData.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.title}
                </span>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedCategories.includes(category.id) && (
                <div className="ml-4 space-y-1 animate-slide-in">
                  {category.topics.map((topic) => (
                    <Link
                      key={topic.id}
                      to={topic.route}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block px-3 py-1.5 text-sm rounded-md transition-colors',
                        isActive(topic.route)
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          Built for interview prep 🚀
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform duration-300 lg:hidden flex flex-col',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
