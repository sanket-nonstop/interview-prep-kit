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
        title="🎯 Try It: CSS Positioning - Before & After"
        examples={[
          {
            title: "❌ Before: Broken Modal",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; padding: 20px; background: #f3f4f6; }
  
  /* ❌ PROBLEM: No positioning on parent */
  .modal-overlay {
    /* Missing: position: fixed */
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
  
  /* ❌ PROBLEM: Absolute without positioned parent */
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    /* This won't center properly! */
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 400px;
  }
  
  .card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  /* ❌ PROBLEM: Badge without relative parent */
  .badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ef4444;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
  }
  
  .btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="card">
    <h3>🛒 Product Card</h3>
    <p>Price: $99.99</p>
    <span class="badge">SALE</span>
    <!-- ❌ Badge positions relative to body, not card! -->
  </div>
  
  <button class="btn" onclick="document.querySelector('.modal-overlay').style.display='block'">Open Modal</button>
  
  <div class="modal-overlay" style="display:none">
    <div class="modal">
      <h2>❌ Broken Modal</h2>
      <p>This modal isn't centered correctly because the overlay isn't fixed and the modal's absolute positioning has no reference point!</p>
      <button class="btn" onclick="this.closest('.modal-overlay').style.display='none'">Close</button>
    </div>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background: #fee; border-left: 4px solid #ef4444; border-radius: 4px;">
    <strong>❌ Problems:</strong><br>
    • Badge floats to wrong position<br>
    • Modal overlay doesn't cover viewport<br>
    • Modal isn't centered<br>
    • No stacking context control
  </div>
</body>
</html>`
          },
          {
            title: "✅ After: Perfect Positioning",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; padding: 20px; background: #f3f4f6; }
  
  /* ✅ FIXED: Overlay covers entire viewport */
  .modal-overlay {
    position: fixed; /* ✅ Relative to viewport */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* ✅ Above everything */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* ✅ FIXED: Perfectly centered modal */
  .modal {
    position: relative; /* ✅ Creates positioning context */
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 400px;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* ✅ FIXED: Card with relative positioning */
  .card {
    position: relative; /* ✅ Reference for badge */
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  /* ✅ FIXED: Badge positions relative to card */
  .badge {
    position: absolute; /* ✅ Relative to .card */
    top: -10px;
    right: -10px;
    background: #ef4444;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  }
  
  .btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .btn:hover { transform: scale(1.05); }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ef4444;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 18px;
  }
</style>
</head>
<body>
  <div class="card">
    <h3>🛒 Product Card</h3>
    <p>Price: $99.99</p>
    <span class="badge">SALE</span>
    <!-- ✅ Badge perfectly positioned on card corner -->
  </div>
  
  <button class="btn" onclick="document.querySelector('.modal-overlay').style.display='flex'">Open Modal</button>
  
  <div class="modal-overlay" style="display:none">
    <div class="modal">
      <button class="close-btn" onclick="this.closest('.modal-overlay').style.display='none'">×</button>
      <h2>✅ Perfect Modal</h2>
      <p>This modal is perfectly centered, the overlay covers the entire viewport, and everything has proper z-index stacking!</p>
      <button class="btn" onclick="this.closest('.modal-overlay').style.display='none'">Close</button>
    </div>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background: #d1fae5; border-left: 4px solid #10b981; border-radius: 4px;">
    <strong>✅ Solutions:</strong><br>
    • Card has position: relative for badge<br>
    • Overlay uses position: fixed to cover viewport<br>
    • Modal perfectly centered with flexbox<br>
    • Proper z-index stacking (1000)<br>
    • Close button absolutely positioned in modal
  </div>
</body>
</html>`
          },
          {
            title: "🎯 Real-Life: E-commerce UI",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui; background: #f9fafb; }
  
  /* STICKY HEADER - Stays visible while scrolling */
  .header {
    position: sticky;
    top: 0;
    background: white;
    padding: 15px 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo { font-size: 20px; font-weight: bold; color: #3b82f6; }
  
  /* RELATIVE + ABSOLUTE - Dropdown menu */
  .nav-item {
    position: relative;
    display: inline-block;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s;
    z-index: 200;
  }
  
  .nav-item:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .dropdown-item {
    padding: 12px 20px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .dropdown-item:hover { background: #f3f4f6; }
  
  /* PRODUCT CARDS with badges */
  .products {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .product-card {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }
  
  .product-card:hover { transform: translateY(-5px); }
  
  .discount-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #ef4444;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .new-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #10b981;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .product-img {
    width: 100%;
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  /* FIXED - Floating cart button */
  .cart-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    transition: transform 0.3s;
    z-index: 999;
  }
  
  .cart-fab:hover { transform: scale(1.1) rotate(10deg); }
  
  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
  
  .btn { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
</style>
</head>
<body>
  <!-- STICKY HEADER -->
  <header class="header">
    <div class="logo">🛍️ ShopHub</div>
    <div class="nav-item">
      <button class="btn">Account ▼</button>
      <div class="dropdown">
        <div class="dropdown-item">👤 Profile</div>
        <div class="dropdown-item">📦 Orders</div>
        <div class="dropdown-item">⚙️ Settings</div>
        <div class="dropdown-item">🚪 Logout</div>
      </div>
    </div>
  </header>
  
  <!-- PRODUCTS with ABSOLUTE badges -->
  <div class="products">
    <div class="product-card">
      <span class="discount-badge">-30%</span>
      <div class="product-img"></div>
      <h3>Product 1</h3>
      <p>$69.99</p>
      <button class="btn">Add to Cart</button>
    </div>
    
    <div class="product-card">
      <span class="new-badge">NEW</span>
      <div class="product-img"></div>
      <h3>Product 2</h3>
      <p>$89.99</p>
      <button class="btn">Add to Cart</button>
    </div>
    
    <div class="product-card">
      <span class="discount-badge">-50%</span>
      <span class="new-badge">NEW</span>
      <div class="product-img"></div>
      <h3>Product 3</h3>
      <p>$49.99</p>
      <button class="btn">Add to Cart</button>
    </div>
  </div>
  
  <!-- FIXED CART BUTTON -->
  <button class="cart-fab">
    🛒
    <span class="cart-count">3</span>
  </button>
  
  <div style="padding: 20px; margin: 20px; background: #dbeafe; border-radius: 8px;">
    <strong>🎯 Positioning in Action:</strong><br>
    • <strong>Sticky:</strong> Header stays visible while scrolling<br>
    • <strong>Relative + Absolute:</strong> Dropdown positions below button<br>
    • <strong>Absolute:</strong> Badges on product cards<br>
    • <strong>Fixed:</strong> Cart button always visible<br>
    • <strong>Z-index:</strong> Proper layering (dropdown: 200, cart: 999, header: 100)
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Positioning;