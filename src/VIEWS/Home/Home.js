import React, { useEffect } from 'react';
import 'aframe';

function Home() {
  useEffect(() => {
    // Custom setup code if needed (no need for AR.js)
  }, []);

  const handleCubeClick = (e) => {
    // Get the cube element
    const cube = e.target;
    
    // Change color randomly when clicked
    const colors = ['#4CC3D9', '#FF5733', '#DAF7A6', '#C70039'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    cube.setAttribute('color', randomColor);

    // Move cube to a new random position
    const randomX = (Math.random() * 5) - 2.5;  // Random X between -2.5 and 2.5
    const randomZ = (Math.random() * 5) - 2.5;  // Random Z between -2.5 and 2.5
    cube.setAttribute('position', `${randomX} 1 ${randomZ}`);
  };

  return (
    <div className="home">
      <h1>Interactive AR with A-Frame and WebXR</h1>
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;" 
        vr-mode-ui="enabled: false"
        renderer="antialias: true; colorManagement: true"
      >
        {/* Camera for AR */}
        <a-entity camera></a-entity>

        {/* Interactive Cube */}
        <a-box
          position="0 1 0"
          rotation="0 45 0"
          scale="0.5 0.5 0.5"
          color="#4CC3D9"
          animation="property: rotation; to: 360 360 360; loop: true; dur: 10000"
          event-set__enter="scale: 1.5 1.5 1.5"
          event-set__leave="scale: 0.5 0.5 0.5"
          onclick={handleCubeClick}
        ></a-box>

        {/* Ground plane for AR context */}
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
