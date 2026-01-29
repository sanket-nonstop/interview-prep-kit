import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '../../../components/AnimatedButton';
import ScrollRotatingLogo from '../../../components/ScrollRotatingLogo';
import AnimatedCursor from '../../../components/AnimatedCursor';
import CodeBlock from '../../../components/CodeBlock';

gsap.registerPlugin(ScrollTrigger);

const AdvancedGsapShowcase = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.hero-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });

      // Fade boxes
      gsap.from('.fade-box', {
        scrollTrigger: { trigger: '.fade-demo', start: 'top 80%' },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8
      });

      // Rotate box
      const rotateBox = document.querySelector('.rotate-box');
      rotateBox?.addEventListener('click', () => {
        gsap.to(rotateBox, { rotation: '+=360', duration: 1, ease: 'power2.inOut' });
      });

      // Scale box
      const scaleBox = document.querySelector('.scale-box');
      scaleBox?.addEventListener('click', () => {
        gsap.to(scaleBox, { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' });
      });

      // Bounce box
      const bounceBox = document.querySelector('.bounce-box');
      bounceBox?.addEventListener('click', () => {
        gsap.to(bounceBox, { y: -80, duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.out' });
      });

      // Morph box
      const morphBox = document.querySelector('.morph-box');
      morphBox?.addEventListener('click', () => {
        gsap.to(morphBox, { 
          borderRadius: '50%', 
          backgroundColor: '#ec4899',
          duration: 0.5, 
          yoyo: true, 
          repeat: 1 
        });
      });

      // Stagger boxes
      const staggerBtn = document.querySelector('.stagger-btn');
      staggerBtn?.addEventListener('click', () => {
        gsap.fromTo('.stagger-item', 
          { y: 0, opacity: 1 },
          { y: -30, opacity: 0.5, stagger: 0.1, duration: 0.4, yoyo: true, repeat: 1 }
        );
      });

      // Parallax
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: '.parallax-demo',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -100
      });

      // Text reveal
      gsap.from('.reveal-word', {
        scrollTrigger: { trigger: '.text-reveal-demo', start: 'top 80%' },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6
      });

      // Counter
      const counter = { value: 0 };
      gsap.to(counter, {
        scrollTrigger: { trigger: '.counter-demo', start: 'top 80%' },
        value: 999,
        duration: 2,
        onUpdate: () => {
          const el = document.querySelector('.counter-value');
          if (el) el.textContent = Math.floor(counter.value).toString();
        }
      });

      // Path animation
      const path = document.querySelector('.anim-path');
      if (path) {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          scrollTrigger: { trigger: '.path-demo', start: 'top 80%' },
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut'
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="max-w-7xl mx-auto">
      <AnimatedCursor />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b p-4 mb-8">
        <div className="flex items-center gap-4">
          <ScrollRotatingLogo />
          <h1 className="text-2xl font-bold">GSAP Animation Studio</h1>
        </div>
      </div>

      {/* Hero */}
      <div className="hero-content text-center mb-20 py-12">
        <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Master GSAP
        </h2>
        <p className="text-xl text-muted-foreground mb-6">Interactive animations with live code examples</p>
        <AnimatedButton variant="gradient">Start Learning</AnimatedButton>
      </div>

      {/* 1. Fade In Stagger */}
      <div className="fade-demo mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">1️⃣ Fade In Stagger</h3>
          <div className="space-y-3 mb-6">
            <div className="fade-box h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">Box 1</div>
            <div className="fade-box h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">Box 2</div>
            <div className="fade-box h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">Box 3</div>
          </div>
          <CodeBlock code={`gsap.from('.fade-box', {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 0.8
});`} />
        </div>
      </div>

      {/* 2. Rotate on Click */}
      <div className="mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">2️⃣ Rotate 360°</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <div className="rotate-box w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl cursor-pointer flex items-center justify-center text-white font-bold text-2xl hover:shadow-xl transition-shadow">
              🔄
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-6">Click to rotate</p>
          <CodeBlock code={`element.addEventListener('click', () => {
  gsap.to(element, {
    rotation: '+=360',
    duration: 1,
    ease: 'power2.inOut'
  });
});`} />
        </div>
      </div>

      {/* 3. Scale Pulse */}
      <div className="mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">3️⃣ Scale Pulse</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <div className="scale-box w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-2xl hover:shadow-xl transition-shadow">
              💫
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-6">Click to pulse</p>
          <CodeBlock code={`gsap.to(element, {
  scale: 1.5,
  duration: 0.3,
  yoyo: true,
  repeat: 1,
  ease: 'back.out(2)'
});`} />
        </div>
      </div>

      {/* 4. Bounce */}
      <div className="mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">4️⃣ Bounce Effect</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <div className="bounce-box w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg cursor-pointer flex items-center justify-center text-white font-bold text-2xl hover:shadow-xl transition-shadow">
              ⬆️
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-6">Click to bounce</p>
          <CodeBlock code={`gsap.to(element, {
  y: -80,
  duration: 0.5,
  yoyo: true,
  repeat: 1,
  ease: 'power2.out'
});`} />
        </div>
      </div>

      {/* 5. Morph Shape */}
      <div className="mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">5️⃣ Morph Shape</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <div className="morph-box w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg cursor-pointer flex items-center justify-center text-white font-bold text-2xl hover:shadow-xl transition-shadow">
              🔷
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-6">Click to morph</p>
          <CodeBlock code={`gsap.to(element, {
  borderRadius: '50%',
  backgroundColor: '#ec4899',
  duration: 0.5,
  yoyo: true,
  repeat: 1
});`} />
        </div>
      </div>

      {/* 6. Stagger Wave */}
      <div className="mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">6️⃣ Stagger Wave</h3>
          <div className="flex items-center justify-center gap-2 h-48 mb-4">
            <div className="stagger-item w-12 h-16 bg-red-500 rounded"></div>
            <div className="stagger-item w-12 h-20 bg-yellow-500 rounded"></div>
            <div className="stagger-item w-12 h-24 bg-green-500 rounded"></div>
            <div className="stagger-item w-12 h-20 bg-blue-500 rounded"></div>
            <div className="stagger-item w-12 h-16 bg-purple-500 rounded"></div>
          </div>
          <button className="stagger-btn w-full mb-6 px-4 py-2 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg hover:opacity-90">
            Animate Wave
          </button>
          <CodeBlock code={`gsap.fromTo(items,
  { y: 0, opacity: 1 },
  {
    y: -30,
    opacity: 0.5,
    stagger: 0.1,
    duration: 0.4,
    yoyo: true,
    repeat: 1
  }
);`} />
        </div>
      </div>

      {/* 7. Parallax */}
      <div className="parallax-demo mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">7️⃣ Parallax Scroll</h3>
          <div className="relative h-64 overflow-hidden rounded-xl mb-4">
            <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
              <span className="text-4xl font-black text-white">PARALLAX</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Scroll to see effect</p>
          <CodeBlock code={`gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  },
  y: -100
});`} />
        </div>
      </div>

      {/* 8. Text Reveal */}
      <div className="text-reveal-demo mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">8️⃣ Text Reveal</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <div className="text-4xl font-bold space-x-2">
              <span className="reveal-word bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Smooth</span>
              <span className="reveal-word bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">Text</span>
              <span className="reveal-word bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Reveal</span>
            </div>
          </div>
          <CodeBlock code={`gsap.from('.reveal-word', {
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.6
});`} />
        </div>
      </div>

      {/* 9. Counter */}
      <div className="counter-demo mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">9️⃣ Animated Counter</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <div className="counter-value text-8xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">0</div>
          </div>
          <CodeBlock code={`const counter = { value: 0 };

gsap.to(counter, {
  value: 999,
  duration: 2,
  onUpdate: () => {
    element.textContent = 
      Math.floor(counter.value);
  }
});`} />
        </div>
      </div>

      {/* 10. SVG Path */}
      <div className="path-demo mb-12">
        <div className="topic-card p-6">
          <h3 className="text-2xl font-bold mb-4">🔟 SVG Path Draw</h3>
          <div className="flex items-center justify-center h-48 mb-6">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <path
                className="anim-path"
                d="M 50 100 Q 100 50 150 100 T 250 100"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <CodeBlock code={`const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length
});

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2
});`} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12 border-t">
        <p className="text-muted-foreground">Scroll up to see the logo rotate! 🔄</p>
      </div>
    </div>
  );
};

export default AdvancedGsapShowcase;
