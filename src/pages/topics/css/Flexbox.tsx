import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const flexboxCode = `// Flexbox: One-dimensional layout (row OR column)

// ✅ Common patterns with Tailwind

// Navbar: Space between logo and nav items
<nav className="flex items-center justify-between px-6 py-4">
  <Logo />
  <div className="flex items-center gap-4">
    <NavLink>Home</NavLink>
    <NavLink>About</NavLink>
    <Button>Sign In</Button>
  </div>
</nav>

// Card layout: Image left, content right
<article className="flex gap-4">
  <img className="w-32 h-32 object-cover flex-shrink-0" />
  <div className="flex flex-col justify-between min-w-0">
    <h2 className="font-bold truncate">Long title...</h2>
    <p className="text-sm text-muted-foreground line-clamp-2">
      Description text that might wrap...
    </p>
    <span className="text-xs">Meta info</span>
  </div>
</article>

// Center anything (the holy grail)
<div className="flex items-center justify-center min-h-screen">
  <Modal />
</div>

// Sticky footer layout
<div className="flex flex-col min-h-screen">
  <Header />
  <main className="flex-1">{/* Takes remaining space */}</main>
  <Footer />
</div>

// Responsive: Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  <Sidebar className="md:w-64 flex-shrink-0" />
  <Content className="flex-1" />
</div>

// Key Tailwind flex utilities:
// flex-1      → flex: 1 1 0%      (grow, shrink, zero basis)
// flex-auto   → flex: 1 1 auto    (grow, shrink, auto basis)
// flex-none   → flex: none        (don't grow or shrink)
// flex-shrink-0 → Prevent shrinking (for fixed-size items)`;

