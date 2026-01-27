import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const tablesCode = `<!-- HTML Tables: Structured data presentation -->

<!-- ✅ Basic table structure -->
<table>
  <caption>Sales Report Q1 2024</caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Revenue</th>
      <th>Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$50,000</td>
      <td>+15%</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$60,000</td>
      <td>+20%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th>Total</th>
      <td>$110,000</td>
      <td>+17.5%</td>
    </tr>
  </tfoot>
</table>

<!-- ✅ Accessible table with scope -->
<table>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Laptop</th>
      <td>$999</td>
      <td>50</td>
    </tr>
    <tr>
      <th scope="row">Mouse</th>
      <td>$29</td>
      <td>200</td>
    </tr>
  </tbody>
</table>

<!-- ✅ Colspan and rowspan -->
<table>
  <tr>
    <th colspan="2">Personal Info</th>
  </tr>
  <tr>
    <td>Name</td>
    <td>John Doe</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>john@example.com</td>
  </tr>
</table>

<!-- ✅ Responsive table wrapper -->
<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="ID">1</td>
        <td data-label="Name">John Doe</td>
        <td data-label="Email">john@example.com</td>
        <td data-label="Role">Admin</td>
        <td data-label="Status">Active</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.table-wrapper {
  overflow-x: auto;
}

@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  
  thead tr {
    display: none;
  }
  
  td {
    position: relative;
    padding-left: 50%;
  }
  
  td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    font-weight: bold;
  }
}
</style>`;

