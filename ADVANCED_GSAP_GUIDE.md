# Advanced GSAP Implementation Guide

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedCursor.tsx       # Custom cursor that follows mouse
│   ├── ScrollRotatingLogo.tsx   # Logo that rotates on scroll/wheel
│   └── AnimatedButton.tsx       # Button with hover scale effects
├── pages/topics/react/
│   ├── GsapAnimations.tsx       # 12 basic GSAP examples
│   ├── AdvancedGsapShowcase.tsx # Scroll-based animations
│   └── CreativeGsapEffects.tsx  # Creative effects (magnetic, liquid, etc.)
```

## 🎯 Features Implemented

### 1. **Custom Animated Cursor** (`AnimatedCursor.tsx`)
- Follows mouse movement smoothly
- Scales up when hovering over buttons/links
- Uses `mix-blend-difference` for visibility

**Usage:**
```jsx
import AnimatedCursor from '@/components/AnimatedCursor';

function App() {
  return (
    <>
      <AnimatedCursor />
      {/* Your content */}
    </>
  );
}
```

### 2. **Scroll Rotating Logo** (`ScrollRotatingLogo.tsx`)
- Rotates based on scroll position
- Responds to mouse wheel events
- Smooth rotation with GSAP easing

**Usage:**
```jsx
import ScrollRotatingLogo from '@/components/ScrollRotatingLogo';

function Header() {
  return (
    <div className="header">
      <ScrollRotatingLogo />
      <h1>My App</h1>
    </div>
  );
}
```

### 3. **Animated Button** (`AnimatedButton.tsx`)
- Scales on hover with back easing
- Text lifts slightly on hover
- Press effect on click
- Three variants: primary, secondary, gradient

**Usage:**
```jsx
import AnimatedButton from '@/components/AnimatedButton';

<AnimatedButton variant="gradient" onClick={() => console.log('Clicked!')}>
  Click Me
</AnimatedButton>
```

## 📄 Pages Overview

### **GsapAnimations.tsx** - Basic Examples
12 side-by-side examples with code:
1. Slide Animation
2. Rotate 360°
3. Bounce
4. Scale Pulse
5. Morph Shape
6. 3D Flip
7. Stagger Wave
8. Text Wave
9. Spiral Shrink
10. Elastic Bounce
11. Random Color
12. Skew Slide

**Route:** `/react/gsap-animations/`

### **AdvancedGsapShowcase.tsx** - Scroll Animations
Features:
- Hero fade-in animation
- Cards stagger on scroll
- Parallax background effect
- Text reveal word-by-word
- Pinned section
- Animated counter
- Scroll-rotating logo in header
- Custom cursor

**Route:** `/react/advanced-gsap/`

### **CreativeGsapEffects.tsx** - Creative Effects
Features:
- Magnetic button (follows cursor)
- Liquid blob morphing
- Shape morphing (square ↔ circle)
- Split text reveal with 3D rotation
- Image reveal with overlay slide
- Floating elements

**Route:** `/react/creative-gsap/`

## 🚀 How to Use in Your Project

### Step 1: Install GSAP
```bash
npm install gsap
```

### Step 2: Import Components
```jsx
// In your main layout or specific pages
import AnimatedCursor from '@/components/AnimatedCursor';
import ScrollRotatingLogo from '@/components/ScrollRotatingLogo';
import AnimatedButton from '@/components/AnimatedButton';
```

### Step 3: Add to Your Layout
```jsx
function Layout() {
  return (
    <>
      <AnimatedCursor />
      <header>
        <ScrollRotatingLogo />
        <nav>...</nav>
      </header>
      <main>
        <AnimatedButton variant="gradient">
          Get Started
        </AnimatedButton>
      </main>
    </>
  );
}
```

## 🎨 Customization

### Cursor Colors
Edit `AnimatedCursor.tsx`:
```jsx
// Change colors
className="bg-primary"  // Change to bg-blue-500, bg-red-500, etc.
```

### Logo Design
Edit `ScrollRotatingLogo.tsx`:
```jsx
// Customize logo appearance
<div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500">
  Q  {/* Change letter or add icon */}
</div>
```

### Button Styles
```jsx
<AnimatedButton 
  variant="gradient"  // primary | secondary | gradient
  className="custom-class"  // Add custom classes
>
  Button Text
</AnimatedButton>
```

## 📝 Code Examples

### Magnetic Button Effect
```jsx
const handleMouseMove = (e: MouseEvent) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  gsap.to(btn, {
    x: x * 0.3,  // Adjust strength (0.1 - 0.5)
    y: y * 0.3,
    duration: 0.3,
    ease: 'power2.out'
  });
};
```

### Scroll-Based Animation
```jsx
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  y: 100,
  opacity: 0,
  duration: 1
});
```

### Stagger Animation
```jsx
const items = document.querySelectorAll('.item');
gsap.from(items, {
  y: 50,
  opacity: 0,
  stagger: 0.1,  // Delay between each item
  duration: 0.8
});
```

## 🎯 Navigation

Access the pages via:
- React sidebar → GSAP Animations
- React sidebar → Advanced GSAP Showcase
- React sidebar → Creative GSAP Effects

Or directly:
- `http://localhost:5173/react/gsap-animations/`
- `http://localhost:5173/react/advanced-gsap/`
- `http://localhost:5173/react/creative-gsap/`

## 🔧 Troubleshooting

### Cursor not showing
- Check z-index: `z-[9999]`
- Ensure `pointer-events-none` is set
- Verify `mix-blend-difference` compatibility

### Animations not triggering
- Import ScrollTrigger: `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
- Register plugin: `gsap.registerPlugin(ScrollTrigger)`
- Check trigger element exists

### Performance issues
- Use `will-change: transform` for animated elements
- Cleanup animations in useEffect return
- Use `gsap.killTweensOf()` when unmounting

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)

## 🎓 Key Takeaways

1. **Always use refs** in React for GSAP targets
2. **Cleanup animations** in useEffect return
3. **Register plugins** before using them
4. **Use ScrollTrigger** for scroll-based animations
5. **Stagger** creates sequential animations
6. **Yoyo + repeat** for back-and-forth effects
7. **Ease functions** control animation feel

---

**Created by:** Amazon Q Developer
**Last Updated:** 2024
