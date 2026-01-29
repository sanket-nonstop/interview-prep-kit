import { useRef } from 'react';
import gsap from 'gsap';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gradient';
  className?: string;
}

const AnimatedButton = ({ children, onClick, variant = 'primary', className = '' }: AnimatedButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
    gsap.to(textRef.current, {
      y: -2,
      duration: 0.2
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
    gsap.to(textRef.current, {
      y: 0,
      duration: 0.2
    });
  };

  const handleMouseDown = () => {
    gsap.to(btnRef.current, {
      scale: 0.95,
      duration: 0.1
    });
  };

  const handleMouseUp = () => {
    gsap.to(btnRef.current, {
      scale: 1.1,
      duration: 0.1
    });
  };

  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      <span ref={textRef} className="inline-block">
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
