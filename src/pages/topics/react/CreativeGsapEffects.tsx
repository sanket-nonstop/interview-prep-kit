import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '../../../components/AnimatedButton';
import AnimatedCursor from '../../../components/AnimatedCursor';

gsap.registerPlugin(ScrollTrigger);

const CreativeGsapEffects = () => {
  const magneticBtnRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);
  const morphShapeRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Magnetic button effect
    if (magneticBtnRef.current) {
      const btn = magneticBtnRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    // Liquid blob animation
    if (liquidRef.current) {
      gsap.to(liquidRef.current, {
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Morphing shape
    if (morphShapeRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(morphShapeRef.current, {
        borderRadius: '50%',
        rotation: 180,
        duration: 2,
        ease: 'power2.inOut'
      })
      .to(morphShapeRef.current, {
        borderRadius: '0%',
        rotation: 360,
        duration: 2,
        ease: 'power2.inOut'
      });
    }

    // Split text animation
    if (splitTextRef.current) {
      const letters = splitTextRef.current.querySelectorAll('.letter');
      gsap.from(letters, {
        scrollTrigger: {
          trigger: splitTextRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }

    // Image reveal
    if (imageRevealRef.current) {
      const overlay = imageRevealRef.current.querySelector('.overlay');
      gsap.to(overlay, {
        scrollTrigger: {
          trigger: imageRevealRef.current,
          start: 'top 70%'
        },
        x: '100%',
        duration: 1.5,
        ease: 'power3.inOut'
      });
    }

    // Floating elements
    if (floatingRef.current) {
      const items = floatingRef.current.querySelectorAll('.float-item');
      items.forEach((item, i) => {
        gsap.to(item, {
          y: -30,
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <AnimatedCursor />

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-3">Creative GSAP Effects</h1>
        <p className="text-lg text-muted-foreground">Advanced animations and interactions</p>
      </div>

      {/* Magnetic Button */}
      <div className="topic-card p-12 mb-8 text-center">
        <h2 className="text-2xl font-bold mb-6">🧲 Magnetic Button</h2>
        <p className="text-muted-foreground mb-8">Move your cursor near the button</p>
        <div className="flex justify-center">
          <div
            ref={magneticBtnRef}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-xl cursor-pointer hover-target"
          >
            Hover Me
          </div>
        </div>
        <pre className="bg-secondary/50 p-4 rounded-lg mt-8 text-left text-sm overflow-x-auto"><code>{`const handleMouseMove = (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(btn, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3
  });
};`}</code></pre>
      </div>

      {/* Liquid Blob */}
      <div className="topic-card p-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">💧 Liquid Blob</h2>
        <div className="flex justify-center mb-8">
          <div
            ref={liquidRef}
            className="w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-500"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          />
        </div>
        <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-x-auto"><code>{`gsap.to(blob, {
  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});`}</code></pre>
      </div>

      {/* Morphing Shape */}
      <div className="topic-card p-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">🔄 Morphing Shape</h2>
        <div className="flex justify-center mb-8">
          <div
            ref={morphShapeRef}
            className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"
          />
        </div>
        <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-x-auto"><code>{`const tl = gsap.timeline({ repeat: -1 });
tl.to(shape, {
  borderRadius: '50%',
  rotation: 180,
  duration: 2
}).to(shape, {
  borderRadius: '0%',
  rotation: 360,
  duration: 2
});`}</code></pre>
      </div>

      {/* Split Text Animation */}
      <div className="topic-card p-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">✨ Split Text Reveal</h2>
        <div ref={splitTextRef} className="text-5xl font-bold text-center mb-8 flex justify-center gap-2">
          {'CREATIVE'.split('').map((letter, i) => (
            <span key={i} className="letter inline-block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {letter}
            </span>
          ))}
        </div>
        <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-x-auto"><code>{`gsap.from(letters, {
  opacity: 0,
  y: 100,
  rotationX: -90,
  stagger: 0.05,
  duration: 0.8,
  ease: 'back.out(1.7)'
});`}</code></pre>
      </div>

      {/* Image Reveal */}
      <div className="topic-card p-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">🖼️ Image Reveal</h2>
        <div ref={imageRevealRef} className="relative w-full h-64 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
            Revealed Content
          </div>
          <div className="overlay absolute inset-0 bg-background z-10" />
        </div>
        <pre className="bg-secondary/50 p-4 rounded-lg mt-8 text-sm overflow-x-auto"><code>{`gsap.to(overlay, {
  x: '100%',
  duration: 1.5,
  ease: 'power3.inOut'
});`}</code></pre>
      </div>

      {/* Floating Elements */}
      <div className="topic-card p-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">🎈 Floating Elements</h2>
        <div ref={floatingRef} className="flex justify-center gap-8 h-40 items-center">
          <div className="float-item w-16 h-16 bg-red-500 rounded-full" />
          <div className="float-item w-16 h-16 bg-yellow-500 rounded-full" />
          <div className="float-item w-16 h-16 bg-green-500 rounded-full" />
          <div className="float-item w-16 h-16 bg-blue-500 rounded-full" />
        </div>
        <pre className="bg-secondary/50 p-4 rounded-lg mt-8 text-sm overflow-x-auto"><code>{`items.forEach((item, i) => {
  gsap.to(item, {
    y: -30,
    duration: 2 + i * 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: i * 0.2
  });
});`}</code></pre>
      </div>

      {/* Interactive Buttons */}
      <div className="topic-card p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">🎯 Animated Buttons</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <AnimatedButton variant="primary">Click Me</AnimatedButton>
          <AnimatedButton variant="gradient">Gradient</AnimatedButton>
          <AnimatedButton variant="secondary">Secondary</AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default CreativeGsapEffects;
