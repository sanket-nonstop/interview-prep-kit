import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const transformsCode = `/* CSS Transforms: Manipulate element position, rotation, scale */

/* ✅ 2D Transforms */
.translate {
  transform: translate(50px, 100px); /* Move right 50px, down 100px */
}

.rotate {
  transform: rotate(45deg); /* Rotate 45 degrees */
}

.scale {
  transform: scale(1.5); /* Scale to 150% */
  transform: scale(2, 0.5); /* Scale X: 200%, Y: 50% */
}

.skew {
  transform: skew(10deg, 5deg); /* Skew X and Y */
}

/* ✅ Multiple transforms */
.combined {
  transform: translate(50px, 50px) rotate(45deg) scale(1.2);
}

/* ✅ Transform origin */
.element {
  transform-origin: center center; /* Default */
  transform-origin: top left;
  transform-origin: 50% 50%;
}

/* ✅ 3D Transforms */
.rotate-3d {
  transform: rotateX(45deg); /* Rotate around X axis */
  transform: rotateY(45deg); /* Rotate around Y axis */
  transform: rotateZ(45deg); /* Rotate around Z axis */
}

.translate-3d {
  transform: translate3d(50px, 100px, 200px);
}

/* ✅ Perspective for 3D */
.container {
  perspective: 1000px; /* Distance from viewer */
}

.card {
  transform-style: preserve-3d; /* Enable 3D for children */
}

/* ✅ Transitions with transforms */
.button {
  transition: transform 0.3s ease;
}

.button:hover {
  transform: scale(1.1) translateY(-5px);
}

/* ✅ Card flip effect */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}`;

