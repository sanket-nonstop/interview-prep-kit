const ThreeJs = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Three.js in React</h1>
        <p className="text-lg text-muted-foreground">Create 3D graphics and animations</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎨 Setup Three.js</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`npm install three
npm install @types/three --save-dev

// Basic setup
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📦 Creating Objects</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.5,
  roughness: 0.5
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎬 Animation Loop</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`function animate() {
  requestAnimationFrame(animate);

  // Rotate cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render scene
  renderer.render(scene, camera);
}

animate();`}</code></pre>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">⚛️ React Integration</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(mountRef.current.clientWidth, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Create cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};`}</code></pre>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="topic-card p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <h3 className="font-semibold text-foreground mb-2">Geometries</h3>
          <p className="text-sm text-muted-foreground">Box, Sphere, Plane, Torus, Custom</p>
        </div>
        <div className="topic-card p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <h3 className="font-semibold text-foreground mb-2">Materials</h3>
          <p className="text-sm text-muted-foreground">Basic, Standard, Physical, Shader</p>
        </div>
        <div className="topic-card p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <h3 className="font-semibold text-foreground mb-2">Lights</h3>
          <p className="text-sm text-muted-foreground">Ambient, Point, Directional, Spot</p>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎮 Controls & Interaction</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// In animation loop
controls.update();

// Mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xff0000);
  }
});`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Three.js enables 3D graphics in the browser</li>
          <li>• Scene, Camera, Renderer are core components</li>
          <li>• Always cleanup resources in React</li>
          <li>• Use OrbitControls for camera interaction</li>
        </ul>
      </div>
    </div>
  );
};

export default ThreeJs;
