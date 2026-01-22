import { TopicLayout } from '@/components/TopicLayout';
import { StepByStepPreview } from '@/components/StepByStepPreview';

const flexboxSteps = [
  {
    title: 'Default Block Layout',
    description: 'Without flexbox, divs stack vertically',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container { background: #E5E7EB; padding: 20px; border-radius: 8px; }
    .box { background: #3B82F6; color: white; padding: 20px; margin: 10px 0; border-radius: 4px; text-align: center; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>`,
    highlight: 'Boxes stack vertically (default block behavior)',
  },
  {
    title: 'Enable Flexbox',
    description: 'Add display: flex to create a flex container',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      display: flex;
      background: #E5E7EB; 
      padding: 20px; 
      border-radius: 8px; 
    }
    .box { background: #3B82F6; color: white; padding: 20px; margin: 0 10px; border-radius: 4px; text-align: center; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>`,
    highlight: 'Boxes now align horizontally in a row',
  },
  {
    title: 'Center Items',
    description: 'Use justify-content and align-items to center',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      display: flex;
      justify-content: center;
      align-items: center;
      background: #E5E7EB; 
      padding: 20px; 
      border-radius: 8px;
      min-height: 200px;
    }
    .box { background: #3B82F6; color: white; padding: 20px; margin: 0 10px; border-radius: 4px; text-align: center; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>`,
    highlight: 'Items centered both horizontally and vertically',
  },
  {
    title: 'Space Between Items',
    description: 'Use justify-content: space-between for even spacing',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #E5E7EB; 
      padding: 20px; 
      border-radius: 8px;
      min-height: 200px;
    }
    .box { background: #3B82F6; color: white; padding: 20px; border-radius: 4px; text-align: center; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>`,
    highlight: 'Equal space between items, edges touch container',
  },
  {
    title: 'Flex Direction Column',
    description: 'Change flex-direction to stack items vertically',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #E5E7EB; 
      padding: 20px; 
      border-radius: 8px;
      min-height: 300px;
    }
    .box { background: #3B82F6; color: white; padding: 20px; margin: 10px 0; border-radius: 4px; text-align: center; font-weight: bold; width: 200px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>`,
    highlight: 'Vertical layout with centered alignment',
  },
  {
    title: 'Flex Grow',
    description: 'Use flex: 1 to make items grow and fill space',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      display: flex;
      background: #E5E7EB; 
      padding: 20px; 
      border-radius: 8px;
      gap: 10px;
    }
    .box { background: #3B82F6; color: white; padding: 20px; border-radius: 4px; text-align: center; font-weight: bold; }
    .box:nth-child(2) { flex: 1; background: #10B981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2 (flex: 1)</div>
    <div class="box">Box 3</div>
  </div>
</body>
</html>`,
    highlight: 'Middle box grows to fill available space',
  },
];

const flexboxCode = `// Flexbox: One-dimensional layout (row or column)

// ✅ Basic flex container
.container {
  display: flex; /* Enable flexbox */
  gap: 16px; /* Space between items */
}

// ✅ Horizontal centering
.container {
  display: flex;
  justify-content: center; /* Center horizontally */
}

// ✅ Vertical centering
.container {
  display: flex;
  align-items: center; /* Center vertically */
  min-height: 100vh;
}

// ✅ Center both directions
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

// ✅ Space distribution
.container {
  display: flex;
  justify-content: space-between; /* Space between items */
  /* or space-around, space-evenly */
}

// ✅ Flex direction
.container {
  display: flex;
  flex-direction: column; /* Stack vertically */
  /* or row (default), row-reverse, column-reverse */
}

// ✅ Flex item properties
.item {
  flex: 1; /* Grow to fill space */
  /* or flex-grow: 1; flex-shrink: 1; flex-basis: 0; */
}

// ✅ Responsive navbar
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}`;

const FlexboxWithPreview = () => {
  return (
    <div className="space-y-8">
      <TopicLayout
        title="Flexbox"
        route="/css/flexbox"
        category="css"
        explanation="Flexbox is a one-dimensional layout system for arranging items in rows or columns. Main concepts: flex container (parent with display: flex), flex items (children), main axis (horizontal by default), cross axis (perpendicular). Use for navigation bars, card layouts, centering."
        code={flexboxCode}
        codeFilename="flexbox.css"
        whyItMatters="Essential for modern layouts. Interviewers ask: 'How to center a div?', 'Flexbox vs Grid?', 'What is justify-content?' Shows CSS layout fundamentals. Used in every modern web app."
        mistakes={[
          "Forgetting display: flex: Child properties won't work without it.",
          "Confusing justify-content and align-items: justify = main axis, align = cross axis.",
          "Using flexbox for 2D layouts: Use CSS Grid for rows AND columns.",
          "Not using gap: Margin on items is harder to manage than gap on container.",
        ]}
        practiceTask="Create a responsive card layout: 3 cards in a row on desktop, stack on mobile. Cards should have equal height. Add a header with logo (left) and nav links (right). Use only flexbox."
      />

      <div className="border-t pt-8">
        <StepByStepPreview
          title="Learning Flexbox Visually"
          steps={flexboxSteps}
        />
      </div>
    </div>
  );
};

export default FlexboxWithPreview;