const Flexbox = () => {
  return (
    <TopicLayout
      title="Flexbox"
      route="/css/flexbox"
      category="css"
      explanation="Flexbox is for one-dimensional layouts—either a row or column. It excels at distributing space, aligning items, and handling dynamic content sizes. Master justify-content (main axis) and align-items (cross axis)."
      code={flexboxCode}
      codeFilename="flexbox.tsx"
      codeLanguage="tsx"
      whyItMatters="Every interview includes layout tasks. Flexbox questions test: Can you center things? Can you build a responsive navbar? Do you know flex-shrink vs flex-grow? These are daily tasks in production."
      mistakes={[
        "Forgetting min-width: 0: Flex items won't shrink below content. Add min-w-0 for truncation.",
        "Using flexbox for grids: 2D layouts with rows AND columns should use CSS Grid.",
        "Confusing axes: justify = main axis, align = cross axis. Direction changes which is which.",
        "Fixed widths everywhere: Let flexbox calculate sizes. Use flex-1 instead of width: 50%.",
      ]}
      practiceTask="Build a responsive navigation bar: Logo on left, centered nav links, and auth buttons on right. On mobile, collapse links into a hamburger menu. Use only Tailwind flexbox utilities."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: Flexbox"
        examples={[
          {
            title: "Center Content",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
    }
    h1 { margin: 0 0 10px 0; color: #333; }
    p { margin: 0; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>🎉 Centered!</h1>
      <p>Perfect vertical & horizontal centering</p>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Pricing Cards",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; min-height: 100vh; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: white; text-align: center; margin-bottom: 40px; font-size: 2.5rem; }
    .pricing-grid { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; }
    .pricing-card { background: white; border-radius: 16px; padding: 40px 30px; min-width: 280px; flex: 1; max-width: 350px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); transition: transform 0.3s; display: flex; flex-direction: column; }
    .pricing-card:hover { transform: translateY(-10px); }
    .pricing-card.featured { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; transform: scale(1.05); border: 3px solid #fbbf24; }
    .pricing-card.featured:hover { transform: scale(1.08) translateY(-10px); }
    .plan-name { font-size: 1.5rem; font-weight: bold; margin: 0 0 10px 0; }
    .price { font-size: 3rem; font-weight: bold; margin: 20px 0; display: flex; align-items: baseline; }
    .currency { font-size: 1.5rem; margin-right: 5px; }
    .period { font-size: 1rem; color: #6b7280; margin-left: 5px; }
    .featured .period { color: rgba(255,255,255,0.8); }
    .features { list-style: none; padding: 0; margin: 30px 0; flex: 1; }
    .features li { padding: 12px 0; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; }
    .featured .features li { border-bottom-color: rgba(255,255,255,0.2); }
    .features li::before { content: '✓'; color: #10b981; font-weight: bold; margin-right: 10px; font-size: 1.2rem; }
    .featured .features li::before { color: #fbbf24; }
    .cta-btn { padding: 15px 30px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-top: auto; }
    .pricing-card:not(.featured) .cta-btn { background: #3b82f6; color: white; }
    .pricing-card:not(.featured) .cta-btn:hover { background: #2563eb; }
    .featured .cta-btn { background: white; color: #1e40af; }
    .featured .cta-btn:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .badge { background: #fbbf24; color: #1f2937; padding: 5px 15px; border-radius: 20px; font-size: 0.875rem; font-weight: bold; display: inline-block; margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Choose Your Plan</h1>
    <div class="pricing-grid">
      <div class="pricing-card">
        <h3 class="plan-name">Starter</h3>
        <div class="price">
          <span class="currency">$</span>19
          <span class="period">/month</span>
        </div>
        <ul class="features">
          <li>5 Projects</li>
          <li>10 GB Storage</li>
          <li>Basic Support</li>
          <li>Monthly Reports</li>
        </ul>
        <button class="cta-btn">Get Started</button>
      </div>
      
      <div class="pricing-card featured">
        <span class="badge">MOST POPULAR</span>
        <h3 class="plan-name">Professional</h3>
        <div class="price">
          <span class="currency">$</span>49
          <span class="period">/month</span>
        </div>
        <ul class="features">
          <li>Unlimited Projects</li>
          <li>100 GB Storage</li>
          <li>Priority Support</li>
          <li>Weekly Reports</li>
          <li>Advanced Analytics</li>
          <li>API Access</li>
        </ul>
        <button class="cta-btn">Start Free Trial</button>
      </div>
      
      <div class="pricing-card">
        <h3 class="plan-name">Enterprise</h3>
        <div class="price">
          <span class="currency">$</span>99
          <span class="period">/month</span>
        </div>
        <ul class="features">
          <li>Unlimited Everything</li>
          <li>1 TB Storage</li>
          <li>24/7 Dedicated Support</li>
          <li>Daily Reports</li>
          <li>Custom Integrations</li>
        </ul>
        <button class="cta-btn">Contact Sales</button>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Product Card Layout",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: system-ui; background: #f5f5f5; padding: 40px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #1f2937; margin-bottom: 30px; }
    .product-grid { display: flex; gap: 20px; flex-wrap: wrap; }
    .product-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.3s; display: flex; flex-direction: column; width: calc(33.333% - 14px); min-width: 280px; flex: 1; }
    .product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
    .product-image { width: 100%; height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; }
    .badge { position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; }
    .wishlist-btn { position: absolute; top: 10px; left: 10px; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.5rem; transition: all 0.3s; }
    .wishlist-btn:hover { transform: scale(1.1); background: #fef3c7; }
    .product-content { padding: 20px; display: flex; flex-direction: column; flex: 1; }
    .product-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 10px 0; color: #1f2937; }
    .product-desc { color: #6b7280; font-size: 0.875rem; margin: 0 0 15px 0; line-height: 1.5; }
    .product-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 15px; border-top: 1px solid #e5e7eb; }
    .price { font-size: 1.5rem; font-weight: bold; color: #3b82f6; }
    .old-price { font-size: 1rem; color: #9ca3af; text-decoration: line-through; margin-left: 8px; }
    .add-btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .add-btn:hover { background: #2563eb; transform: scale(1.05); }
    .rating { display: flex; align-items: center; gap: 5px; margin: 10px 0; }
    .stars { color: #fbbf24; }
    .rating-count { color: #6b7280; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Featured Products</h1>
    <div class="product-grid">
      <div class="product-card">
        <div class="product-image">
          👟
          <span class="badge">NEW</span>
          <button class="wishlist-btn">♡</button>
        </div>
        <div class="product-content">
          <h3 class="product-title">Running Shoes Pro</h3>
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span class="rating-count">(124)</span>
          </div>
          <p class="product-desc">Lightweight running shoes with advanced cushioning technology for maximum comfort.</p>
          <div class="product-footer">
            <div>
              <span class="price">$89.99</span>
            </div>
            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      </div>
      
      <div class="product-card">
        <div class="product-image">
          ⌚
          <span class="badge">-30%</span>
          <button class="wishlist-btn">♡</button>
        </div>
        <div class="product-content">
          <h3 class="product-title">Smart Watch X</h3>
          <div class="rating">
            <span class="stars">★★★★☆</span>
            <span class="rating-count">(89)</span>
          </div>
          <p class="product-desc">Advanced fitness tracking with heart rate monitor and GPS navigation.</p>
          <div class="product-footer">
            <div>
              <span class="price">$199.99</span>
              <span class="old-price">$279.99</span>
            </div>
            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      </div>
      
      <div class="product-card">
        <div class="product-image">
          🎧
          <button class="wishlist-btn">♡</button>
        </div>
        <div class="product-content">
          <h3 class="product-title">Wireless Earbuds</h3>
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span class="rating-count">(256)</span>
          </div>
          <p class="product-desc">Premium sound quality with active noise cancellation and 24hr battery life.</p>
          <div class="product-footer">
            <div>
              <span class="price">$149.99</span>
            </div>
            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Sticky Footer Layout",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui; display: flex; flex-direction: column; min-height: 100vh; }
    header { background: #1f2937; color: white; padding: 20px; }
    .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    nav { display: flex; gap: 20px; }
    nav a { color: white; text-decoration: none; transition: color 0.3s; }
    nav a:hover { color: #60a5fa; }
    main { flex: 1; padding: 40px 20px; background: #f9fafb; }
    .main-content { max-width: 1200px; margin: 0 auto; }
    .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    footer { background: #1f2937; color: white; padding: 40px 20px; margin-top: auto; }
    .footer-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 30px; }
    .footer-section { flex: 1; min-width: 200px; }
    .footer-section h3 { margin-bottom: 15px; color: #60a5fa; }
    .footer-section ul { list-style: none; }
    .footer-section ul li { margin-bottom: 10px; }
    .footer-section a { color: #d1d5db; text-decoration: none; transition: color 0.3s; }
    .footer-section a:hover { color: white; }
    .footer-bottom { max-width: 1200px; margin: 30px auto 0; padding-top: 20px; border-top: 1px solid #374151; text-align: center; color: #9ca3af; }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <div class="logo">🚀 MyWebsite</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </header>
  
  <main>
    <div class="main-content">
      <div class="card">
        <h1>Sticky Footer with Flexbox</h1>
        <p>This layout uses <code>display: flex</code> and <code>flex-direction: column</code> on the body with <code>min-height: 100vh</code>.</p>
        <p style="margin-top: 15px;">The main content area has <code>flex: 1</code> which makes it grow to fill available space, pushing the footer to the bottom.</p>
      </div>
      
      <div class="card">
        <h2>How It Works</h2>
        <ol style="margin-left: 20px; line-height: 1.8;">
          <li>Body: <code>display: flex; flex-direction: column; min-height: 100vh;</code></li>
          <li>Main: <code>flex: 1;</code> (grows to fill space)</li>
          <li>Footer: No flex property (stays at natural size)</li>
        </ol>
      </div>
      
      <div class="card">
        <h2>Benefits</h2>
        <p>✅ Footer always at bottom, even with little content</p>
        <p>✅ No absolute positioning required</p>
        <p>✅ Works with dynamic content</p>
        <p>✅ Fully responsive</p>
      </div>
    </div>
  </main>
  
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h3>Company</h3>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Support</h3>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © 2024 MyWebsite. All rights reserved. Footer stays at bottom!
    </div>
  </footer>
</body>
</html>`
          },
          {
            title: "Navbar Layout",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      background: #1F2937;
      color: white;
    }
    .logo { font-size: 24px; font-weight: bold; }
    .nav-links {
      display: flex;
      gap: 30px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
    }
    .nav-links a:hover { color: #60A5FA; }
    .btn {
      background: #3B82F6;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">MyBrand</div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
    </ul>
    <a href="#" class="btn">Sign In</a>
  </nav>
  <div style="padding: 40px;">
    <h1>Flexbox Navbar</h1>
    <p>Logo left, links center, button right!</p>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Flexbox;
