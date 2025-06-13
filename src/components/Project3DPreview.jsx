// src/components/Project3DPreview.jsx
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Center, OrbitControls } from '@react-three/drei'; // Keep OrbitControls for now
import * as THREE from 'three'; // Might be needed for THREE.Color if you use it

function Rotating3DText({ title }) {
  const groupRef = useRef();
  

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Simple rotation
      // Add back other subtle animations later if desired
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text
          fontSize={0.4} // Adjust as needed
          // color prop is removed as material will define it
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          textAlign="center"
          font="/fonts/Montserrat-Bold.ttf" // Ensure path is correct
          // material-toneMapped={false} // Add this back if emissive isn't bright enough
        >
          {title.toUpperCase()}
          <meshStandardMaterial
            attach="material" // Important!
            color="#FFFFFF"    // Base color of the text
            emissive="#3366FF" // A nice blue emissive glow
            emissiveIntensity={0.5}
            metalness={0.2}
            roughness={0.4}
            toneMapped={false} // Often good for emissive materials
          />
        </Text>
      </Center>
    </group>
  );
}

// Project3DPreview component - keep the simplified canvas for now
export default function Project3DPreview({ title, canvasStyle }) {
  const projectTitle = title || "AWESOME PROJECT"; // More exciting fallback

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px', background: 'rgba(20,20,50,0.1)', ...canvasStyle }}> {/* Darker subtle background */}
      <Canvas
        shadows // Keep shadows off on Canvas for now, test enabling later
        camera={{ position: [0, 0.1, 3.5], fov: 60 }} // Slightly adjusted camera
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 3, 5]} intensity={1.2} castShadow />
          <pointLight position={[-3,-2,2]} intensity={0.5} color="#FFD700" />
          <Rotating3DText title={projectTitle} />
          <OrbitControls enableZoom={true} enablePan={true} /> {/* Keep OrbitControls */}
        </Suspense>
      </Canvas>
    </div>
  );
}