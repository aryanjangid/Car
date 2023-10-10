import React, { useRef, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

function CircleMesh() {
  const groupRef = useRef();

  useEffect(() => {
    // Create two perpendicular circles
    const circleGeometry1 = new THREE.CircleGeometry(10, 32);
    const circleGeometry2 = new THREE.CircleGeometry(10, 32);

    const material = new THREE.MeshStandardMaterial({
      emissive: [0.5, 0.5, 0.5],
      color: [0, 0, 0],
    });

    const mesh1 = new THREE.Mesh(circleGeometry1, material);
    const mesh2 = new THREE.Mesh(circleGeometry2, material);

    // Rotate one of the circles to make them perpendicular
    mesh2.rotation.x = Math.PI / 2;

    // Position the circles
    mesh1.position.set(0, 0, 0);
    mesh2.position.set(0, 0, 0);

    // Add the meshes to the group
    groupRef.current.add(mesh1);
    groupRef.current.add(mesh2);
  }, []);

  return (
    <group ref={groupRef} position={[-100, -100, -100]}>
      {/* Your other JSX elements */}
    </group>
  );
}

function Test() {
  return (
    // <Canvas>
    //   <ambientLight />
    //   <pointLight position={[10, 10, 10]} />
      <CircleMesh />
    // </Canvas>
  );
}

export default Test;
