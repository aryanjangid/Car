import { useFrame, extend } from '@react-three/fiber';
import React, { useRef } from 'react'
import { Color } from 'three';
import { ShaderMaterial } from 'three';

extend({ ShaderMaterial });


export default function Rings() {

    const itemsRef = useRef([]);
    const meshRef = useRef();

    // vec3 blendedColor = mix(mix(color1, color2, vUv.y), mix(color3, color4, vUv.y), vUv.x);

    const gradientColors = [
        [1.0, 0.0, 0.0], // Red
        [1.0, 0.5, 0.0], // Orange
        [1.0, 1.0, 0.0], // Yellow
        [0.0, 1.0, 0.0], // Green
        [0.0, 0.0, 1.0], // Blue
    ];
    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

    const fragmentShader = `
  uniform vec3 colors[numColors];
  uniform int numColors;

  void main() {
    // Calculate the color stop index based on the current position
    float stop = gl_FragCoord.x / gl_FragCoord.y;

    // Interpolate between colors
    vec3 finalColor = mix(colors[0], colors[numColors - 1], stop);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

    const gradientShader = {
        uniforms: {
            color1: { value: new Color(0xD7539E) },
            color2: { value: new Color(0xFA9891) },
            color3: { value: new Color(0xF6ED2D) },
            color4: { value: new Color(0xD7539E) },
        },
        // Easing function for smoother transition

        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform vec3 color4;
          varying vec2 vUv;
          void main() 
          {
            float uTransition = vUv.x * vUv.x * (3.0 - 2.0 * vUv.x);

            vec3 blendedColor = mix(mix(color1, color2, vUv.y), mix(mix(color3, color4, vUv.y), mix(color4, color1, vUv.y), vUv.y), uTransition);
            gl_FragColor = vec4(blendedColor, 2.0);

          }
        `,
    };

    const gradientShader2 = {
        uniforms: {
            topColor:      { type: "c", value: new Color(0x000000) },
            bottomColor: { type: "c", value: new Color( 0xC1987C ) },
            offset:         { type: "f", value: 10 },
            exponent:     { type: "f", value: 0.25}
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            ec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform vec3 color4;
          varying vec2 vUv;
          void main() {
            float h = normalize( vWorldPosition + offset ).y;
        gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

          }
        `,
    };

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005; // Adjust the rotation speed as needed
            meshRef.current.rotation.y += 0.005; // Adjust the rotation speed as needed
        }
        // meshRef.material.emissive=new Color(6,0.15,0.7).multiplyScalar(0.5);
    });

    return (
        <>
            {/* {[0, 0, 0, 0, 0, 0, 0].map((v, i) => ( */}
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                position={[0, 0, 0]}
            // key={i}
            // ref={(el) => (itemsRef.current[i] = el)}
            >
                <torusGeometry args={[1.5, 0.1, 16, 100]} />
                <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
                <shaderMaterial
                    uniforms={gradientShader.uniforms}
                    vertexShader={gradientShader.vertexShader}
                    fragmentShader={gradientShader.fragmentShader}
                />
            </mesh>
            <mesh
                // ref={meshRef}
                castShadow
                receiveShadow
                position={[-0.15, 0, 0]}
                // key={i}
                // ref={(el) => (itemsRef.current[i] = el)}
                rotation={[Math.PI / 4, 0, 0]}
            >
                <torusGeometry args={[1.5, 0.1, 160, 250]} />
                <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[255, 255, 0]} />
                <shaderMaterial
                    uniforms={gradientShader.uniforms}
                    vertexShader={gradientShader.vertexShader}
                    fragmentShader={gradientShader.fragmentShader}
                />
            </mesh>
            {/* ))} */}

             {[0, 0, 0, 0, 0, 0, 0].map((v, i) => (
                <mesh
                    castShadow
                    receiveShadow
                    position={[-100, -100, -100]}
                    key={i}
                    ref={(el) => (itemsRef.current[i] = el)}
                >
                    <torusGeometry args={[3.35, 0.05, 16, 100]} />
                    <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
                </mesh>
            ))} 
        </>
    )
}
