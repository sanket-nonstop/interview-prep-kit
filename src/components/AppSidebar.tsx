import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, BookOpen, Menu, X, ChevronLeft, Code2 } from 'lucide-react';
import { topicsDataNew, getCategoryColor } from '@/data/topics-new';
import { cn } from '@/lib/utils';
import * as HoverCard from '@radix-ui/react-hover-card';

export const AppSidebar = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  const [expandedHoverSubcategories, setExpandedHoverSubcategories] = useState<string[]>([]);
  const [openHoverCard, setOpenHoverCard] = useState<string | null>(null);
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

  const toggleHoverSubcategory = (subcategoryId: string) => {
    setExpandedHoverSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (openHoverCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openHoverCard]);

  const isActive = (route: string) => location.pathname === route;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold">IP</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden">
              Interview Prep
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3 mt-4">
        {/* Home & Roadmap */}
        <div className="mb-4 pb-4 border-b border-border">
          <Link
            to="/"
            className={cn('nav-link', collapsed && 'justify-center', isActive('/') && 'active')}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'Home' : ''}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {!collapsed && 'Home'}
          </Link>
          <Link
            to="/roadmap"
            className={cn('nav-link', collapsed && 'justify-center', isActive('/roadmap') && 'active')}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'Full Roadmap' : ''}
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            {!collapsed && 'Full Roadmap'}
          </Link>
          <Link
            to="/api-testing"
            className={cn('nav-link', collapsed && 'justify-center', isActive('/api-testing') && 'active')}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'API Testing' : ''}
          >
            <Code2 className="w-4 h-4 flex-shrink-0" />
            {!collapsed && 'API Testing'}
          </Link>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {topicsDataNew.map((category) => (
            <div key={category.id}>
              {collapsed ? (
                // Collapsed: Show icon with click menu
                <div className="relative">
                  <button
                    onClick={() => setOpenHoverCard(openHoverCard === category.id ? null : category.id)}
                    className="w-full flex items-center justify-center px-2 py-2 text-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-md"
                    title={category.title}
                  >
                    <span>{category.icon}</span>
                  </button>
                  
                  {openHoverCard === category.id && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => {
                          setOpenHoverCard(null);
                          setExpandedHoverSubcategories([]);
                        }}
                      />
                      
                      {/* Popup Menu */}
                      <div className="fixed left-16 top-0 bottom-0 z-50 w-72 bg-popover border border-border rounded-lg shadow-xl p-4 overflow-y-auto">
                        <div className="space-y-3">
                          <h4 className="font-bold text-sm text-foreground mb-3 pb-2 border-b-2 border-primary/20">
                            {category.icon} {category.title}
                          </h4>
                          {category.subcategories.map((subcategory) => {
                            const hoverSubId = `hover-${category.id}-${subcategory.id}`;
                            const isExpanded = expandedHoverSubcategories.includes(hoverSubId);
                            
                            return (
                              <div key={subcategory.id} className="border border-border/50 rounded-md overflow-hidden">
                                <button
                                  onClick={() => toggleHoverSubcategory(hoverSubId)}
                                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-foreground bg-secondary/40 hover:bg-secondary/60 transition-colors"
                                >
                                  <span>{subcategory.title}</span>
                                  {isExpanded ? (
                                    <ChevronDown className="w-3 h-3" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3" />
                                  )}
                                </button>
                                {isExpanded && (
                                  <div className="bg-background/50 p-2 space-y-0.5">
                                    {subcategory.topics.map((topic) => (
                                      <Link
                                        key={topic.id}
                                        to={topic.route}
                                        onClick={() => {
                                          setMobileOpen(false);
                                          setOpenHoverCard(null);
                                          setExpandedHoverSubcategories([]);
                                        }}
                                        className={cn(
                                          'block px-3 py-2 text-xs rounded-md transition-colors',
                                          isActive(topic.route)
                                            ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70'
                                        )}
                                      >
                                        {topic.title}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Expanded: Show full menu
                <>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg flex-shrink-0">{category.icon}</span>
                      <span className="truncate">{category.title}</span>
                    </span>
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>

                  {expandedCategories.includes(category.id) && (
                    <div className="ml-3 space-y-2 mt-2">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="border-l-2 border-border pl-3">
                          <button
                            onClick={() => toggleSubcategory(`${category.id}-${subcategory.id}`)}
                            className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-foreground bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors"
                          >
                            <span>{subcategory.title}</span>
                            {expandedSubcategories.includes(`${category.id}-${subcategory.id}`) ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </button>
                          {expandedSubcategories.includes(`${category.id}-${subcategory.id}`) && (
                            <div className="ml-2 mt-1 space-y-0.5">
                              {subcategory.topics.map((topic) => (
                                <Link
                                  key={topic.id}
                                  to={topic.route}
                                  onClick={() => setMobileOpen(false)}
                                  className={cn(
                                    'block px-2 py-1.5 text-xs rounded-md transition-colors',
                                    isActive(topic.route)
                                      ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
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
                </>
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
        "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-12 p-1.5 rounded-full bg-card border border-border hover:bg-secondary shadow-md transition-all z-10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-40 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
