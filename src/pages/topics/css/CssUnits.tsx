import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const unitsCode = `/* CSS Units: Absolute and relative measurements */

/* ✅ Absolute units (fixed size) */
.px-unit { width: 200px; } /* Pixels */
.pt-unit { font-size: 12pt; } /* Points (print) */
.cm-unit { width: 5cm; } /* Centimeters */

/* ✅ Relative units (scale with context) */
.em-unit { font-size: 1.5em; } /* Relative to parent font-size */
.rem-unit { font-size: 1.5rem; } /* Relative to root font-size */
.percent { width: 50%; } /* Relative to parent */

/* ✅ Viewport units */
.vw-unit { width: 50vw; } /* 50% of viewport width */
.vh-unit { height: 100vh; } /* 100% of viewport height */
.vmin { width: 50vmin; } /* 50% of smaller dimension */
.vmax { width: 50vmax; } /* 50% of larger dimension */

/* ✅ em vs rem */
:root { font-size: 16px; }

.parent {
  font-size: 20px; /* 20px */
}

.child-em {
  font-size: 1.5em; /* 1.5 * 20px = 30px */
}

.child-rem {
  font-size: 1.5rem; /* 1.5 * 16px = 24px */
}

/* ✅ Responsive typography */
html { font-size: 16px; }

h1 { font-size: 2.5rem; } /* 40px */
h2 { font-size: 2rem; } /* 32px */
p { font-size: 1rem; } /* 16px */

@media (max-width: 768px) {
  html { font-size: 14px; }
  /* All rem values scale automatically */
}

/* ✅ Fluid typography with clamp() */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* Min: 1.5rem, Preferred: 5vw, Max: 3rem */
}

/* ✅ ch unit (character width) */
.text {
  max-width: 65ch; /* Optimal reading width */
}`;

