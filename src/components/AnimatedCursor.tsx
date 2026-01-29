import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      
      follower.style.left = `${x}px`;
      follower.style.top = `${y}px`;
    };

    const hoverButton = () => {
      gsap.to([cursor, follower], { scale: 1.5, duration: 0.3 });
    };

    const leaveButton = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    
    const buttons = document.querySelectorAll('button, a, .hover-target');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', hoverButton);
      btn.addEventListener('mouseleave', leaveButton);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      buttons.forEach(btn => {
        btn.removeEventListener('mouseenter', hoverButton);
        btn.removeEventListener('mouseleave', leaveButton);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={followerRef}
        className="fixed w-6 h-6 border-2 border-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default AnimatedCursor;
