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
