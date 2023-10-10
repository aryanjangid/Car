import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import "./style.css"
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Ground from './Ground';
import Car from './Car';
import Rings from './Rings';
import { Boxes } from './Boxes';
import {
  // EffectComposer,
  // Bloom,
  // ChromaticAberration,
  // DepthOfField,
} from "@react-three/postprocessing";
// import { BlendFunction } from 'postprocessing';
import { FloatingGrid } from './FloatingGrid';
// import { DirectionalLight } from 'drei'; // This is part of 'drei' library, which provides additional helpers for react-three-fiber

import Test from './test';
// import Test from './test';

function Carshow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} enableZoom={false}/>
      <PerspectiveCamera makeDefault fov={50} position={[10, 5  , 5]} />

      {/* let color=new color(0,0,0); */}
      <color args={[0, 0, 0]} attach="background" />

      {/* <CubeCamera resolution={256} frames={Infinity}>
        {(texture)=>(
          <>
            <Environment map={texture} />
            <Car/>
          </>
        )}
      </CubeCamera> */}
      <Rings />
      {/* <Test /> */}
      <FloatingGrid />
      {/* <Boxes /> */}
      {/* 
        let spotlight=new spotlight();
        spotlight.intensity=1.5;
        spotlight.position.set(...);
       */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
       <directionalLight
          intensity={1} // Adjust the light intensity as needed
          position={[5, 10, 5]} // Set the light's position
          castShadow // Enable shadow casting
          color="#F32053"
        />
                {/* <directionalLight position={[0 , 0, 0]} intensity={1} color="#F32053" />
        <directionalLight position={[-4, -5, -2]} intensity={1} color="#A8ECF0" />
        <directionalLight position={[4, -5, 2]} intensity={1} color="#407BFF" />  */}
      {/* <EffectComposer>
        <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer> */}
    </>
  );
}

function App() {
  return (
    <Canvas shadows>
        {/* Add a directional light */}
        
        <Suspense fallback={null}>
          <Carshow />
          {/* Add other components */}
        </Suspense>
      </Canvas>
  );
}

export default App;
