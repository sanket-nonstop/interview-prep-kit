const SqlInjection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">SQL Injection Prevention</h1>
        <p className="text-lg text-muted-foreground">Protect against SQL attacks</p>
      </div>

      <div className="topic-card p-6 mb-6 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <h2 className="text-2xl font-bold text-foreground mb-4">❌ Vulnerable Code</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// NEVER DO THIS!
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $id";
$result = mysqli_query($conn, $query);`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-2xl font-bold text-foreground mb-4">✅ Safe Code</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
// Use prepared statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Always use prepared statements</li>
          <li>• Never concatenate user input in queries</li>
          <li>• PDO provides built-in protection</li>
        </ul>
      </div>
    </div>
  );
};

export default SqlInjection;
