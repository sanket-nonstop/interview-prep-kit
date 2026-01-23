import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: CSS Animations"
        examples={[
          {
            title: "Button Transitions",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; justify-content: center; align-items: center; }
  .button-group { display: flex; gap: 20px; flex-wrap: wrap; }
  .btn { padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .btn-primary { background: #3b82f6; color: white; }
  .btn-primary:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4); }
  .btn-primary:active { transform: translateY(0); }
  .btn-pulse { background: #10b981; color: white; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); } }
  .btn-bounce { background: #f59e0b; color: white; }
  .btn-bounce:hover { animation: bounce 0.6s; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
</style>
</head>
<body>
  <div class="button-group">
    <button class="btn btn-primary">Hover Me</button>
    <button class="btn btn-pulse">Pulsing</button>
    <button class="btn btn-bounce">Bounce</button>
  </div>
</body>
</html>`
          },
          {
            title: "Keyframe Animations",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #1e293b; color: white; }
  .container { max-width: 800px; margin: 0 auto; }
  h1 { text-align: center; margin-bottom: 40px; }
  .cards { display: grid; gap: 20px; }
  .card { background: #334155; padding: 20px; border-radius: 12px; opacity: 0; animation: fadeInUp 0.6s ease-out forwards; }
  .card:nth-child(1) { animation-delay: 0.1s; }
  .card:nth-child(2) { animation-delay: 0.2s; }
  .card:nth-child(3) { animation-delay: 0.3s; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .spinner { width: 40px; height: 40px; border: 4px solid #475569; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
  <div class="container">
    <h1>✨ Staggered Animations</h1>
    <div class="cards">
      <div class="card">🚀 Card 1 - Fades in first</div>
      <div class="card">🎉 Card 2 - Then this one</div>
      <div class="card">✨ Card 3 - Finally this one</div>
    </div>
    <div class="spinner"></div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Animations;