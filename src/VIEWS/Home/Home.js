import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { load } from "handtrackjs"; // Correctly import load from handtrackjs

const Home = () => {
  const [gesture, setGesture] = useState(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const ballRef = useRef(null);
  const videoRef = useRef(null);
  const ballVelocity = useRef(new THREE.Vector3(0, 0, 0)); // Ball velocity for throw
  const ballAcceleration = useRef(new THREE.Vector3(0, -0.1, 0)); // Gravity
  const lastFrameTime = useRef(0);
  const handPosition = useRef(new THREE.Vector3(0, 0, 0)); // Position of the hand during the grab gesture

  const initThreeJS = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ball Geometry
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);
    ballRef.current = ball;

    // Set up a hoop
    const hoopGeometry = new THREE.TorusGeometry(1, 0.2, 16, 100);
    const hoopMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const hoop = new THREE.Mesh(hoopGeometry, hoopMaterial);
    hoop.position.set(5, 2, -10); // Adjust position for the hoop
    scene.add(hoop);

    // Camera setup
    camera.position.z = 5;

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Animate the scene
    const animate = (time) => {
      const deltaTime = (time - lastFrameTime.current) / 1000; // Calculate time difference (in seconds)
      lastFrameTime.current = time;

      requestAnimationFrame(animate);

      // Update ball position based on velocity and gravity
      if (ballRef.current) {
        ballVelocity.current.add(ballAcceleration.current); // Apply gravity to velocity
        ballRef.current.position.add(ballVelocity.current.clone().multiplyScalar(deltaTime)); // Update ball position

        // Prevent the ball from falling below the ground level
        if (ballRef.current.position.y <= 0) {
          ballRef.current.position.y = 0;
          ballVelocity.current.y = 0; // Reset the velocity after hitting the ground
        }
      }

      renderer.render(scene, camera);
    };

    animate();
  };

  const detectHandGesture = () => {
    load().then((model) => {
      const video = videoRef.current;
      if (!video) {
        console.error("Video element not available.");
        return;
      }

      // Start video feed
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;

          // Wait for the video to load before detection starts
          video.onloadeddata = () => {
            video.play();
            continuousDetection(model, video);
          };
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
        });
    });
  };

  // Continuous hand gesture detection using requestAnimationFrame
  const continuousDetection = (model, video) => {
    let lastDetectionTime = 0;
    const detectionInterval = 200; // Time between detections (ms)

    const detect = () => {
      requestAnimationFrame(detect);

      const currentTime = performance.now();
      if (currentTime - lastDetectionTime < detectionInterval) {
        return; // Don't run the detection if enough time hasn't passed
      }
      lastDetectionTime = currentTime;

      model.detect(video).then((predictions) => {
        if (predictions.length > 0) {
          const newGesture = identifyGesture(predictions);
          setGesture(newGesture);
          handleGestureAction(newGesture, predictions);
        } else {
          setGesture(null); // Reset if no hand detected
        }
      });
    };

    detect();
  };

  const identifyGesture = (predictions) => {
    if (predictions.length > 0) {
      // Based on the position of the hand, define "grab" and "throw" gestures
      return predictions[0].bbox[0] < window.innerWidth / 2 ? "grab" : "throw";
    }
    return "none"; // If no hand detected
  };

  const handleGestureAction = (gesture, predictions) => {
    if (gesture === "grab") {
      console.log("Grab action detected");
      // Handle grab action: Position the ball at the hand
      if (ballRef.current) {
        const handBbox = predictions[0].bbox;
        handPosition.current.set(handBbox[0], handBbox[1], handBbox[2]); // Save hand position
        ballRef.current.position.set(handPosition.current.x, handPosition.current.y, handPosition.current.z);
      }
    } else if (gesture === "throw") {
      console.log("Throw action detected");
      // Handle throw action: Apply a force to the ball (set initial velocity)
      if (ballRef.current && handPosition.current) {
        const handBbox = predictions[0].bbox;
        const handDirection = new THREE.Vector3(handBbox[0] - handPosition.current.x, handBbox[1] - handPosition.current.y, handBbox[2] - handPosition.current.z);
        handDirection.normalize();
        ballVelocity.current = handDirection.multiplyScalar(2); // Apply velocity in direction of throw
      }
    }
  };

  useEffect(() => {
    initThreeJS();
    detectHandGesture(); // Initialize hand gesture detection
  }, [detectHandGesture]); // Empty dependency array to run only once on mount

  return (
    <div>
      <h1>Basketball Game (WebXR)</h1>
      <p>{gesture ? `Gesture: ${gesture}` : "No gesture detected"}</p>
      {/* Video element for hand tracking */}
      <video ref={videoRef} width="640" height="480" style={{ display: "none" }}></video>
    </div>
  );
};

export default Home;
