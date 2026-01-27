import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const entitiesCode = `<!-- HTML Entities: Special characters and symbols -->

<!-- ✅ Common entities -->
&lt;  <!-- Less than < -->
&gt;  <!-- Greater than > -->
&amp; <!-- Ampersand & -->
&quot; <!-- Double quote " -->
&apos; <!-- Single quote ' -->

<!-- ✅ Space entities -->
&nbsp;  <!-- Non-breaking space -->
&ensp;  <!-- En space (half em) -->
&emsp;  <!-- Em space (full em) -->
&thinsp; <!-- Thin space -->

<!-- ✅ Currency symbols -->
&dollar; or $ <!-- Dollar $ -->
&euro;   <!-- Euro € -->
&pound;  <!-- Pound £ -->
&yen;    <!-- Yen ¥ -->
&cent;   <!-- Cent ¢ -->

<!-- ✅ Math symbols -->
&plus;   <!-- Plus + -->
&minus;  <!-- Minus − -->
&times;  <!-- Multiplication × -->
&divide; <!-- Division ÷ -->
&equals; <!-- Equals = -->
&ne;     <!-- Not equal ≠ -->
&le;     <!-- Less than or equal ≤ -->
&ge;     <!-- Greater than or equal ≥ -->

<!-- ✅ Arrows -->
&larr;   <!-- Left arrow ← -->
&rarr;   <!-- Right arrow → -->
&uarr;   <!-- Up arrow ↑ -->
&darr;   <!-- Down arrow ↓ -->
&harr;   <!-- Left-right arrow ↔ -->

<!-- ✅ Special characters -->
&copy;   <!-- Copyright © -->
&reg;    <!-- Registered ® -->
&trade;  <!-- Trademark ™ -->
&deg;    <!-- Degree ° -->
&para;   <!-- Paragraph ¶ -->
&sect;   <!-- Section § -->

<!-- ✅ Accented characters -->
&aacute; <!-- á -->
&eacute; <!-- é -->
&iacute; <!-- í -->
&oacute; <!-- ó -->
&uacute; <!-- ú -->
&ntilde; <!-- ñ -->

<!-- ✅ Numeric character references -->
&#60;    <!-- < (decimal) -->
&#x3C;   <!-- < (hexadecimal) -->
&#169;   <!-- © (decimal) -->
&#x00A9; <!-- © (hexadecimal) -->

<!-- ✅ Emoji (use Unicode directly) -->
&#128512; <!-- 😀 -->
&#128525; <!-- 😍 -->
&#128077; <!-- 👍 -->

<!-- ✅ Practical examples -->
<p>Price: $50 &lt; $100</p>
<p>Copyright &copy; 2024 Company Name</p>
<p>Temperature: 25&deg;C</p>
<p>Email: user&commat;example.com</p>
<p>Code: &lt;div&gt;Hello&lt;/div&gt;</p>`;

