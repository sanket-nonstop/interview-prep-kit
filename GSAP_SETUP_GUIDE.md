# GSAP Setup Guide for React

## 📦 Installation

```bash
npm install gsap
```

## 🚀 Quick Start - Single Animation Demo

Create a new file: `src/components/GsapDemo.jsx`

```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GsapDemo = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    // Animation runs on component mount
    gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: 'power2.inOut'
    });
  }, []);

  return (
    <div className="p-8">
      <div 
        ref={boxRef} 
        className="w-20 h-20 bg-blue-500 rounded-lg"
      />
    </div>
  );
};

export default GsapDemo;
```

## 🎮 Interactive Animation with Button

```jsx
import { useRef } from 'react';
import gsap from 'gsap';

const InteractiveDemo = () => {
  const boxRef = useRef(null);

  const handleAnimate = () => {
    gsap.to(boxRef.current, {
      x: 300,
      duration: 1,
      ease: 'bounce.out'
    });
  };

  return (
    <div className="p-8">
      <div ref={boxRef} className="w-20 h-20 bg-purple-500 rounded-lg mb-4" />
      <button 
        onClick={handleAnimate}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Animate
      </button>
    </div>
  );
};

export default InteractiveDemo;
```

## 🔄 Yoyo Animation (Back and Forth)

```jsx
const handleYoyo = () => {
  gsap.to(boxRef.current, {
    x: 200,
    duration: 1,
    ease: 'power2.inOut',
    yoyo: true,      // Reverse animation
    repeat: 1        // Repeat once (goes back)
  });
};
```

## 🎯 Multiple Properties

```jsx
gsap.to(boxRef.current, {
  x: 200,
  y: 100,
  rotation: 360,
  scale: 1.5,
  backgroundColor: '#ec4899',
  borderRadius: '50%',
  duration: 1.5
});
```

## 🌊 Stagger Multiple Elements

```jsx
const StaggerDemo = () => {
  const containerRef = useRef(null);

  const handleStagger = () => {
    const boxes = containerRef.current.querySelectorAll('.box');
    gsap.to(boxes, {
      y: -50,
      duration: 0.5,
      stagger: 0.1,  // 0.1s delay between each
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div className="p-8">
      <div ref={containerRef} className="flex gap-2">
        <div className="box w-12 h-12 bg-red-500" />
        <div className="box w-12 h-12 bg-blue-500" />
        <div className="box w-12 h-12 bg-green-500" />
        <div className="box w-12 h-12 bg-yellow-500" />
      </div>
      <button onClick={handleStagger}>Animate</button>
    </div>
  );
};
```

## 🎨 Cool Animation Examples

### 1. Elastic Bounce
```jsx
gsap.to(box, {
  x: 200,
  duration: 1.5,
  ease: 'elastic.out(1, 0.3)'
});
```

### 2. Spiral Effect
```jsx
gsap.to(box, {
  rotation: 720,
  scale: 0.2,
  duration: 1,
  ease: 'power2.in'
});
```

### 3. Morph Shape
```jsx
gsap.to(box, {
  borderRadius: '50%',
  backgroundColor: '#ec4899',
  scale: 1.3,
  duration: 0.5
});
```

### 4. 3D Flip
```jsx
gsap.to(box, {
  rotationY: 180,
  duration: 0.6,
  ease: 'power2.inOut'
});
```

### 5. Skew Slide
```jsx
gsap.to(box, {
  skewX: 20,
  x: 100,
  duration: 0.5,
  ease: 'power2.out'
});
```

## 📍 Where to Add Code in Your Project

### Option 1: New Component
1. Create `src/components/MyAnimation.jsx`
2. Copy any demo code above
3. Import in your main file:
```jsx
import MyAnimation from './components/MyAnimation';

function App() {
  return <MyAnimation />;
}
```

### Option 2: Add to Existing Component
```jsx
// In your existing component file
import { useRef } from 'react';
import gsap from 'gsap';

function MyComponent() {
  const boxRef = useRef(null);

  const animate = () => {
    gsap.to(boxRef.current, { x: 200, duration: 1 });
  };

  return (
    <div>
      {/* Your existing code */}
      <div ref={boxRef} className="w-20 h-20 bg-blue-500" />
      <button onClick={animate}>Animate</button>
    </div>
  );
}
```

### Option 3: Replace in GSAP Page
**File:** `src/pages/topics/react/GsapAnimations.tsx`

**Find this section (around line 70-90):**
```jsx
const handleAnimate = () => {
  if (demoBoxRef.current && !isAnimating) {
    setIsAnimating(true);
    gsap.to(demoBoxRef.current, {
      x: 300,
      duration: 1,
      ease: 'power2.out',
      // REPLACE THIS ANIMATION CODE
    });
  }
};
```

**Replace with your cool animation:**
```jsx
const handleAnimate = () => {
  if (demoBoxRef.current && !isAnimating) {
    setIsAnimating(true);
    gsap.to(demoBoxRef.current, {
      rotation: 720,
      scale: 0.2,
      x: 300,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
      // Your new animation
    });
  }
};
```

## 🎓 Key Points

1. **Always use `useRef`** to reference DOM elements
2. **Use `useEffect`** for animations on mount
3. **Use functions** for click-triggered animations
4. **Add `yoyo: true, repeat: 1`** for back-and-forth animations
5. **Cleanup** (optional but recommended):
```jsx
useEffect(() => {
  const animation = gsap.to(box, { x: 200 });
  return () => animation.kill(); // Cleanup
}, []);
```

## 🔥 Popular Easing Functions

- `'power2.out'` - Smooth deceleration
- `'back.out(2)'` - Overshoot effect
- `'elastic.out(1, 0.3)'` - Bouncy elastic
- `'bounce.out'` - Bouncing ball
- `'power2.inOut'` - Smooth acceleration & deceleration

## 🚨 Common Mistakes

❌ **Don't do this:**
```jsx
gsap.to('.box', { x: 200 }); // Using class selector
```

✅ **Do this:**
```jsx
gsap.to(boxRef.current, { x: 200 }); // Using ref
```

---

**Need more examples?** Check `src/pages/topics/react/GsapAnimations.tsx` for 12 working demos!