const Tables = () => {
  return (
    <TopicLayout
      title="HTML Tables"
      route="/html/tables"
      category="html"
      explanation="HTML tables display tabular data with rows and columns. Use thead, tbody, tfoot for structure, th for headers with scope attribute, caption for description. Make tables responsive with CSS and accessible with proper semantic markup."
      code={tablesCode}
      codeFilename="tables.html"
      whyItMatters="Tables are essential for displaying structured data. Interviewers test knowledge of semantic structure, accessibility (scope, caption), and responsive design. Critical for dashboards, reports, and data-heavy applications."
      mistakes={[
        "Using tables for layout - use CSS Grid/Flexbox instead, tables are for data only.",
        "Missing scope attribute - screen readers can't determine header relationships.",
        "No caption element - users don't know what the table represents.",
        "Not making tables responsive - breaks on mobile devices.",
      ]}
      practiceTask="Build a sortable, filterable data table with pagination. Include proper accessibility attributes, responsive design for mobile, and row selection functionality."
    >
      <MultiExampleEditor
        title="🎯 Try It: HTML Tables"
        examples={[
          {
            title: "Basic Table",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f3f4f6; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  caption { padding: 15px; font-size: 20px; font-weight: bold; text-align: left; background: #3b82f6; color: white; }
  th, td { padding: 15px; text-align: left; border-bottom: 1px solid #e5e7eb; }
  th { background: #f9fafb; font-weight: 600; color: #1f2937; }
  tbody tr:hover { background: #f3f4f6; }
  tfoot { background: #f9fafb; font-weight: bold; }
</style>
</head>
<body>
  <table>
    <caption>📊 Sales Report Q1 2024</caption>
    <thead>
      <tr>
        <th>Month</th>
        <th>Revenue</th>
        <th>Growth</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>January</td>
        <td>$50,000</td>
        <td style="color: #10b981;">+15%</td>
      </tr>
      <tr>
        <td>February</td>
        <td>$60,000</td>
        <td style="color: #10b981;">+20%</td>
      </tr>
      <tr>
        <td>March</td>
        <td>$55,000</td>
        <td style="color: #10b981;">+10%</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Total</th>
        <td>$165,000</td>
        <td style="color: #10b981;">+15%</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`
          },
          {
            title: "Accessible Table",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: #f9fafb; }
  table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  th, td { padding: 12px; border: 1px solid #e5e7eb; }
  th { background: #3b82f6; color: white; font-weight: 600; }
  th[scope="row"] { background: #dbeafe; color: #1e40af; font-weight: 600; }
  tbody tr:nth-child(even) { background: #f9fafb; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
  .in-stock { background: #d1fae5; color: #065f46; }
  .low-stock { background: #fef3c7; color: #92400e; }
</style>
</head>
<body>
  <table role="table" aria-label="Product inventory">
    <caption style="padding: 15px; font-size: 18px; font-weight: bold; text-align: left;">
      📦 Product Inventory
    </caption>
    <thead>
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Laptop</th>
        <td>$999</td>
        <td>50</td>
        <td><span class="badge in-stock">In Stock</span></td>
      </tr>
      <tr>
        <th scope="row">Mouse</th>
        <td>$29</td>
        <td>200</td>
        <td><span class="badge in-stock">In Stock</span></td>
      </tr>
      <tr>
        <th scope="row">Keyboard</th>
        <td>$79</td>
        <td>5</td>
        <td><span class="badge low-stock">Low Stock</span></td>
      </tr>
      <tr>
        <th scope="row">Monitor</th>
        <td>$299</td>
        <td>30</td>
        <td><span class="badge in-stock">In Stock</span></td>
      </tr>
    </tbody>
  </table>
</body>
</html>`
          },
          {
            title: "Colspan & Rowspan",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: system-ui; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
  .container { max-width: 600px; margin: 0 auto; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); margin-bottom: 20px; }
  th, td { padding: 15px; border: 1px solid #e5e7eb; }
  th { background: #3b82f6; color: white; font-weight: 600; }
  td { background: white; }
  .header-cell { background: #dbeafe; color: #1e40af; font-weight: 600; text-align: center; }
</style>
</head>
<body>
  <div class="container">
    <table>
      <caption style="padding: 15px; font-size: 18px; font-weight: bold; background: #1f2937; color: white;">
        👤 Employee Schedule
      </caption>
      <tr>
        <th rowspan="2">Employee</th>
        <th colspan="2">Week 1</th>
        <th colspan="2">Week 2</th>
      </tr>
      <tr>
        <th>Mon-Wed</th>
        <th>Thu-Fri</th>
        <th>Mon-Wed</th>
        <th>Thu-Fri</th>
      </tr>
      <tr>
        <td class="header-cell">John</td>
        <td>9-5</td>
        <td>9-5</td>
        <td>9-5</td>
        <td>Off</td>
      </tr>
      <tr>
        <td class="header-cell">Jane</td>
        <td>10-6</td>
        <td>10-6</td>
        <td>Off</td>
        <td>10-6</td>
      </tr>
    </table>

    <table>
      <caption style="padding: 15px; font-size: 18px; font-weight: bold; background: #1f2937; color: white;">
        📋 Contact Information
      </caption>
      <tr>
        <th colspan="2" class="header-cell">Personal Details</th>
      </tr>
      <tr>
        <td style="font-weight: 600;">Name:</td>
        <td>John Doe</td>
      </tr>
      <tr>
        <td style="font-weight: 600;">Email:</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td style="font-weight: 600;">Phone:</td>
        <td>+1 234 567 8900</td>
      </tr>
    </table>
  </div>
</body>
</html>`
          },
          {
            title: "Responsive Table",
            code: `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: system-ui; padding: 20px; background: #f3f4f6; margin: 0; }
  h2 { color: #1f2937; }
  .table-wrapper { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  table { width: 100%; border-collapse: collapse; min-width: 600px; }
  th, td { padding: 15px; text-align: left; border-bottom: 1px solid #e5e7eb; }
  th { background: #3b82f6; color: white; font-weight: 600; white-space: nowrap; }
  tbody tr:hover { background: #f9fafb; }
  
  @media (max-width: 768px) {
    .responsive-table { min-width: 0; }
    .responsive-table thead { display: none; }
    .responsive-table, .responsive-table tbody, .responsive-table tr, .responsive-table td { display: block; width: 100%; }
    .responsive-table tr { margin-bottom: 15px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .responsive-table td { text-align: right; padding: 12px; border-bottom: 1px solid #f3f4f6; position: relative; padding-left: 50%; }
    .responsive-table td:before { content: attr(data-label); position: absolute; left: 12px; font-weight: 600; color: #6b7280; text-align: left; }
    .responsive-table td:last-child { border-bottom: none; }
  }
  
  .info { background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #3b82f6; }
</style>
</head>
<body>
  <h2>📱 Responsive Table (Resize window)</h2>
  
  <div class="table-wrapper">
    <table class="responsive-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="ID">001</td>
          <td data-label="Name">John Doe</td>
          <td data-label="Email">john@example.com</td>
          <td data-label="Role">Admin</td>
          <td data-label="Status">Active</td>
        </tr>
        <tr>
          <td data-label="ID">002</td>
          <td data-label="Name">Jane Smith</td>
          <td data-label="Email">jane@example.com</td>
          <td data-label="Role">User</td>
          <td data-label="Status">Active</td>
        </tr>
        <tr>
          <td data-label="ID">003</td>
          <td data-label="Name">Bob Johnson</td>
          <td data-label="Email">bob@example.com</td>
          <td data-label="Role">User</td>
          <td data-label="Status">Inactive</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="info">
    <strong>💡 Responsive Design:</strong><br>
    • Desktop: Traditional table layout<br>
    • Mobile: Stacked cards with labels<br>
    • Uses data-label attribute for mobile headers
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default Tables;
