import { lazy } from 'react';
import { topicsDataNew } from '@/data/topics-new';

const lazyImport = (path: string) => lazy(() => import(`./pages/topics/${path}`));

export const generateRoutes = () => {
  const routes: Array<{ path: string; component: ReturnType<typeof lazy> }> = [];

  topicsDataNew.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.topics.forEach(topic => {
        const routePath = topic.route.replace(/\/$/, '');
        routes.push({
          path: routePath,
          component: lazyImport(getComponentPath(topic.route))
        });
      });
    });
  });

  return routes;
};

const getComponentPath = (route: string): string => {
  const parts = route.split('/').filter(Boolean);
  const category = parts[0];
  const fileName = parts[parts.length - 1];
  
  const pathMap: Record<string, string> = {
    html: `html/${capitalize(fileName)}`,
    css: `css/${capitalize(fileName)}`,
    javascript: `javascript/${capitalize(fileName)}`,
    react: `react/${capitalize(fileName)}`,
    typescript: `typescript/${capitalize(fileName)}`,
    nextjs: `nextjs/${capitalize(fileName)}`,
    seo: `seo/${capitalize(fileName)}`,
    'other-languages': parts[1] === 'php' 
      ? `php/${parts[2]}/${capitalize(fileName)}`
      : `laravel/${parts[2]}/${capitalize(fileName)}`,
    miscellaneous: `miscellaneous/${capitalize(fileName)}`,
    performance: `performance/${capitalize(fileName)}`,
    security: `security/${capitalize(fileName)}`,
    testing: `testing/${capitalize(fileName)}`
  };

  return pathMap[category] || fileName;
};

const capitalize = (str: string) => {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
};
