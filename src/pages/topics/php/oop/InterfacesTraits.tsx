const InterfacesTraits = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Interfaces & Traits</h1>
        <p className="text-lg text-muted-foreground">Define contracts and share code</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📋 Interfaces</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
interface PaymentInterface {
  public function pay($amount);
}

class CreditCard implements PaymentInterface {
  public function pay($amount) {
    return "Paid $$amount with credit card";
  }
}

class PayPal implements PaymentInterface {
  public function pay($amount) {
    return "Paid $$amount with PayPal";
  }
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🧩 Traits</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto">
          <code>{`<?php
trait Logger {
  public function log($message) {
    echo "[LOG] $message";
  }
}

class User {
  use Logger;
  
  public function create() {
    $this->log("User created");
  }
}`}</code>
        </pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Interfaces define method contracts</li>
          <li>• Traits allow code reuse across classes</li>
          <li>• Use implements for interfaces, use for traits</li>
        </ul>
      </div>
    </div>
  );
};

export default InterfacesTraits;
