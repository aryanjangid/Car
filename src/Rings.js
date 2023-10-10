import { useFrame, extend } from '@react-three/fiber';
import React, { useRef } from 'react'
import { Color, TorusKnotGeometry } from 'three';
import * as THREE from 'three'
import { ShaderMaterial } from 'three';

extend({ ShaderMaterial });


export default function Rings() {

    const itemsRef = useRef([]);
    const meshRef1 = useRef();
    const meshRef2 = useRef();


    const gradientShader1 = {
        uniforms: {
            color1: {
              value: new Color("red")
            },
            color2: {
              value: new Color("purple")
            },
            color3: {
              value: new Color("yellow")
            }
          },
          vertexShader: `
            varying vec2 vUv;
        
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
          
            varying vec2 vUv;
            
            void main() {
              
              gl_FragColor = vec4(mix(color1, mix(color3, mix(color3, color1, vUv.x), vUv.x), vUv.x), 1.0);
            }
            `,
          };

        
    const gradientShader2 = {
      uniforms: {
          color1: {
            value: new Color("red")
          },
          color2: {
            value: new Color("purple")
          },
          color3: {
            value: new Color("yellow")
          },
          mixAmount1: { value: 0.5 }, // Adjust the mix amount for color1
          mixAmount2: { value: 0.5 }, // Adjust the mix amount for color2
          mixAmount3: { value: 0.0 },
        },
        vertexShader: `
          varying vec2 vUv;
      
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float mixAmount1;
          uniform float mixAmount2;
          uniform float mixAmount3;
          
          varying vec2 vUv;
          
          void main() {
            
            gl_FragColor = vec4(mix(color3, mix(color1, mix(color1, mix(color1, mix(color1, mix(color1, color3, vUv.x), vUv.x), vUv.x), vUv.x), vUv.x), vUv.x), 1.0);
          }
          `,
        };
          
          // gl_FragColor = vec4(mix(color1, mix(color3,color2, vUv.x), vUv.x), 1.0);


    useFrame(() => {
        if (meshRef1.current) {
            meshRef1.current.rotation.x += 0.005; // Adjust the rotation speed as needed
            meshRef1.current.rotation.y += 0.005; // Adjust the rotation speed as needed
        }
        if (meshRef2.current) {
          meshRef2.current.rotation.x -= 0.005; // Adjust the rotation speed as needed
          meshRef2.current.rotation.y -= 0.005; // Adjust the rotation speed as needed
      }
    });

    return (
        <>
            <mesh
                ref={meshRef1}
                castShadow
                receiveShadow
                position={[0, 2, 0]}
            >
                <torusGeometry args={[1.5, 0.1, 64, 100]} />
                <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} transparent opacity={1}/>
                <shaderMaterial
                    uniforms={gradientShader1.uniforms}
                    vertexShader={gradientShader1.vertexShader}
                    fragmentShader={gradientShader1.fragmentShader}
                />
            </mesh>
            <mesh
                ref={meshRef2}
                castShadow
                receiveShadow
                position={[-0.15, 2, 0]}
                // key={i}
                // ref={(el) => (itemsRef.current[i] = el)}
                rotation={[Math.PI / 4, 0, 0]}
            >
                <torusGeometry args={[1.5, 0.1, 160, 250]} />
                <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[255, 255, 0]} />
                <shaderMaterial
                    uniforms={gradientShader2.uniforms}
                    vertexShader={gradientShader2.vertexShader}
                    fragmentShader={gradientShader2.fragmentShader}
                />
            </mesh>
        </>
    )
}
