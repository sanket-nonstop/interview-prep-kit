const ClassesObjects = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Classes & Objects</h1>
        <p className="text-lg text-muted-foreground">Learn Object-Oriented Programming in PHP</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Creating a Class</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
class Car {
  public $brand;
  public $color;
  
  public function __construct($brand, $color) {
    $this->brand = $brand;
    $this->color = $color;
  }
  
  public function getInfo() {
    return "$this->color $this->brand";
  }
}
?>`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Creating Objects</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<?php
$car1 = new Car("Toyota", "Red");
echo $car1->getInfo(); // Red Toyota
?>`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Classes are blueprints for objects</li>
          <li>• Use new keyword to create objects</li>
          <li>• $this refers to current object</li>
        </ul>
      </div>
    </div>
  );
};

export default ClassesObjects;
