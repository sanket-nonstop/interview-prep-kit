import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { topicsDataNew } from '@/data/topics-new';

export const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/' || path === '/roadmap' || path.startsWith('/api-testing') || path.startsWith('/other-languages')) return null;

  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', path: '/' }];

  if (segments.length > 0) {
    const category = topicsDataNew.find(cat => cat.id === segments[0]);
    if (category) {
      breadcrumbs.push({ label: category.title, path: `/${segments[0]}` });

      if (segments.length > 1) {
        const subcategory = category.subcategories.find(sub => sub.id === segments[1]);
        if (subcategory) {
          breadcrumbs.push({ label: subcategory.title, path: '#' });

          if (segments.length > 2) {
            const topic = subcategory.topics.find(t => t.id === segments[2]);
            if (topic) {
              breadcrumbs.push({ label: topic.title, path: topic.route });
            }
          }
        }
      }
    }
  }

  return (
    <nav className="mb-6 p-3 bg-secondary/50 rounded-lg border border-border backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="px-3 py-1.5 bg-primary/10 text-primary font-medium rounded-md border border-primary/20">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-md transition-all flex items-center gap-1.5 border border-transparent hover:border-border"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
