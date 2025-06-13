// src/components/InteractiveBlob.jsx
import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text, Stats } from '@react-three/drei'; // Added Stats
import * as THREE from 'three';

// BlobObject component - Refined
function BlobObject() {
  const meshRef = useRef();
  const vec = useMemo(() => new THREE.Vector3(), []);
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { viewport } = useThree();

  const baseX = viewport.width / 2 - 8; // Adjusted margin slightly
  const baseY = 0;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow, constant rotation
      meshRef.current.rotation.x += delta * 0.03; // Slower rotation
      meshRef.current.rotation.y += delta * 0.05; // Slower rotation

      // Idle vertical float
      const idleFloatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.25; // Slower, slightly larger float

      // Mouse influence
      const mouseInfluenceX = state.mouse.x * 0.4;
      const mouseInfluenceY = state.mouse.y * 0.4;

      const targetX = baseX + mouseInfluenceX;
      const targetY = baseY + mouseInfluenceY + idleFloatY;

      meshRef.current.position.lerp(
        vec.set(targetX, targetY, 0),
        0.04 // Slightly slower lerp for smoother feel
      );

      // Base scale with breathing effect
      const baseScaleValue = 1.7; // Slightly smaller base
      const breath = Math.sin(state.clock.elapsedTime * 0.6) * 0.08; // Slower breath, smaller amplitude
      let currentTargetScale = baseScaleValue + breath;

      if (clicked) {
        currentTargetScale = baseScaleValue * 1.25; // Click pop relative to base
      }

      meshRef.current.scale.lerp(vec.set(currentTargetScale, currentTargetScale, currentTargetScale), 0.15); // Slower scale lerp
    }
  });

  const blobColor = useMemo(() => {
    // Using hex for direct use, but could be converted from CSS vars if needed
    if (clicked) return '#D92E5A'; // Vivid Pink/Red
    if (hovered) return '#FFD700'; // Gold
    return '#3498DB'; // Nice Blue
  }, [hovered, clicked]);

  const handlePointerDown = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 350); // Slightly longer pop
  };

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]} // Reduced segments for potential performance gain, test if visually okay
        onPointerOver={(event) => { event.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(event) => { setHover(false); document.body.style.cursor = 'default'; }}
        onPointerDown={handlePointerDown}
        castShadow
      >
        <MeshDistortMaterial
          color={blobColor}
          attach="material"
          distort={0.45} // More "gooey" distortion
          speed={0.8}    // Slower speed for a more laid-back feel
          roughness={0.02} // Very shiny
          metalness={0.15}
          emissive={hovered ? blobColor : '#000000'} // Glow on hover
          emissiveIntensity={hovered ? 0.25 : 0}    // Subtle glow intensity
          transparent
          opacity={0.88} // Slightly adjusted opacity
        />
      </Sphere>
      {hovered && (
        <Text
          position={[meshRef.current?.position.x || baseX, (meshRef.current?.position.y || baseY) + 1.6, 0]} // Adjusted Y offset
          fontSize={0.22}
          color="#ffffff" // White text
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#1a1a1a" // Darker outline
          material-depthWrite={false} // Prevents z-fighting with blob if very close
        >
          Hey there!
        </Text>
      )}
    </group>
  );
}

// InteractiveBlobCanvas component
export default function InteractiveBlobCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8.5], fov: 48 }} // Camera slightly adjusted
      dpr={[1, 1.5]} // Max DPR 1.5 for performance balance
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} /> {/* Slightly reduced */}
        <directionalLight
          position={[6, 9, 6]}
          intensity={1.8}
          color="#fafafa" // Slightly off-white
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-9, -6, -9]} intensity={0.5} color="#E0C3FC" /> {/* Lavender fill light */}
        <BlobObject />
        {/* <Stats /> // Uncomment to monitor FPS during development */}
      </Suspense>
    </Canvas>
  );
}