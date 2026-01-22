import { TopicLayout } from '@/components/TopicLayout';

const animationsCode = `/* CSS Animations & Transitions: Smooth, performant UI animations */

/* ✅ CSS Transitions - Simple state changes */
.button {
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  
  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.button:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* ✅ CSS Keyframe Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ✅ Animation classes */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

/* ✅ Staggered animations */
.stagger-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }
.stagger-item:nth-child(4) { animation-delay: 0.4s; }

/* ✅ Modal animations */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  
  /* Fade in overlay */
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  
  /* Scale and fade in content */
  opacity: 0;
  animation: modalSlideIn 0.3s ease-out 0.1s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* ✅ Performance optimizations */
.gpu-accelerated {
  /* Force GPU acceleration */
  transform: translateZ(0);
  will-change: transform, opacity;
}

.smooth-scroll {
  scroll-behavior: smooth;
}

/* ✅ Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ✅ React component with animations */
const AnimatedCard: React.FC<{ children: ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div
      ref={cardRef}
      className={\`card \${isVisible ? 'fade-in-up' : ''}\`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};`;

const Animations = () => {
  return (
    <TopicLayout
      title="Animations & Transitions"
      route="/css/animations"
      category="css"
      explanation="CSS animations and transitions create smooth, engaging user interfaces. Use transitions for simple state changes, keyframe animations for complex sequences, and consider performance with GPU acceleration. Always respect user preferences for reduced motion."
      code={animationsCode}
      codeFilename="animations.css"
      whyItMatters="Animations enhance user experience and provide visual feedback. Interviewers test understanding of performance implications, accessibility considerations, and when to use CSS vs JavaScript animations. Essential for modern, polished web interfaces."
      mistakes={[
        "Animating layout properties (width, height) - causes reflow. Use transform instead.",
        "Not respecting prefers-reduced-motion - breaks accessibility for motion-sensitive users.",
        "Over-animating everything - can be distracting and hurt performance.",
        "Using JavaScript for simple animations - CSS is more performant for basic transitions.",
      ]}
      practiceTask="Create a loading sequence with staggered card animations, a modal with smooth enter/exit transitions, and a button with hover effects. Ensure all animations respect reduced motion preferences."
    />
  );
};

export default Animations;