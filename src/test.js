import React, { useRef, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

function Test() {
  const canvasRef = useRef();

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a texture
    const texture = new THREE.Texture(generateTexture());
    texture.needsUpdate = true;

    // Create materials
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xECECEE, overdraw: 0.5 }),
      new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5, transparent: true }),
    ];

    // Create a cube and add it to the scene
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Set the camera position
    camera.position.z = 5;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Generate the texture
    function generateTexture() {
      const size = 25;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');

      const gradient = context.createLinearGradient(0, 0, size, 0);
      gradient.addColorStop(0, '#f7b000');
      gradient.addColorStop(0.25, '#dd0080');
      gradient.addColorStop(0.5, '#622b85');
      gradient.addColorStop(0.75, '#007dae');
      gradient.addColorStop(1, '#77c8db');
      context.fillStyle = gradient;
      context.fillRect(size / 1.6, 7, size, size);

      return canvas;
    }

    // Clean up
    return () => {
      // Dispose of resources (optional)
      texture.dispose();
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef}></div>;
}

export default Test;
