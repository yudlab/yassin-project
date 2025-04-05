import React, { useEffect } from 'react';
import 'aframe';
import * as THREE from 'three';  // Import three.js

function Home() {
  useEffect(() => {
    // Access the A-Frame scene and the camera
    const scene = document.querySelector('a-scene');
    const camera = document.querySelector('[camera]');

    // Create a new Three.js Cube and add it to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x4CC3D9 });
    const cube = new THREE.Mesh(geometry, material);
    
    // Set cube position and rotation
    cube.position.set(0, 1, -3);
    scene.object3D.add(cube);

    // Simple animation using three.js
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="App">
      <h1>AR with Camera and Three.js Integration</h1>

      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        renderer="antialias: true; colorManagement: true"
      >
        {/* Camera setup for AR */}
        <a-entity camera></a-entity>

        {/* Ground Plane */}
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="10"
          height="10"
          color="#7BC8A4"
        ></a-plane>
      </a-scene>
    </div>
  );
}

export default Home;
