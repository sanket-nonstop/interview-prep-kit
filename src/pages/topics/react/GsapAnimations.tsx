import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapAnimations = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const demoBoxRef = useRef<HTMLDivElement>(null);
  const rotateBoxRef = useRef<HTMLDivElement>(null);
  const bounceBoxRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(boxRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.card');
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }
      );
    }

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );
    }
  }, []);

  const handleAnimate = () => {
    if (demoBoxRef.current && !isAnimating) {
      setIsAnimating(true);
      gsap.to(demoBoxRef.current, {
        x: 300,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(demoBoxRef.current, {
            x: 0,
            duration: 1,
            ease: 'power2.in',
            onComplete: () => setIsAnimating(false)
          });
        }
      });
    }
  };

  const handleRotate = () => {
    if (rotateBoxRef.current) {
      gsap.to(rotateBoxRef.current, {
        rotation: '+=360',
        duration: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const handleBounce = () => {
    if (bounceBoxRef.current) {
      gsap.to(bounceBoxRef.current, {
        y: -100,
        duration: 0.5,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">GSAP Animations</h1>
        <p className="text-lg text-muted-foreground">Professional animations with GreenSock Animation Platform</p>
      </div>

      <div className="topic-card p-6 mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎮 Interactive Demos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div ref={demoBoxRef} className="w-20 h-20 bg-primary rounded-lg mx-auto mb-4"></div>
            <button onClick={handleAnimate} disabled={isAnimating} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50">
              Slide Animation
            </button>
          </div>
          <div className="text-center">
            <div ref={rotateBoxRef} className="w-20 h-20 bg-blue-500 rounded-lg mx-auto mb-4"></div>
            <button onClick={handleRotate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Rotate 360°
            </button>
          </div>
          <div className="text-center">
            <div ref={bounceBoxRef} className="w-20 h-20 bg-green-500 rounded-lg mx-auto mb-4"></div>
            <button onClick={handleBounce} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Bounce
            </button>
          </div>
        </div>
      </div>

      <div ref={boxRef} className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎬 Basic Animation</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`import gsap from 'gsap';

// Simple animation
gsap.to('.box', {
  x: 100,
  duration: 1,
  ease: 'power2.out'
});

// From animation
gsap.from('.element', {
  opacity: 0,
  y: 50,
  duration: 1
});

// FromTo animation
gsap.fromTo('.item',
  { scale: 0 },
  { scale: 1, duration: 0.5 }
);`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">⚡ Timeline Animations</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`const tl = gsap.timeline();

tl.to('.box1', { x: 100, duration: 1 })
  .to('.box2', { y: 100, duration: 1 }, '-=0.5') // Overlap
  .to('.box3', { rotation: 360, duration: 1 });

// With callbacks
tl.to('.element', {
  x: 200,
  onComplete: () => console.log('Done!')
});`}</code></pre>
      </div>

      <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card topic-card p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <h3 className="font-semibold text-foreground mb-2">Stagger</h3>
          <p className="text-sm text-muted-foreground">Animate multiple elements with delay</p>
        </div>
        <div className="card topic-card p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <h3 className="font-semibold text-foreground mb-2">Easing</h3>
          <p className="text-sm text-muted-foreground">Power, elastic, bounce effects</p>
        </div>
        <div className="card topic-card p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <h3 className="font-semibold text-foreground mb-2">ScrollTrigger</h3>
          <p className="text-sm text-muted-foreground">Scroll-based animations</p>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📜 ScrollTrigger</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.box',
    start: 'top center',
    end: 'bottom center',
    scrub: 1, // Smooth scrubbing
    markers: true, // Debug markers
    pin: true // Pin element
  }
});`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 React Integration</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Component = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      x: 100,
      duration: 1
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(boxRef.current);
    };
  }, []);

  return <div ref={boxRef}>Animated Box</div>;
};`}</code></pre>
      </div>

      <div ref={textRef} className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• GSAP provides high-performance animations</li>
          <li>• Use timelines for complex sequences</li>
          <li>• ScrollTrigger for scroll-based effects</li>
          <li>• Always cleanup animations in React</li>
        </ul>
      </div>
    </div>
  );
};

export default GsapAnimations;
