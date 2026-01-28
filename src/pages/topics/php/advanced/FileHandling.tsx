const FileHandling = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">File Handling</h1>
        <p className="text-lg text-muted-foreground">Read and write files in PHP</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📖 Reading Files</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
// Read entire file
$content = file_get_contents('file.txt');

// Read line by line
$file = fopen('file.txt', 'r');
while ($line = fgets($file)) {
    echo $line;
}
fclose($file);`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✍️ Writing Files</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
// Write to file
file_put_contents('file.txt', 'Hello World');

// Append to file
file_put_contents('file.txt', 'New line', FILE_APPEND);`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• file_get_contents() reads entire file</li>
          <li>• file_put_contents() writes to file</li>
          <li>• Always close files with fclose()</li>
        </ul>
      </div>
    </div>
  );
};

export default FileHandling;
