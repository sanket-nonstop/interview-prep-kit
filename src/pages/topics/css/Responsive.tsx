import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Responsive Layouts"
        examples={[
          {
            title: "Mobile-First Grid",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 20px; font-family: system-ui; background: #f5f5f5; }
  .container { max-width: 1200px; margin: 0 auto; }
  .grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
  .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .card h3 { margin: 0 0 10px; color: #333; }
  .card p { margin: 0; color: #666; }
  
  /* Tablet: 768px+ */
  @media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
  
  /* Desktop: 1024px+ */
  @media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Responsive Grid</h1>
    <p>Resize window: 1 col → 2 cols → 3 cols</p>
    <div class="grid">
      <div class="card"><h3>📱 Card 1</h3><p>Mobile: Full width</p></div>
      <div class="card"><h3>💻 Card 2</h3><p>Tablet: 2 columns</p></div>
      <div class="card"><h3>🖥️ Card 3</h3><p>Desktop: 3 columns</p></div>
      <div class="card"><h3>✨ Card 4</h3><p>Adapts automatically</p></div>
      <div class="card"><h3>🎨 Card 5</h3><p>No media query needed</p></div>
      <div class="card"><h3>🚀 Card 6</h3><p>CSS Grid magic!</p></div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Responsive Navigation",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: system-ui; }
  nav { background: #2563eb; color: white; padding: 1rem; }
  .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .logo { font-size: 1.5rem; font-weight: bold; }
  .menu-btn { display: block; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
  .nav-links { display: none; position: absolute; top: 60px; left: 0; right: 0; background: #1e40af; flex-direction: column; padding: 1rem; }
  .nav-links.active { display: flex; }
  .nav-links a { color: white; text-decoration: none; padding: 0.5rem; }
  
  /* Desktop: 768px+ */
  @media (min-width: 768px) {
    .menu-btn { display: none; }
    .nav-links { display: flex !important; position: static; flex-direction: row; gap: 2rem; background: transparent; padding: 0; }
  }
</style>
</head>
<body>
  <nav>
    <div class="nav-container">
      <div class="logo">🚀 MyApp</div>
      <button class="menu-btn" onclick="document.querySelector('.nav-links').classList.toggle('active')">☰</button>
      <div class="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </nav>
  <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
    <h1>Responsive Navigation</h1>
    <p>📱 Mobile: Hamburger menu</p>
    <p>💻 Desktop: Horizontal links</p>
    <p>Try resizing the window!</p>
  </div>
</body>
</html>`
          },
          {
            title: "E-commerce Product Page",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; background: #f5f5f5; }
  .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
  .product-layout { display: grid; grid-template-columns: 1fr; gap: 30px; }
  .product-image { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; height: 300px; display: flex; align-items: center; justify-content: center; font-size: 5rem; }
  .product-info { background: white; padding: 30px; border-radius: 12px; }
  .product-title { font-size: 1.5rem; margin-bottom: 10px; }
  .product-price { font-size: 2rem; color: #3b82f6; font-weight: bold; margin: 20px 0; }
  .btn-buy { background: #10b981; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; width: 100%; margin-top: 20px; }
  
  @media (min-width: 768px) {
    .product-layout { grid-template-columns: 1fr 1fr; }
    .product-image { height: 400px; }
    .btn-buy { width: auto; }
  }
  
  @media (min-width: 1024px) {
    .product-layout { grid-template-columns: 1.5fr 1fr; }
    .product-image { height: 500px; }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="product-layout">
      <div class="product-image">👟</div>
      <div class="product-info">
        <h1 class="product-title">Premium Running Shoes</h1>
        <div class="product-price">$89.99</div>
        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">Professional-grade running shoes with advanced cushioning technology. Perfect for marathon training and daily runs.</p>
        <button class="btn-buy">🛒 Add to Cart</button>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Responsive Sidebar",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; }
  .layout { display: flex; flex-direction: column; min-height: 100vh; }
  .header { background: #1f2937; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
  .menu-toggle { background: #3b82f6; border: none; color: white; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
  .content-wrapper { display: flex; flex: 1; flex-direction: column; }
  .sidebar { background: #374151; color: white; padding: 20px; }
  .sidebar-item { padding: 12px; border-radius: 6px; margin-bottom: 5px; cursor: pointer; }
  .sidebar-item:hover { background: #4b5563; }
  .main-content { flex: 1; padding: 20px; background: #f9fafb; }
  
  @media (min-width: 768px) {
    .menu-toggle { display: none; }
    .content-wrapper { flex-direction: row; }
    .sidebar { width: 250px; min-height: calc(100vh - 60px); }
  }
</style>
</head>
<body>
  <div class="layout">
    <header class="header">
      <div>🚀 Dashboard</div>
      <button class="menu-toggle">☰ Menu</button>
    </header>
    <div class="content-wrapper">
      <aside class="sidebar">
        <div class="sidebar-item">🏠 Home</div>
        <div class="sidebar-item">📊 Analytics</div>
        <div class="sidebar-item">⚙️ Settings</div>
      </aside>
      <main class="main-content">
        <h1>Main Content</h1>
        <p>Sidebar stacks on mobile, shows beside on desktop</p>
      </main>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Responsive;