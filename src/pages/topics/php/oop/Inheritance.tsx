const Inheritance = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Inheritance & Polymorphism</h1>
        <p className="text-lg text-muted-foreground">Extend classes and reuse code</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🔗 Basic Inheritance</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
class Animal {
  public $name;
  
  public function makeSound() {
    return "Some sound";
  }
}

class Dog extends Animal {
  public function makeSound() {
    return "Woof!";
  }
}

$dog = new Dog();
echo $dog->makeSound(); // Woof!`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">👨‍👦 Parent Keyword</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
class Vehicle {
  protected $brand;
  
  public function __construct($brand) {
    $this->brand = $brand;
  }
}

class Car extends Vehicle {
  private $model;
  
  public function __construct($brand, $model) {
    parent::__construct($brand);
    $this->model = $model;
  }
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Use extends to inherit from parent class</li>
          <li>• Child classes can override parent methods</li>
          <li>• Use parent:: to call parent methods</li>
        </ul>
      </div>
    </div>
  );
};

export default Inheritance;