const CssUnits = () => {
  return (
    <TopicLayout
      title="CSS Units"
      route="/css/units"
      category="css"
      explanation="CSS units measure sizes. Absolute units (px, pt, cm) are fixed. Relative units (em, rem, %, vw, vh) scale with context. Use rem for typography, % for layouts, vw/vh for full-screen elements. em compounds, rem doesn't."
      code={unitsCode}
      codeFilename="units.css"
      whyItMatters="Choosing correct units affects responsiveness and accessibility. Interviewers test understanding of em vs rem, viewport units, and when to use each. Essential for scalable, accessible designs."
      mistakes={[
        "Using px for everything - breaks accessibility when users change font size.",
        "Confusing em and rem - em compounds with nesting, rem is consistent.",
        "Not using viewport units - missing opportunities for responsive full-screen layouts.",
        "Forgetting ch unit - optimal reading width is 65-75 characters.",
      ]}
      practiceTask="Build a responsive page with rem-based typography that scales with root font-size, a hero section using vh units, and a text container with max-width in ch units for optimal readability."
    >
      <MultiExampleEditor
        title="🎯 Try It: CSS Units"
        examples={[
          {
            title: "em vs rem",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    font-size: 16px;
  }

  body {
    font-family: system-ui;
    padding: 40px;
    background: #f3f4f6;
    margin: 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }

  .parent-em {
    font-size: 20px;
    background: #dbeafe;
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
  }

  .child-em {
    font-size: 1.5em; /* 1.5 * 20px = 30px */
    background: #bfdbfe;
    padding: 10px;
    border-radius: 6px;
    margin: 10px 0;
  }

  .grandchild-em {
    font-size: 1.5em; /* 1.5 * 30px = 45px (compounds!) */
    background: #93c5fd;
    padding: 10px;
    border-radius: 6px;
  }

  .parent-rem {
    font-size: 20px;
    background: #d1fae5;
    padding: 20px;
    border-radius: 8px;
    margin: 10px 0;
  }

  .child-rem {
    font-size: 1.5rem; /* 1.5 * 16px = 24px */
    background: #a7f3d0;
    padding: 10px;
    border-radius: 6px;
    margin: 10px 0;
  }

  .grandchild-rem {
    font-size: 1.5rem; /* 1.5 * 16px = 24px (consistent!) */
    background: #6ee7b7;
    padding: 10px;
    border-radius: 6px;
  }

  .info {
    background: #fef3c7;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>em (Compounds with Nesting)</h2>
      <div class="parent-em">
        Parent: 20px
        <div class="child-em">
          Child: 1.5em = 30px
          <div class="grandchild-em">
            Grandchild: 1.5em = 45px ⚠️
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>rem (Consistent)</h2>
      <div class="parent-rem">
        Parent: 20px
        <div class="child-rem">
          Child: 1.5rem = 24px
          <div class="grandchild-rem">
            Grandchild: 1.5rem = 24px ✅
          </div>
        </div>
      </div>
    </div>

    <div class="info">
      <strong>💡 Key Difference:</strong><br>
      • <strong>em:</strong> Relative to parent font-size (compounds)<br>
      • <strong>rem:</strong> Relative to root font-size (consistent)<br>
      • Use rem for predictable sizing!
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Viewport Units",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: system-ui;
  }

  .hero {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }

  .hero h1 {
    font-size: 5vw;
    margin-bottom: 20px;
  }

  .hero p {
    font-size: 2vw;
  }

  .section {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
  }

  .section-1 {
    background: #dbeafe;
  }

  .section-2 {
    background: #d1fae5;
  }

  .box-vw {
    width: 30vw;
    height: 30vw;
    background: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    border-radius: 12px;
    margin: 10px;
  }

  .box-vh {
    width: 30vh;
    height: 30vh;
    background: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    border-radius: 12px;
    margin: 10px;
  }

  .box-vmin {
    width: 30vmin;
    height: 30vmin;
    background: #f59e0b;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    border-radius: 12px;
    margin: 10px;
  }

  .boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 40px;
    background: #f3f4f6;
  }

  .info {
    text-align: center;
    padding: 20px;
    background: white;
    margin: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
</style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>100vh Hero Section</h1>
      <p>Text scales with viewport (5vw & 2vw)</p>
    </div>
  </div>

  <div class="section section-1">
    50vh Section
  </div>

  <div class="boxes">
    <div class="box-vw">30vw<br>Width</div>
    <div class="box-vh">30vh<br>Height</div>
    <div class="box-vmin">30vmin<br>Smaller</div>
  </div>

  <div class="info">
    <strong>💡 Viewport Units:</strong><br>
    • <strong>vw:</strong> % of viewport width<br>
    • <strong>vh:</strong> % of viewport height<br>
    • <strong>vmin:</strong> % of smaller dimension<br>
    • <strong>vmax:</strong> % of larger dimension<br>
    Resize window to see changes!
  </div>
</body>
</html>`
          },
          {
            title: "Responsive Typography",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  :root {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    :root {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    :root {
      font-size: 12px;
    }
  }

  body {
    font-family: system-ui;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    margin: 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }

  h1 {
    font-size: 3rem; /* 48px on desktop, 42px on tablet, 36px on mobile */
    color: #1f2937;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem; /* 32px on desktop, 28px on tablet, 24px on mobile */
    color: #374151;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem; /* 16px on desktop, 14px on tablet, 12px on mobile */
    line-height: 1.6;
    color: #6b7280;
    margin-bottom: 1rem;
  }

  .large {
    font-size: 1.25rem;
  }

  .small {
    font-size: 0.875rem;
  }

  .info {
    background: #dbeafe;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border-left: 4px solid #3b82f6;
    margin-top: 2rem;
  }

  .size-display {
    background: #f3f4f6;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: bold;
    margin: 1rem 0;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Responsive Typography with rem</h1>
    
    <div class="size-display">
      Current root font-size: <span id="rootSize"></span>
    </div>

    <p class="large">
      This is large text (1.25rem). All text scales automatically when you resize the window!
    </p>

    <p>
      This is normal paragraph text (1rem). By changing the root font-size in media queries, all rem-based sizes scale proportionally.
    </p>

    <h2>How It Works</h2>

    <p>
      The root font-size changes at breakpoints:
    </p>

    <ul style="margin-left: 2rem; color: #6b7280;">
      <li>Desktop (>768px): 16px</li>
      <li>Tablet (≤768px): 14px</li>
      <li>Mobile (≤480px): 12px</li>
    </ul>

    <p class="small">
      This is small text (0.875rem). Everything scales together!
    </p>

    <div class="info">
      <strong>💡 Benefits:</strong><br>
      • Change one value, scale everything<br>
      • Consistent proportions across breakpoints<br>
      • Easy to maintain<br>
      • Respects user font-size preferences
    </div>
  </div>

  <script>
    function updateSize() {
      const size = getComputedStyle(document.documentElement).fontSize;
      document.getElementById('rootSize').textContent = size;
    }
    updateSize();
    window.addEventListener('resize', updateSize);
  </script>
</body>
</html>`
          },
          {
            title: "ch Unit & clamp()",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    font-family: system-ui;
    padding: 40px;
    background: #f3f4f6;
    margin: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 30px;
  }

  /* ch unit for optimal reading width */
  .readable {
    max-width: 65ch; /* 65 characters wide */
    margin: 0 auto;
    line-height: 1.6;
    color: #374151;
  }

  /* clamp() for fluid typography */
  .fluid-h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
    /* Min: 1.5rem (24px), Preferred: 5vw, Max: 3rem (48px) */
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .fluid-h2 {
    font-size: clamp(1.25rem, 3vw, 2rem);
    color: #374151;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .fluid-p {
    font-size: clamp(0.875rem, 2vw, 1.125rem);
    line-height: 1.6;
    color: #6b7280;
  }

  .demo-box {
    background: #dbeafe;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #3b82f6;
  }

  .width-demo {
    background: #f3f4f6;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .box-30ch {
    max-width: 30ch;
    background: #fef3c7;
    padding: 15px;
    border-radius: 6px;
    margin: 10px 0;
  }

  .box-50ch {
    max-width: 50ch;
    background: #d1fae5;
    padding: 15px;
    border-radius: 6px;
    margin: 10px 0;
  }

  .box-70ch {
    max-width: 70ch;
    background: #dbeafe;
    padding: 15px;
    border-radius: 6px;
    margin: 10px 0;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1 class="fluid-h1">Fluid Typography with clamp()</h1>
      
      <div class="readable">
        <p class="fluid-p">
          This heading and text use clamp() to scale smoothly between minimum and maximum sizes. Resize your browser window to see the text grow and shrink fluidly without media queries!
        </p>

        <h2 class="fluid-h2">How clamp() Works</h2>

        <p class="fluid-p">
          clamp(min, preferred, max) takes three values: minimum size, preferred size (usually viewport-based), and maximum size. The browser automatically calculates the best size within those bounds.
        </p>
      </div>

      <div class="demo-box">
        <strong>💡 Formula:</strong><br>
        <code>font-size: clamp(1.5rem, 5vw, 3rem);</code><br>
        • Min: 1.5rem (24px)<br>
        • Preferred: 5% of viewport width<br>
        • Max: 3rem (48px)
      </div>
    </div>

    <div class="card">
      <h1 class="fluid-h1">ch Unit for Reading Width</h1>
      
      <div class="width-demo">
        <div class="box-30ch">
          <strong>30ch:</strong> Too narrow for comfortable reading. Lines are too short.
        </div>

        <div class="box-50ch">
          <strong>50ch:</strong> Better, but still a bit narrow for body text. Good for captions or sidebars.
        </div>

        <div class="box-70ch">
          <strong>70ch:</strong> Optimal reading width! Studies show 65-75 characters per line is most comfortable for reading. This is why most books and articles use this width.
        </div>
      </div>

      <div class="demo-box">
        <strong>💡 Best Practice:</strong><br>
        Use <code>max-width: 65ch;</code> for body text to ensure optimal readability. The ch unit represents the width of the "0" character in the current font.
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

export default CssUnits;
