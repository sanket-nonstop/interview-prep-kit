import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const positioningCode = `/* CSS Positioning: Control element placement precisely */

/* ✅ Static (default) - normal document flow */
.static-element {
  position: static; /* Default value */
}

/* ✅ Relative - positioned relative to normal position */
.relative-element {
  position: relative;
  top: 10px; /* Moves down 10px from normal position */
  left: 20px; /* Moves right 20px */
  z-index: 1;
}

/* ✅ Absolute - positioned relative to nearest positioned ancestor */
.modal-overlay {
  position: fixed; /* Relative to viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  position: absolute; /* Relative to .modal-overlay */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Perfect centering */
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

/* ✅ Sticky - switches between relative and fixed */
.sticky-header {
  position: sticky;
  top: 0; /* Sticks to top when scrolling */
  background: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* ✅ Z-index stacking context */
.dropdown-container {
  position: relative;
  z-index: 1; /* Creates stacking context */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10; /* Higher than siblings */
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* ✅ Common patterns */
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.floating-action-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}`;

const Positioning = () => {
  return (
    <TopicLayout
      title="CSS Positioning"
      route="/css/positioning"
      category="css"
      explanation="CSS positioning controls how elements are placed in the document. Static is default flow, relative moves from normal position, absolute positions relative to nearest positioned ancestor, fixed positions relative to viewport, and sticky switches between relative and fixed based on scroll."
      code={positioningCode}
      codeFilename="positioning.css"
      whyItMatters="Positioning is fundamental for creating modals, dropdowns, tooltips, and sticky headers. Interviewers test understanding of stacking contexts, z-index behavior, and when to use each position type. Essential for any interactive UI components."
      mistakes={[
        "Using absolute positioning for everything - breaks responsive design and accessibility.",
        "Not understanding stacking contexts - z-index only works within the same stacking context.",
        "Forgetting to set position on parent for absolute children - they'll position relative to body.",
        "Using fixed positioning without considering mobile viewports and keyboard behavior.",
      ]}
      practiceTask="Create a dropdown menu component that positions correctly relative to its trigger, handles edge detection (flips when near viewport edges), and maintains proper z-index stacking with other UI elements."
    >
      <MultiExampleEditor
        title="🎯 Try It: CSS Positioning"
        examples={[
          {
            title: "Absolute & Relative",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #f3f4f6; }
  .container { max-width: 600px; margin: 0 auto; }
  .box { position: relative; background: #3b82f6; color: white; padding: 40px; border-radius: 12px; margin-bottom: 20px; }
  .badge { position: absolute; top: -10px; right: -10px; background: #ef4444; color: white; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
  .tooltip-container { position: relative; display: inline-block; margin: 20px; }
  .tooltip-container button { padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
  .tooltip { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #1f2937; color: white; padding: 8px 12px; border-radius: 6px; white-space: nowrap; margin-bottom: 8px; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
  .tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #1f2937; }
  .tooltip-container:hover .tooltip { opacity: 1; }
</style>
</head>
<body>
  <div class="container">
    <div class="box">
      Relative Parent Box
      <span class="badge">NEW</span>
    </div>
    <div class="tooltip-container">
      <button>Hover Me</button>
      <div class="tooltip">I'm a tooltip!</div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Fixed & Sticky",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; font-family: system-ui; }
  .sticky-header { position: sticky; top: 0; background: #1e40af; color: white; padding: 20px; text-align: center; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .content { padding: 20px; }
  .section { min-height: 300px; padding: 40px; margin: 20px; background: #e0e7ff; border-radius: 12px; }
  .fab { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: #ef4444; color: white; border: none; border-radius: 50%; font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4); transition: transform 0.3s; }
  .fab:hover { transform: scale(1.1); }
</style>
</head>
<body>
  <div class="sticky-header">
    📌 Sticky Header - Scroll to see it stick!
  </div>
  <div class="content">
    <div class="section">📝 Section 1 - Keep scrolling...</div>
    <div class="section">📝 Section 2 - Header stays at top!</div>
    <div class="section">📝 Section 3 - FAB button is fixed</div>
  </div>
  <button class="fab" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">↑</button>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Positioning;