const FileStorage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">File Storage</h1>
        <p className="text-lg text-muted-foreground">Store and retrieve files</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📤 Storing Files</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`use Illuminate\\Support\\Facades\\Storage;

// Store file
$path = $request->file('avatar')->store('avatars');

// Store with custom name
$path = $request->file('avatar')->storeAs('avatars', 'filename.jpg');

// Store on specific disk
$path = Storage::disk('s3')->put('avatars', $file);`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📥 Retrieving Files</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`// Get file
$contents = Storage::get('file.txt');

// Check if exists
if (Storage::exists('file.txt')) {
    //
}

// Delete file
Storage::delete('file.txt');`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Storage facade handles file operations</li>
          <li>• Support for local, S3, and more</li>
          <li>• Use store() for automatic naming</li>
        </ul>
      </div>
    </div>
  );
};

export default FileStorage;
