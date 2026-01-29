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
          },
          {
            title: "Magazine Layout",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: 'Georgia', serif; background: #f5f5f5; padding: 20px; }
    .magazine { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .magazine-grid { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 200px; gap: 15px; }
    .article { background-size: cover; background-position: center; position: relative; overflow: hidden; border-radius: 8px; transition: transform 0.3s; cursor: pointer; }
    .article:hover { transform: scale(1.02); }
    .article::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%); }
    .article-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; color: white; z-index: 1; }
    .category { display: inline-block; background: #3b82f6; padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .article-title { font-size: 1.5rem; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; }
    .article-meta { font-size: 0.875rem; opacity: 0.9; }
    .featured { grid-column: span 8; grid-row: span 2; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .featured .article-title { font-size: 2.5rem; }
    .secondary { grid-column: span 4; grid-row: span 2; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .tertiary { grid-column: span 4; grid-row: span 1; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
    .small { grid-column: span 3; grid-row: span 1; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
  </style>
</head>
<body>
  <div class="magazine">
    <h1 style="margin-top: 0; color: #1f2937;">Today's Top Stories</h1>
    <div class="magazine-grid">
      <div class="article featured">
        <div class="article-content">
          <span class="category">Featured</span>
          <h2 class="article-title">The Future of Web Development</h2>
          <p class="article-meta">By John Doe • 5 min read</p>
        </div>
      </div>
      
      <div class="article secondary">
        <div class="article-content">
          <span class="category">Technology</span>
          <h2 class="article-title">AI Revolution in 2024</h2>
          <p class="article-meta">By Jane Smith • 3 min read</p>
        </div>
      </div>
      
      <div class="article tertiary">
        <div class="article-content">
          <span class="category">Design</span>
          <h2 class="article-title">CSS Grid Mastery</h2>
          <p class="article-meta">By Alex • 4 min</p>
        </div>
      </div>
      
      <div class="article tertiary">
        <div class="article-content">
          <span class="category">Business</span>
          <h2 class="article-title">Startup Success</h2>
          <p class="article-meta">By Sarah • 6 min</p>
        </div>
      </div>
      
      <div class="article tertiary">
        <div class="article-content">
          <span class="category">Health</span>
          <h2 class="article-title">Wellness Tips</h2>
          <p class="article-meta">By Mike • 2 min</p>
        </div>
      </div>
      
      <div class="article small">
        <div class="article-content">
          <span class="category">Travel</span>
          <h2 class="article-title" style="font-size: 1rem;">Hidden Gems</h2>
        </div>
      </div>
      
      <div class="article small">
        <div class="article-content">
          <span class="category">Food</span>
          <h2 class="article-title" style="font-size: 1rem;">Quick Recipes</h2>
        </div>
      </div>
      
      <div class="article small">
        <div class="article-content">
          <span class="category">Sports</span>
          <h2 class="article-title" style="font-size: 1rem;">Game Highlights</h2>
        </div>
      </div>
      
      <div class="article small">
        <div class="article-content">
          <span class="category">Entertainment</span>
          <h2 class="article-title" style="font-size: 1rem;">Movie Reviews</h2>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Photo Gallery",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; font-family: system-ui; background: #1f2937; padding: 40px; }
    h1 { color: white; text-align: center; margin-bottom: 40px; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); grid-auto-rows: 250px; gap: 15px; max-width: 1400px; margin: 0 auto; }
    .gallery-item { position: relative; overflow: hidden; border-radius: 12px; cursor: pointer; }
    .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .gallery-item:hover img { transform: scale(1.1); }
    .gallery-item-tall { grid-row: span 2; }
    .gallery-item-wide { grid-column: span 2; }
    .gallery-item-large { grid-column: span 2; grid-row: span 2; }
    .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 20px; }
    .gallery-item:hover .overlay { opacity: 1; }
    .overlay-content { color: white; }
    .overlay-title { font-size: 1.25rem; font-weight: bold; margin: 0 0 5px 0; }
    .overlay-desc { font-size: 0.875rem; opacity: 0.9; margin: 0; }
    .photo-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
  </style>
</head>
<body>
  <h1>🖼️ Photo Gallery</h1>
  <div class="gallery">
    <div class="gallery-item gallery-item-large" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="photo-placeholder">🌄</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Mountain Sunrise</h3>
          <p class="overlay-desc">Colorado Rockies, 2024</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
      <div class="photo-placeholder">🌊</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Ocean Waves</h3>
          <p class="overlay-desc">California Coast</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item gallery-item-tall" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
      <div class="photo-placeholder">🏛️</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Ancient Temple</h3>
          <p class="overlay-desc">Kyoto, Japan</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
      <div class="photo-placeholder">🌲</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Forest Path</h3>
          <p class="overlay-desc">Amazon Rainforest</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item gallery-item-wide" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
      <div class="photo-placeholder">🌆</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">City Skyline</h3>
          <p class="overlay-desc">New York at Dusk</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
      <div class="photo-placeholder">🏜️</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Desert Dunes</h3>
          <p class="overlay-desc">Sahara Desert</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);">
      <div class="photo-placeholder">❄️</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Winter Wonderland</h3>
          <p class="overlay-desc">Swiss Alps</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item gallery-item-tall" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);">
      <div class="photo-placeholder">🌸</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Cherry Blossoms</h3>
          <p class="overlay-desc">Tokyo, Spring</p>
        </div>
      </div>
    </div>
    
    <div class="gallery-item" style="background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
      <div class="photo-placeholder">🌙</div>
      <div class="overlay">
        <div class="overlay-content">
          <h3 class="overlay-title">Night Sky</h3>
          <p class="overlay-desc">Stargazing</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Dashboard Widgets",
            code: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui; background: #f5f5f5; padding: 20px; }
    .dashboard { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: 100px; gap: 20px; max-width: 1400px; margin: 0 auto; }
    .widget { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; transition: transform 0.3s, box-shadow 0.3s; }
    .widget:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
    .widget-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .widget-title { font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .widget-icon { font-size: 1.5rem; }
    .widget-value { font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
    .widget-label { font-size: 0.875rem; color: #9ca3af; }
    .widget-change { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-top: 8px; }
    .positive { background: #d1fae5; color: #065f46; }
    .negative { background: #fee2e2; color: #991b1b; }
    .stat-small { grid-column: span 3; grid-row: span 1; }
    .stat-medium { grid-column: span 4; grid-row: span 2; }
    .stat-large { grid-column: span 8; grid-row: span 3; }
    .chart-placeholder { flex: 1; background: linear-gradient(to bottom, #dbeafe 0%, #eff6ff 100%); border-radius: 8px; margin-top: 15px; display: flex; align-items: center; justify-content: center; color: #3b82f6; font-size: 3rem; }
    .activity-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .activity-item:last-child { border-bottom: none; }
    @media (max-width: 768px) {
      .dashboard { grid-template-columns: 1fr; }
      .stat-small, .stat-medium, .stat-large { grid-column: span 1; }
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <div class="widget stat-small">
      <div class="widget-header">
        <span class="widget-title">Total Users</span>
        <span class="widget-icon">👥</span>
      </div>
      <div class="widget-value">24.5K</div>
      <span class="widget-change positive">↑ 12% vs last month</span>
    </div>
    
    <div class="widget stat-small">
      <div class="widget-header">
        <span class="widget-title">Revenue</span>
        <span class="widget-icon">💰</span>
      </div>
      <div class="widget-value">$89.2K</div>
      <span class="widget-change positive">↑ 8.3%</span>
    </div>
    
    <div class="widget stat-small">
      <div class="widget-header">
        <span class="widget-title">Orders</span>
        <span class="widget-icon">📦</span>
      </div>
      <div class="widget-value">1,428</div>
      <span class="widget-change negative">↓ 3.2%</span>
    </div>
    
    <div class="widget stat-small">
      <div class="widget-header">
        <span class="widget-title">Conversion</span>
        <span class="widget-icon">🎯</span>
      </div>
      <div class="widget-value">3.2%</div>
      <span class="widget-change positive">↑ 0.8%</span>
    </div>
    
    <div class="widget stat-large">
      <div class="widget-header">
        <span class="widget-title">Sales Analytics</span>
        <span class="widget-icon">📊</span>
      </div>
      <div class="chart-placeholder">📊 Chart Area</div>
    </div>
    
    <div class="widget stat-medium">
      <div class="widget-header">
        <span class="widget-title">Recent Activity</span>
        <span class="widget-icon">⏱️</span>
      </div>
      <div style="flex: 1; overflow-y: auto;">
        <div class="activity-item">
          <span>New order #1234</span>
          <span style="color: #10b981;">$120</span>
        </div>
        <div class="activity-item">
          <span>User signup</span>
          <span style="color: #6b7280;">2m ago</span>
        </div>
        <div class="activity-item">
          <span>Payment received</span>
          <span style="color: #10b981;">$540</span>
        </div>
        <div class="activity-item">
          <span>New review</span>
          <span style="color: #fbbf24;">★★★★★</span>
        </div>
      </div>
    </div>
    
    <div class="widget stat-medium" style="grid-column: span 6;">
      <div class="widget-header">
        <span class="widget-title">Traffic Sources</span>
        <span class="widget-icon">🌐</span>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Direct</span>
          <div style="flex: 1; height: 8px; background: #e5e7eb; margin: 0 15px; border-radius: 4px; overflow: hidden;">
            <div style="width: 65%; height: 100%; background: #3b82f6;"></div>
          </div>
          <span style="font-weight: 600;">65%</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Social</span>
          <div style="flex: 1; height: 8px; background: #e5e7eb; margin: 0 15px; border-radius: 4px; overflow: hidden;">
            <div style="width: 45%; height: 100%; background: #10b981;"></div>
          </div>
          <span style="font-weight: 600;">45%</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Search</span>
          <div style="flex: 1; height: 8px; background: #e5e7eb; margin: 0 15px; border-radius: 4px; overflow: hidden;">
            <div style="width: 28%; height: 100%; background: #f59e0b;"></div>
          </div>
          <span style="font-weight: 600;">28%</span>
        </div>
      </div>
    </div>
    
    <div class="widget stat-medium" style="grid-column: span 6;">
      <div class="widget-header">
        <span class="widget-title">Top Products</span>
        <span class="widget-icon">🏆</span>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around;">
        <div style="display: flex; justify-content: space-between;">
          <span>👟 Running Shoes</span>
          <span style="font-weight: 600; color: #10b981;">$12.4K</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>⌚ Smart Watch</span>
          <span style="font-weight: 600; color: #10b981;">$8.9K</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>🎧 Wireless Earbuds</span>
          <span style="font-weight: 600; color: #10b981;">$7.2K</span>
        </div>
      </div>
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