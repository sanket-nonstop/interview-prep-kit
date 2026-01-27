import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { topicsDataNew } from '@/data/topics-new';

export const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/' || path === '/roadmap') return null;

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
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              {index === 0 && <Home className="w-4 h-4" />}
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
