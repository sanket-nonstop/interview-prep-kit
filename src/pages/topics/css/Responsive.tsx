import { TopicLayout } from '@/components/TopicLayout';

const responsiveCode = `/* Responsive Design: Mobile-first approach with Tailwind CSS */

/* ✅ Mobile-first breakpoints */
.container {
  @apply w-full px-4;
  
  /* Mobile: default styles */
  @apply text-sm;
  
  /* Tablet: 768px and up */
  @apply md:px-6 md:text-base;
  
  /* Desktop: 1024px and up */
  @apply lg:px-8 lg:text-lg;
  
  /* Large desktop: 1280px and up */
  @apply xl:max-w-7xl xl:mx-auto;
}

/* ✅ Responsive grid layouts */
.product-grid {
  @apply grid gap-4;
  
  /* Mobile: 1 column */
  @apply grid-cols-1;
  
  /* Tablet: 2 columns */
  @apply md:grid-cols-2;
  
  /* Desktop: 3 columns */
  @apply lg:grid-cols-3;
  
  /* Large: 4 columns */
  @apply xl:grid-cols-4;
}

/* ✅ Responsive typography */
.hero-title {
  @apply font-bold leading-tight;
  
  /* Mobile: 2xl */
  @apply text-2xl;
  
  /* Tablet: 4xl */
  @apply md:text-4xl;
  
  /* Desktop: 6xl */
  @apply lg:text-6xl;
}

/* ✅ Responsive spacing */
.section {
  @apply py-8 md:py-12 lg:py-16;
  @apply px-4 md:px-6 lg:px-8;
}

/* ✅ Show/hide elements by screen size */
.mobile-menu {
  @apply block md:hidden;
}

.desktop-nav {
  @apply hidden md:flex md:items-center md:space-x-6;
}

/* ✅ Responsive images */
.responsive-image {
  @apply w-full h-auto;
  @apply object-cover;
  
  /* Different aspect ratios */
  @apply aspect-square md:aspect-video;
}

/* ✅ Container queries (modern approach) */
.card-container {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    @apply flex-row;
  }
}

/* ✅ Fluid typography */
.fluid-text {
  font-size: clamp(1rem, 2.5vw, 2rem);
}

/* ✅ React component with responsive behavior */
const ResponsiveComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </div>
  );
};`;

const Responsive = () => {
  return (
    <TopicLayout
      title="Responsive Design"
      route="/css/responsive"
      category="css"
      explanation="Responsive design adapts layouts to different screen sizes using flexible grids, media queries, and fluid images. Mobile-first approach starts with mobile styles and progressively enhances for larger screens. Use Tailwind's responsive prefixes for efficient responsive development."
      code={responsiveCode}
      codeFilename="responsive.css"
      whyItMatters="Responsive design is mandatory for modern web development. Interviewers test mobile-first thinking, breakpoint strategy, and performance considerations. Essential for user experience across devices and SEO rankings."
      mistakes={[
        "Desktop-first approach - harder to optimize for mobile performance and experience.",
        "Too many breakpoints - creates maintenance overhead. Stick to 3-4 key breakpoints.",
        "Fixed pixel values everywhere - use relative units (rem, %, vw/vh) for flexibility.",
        "Not testing on real devices - emulators don't show touch interaction issues.",
      ]}
      practiceTask="Build a responsive dashboard with sidebar navigation that collapses to hamburger menu on mobile, card grid that adapts from 1-4 columns, and typography that scales fluidly between breakpoints."
    />
  );
};

export default Responsive;