import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const html5FeaturesCode = `<!-- HTML5 New Features: Modern semantic elements and APIs -->

<!-- ✅ New Semantic Elements -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <time datetime="2024-01-15">January 15, 2024</time>
    </header>
    
    <section>
      <h2>Introduction</h2>
      <p>Article content...</p>
    </section>
    
    <aside>
      <h3>Related Articles</h3>
      <ul>
        <li><a href="/related">Related Article</a></li>
      </ul>
    </aside>
    
    <footer>
      <p>Author: John Doe</p>
    </footer>
  </article>
</main>

<footer>
  <p>&copy; 2024 Company Name</p>
</footer>

<!-- ✅ New Form Input Types -->
<form>
  <!-- Email with validation -->
  <input type="email" placeholder="Email" required>
  
  <!-- URL with validation -->
  <input type="url" placeholder="Website">
  
  <!-- Number with min/max -->
  <input type="number" min="1" max="100" step="1">
  
  <!-- Date picker -->
  <input type="date">
  
  <!-- Time picker -->
  <input type="time">
  
  <!-- Color picker -->
  <input type="color">
  
  <!-- Range slider -->
  <input type="range" min="0" max="100" value="50">
  
  <!-- Search with clear button -->
  <input type="search" placeholder="Search...">
  
  <!-- Telephone -->
  <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
</form>

<!-- ✅ Audio and Video -->
<video controls width="640" height="360" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track kind="subtitles" src="subtitles.vtt" srclang="en" label="English">
  Your browser doesn't support video.
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Your browser doesn't support audio.
</audio>

<!-- ✅ Canvas for graphics -->
<canvas id="myCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  
  // Draw rectangle
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(50, 50, 100, 100);
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(250, 100, 50, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();
</script>

<!-- ✅ SVG for scalable graphics -->
<svg width="200" height="200">
  <circle cx="100" cy="100" r="80" fill="#EF4444" />
  <text x="100" y="110" text-anchor="middle" fill="white" font-size="20">
    SVG
  </text>
</svg>

<!-- ✅ Details and Summary (Accordion) -->
<details>
  <summary>Click to expand</summary>
  <p>Hidden content that appears when expanded.</p>
</details>

<!-- ✅ Progress and Meter -->
<label>Upload Progress:</label>
<progress value="70" max="100">70%</progress>

<label>Disk Usage:</label>
<meter value="0.6" min="0" max="1" low="0.3" high="0.9" optimum="0.5">
  60%
</meter>

<!-- ✅ Dialog (Modal) -->
<dialog id="myDialog">
  <h2>Dialog Title</h2>
  <p>Dialog content goes here.</p>
  <button onclick="document.getElementById('myDialog').close()">
    Close
  </button>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">
  Open Dialog
</button>

<!-- ✅ Datalist (Autocomplete) -->
<input list="browsers" placeholder="Choose a browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>

<!-- ✅ Output element -->
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="number" id="a" value="0"> +
  <input type="number" id="b" value="0"> =
  <output name="result" for="a b">0</output>
</form>

<!-- ✅ Mark (Highlight) -->
<p>Search results for "HTML5": <mark>HTML5</mark> is awesome!</p>

<!-- ✅ Figure and Figcaption -->
<figure>
  <img src="chart.png" alt="Sales Chart">
  <figcaption>Fig 1. Sales data for Q1 2024</figcaption>
</figure>`;

