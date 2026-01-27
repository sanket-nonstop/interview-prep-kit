import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, BookOpen, Menu, X, ChevronLeft } from 'lucide-react';
import { topicsDataNew, getCategoryColor } from '@/data/topics-new';
import { cn } from '@/lib/utils';

export const AppSidebar = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const isActive = (route: string) => location.pathname === route;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold">IP</span>
          </div>
          {!collapsed && (
            <span className="ms-4 font-semibold text-foreground group-hover:text-primary transition-colors">
              Interview Prep
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3">
        {/* Home & Roadmap */}
        <div className="mb-4">
          <Link
            to="/"
            className={cn('nav-link', collapsed && 'justify-center', isActive('/') && 'active')}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'Home' : ''}
          >
            <Home className="w-4 h-4" />
            {!collapsed && 'Home'}
          </Link>
          <Link
            to="/roadmap"
            className={cn('nav-link', collapsed && 'justify-center', isActive('/roadmap') && 'active')}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'Full Roadmap' : ''}
          >
            <BookOpen className="w-4 h-4" />
            {!collapsed && 'Full Roadmap'}
          </Link>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {topicsDataNew.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  collapsed && "justify-center"
                )}
                title={collapsed ? category.title : ''}
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  {!collapsed && category.title}
                </span>
                {!collapsed && (expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                ))}
              </button>

              {!collapsed && expandedCategories.includes(category.id) && (
                <div className="ml-3 space-y-1 mt-1">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id}>
                      <button
                        onClick={() => toggleSubcategory(`${category.id}-${subcategory.id}`)}
                        className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>{subcategory.title}</span>
                        {expandedSubcategories.includes(`${category.id}-${subcategory.id}`) ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </button>
                      {expandedSubcategories.includes(`${category.id}-${subcategory.id}`) && (
                        <div className="ml-3 space-y-0.5">
                          {subcategory.topics.map((topic) => (
                            <Link
                              key={topic.id}
                              to={topic.route}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                'block px-2 py-1 text-xs rounded-md transition-colors',
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
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center">
            Built for interview prep 🚀
          </div>
        )}
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
      <aside className={cn(
        "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0 transition-all",
        collapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-12 p-1 rounded-full bg-card border border-border hover:bg-secondary"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-40 transform lg:hidden flex flex-col',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
