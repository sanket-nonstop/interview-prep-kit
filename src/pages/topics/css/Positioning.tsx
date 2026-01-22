import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default Positioning;