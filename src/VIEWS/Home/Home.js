import React, { useEffect } from 'react';
import 'aframe';
import * as THREE from 'three';

function Home() {
  useEffect(() => {
    // This function will allow us to manipulate 3D objects using Three.js and A-Frame
    const scene = document.querySelector('a-scene');
    const camera = document.querySelector('[camera]');

    // Simple three.js scene manipulation: Add a rotating cube
    const cube = document.createElement('a-box');
    cube.setAttribute('position', '0 1 -3');
    cube.setAttribute('color', '#4CC3D9');
    scene.appendChild(cube);

    const animate = () => {
      cube.object3D.rotation.x += 0.01;
      cube.object3D.rotation.y += 0.01;

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
        {/* Camera Setup for AR */}
        <a-entity camera></a-entity>

        {/* Interactive Box */}
        <a-box
          position="0 1 0"
          rotation="0 45 0"
          scale="0.5 0.5 0.5"
          color="#4CC3D9"
          animation="property: rotation; to: 360 360 360; loop: true; dur: 10000"
        ></a-box>

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