const CssTransforms = () => {
  return (
    <TopicLayout
      title="CSS Transforms"
      route="/css/transforms"
      category="css"
      explanation="CSS Transforms manipulate elements in 2D and 3D space. Use translate (move), rotate (spin), scale (resize), skew (distort). Combine with transitions for smooth animations. Set transform-origin to change rotation point."
      code={transformsCode}
      codeFilename="transforms.css"
      whyItMatters="Transforms create interactive, engaging UIs without JavaScript. Interviewers test understanding of 2D/3D transforms, performance (GPU acceleration), and practical use cases. Essential for modern, animated interfaces."
      mistakes={[
        "Not using transform for animations - position/top/left trigger layout, transform uses GPU.",
        "Forgetting transform-origin - elements rotate from wrong point.",
        "Missing perspective for 3D - 3D transforms look flat without perspective.",
        "Overusing transforms - too many animations hurt performance and UX.",
      ]}
      practiceTask="Build an interactive card gallery with hover effects: scale on hover, 3D flip to show back, smooth transitions. Add a rotating loading spinner using transforms and animations."
    >
      <MultiExampleEditor
        title="🎯 Try It: CSS Transforms"
        examples={[
          {
            title: "2D Transforms",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 900px; margin: 0 auto; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
  
  .box {
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    border-radius: 12px;
    margin: 50px auto;
    transition: transform 0.3s ease;
  }
  
  .translate:hover {
    transform: translate(20px, -20px);
  }
  
  .rotate:hover {
    transform: rotate(45deg);
  }
  
  .scale:hover {
    transform: scale(1.3);
  }
  
  .skew:hover {
    transform: skew(10deg, 5deg);
  }
  
  .combined:hover {
    transform: translate(10px, -10px) rotate(15deg) scale(1.2);
  }
  
  .card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .label {
    margin-top: 10px;
    color: #6b7280;
    font-size: 14px;
  }
</style>
</head>
<body>
  <div class="container">
    <h1 style="text-align: center; color: #1f2937;">Hover to Transform</h1>
    
    <div class="grid">
      <div class="card">
        <div class="box translate">Translate</div>
        <div class="label">Move right & up</div>
      </div>
      
      <div class="card">
        <div class="box rotate">Rotate</div>
        <div class="label">Rotate 45°</div>
      </div>
      
      <div class="card">
        <div class="box scale">Scale</div>
        <div class="label">Scale to 130%</div>
      </div>
      
      <div class="card">
        <div class="box skew">Skew</div>
        <div class="label">Skew distortion</div>
      </div>
      
      <div class="card">
        <div class="box combined">Combined</div>
        <div class="label">All transforms</div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "3D Card Flip",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
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
  }
  
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .flip-card {
    perspective: 1000px;
    height: 300px;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  
  .flip-card-front {
    background: white;
    color: #1f2937;
  }
  
  .flip-card-back {
    background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    color: white;
    transform: rotateY(180deg);
  }
  
  .icon {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  h3 {
    margin: 10px 0;
  }
  
  p {
    text-align: center;
    line-height: 1.6;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>🔄 Hover to Flip Cards</h1>
    
    <div class="cards">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="icon">⚡</div>
            <h3>Fast</h3>
            <p>Lightning quick performance</p>
          </div>
          <div class="flip-card-back">
            <h3>Performance</h3>
            <p>Optimized for speed with GPU acceleration and efficient rendering</p>
          </div>
        </div>
      </div>
      
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="icon">🔒</div>
            <h3>Secure</h3>
            <p>Enterprise-grade security</p>
          </div>
          <div class="flip-card-back">
            <h3>Security</h3>
            <p>Bank-level encryption and security protocols to protect your data</p>
          </div>
        </div>
      </div>
      
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="icon">📱</div>
            <h3>Responsive</h3>
            <p>Works on all devices</p>
          </div>
          <div class="flip-card-back">
            <h3>Mobile First</h3>
            <p>Fully responsive design that adapts to any screen size perfectly</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Interactive Buttons",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: system-ui;
    padding: 40px;
    background: #1f2937;
    min-height: 100vh;
    margin: 0;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
  }
  
  .btn {
    padding: 15px 30px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
  }
  
  .btn-lift {
    background: #3b82f6;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
  }
  
  .btn-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
  }
  
  .btn-grow {
    background: #10b981;
  }
  
  .btn-grow:hover {
    transform: scale(1.1);
  }
  
  .btn-rotate {
    background: #f59e0b;
  }
  
  .btn-rotate:hover {
    transform: rotate(5deg) scale(1.05);
  }
  
  .btn-skew {
    background: #ef4444;
  }
  
  .btn-skew:hover {
    transform: skew(-5deg, -2deg);
  }
  
  .btn-3d {
    background: #8b5cf6;
    transform-style: preserve-3d;
  }
  
  .btn-3d:hover {
    transform: rotateX(10deg) rotateY(10deg);
  }
  
  .btn-bounce {
    background: #ec4899;
  }
  
  .btn-bounce:active {
    transform: scale(0.95);
  }
  
  .card {
    background: #374151;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
  }
  
  .label {
    color: #9ca3af;
    font-size: 14px;
    margin-top: 10px;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>🎨 Interactive Button Transforms</h1>
    
    <div class="button-grid">
      <div class="card">
        <button class="btn btn-lift">Lift Up</button>
        <div class="label">translateY(-5px)</div>
      </div>
      
      <div class="card">
        <button class="btn btn-grow">Grow</button>
        <div class="label">scale(1.1)</div>
      </div>
      
      <div class="card">
        <button class="btn btn-rotate">Rotate</button>
        <div class="label">rotate(5deg)</div>
      </div>
      
      <div class="card">
        <button class="btn btn-skew">Skew</button>
        <div class="label">skew(-5deg)</div>
      </div>
      
      <div class="card">
        <button class="btn btn-3d">3D Tilt</button>
        <div class="label">rotateX/Y(10deg)</div>
      </div>
      
      <div class="card">
        <button class="btn btn-bounce">Bounce (Click)</button>
        <div class="label">scale(0.95)</div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Loading Spinner",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: system-ui;
    padding: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .container {
    text-align: center;
  }
  
  h1 {
    color: white;
    margin-bottom: 50px;
  }
  
  .spinners {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 40px;
    max-width: 800px;
  }
  
  .spinner-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 20px;
  }
  
  .spinner-1 {
    border: 4px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .spinner-2 {
    border: 4px solid transparent;
    border-top-color: #10b981;
    border-right-color: #10b981;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  .spinner-3 {
    border: 4px solid #f59e0b;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  .spinner-4 {
    background: #ef4444;
    border-radius: 50%;
    animation: bounce 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.5; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  .label {
    color: #6b7280;
    font-size: 14px;
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>⏳ Loading Spinners</h1>
    
    <div class="spinners">
      <div class="spinner-card">
        <div class="spinner spinner-1"></div>
        <div class="label">Rotate</div>
      </div>
      
      <div class="spinner-card">
        <div class="spinner spinner-2"></div>
        <div class="label">Double Border</div>
      </div>
      
      <div class="spinner-card">
        <div class="spinner spinner-3"></div>
        <div class="label">Pulse</div>
      </div>
      
      <div class="spinner-card">
        <div class="spinner spinner-4"></div>
        <div class="label">Bounce</div>
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

export default CssTransforms;
