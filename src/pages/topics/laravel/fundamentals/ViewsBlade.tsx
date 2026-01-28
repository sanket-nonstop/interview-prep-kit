const ViewsBlade = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Views & Blade Templates</h1>
        <p className="text-lg text-muted-foreground">Create dynamic HTML with Blade</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📄 Basic Blade Syntax</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`{{-- resources/views/welcome.blade.php --}}

<h1>{{ $title }}</h1>
<p>{{ $description }}</p>

{{-- Unescaped output --}}
{!! $htmlContent !!}`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔄 Control Structures</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`@if($user->isAdmin())
    <p>Welcome, Admin!</p>
@elseif($user->isModerator())
    <p>Welcome, Moderator!</p>
@else
    <p>Welcome, User!</p>
@endif

@foreach($users as $user)
    <li>{{ $user->name }}</li>
@endforeach`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎨 Layouts</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`{{-- layouts/app.blade.php --}}
<html>
<body>
    @yield('content')
</body>
</html>

{{-- pages/home.blade.php --}}
@extends('layouts.app')

@section('content')
    <h1>Home Page</h1>
@endsection`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Blade is Laravel's templating engine</li>
          <li>• Use double curly braces for escaped output</li>
          <li>• @directives for control structures</li>
          <li>• @extends and @section for layouts</li>
        </ul>
      </div>
    </div>
  );
};

export default ViewsBlade;
