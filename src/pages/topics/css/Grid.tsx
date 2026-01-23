import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const gridCode = `// CSS Grid: 2D layout system for complex designs

/* ✅ Basic grid container */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 columns: 1:2:1 ratio */
  grid-template-rows: auto 1fr auto; /* header, main, footer */
  gap: 1rem;
  min-height: 100vh;
}

/* ✅ Named grid areas - semantic layout */
.layout-grid {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: 60px 1fr 40px;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* ✅ Responsive card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* ✅ Complex dashboard layout */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 100px);
  gap: 1rem;
}

.widget-large {
  grid-column: span 8; /* Takes 8 columns */
  grid-row: span 3; /* Takes 3 rows */
}

.widget-small {
  grid-column: span 4;
  grid-row: span 2;
}

/* ✅ Grid alignment */
.centered-grid {
  display: grid;
  place-items: center; /* Center both axes */
  grid-template-columns: repeat(3, 100px);
  gap: 1rem;
}

.aligned-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: start; /* Horizontal alignment */
  align-items: center; /* Vertical alignment */
}

/* ✅ Responsive breakpoints */
@media (max-width: 768px) {
  .layout-grid {
    grid-template-areas: 
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .card-grid {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
}`;

const Grid = () => {
  return (
    <TopicLayout
      title="CSS Grid"
      route="/css/grid"
      category="css"
      explanation="CSS Grid is a 2D layout system that handles both rows and columns simultaneously. Use grid-template-areas for semantic layouts, auto-fit/auto-fill for responsive grids, and fractional units (fr) for flexible sizing. Perfect for complex layouts that Flexbox can't handle efficiently."
      code={gridCode}
      codeFilename="grid.css"
      whyItMatters="CSS Grid is essential for modern web layouts. Interviewers test if you can create responsive designs without frameworks, understand when to use Grid vs Flexbox, and can build complex layouts efficiently. It's the standard for dashboard and card-based designs."
      mistakes={[
        "Using Grid for everything - Flexbox is better for 1D layouts and component-level alignment.",
        "Not using semantic grid-template-areas - makes layouts harder to understand and maintain.",
        "Forgetting mobile-first responsive design - always test grid layouts on small screens.",
        "Overcomplicating with too many grid lines - use named areas and spans for clarity.",
      ]}
      practiceTask="Create a responsive blog layout with header, sidebar, main content, and footer. Use named grid areas and make it collapse to single column on mobile. Add a card grid for blog posts that auto-fits based on screen size."
    >
      <MultiExampleEditor
        title="🎯 Try It Yourself: CSS Grid"
        examples={[
          {
            title: "Card Grid",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .card:hover { transform: translateY(-5px); }
    .card h3 { margin: 0 0 10px 0; color: #3B82F6; }
    .card p { margin: 0; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">
      <h3>🚀 Card 1</h3>
      <p>Auto-fit grid layout</p>
    </div>
    <div class="card">
      <h3>🎨 Card 2</h3>
      <p>Responsive design</p>
    </div>
    <div class="card">
      <h3>✨ Card 3</h3>
      <p>Hover effects</p>
    </div>
    <div class="card">
      <h3>📊 Card 4</h3>
      <p>Grid magic!</p>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Dashboard Layout",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    .dashboard {
      display: grid;
      grid-template-areas:
        "header header header"
        "sidebar main main"
        "sidebar main main";
      grid-template-columns: 200px 1fr 1fr;
      grid-template-rows: 60px 1fr 1fr;
      gap: 15px;
      height: 100vh;
      padding: 15px;
      background: #f5f5f5;
    }
    .header { grid-area: header; background: #1F2937; color: white; padding: 20px; border-radius: 8px; }
    .sidebar { grid-area: sidebar; background: #374151; color: white; padding: 20px; border-radius: 8px; }
    .main { grid-area: main; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="dashboard">
    <div class="header"><h2 style="margin:0">🏛️ Dashboard</h2></div>
    <div class="sidebar">
      <h3>Menu</h3>
      <p>🏠 Home</p>
      <p>📊 Analytics</p>
      <p>⚙️ Settings</p>
    </div>
    <div class="main">
      <h2>Main Content</h2>
      <p>Grid template areas make layouts semantic and easy to understand!</p>
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

export default Grid;