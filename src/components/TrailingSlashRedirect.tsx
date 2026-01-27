import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const TrailingSlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    
    // Skip if already has trailing slash or is root
    if (pathname === '/' || pathname.endsWith('/')) return;
    
    // Add trailing slash and redirect
    navigate(`${pathname}/${search}${hash}`, { replace: true });
  }, [location, navigate]);

  return null;
};
