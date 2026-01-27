import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const TrailingSlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    
    if (pathname !== '/' && !pathname.endsWith('/')) {
      navigate(`${pathname}/${search}${hash}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
};