const HtmlEntities = () => {
  return (
    <TopicLayout
      title="HTML Entities"
      route="/html/entities"
      category="html"
      explanation="HTML entities represent special characters that can't be typed directly or have special meaning in HTML. Use &entity; format or numeric references &#number;. Essential for displaying <, >, &, quotes, copyright symbols, and special characters."
      code={entitiesCode}
      codeFilename="entities.html"
      whyItMatters="Entities prevent HTML parsing errors and display special characters correctly. Interviewers test knowledge of common entities, when to use them, and encoding. Critical for displaying code snippets, mathematical formulas, and international characters."
      mistakes={[
        "Not escaping < and > in text - breaks HTML parsing and causes security issues.",
        "Using & directly - should be &amp; to avoid parsing errors.",
        "Forgetting &nbsp; for spacing - regular spaces collapse in HTML.",
        "Not encoding user input - vulnerable to XSS attacks.",
      ]}
      practiceTask="Build a code snippet displayer that properly escapes HTML tags, a currency converter showing various symbols, and a character reference guide with search functionality."
    >
      <MultiExampleEditor
        title="🎯 Try It: HTML Entities"
        examples={[
          {
            title: "Common Entities",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  .container { max-width: 800px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-bottom: 20px; }
  .entity-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; }
  .entity-item { padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; border: 2px solid #e5e7eb; transition: all 0.3s; }
  .entity-item:hover { border-color: #3b82f6; transform: translateY(-2px); }
  .symbol { font-size: 48px; margin-bottom: 10px; }
  .code { background: #1f2937; color: #10b981; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 12px; }
  .example { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>🔤 Essential HTML Entities</h2>
      
      <div class="entity-grid">
        <div class="entity-item">
          <div class="symbol">&lt;</div>
          <div class="code">&amp;lt;</div>
          <div>Less than</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&gt;</div>
          <div class="code">&amp;gt;</div>
          <div>Greater than</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&amp;</div>
          <div class="code">&amp;amp;</div>
          <div>Ampersand</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&quot;</div>
          <div class="code">&amp;quot;</div>
          <div>Quote</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&copy;</div>
          <div class="code">&amp;copy;</div>
          <div>Copyright</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&reg;</div>
          <div class="code">&amp;reg;</div>
          <div>Registered</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&trade;</div>
          <div class="code">&amp;trade;</div>
          <div>Trademark</div>
        </div>

        <div class="entity-item">
          <div class="symbol">&nbsp;</div>
          <div class="code">&amp;nbsp;</div>
          <div>Non-breaking space</div>
        </div>
      </div>

      <div class="example">
        <strong>💡 Practical Examples:</strong><br><br>
        <p>Price: $50 &lt; $100</p>
        <p>Copyright &copy; 2024 Company</p>
        <p>Code: &lt;div&gt;Hello&lt;/div&gt;</p>
        <p>Email: user&commat;example.com</p>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Symbols & Math",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  h2 { color: #1f2937; margin-bottom: 20px; }
  .symbol-section { margin: 30px 0; }
  .symbol-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; }
  .symbol-card { padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center; border: 2px solid #e5e7eb; }
  .symbol-card:hover { background: #dbeafe; border-color: #3b82f6; }
  .big-symbol { font-size: 36px; margin-bottom: 8px; color: #1f2937; }
  .entity-code { font-family: monospace; font-size: 11px; color: #6b7280; background: white; padding: 4px 8px; border-radius: 4px; }
  .formula { background: #f9fafb; padding: 20px; border-radius: 8px; font-size: 24px; text-align: center; margin: 15px 0; border: 2px solid #e5e7eb; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>➕ Math Symbols</h2>
      <div class="symbol-grid">
        <div class="symbol-card">
          <div class="big-symbol">&plus;</div>
          <div class="entity-code">&amp;plus;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&minus;</div>
          <div class="entity-code">&amp;minus;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&times;</div>
          <div class="entity-code">&amp;times;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&divide;</div>
          <div class="entity-code">&amp;divide;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&equals;</div>
          <div class="entity-code">&amp;equals;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&ne;</div>
          <div class="entity-code">&amp;ne;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&le;</div>
          <div class="entity-code">&amp;le;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&ge;</div>
          <div class="entity-code">&amp;ge;</div>
        </div>
      </div>

      <div class="formula">
        5 &times; 3 &equals; 15
      </div>
      <div class="formula">
        10 &divide; 2 &equals; 5
      </div>
      <div class="formula">
        x &ne; y
      </div>
    </div>

    <div class="card">
      <h2>➡️ Arrows</h2>
      <div class="symbol-grid">
        <div class="symbol-card">
          <div class="big-symbol">&larr;</div>
          <div class="entity-code">&amp;larr;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&rarr;</div>
          <div class="entity-code">&amp;rarr;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&uarr;</div>
          <div class="entity-code">&amp;uarr;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&darr;</div>
          <div class="entity-code">&amp;darr;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&harr;</div>
          <div class="entity-code">&amp;harr;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&crarr;</div>
          <div class="entity-code">&amp;crarr;</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>💰 Currency</h2>
      <div class="symbol-grid">
        <div class="symbol-card">
          <div class="big-symbol">$</div>
          <div class="entity-code">$</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&euro;</div>
          <div class="entity-code">&amp;euro;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&pound;</div>
          <div class="entity-code">&amp;pound;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&yen;</div>
          <div class="entity-code">&amp;yen;</div>
        </div>
        <div class="symbol-card">
          <div class="big-symbol">&cent;</div>
          <div class="entity-code">&amp;cent;</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Code Display",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #1f2937; color: white; }
  .container { max-width: 900px; margin: 0 auto; }
  .card { background: #374151; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
  h2 { margin-bottom: 20px; }
  .code-block { background: #1f2937; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 14px; line-height: 1.6; overflow-x: auto; border: 2px solid #4b5563; }
  .code-block code { color: #10b981; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  .wrong { background: #7f1d1d; padding: 20px; border-radius: 8px; border: 2px solid #ef4444; }
  .right { background: #065f46; padding: 20px; border-radius: 8px; border: 2px solid #10b981; }
  .label { font-weight: bold; margin-bottom: 10px; font-size: 18px; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>💻 Displaying Code Snippets</h2>
      
      <div class="comparison">
        <div class="wrong">
          <div class="label">❌ Without Entities</div>
          <p>This will break:</p>
          <div style="background: #991b1b; padding: 10px; border-radius: 4px; font-family: monospace;">
            <!-- This would actually break the HTML -->
            [Cannot display - would break HTML]
          </div>
        </div>

        <div class="right">
          <div class="label">✅ With Entities</div>
          <p>This displays correctly:</p>
          <div class="code-block">
            <code>&lt;div class="container"&gt;<br>
  &lt;h1&gt;Hello World&lt;/h1&gt;<br>
&lt;/div&gt;</code>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>📝 HTML Code Examples</h2>
      
      <div class="code-block">
        <code>
&lt;!DOCTYPE html&gt;<br>
&lt;html lang="en"&gt;<br>
&lt;head&gt;<br>
  &lt;meta charset="UTF-8"&gt;<br>
  &lt;title&gt;My Page&lt;/title&gt;<br>
&lt;/head&gt;<br>
&lt;body&gt;<br>
  &lt;h1&gt;Welcome&lt;/h1&gt;<br>
  &lt;p&gt;Price: $50 &amp;lt; $100&lt;/p&gt;<br>
&lt;/body&gt;<br>
&lt;/html&gt;
        </code>
      </div>
    </div>

    <div class="card">
      <h2>🔐 Security Example</h2>
      <p>User input must be escaped to prevent XSS:</p>
      
      <div class="code-block">
        <code>
// User input: &lt;script&gt;alert('XSS')&lt;/script&gt;<br>
// Escaped output: &amp;lt;script&amp;gt;alert('XSS')&amp;lt;/script&amp;gt;<br>
// Result: Displays as text, doesn't execute
        </code>
      </div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Special Characters",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f9fafb; }
  .container { max-width: 1000px; margin: 0 auto; }
  .card { background: white; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  h2 { color: #1f2937; margin-bottom: 20px; }
  .char-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
  .char-item { padding: 15px; background: #f3f4f6; border-radius: 8px; text-align: center; border: 2px solid #e5e7eb; transition: all 0.3s; }
  .char-item:hover { background: #dbeafe; border-color: #3b82f6; transform: scale(1.05); }
  .char-symbol { font-size: 32px; margin-bottom: 8px; }
  .char-code { font-family: monospace; font-size: 10px; color: #6b7280; }
  .example-text { background: #f9fafb; padding: 20px; border-radius: 8px; font-size: 18px; line-height: 1.8; margin: 20px 0; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>© Special Characters</h2>
      <div class="char-grid">
        <div class="char-item">
          <div class="char-symbol">&copy;</div>
          <div class="char-code">&amp;copy;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&reg;</div>
          <div class="char-code">&amp;reg;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&trade;</div>
          <div class="char-code">&amp;trade;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&deg;</div>
          <div class="char-code">&amp;deg;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&para;</div>
          <div class="char-code">&amp;para;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&sect;</div>
          <div class="char-code">&amp;sect;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&dagger;</div>
          <div class="char-code">&amp;dagger;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&bull;</div>
          <div class="char-code">&amp;bull;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&hellip;</div>
          <div class="char-code">&amp;hellip;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&prime;</div>
          <div class="char-code">&amp;prime;</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>🌍 Accented Characters</h2>
      <div class="char-grid">
        <div class="char-item">
          <div class="char-symbol">&aacute;</div>
          <div class="char-code">&amp;aacute;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&eacute;</div>
          <div class="char-code">&amp;eacute;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&iacute;</div>
          <div class="char-code">&amp;iacute;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&oacute;</div>
          <div class="char-code">&amp;oacute;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&uacute;</div>
          <div class="char-code">&amp;uacute;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&ntilde;</div>
          <div class="char-code">&amp;ntilde;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&ccedil;</div>
          <div class="char-code">&amp;ccedil;</div>
        </div>
        <div class="char-item">
          <div class="char-symbol">&uuml;</div>
          <div class="char-code">&amp;uuml;</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>📄 Real-World Example</h2>
      <div class="example-text">
        <p><strong>Company Name&trade;</strong></p>
        <p>Copyright &copy; 2024 All Rights Reserved&reg;</p>
        <p>Temperature: 25&deg;C</p>
        <p>Price: $99 &lt; $150</p>
        <p>Email: contact&commat;example.com</p>
        <p>Caf&eacute; Espa&ntilde;ol</p>
        <p>&ldquo;Hello World&rdquo; &mdash; A classic example</p>
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

export default HtmlEntities;