const Html5Features = () => {
  return (
    <TopicLayout
      title="HTML5 New Features"
      route="/html/html5-features"
      category="html"
      explanation="HTML5 introduced semantic elements (header, nav, article, section, aside, footer), new form input types (email, date, color, range), multimedia elements (audio, video), canvas for graphics, and interactive elements (details, dialog). These improve structure, accessibility, and functionality."
      code={html5FeaturesCode}
      codeFilename="html5-features.html"
      whyItMatters="HTML5 is the foundation of modern web development. Interviewers test knowledge of semantic elements, new input types, and multimedia handling. Understanding HTML5 features shows you can build accessible, SEO-friendly, and feature-rich applications."
      mistakes={[
        "Using div instead of semantic elements - loses SEO and accessibility benefits.",
        "Not providing fallback content for audio/video - breaks on unsupported browsers.",
        "Missing required attributes on new input types - validation won't work properly.",
        "Not using native HTML5 features - reinventing the wheel with JavaScript.",
      ]}
      practiceTask="Build a blog post page using all HTML5 semantic elements, add a video with controls and subtitles, create an interactive form with new input types (date, color, range), and implement a details/summary accordion for FAQs."
    >
      <MultiExampleEditor
        title="🎯 Try It: HTML5 Features"
        examples={[
          {
            title: "Semantic Elements",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 Semantic Elements</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui; line-height: 1.6; }
    header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
    nav { background: #1e40af; padding: 15px; }
    nav ul { list-style: none; display: flex; gap: 20px; justify-content: center; }
    nav a { color: white; text-decoration: none; }
    main { max-width: 1200px; margin: 0 auto; padding: 20px; display: grid; grid-template-columns: 3fr 1fr; gap: 20px; }
    article { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    aside { background: #f3f4f6; padding: 20px; border-radius: 8px; }
    footer { background: #1f2937; color: white; text-align: center; padding: 20px; margin-top: 20px; }
    time { color: #6b7280; font-size: 14px; }
    h1 { margin-bottom: 10px; }
    h2 { margin-top: 20px; margin-bottom: 10px; color: #1f2937; }
  </style>
</head>
<body>
  <header>
    <h1>My Blog</h1>
    <p>Exploring HTML5 Features</p>
  </header>

  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <main>
    <article>
      <header>
        <h1>Understanding HTML5 Semantic Elements</h1>
        <time datetime="2024-01-15">January 15, 2024</time>
      </header>

      <section>
        <h2>Introduction</h2>
        <p>HTML5 semantic elements provide meaning to your content, making it easier for search engines and screen readers to understand your page structure.</p>
      </section>

      <section>
        <h2>Key Benefits</h2>
        <ul>
          <li>Better SEO rankings</li>
          <li>Improved accessibility</li>
          <li>Cleaner, more readable code</li>
        </ul>
      </section>

      <footer>
        <p><strong>Author:</strong> John Doe</p>
      </footer>
    </article>

    <aside>
      <h3>Related Posts</h3>
      <ul>
        <li><a href="#">CSS Grid Layout</a></li>
        <li><a href="#">JavaScript ES6</a></li>
        <li><a href="#">React Hooks</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 My Blog. All rights reserved.</p>
  </footer>
</body>
</html>`
          },
          {
            title: "New Input Types",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 Input Types</title>
  <style>
    body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { color: #1f2937; margin-bottom: 30px; text-align: center; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
    input { width: 100%; padding: 12px; border: 2px solid #d1d5db; border-radius: 6px; font-size: 16px; transition: border-color 0.3s; }
    input:focus { outline: none; border-color: #3b82f6; }
    input[type="range"] { cursor: pointer; }
    input[type="color"] { height: 50px; cursor: pointer; }
    .value-display { display: inline-block; margin-left: 10px; padding: 4px 12px; background: #dbeafe; border-radius: 4px; font-weight: 600; color: #1e40af; }
    button { width: 100%; background: #3b82f6; color: white; padding: 14px; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.3s; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 HTML5 Input Types</h1>

    <form>
      <div class="form-group">
        <label for="email">📧 Email:</label>
        <input type="email" id="email" placeholder="john@example.com" required>
      </div>

      <div class="form-group">
        <label for="date">📅 Date:</label>
        <input type="date" id="date">
      </div>

      <div class="form-group">
        <label for="time">⏰ Time:</label>
        <input type="time" id="time">
      </div>

      <div class="form-group">
        <label for="color">🎨 Color Picker:</label>
        <input type="color" id="color" value="#3b82f6">
      </div>

      <div class="form-group">
        <label for="range">🎚️ Range Slider: <span class="value-display" id="rangeValue">50</span></label>
        <input type="range" id="range" min="0" max="100" value="50" oninput="document.getElementById('rangeValue').textContent = this.value">
      </div>

      <div class="form-group">
        <label for="number">🔢 Number (1-100):</label>
        <input type="number" id="number" min="1" max="100" value="50">
      </div>

      <div class="form-group">
        <label for="search">🔍 Search:</label>
        <input type="search" id="search" placeholder="Search...">
      </div>

      <button type="submit">Submit Form</button>
    </form>
  </div>
</body>
</html>`
          },
          {
            title: "Interactive Elements",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 Interactive Elements</title>
  <style>
    body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
    .container { max-width: 800px; margin: 0 auto; }
    .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h2 { color: #1f2937; margin-bottom: 20px; }
    details { background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #e5e7eb; }
    summary { cursor: pointer; font-weight: 600; color: #3b82f6; padding: 10px; }
    summary:hover { color: #2563eb; }
    details[open] { background: #dbeafe; border-color: #3b82f6; }
    progress { width: 100%; height: 30px; border-radius: 6px; }
    progress::-webkit-progress-bar { background: #e5e7eb; border-radius: 6px; }
    progress::-webkit-progress-value { background: #10b981; border-radius: 6px; }
    meter { width: 100%; height: 30px; }
    dialog { border: none; border-radius: 12px; padding: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 400px; }
    dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
    .btn { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 5px; }
    .btn:hover { background: #2563eb; }
    .btn-close { background: #ef4444; }
    .btn-close:hover { background: #dc2626; }
    input[list] { width: 100%; padding: 12px; border: 2px solid #d1d5db; border-radius: 6px; font-size: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>📋 Details & Summary (Accordion)</h2>
      <details>
        <summary>What is HTML5?</summary>
        <p>HTML5 is the latest version of HTML, introducing new semantic elements, APIs, and multimedia support.</p>
      </details>
      <details>
        <summary>Why use semantic elements?</summary>
        <p>Semantic elements improve SEO, accessibility, and code readability by giving meaning to your content structure.</p>
      </details>
      <details open>
        <summary>What are new input types?</summary>
        <p>HTML5 added email, date, color, range, and many other input types with built-in validation.</p>
      </details>
    </div>

    <div class="card">
      <h2>📊 Progress & Meter</h2>
      <label>Upload Progress:</label>
      <progress value="75" max="100">75%</progress>
      <p style="margin-top:10px; color:#6b7280;">75% complete</p>

      <label style="margin-top:20px; display:block;">Disk Usage:</label>
      <meter value="0.6" min="0" max="1" low="0.3" high="0.9" optimum="0.5">60%</meter>
      <p style="margin-top:10px; color:#6b7280;">60% of disk space used</p>
    </div>

    <div class="card">
      <h2>💬 Dialog (Modal)</h2>
      <button class="btn" onclick="document.getElementById('myDialog').showModal()">
        Open Dialog
      </button>

      <dialog id="myDialog">
        <h2>🎉 Welcome!</h2>
        <p>This is a native HTML5 dialog element. No JavaScript library needed!</p>
        <button class="btn btn-close" onclick="document.getElementById('myDialog').close()">
          Close
        </button>
      </dialog>
    </div>

    <div class="card">
      <h2>🔍 Datalist (Autocomplete)</h2>
      <label>Choose a programming language:</label>
      <input list="languages" placeholder="Type to search...">
      <datalist id="languages">
        <option value="JavaScript">
        <option value="Python">
        <option value="Java">
        <option value="C++">
        <option value="Ruby">
        <option value="Go">
      </datalist>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Media Elements",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 Media Elements</title>
  <style>
    body { font-family: system-ui; padding: 40px; background: #1f2937; color: white; }
    .container { max-width: 900px; margin: 0 auto; }
    .card { background: #374151; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
    h2 { margin-bottom: 20px; }
    video, audio { width: 100%; border-radius: 8px; margin-bottom: 15px; }
    canvas { border: 2px solid #4b5563; border-radius: 8px; background: white; display: block; margin: 20px auto; }
    svg { display: block; margin: 20px auto; }
    .controls { display: flex; gap: 10px; margin-top: 15px; }
    button { background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; }
    button:hover { background: #2563eb; }
    figure { margin: 0; }
    figcaption { text-align: center; margin-top: 10px; color: #9ca3af; font-style: italic; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>🎥 Video Element</h2>
      <video controls poster="data:image/svg+xml,%3Csvg width='640' height='360' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='640' height='360' fill='%234b5563'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='32'%3EVideo Thumbnail%3C/text%3E%3C/svg%3E">
        <source src="video.mp4" type="video/mp4">
        <p>Your browser doesn't support HTML5 video. <a href="video.mp4">Download the video</a>.</p>
      </video>
      <p>✅ Controls: play, pause, volume, fullscreen</p>
      <p>✅ Poster: thumbnail before playing</p>
      <p>✅ Multiple sources: fallback formats</p>
    </div>

    <div class="card">
      <h2>🎵 Audio Element</h2>
      <audio controls>
        <source src="audio.mp3" type="audio/mpeg">
        <source src="audio.ogg" type="audio/ogg">
        <p>Your browser doesn't support HTML5 audio.</p>
      </audio>
      <p>✅ Built-in player with controls</p>
      <p>✅ Multiple format support</p>
    </div>

    <div class="card">
      <h2>🎨 Canvas Element</h2>
      <canvas id="myCanvas" width="400" height="200"></canvas>
      <div class="controls">
        <button onclick="drawRect()">Draw Rectangle</button>
        <button onclick="drawCircle()">Draw Circle</button>
        <button onclick="clearCanvas()">Clear</button>
      </div>
    </div>

    <div class="card">
      <h2>📐 SVG Graphics</h2>
      <figure>
        <svg width="300" height="200">
          <rect x="50" y="50" width="100" height="100" fill="#3b82f6" rx="10"/>
          <circle cx="220" cy="100" r="50" fill="#10b981"/>
          <text x="150" y="180" text-anchor="middle" fill="white" font-size="16">Scalable Vector Graphics</text>
        </svg>
        <figcaption>SVG scales perfectly at any size</figcaption>
      </figure>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    function drawRect() {
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(50, 50, 100, 100);
    }

    function drawCircle() {
      ctx.beginPath();
      ctx.arc(300, 100, 50, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Html5Features;
