import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollRotatingLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - lastScroll;
      
      gsap.to(logo, {
        rotation: `+=${scrollDiff * 0.5}`,
        duration: 0.5,
        ease: 'power2.out'
      });

      lastScroll = currentScroll;
    };

    const handleWheel = (e: WheelEvent) => {
      gsap.to(logo, {
        rotation: `+=${e.deltaY * 0.1}`,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={logoRef}
      className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
    >
      Q
    </div>
  );
};

export default ScrollRotatingLogo;
