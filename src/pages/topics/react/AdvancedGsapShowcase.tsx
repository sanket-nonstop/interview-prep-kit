import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '../../../components/AnimatedButton';
import ScrollRotatingLogo from '../../../components/ScrollRotatingLogo';
import AnimatedCursor from '../../../components/AnimatedCursor';
import CodeBlock from '../../../components/CodeBlock';

gsap.registerPlugin(ScrollTrigger);

const AdvancedGsapShowcase = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero fade in
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    });

    // Cards stagger on scroll
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.card');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Parallax effect
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -100,
        ease: 'none'
      });
    }

    // Text reveal
    if (textRevealRef.current) {
      const words = textRevealRef.current.querySelectorAll('.word');
      gsap.from(words, {
        scrollTrigger: {
          trigger: textRevealRef.current,
          start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6
      });
    }

    // Pin section
    if (pinSectionRef.current) {
      ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        pinSpacing: true
      });
    }

    // Counter animation
    if (counterRef.current) {
      const counter = { value: 0 };
      gsap.to(counter, {
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 80%'
        },
        value: 1000,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(counter.value).toString();
          }
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <AnimatedCursor />
      
      {/* Header with rotating logo */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b p-4 mb-8">
        <div className="flex items-center gap-4">
          <ScrollRotatingLogo />
          <h1 className="text-2xl font-bold">Advanced GSAP Showcase</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="min-h-[60vh] flex flex-col items-center justify-center text-center mb-20">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Scroll-Based Animations
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Experience smooth GSAP animations triggered by scroll
        </p>
        <div className="flex gap-4">
          <AnimatedButton variant="gradient">Get Started</AnimatedButton>
          <AnimatedButton variant="secondary">Learn More</AnimatedButton>
        </div>
      </div>

      {/* Cards Section with Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">📦 Cards Stagger Animation</h2>
        <div ref={cardsRef} className="grid gap-4 mb-6">
          <div className="card topic-card p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-xl font-bold mb-1">Fast Performance</h3>
            <p className="text-sm text-muted-foreground">Optimized animations at 60fps</p>
          </div>
          <div className="card topic-card p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="text-xl font-bold mb-1">Beautiful Design</h3>
            <p className="text-sm text-muted-foreground">Smooth transitions</p>
          </div>
          <div className="card topic-card p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-bold mb-1">Easy to Use</h3>
            <p className="text-sm text-muted-foreground">Simple API</p>
          </div>
        </div>
        <CodeBlock code={`const cards = container.querySelectorAll('.card');

gsap.from(cards, {
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: 'power2.out'
});`} />
      </div>

      {/* Parallax Section with Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">🌊 Parallax Effect</h2>
        <div className="relative h-[300px] overflow-hidden rounded-lg mb-6">
          <div
            ref={parallaxRef}
            className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
          >
            <h2 className="text-4xl font-bold text-white">Parallax</h2>
          </div>
        </div>
        <CodeBlock code={`gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1  // Smooth scrubbing
  },
  y: -100,
  ease: 'none'
});`} />
      </div>

      {/* Text Reveal Section with Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">✨ Text Reveal Animation</h2>
        <div ref={textRevealRef} className="flex items-center justify-center mb-6">
          <div className="text-3xl font-bold space-x-2">
            <span className="word">Reveal</span>
            <span className="word">Text</span>
            <span className="word">Word</span>
            <span className="word">By</span>
            <span className="word">Word</span>
          </div>
        </div>
        <CodeBlock code={`const words = element.querySelectorAll('.word');

gsap.from(words, {
  scrollTrigger: {
    trigger: element,
    start: 'top 70%'
  },
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 0.6
});`} />
      </div>

      {/* Pin Section with Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">📌 Pin Section</h2>
        <div ref={pinSectionRef} className="h-[300px] flex items-center justify-center bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Pinned</h2>
            <p className="text-sm text-muted-foreground">Stays fixed while scrolling</p>
          </div>
        </div>
        <CodeBlock code={`ScrollTrigger.create({
  trigger: element,
  start: 'top top',
  end: '+=500',
  pin: true,
  pinSpacing: true
});`} />
      </div>

      {/* Counter Section with Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">🔢 Animated Counter</h2>
        <div className="flex flex-col items-center justify-center mb-6">
          <div ref={counterRef} className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            0
          </div>
          <p className="text-sm text-muted-foreground mt-2">Scroll to animate</p>
        </div>
        <CodeBlock code={`const counter = { value: 0 };

gsap.to(counter, {
  scrollTrigger: {
    trigger: element,
    start: 'top 80%'
  },
  value: 1000,
  duration: 2,
  onUpdate: () => {
    element.textContent = 
      Math.floor(counter.value);
  }
});`} />
      </div>

      {/* Interactive Buttons Grid with Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">🎯 Interactive Buttons</h2>
        <div className="flex flex-col gap-3 justify-center mb-6">
          <AnimatedButton variant="primary">Primary Button</AnimatedButton>
          <AnimatedButton variant="secondary">Secondary Button</AnimatedButton>
          <AnimatedButton variant="gradient">Gradient Button</AnimatedButton>
        </div>
        <CodeBlock code={`const handleHover = () => {
  gsap.to(button, {
    scale: 1.1,
    duration: 0.3,
    ease: 'back.out(1.7)'
  });
};

const handleLeave = () => {
  gsap.to(button, {
    scale: 1,
    duration: 0.3
  });
};`} />
      </div>

      {/* Scroll Rotating Logo Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">🔄 Scroll Rotating Logo</h2>
        <CodeBlock code={`const handleScroll = () => {
  const currentScroll = window.scrollY;
  const scrollDiff = currentScroll - lastScroll;
  
  gsap.to(logo, {
    rotation: \`+=\${scrollDiff * 0.5}\`,
    duration: 0.5,
    ease: 'power2.out'
  });
  
  lastScroll = currentScroll;
};

window.addEventListener('scroll', handleScroll);`} />
      </div>

      {/* Custom Cursor Code */}
      <div className="topic-card p-6 mb-20">
        <h2 className="text-2xl font-bold mb-6">👁️ Custom Animated Cursor</h2>
        <CodeBlock code={`const moveCursor = (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0
  });
  
  gsap.to(follower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15
  });
};

const hoverButton = () => {
  gsap.to([cursor, follower], {
    scale: 1.5,
    duration: 0.3
  });
};

window.addEventListener('mousemove', moveCursor);`} />
      </div>

      {/* Footer */}
      <div className="text-center py-12 text-muted-foreground">
        <p>Scroll up to see the logo rotate! 🔄</p>
      </div>
    </div>
  );
};

export default AdvancedGsapShowcase;
