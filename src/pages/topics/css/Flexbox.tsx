import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Flexbox;
