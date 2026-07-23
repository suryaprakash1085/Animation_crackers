import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingRocket = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
  });

  const orange = new THREE.MeshStandardMaterial({ color: "#F97316", metalness: 0.5, roughness: 0.25 });
  const purple = new THREE.MeshStandardMaterial({ color: "#7C3AED", metalness: 0.6, roughness: 0.2 });
  const gold = new THREE.MeshStandardMaterial({ color: "#FCD34D", metalness: 0.8, roughness: 0.1, emissive: "#FCD34D", emissiveIntensity: 0.4 });
  const white = new THREE.MeshStandardMaterial({ color: "#ffffff", metalness: 0.2, roughness: 0.5 });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Main rocket body */}
        <mesh position={[0, 0, 0]} material={purple}>
          <cylinderGeometry args={[0.38, 0.42, 2.2, 24]} />
        </mesh>
        {/* Nose cone */}
        <mesh position={[0, 1.45, 0]} material={orange}>
          <coneGeometry args={[0.38, 0.9, 24]} />
        </mesh>
        {/* Gold stripe rings */}
        <mesh position={[0, 0.4, 0]} material={gold}>
          <torusGeometry args={[0.41, 0.05, 8, 24]} />
        </mesh>
        <mesh position={[0, -0.4, 0]} material={gold}>
          <torusGeometry args={[0.41, 0.05, 8, 24]} />
        </mesh>
        {/* Fins */}
        {[0, 120, 240].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={deg}
              position={[Math.sin(rad) * 0.55, -0.85, Math.cos(rad) * 0.55]}
              rotation={[0, -rad, 0]}
              material={orange}
            >
              <boxGeometry args={[0.08, 0.65, 0.4]} />
            </mesh>
          );
        })}
        {/* Window */}
        <mesh position={[0, 0.35, 0.41]} material={gold}>
          <circleGeometry args={[0.16, 20]} />
        </mesh>
        {/* Label band */}
        <mesh position={[0, -0.1, 0]} material={white}>
          <cylinderGeometry args={[0.42, 0.42, 0.55, 24]} />
        </mesh>
        {/* Stars text region */}
        <mesh position={[0, -0.1, 0.43]} rotation={[0, 0, 0]} material={orange}>
          <planeGeometry args={[0.55, 0.4]} />
        </mesh>
        {/* Nozzle */}
        <mesh position={[0, -1.35, 0]} material={new THREE.MeshStandardMaterial({ color: "#374151", metalness: 0.8, roughness: 0.2 })}>
          <cylinderGeometry args={[0.28, 0.22, 0.35, 16]} />
        </mesh>
        {/* Flame */}
        <mesh position={[0, -1.7, 0]}>
          <coneGeometry args={[0.22, 0.6, 16]} />
          <meshStandardMaterial color="#F97316" emissive="#FBBF24" emissiveIntensity={1.5} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, -1.85, 0]}>
          <coneGeometry args={[0.13, 0.45, 16]} />
          <meshStandardMaterial color="#FEF3C7" emissive="#ffffff" emissiveIntensity={2} transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

const FireworkBursts = () => {
  const positions: [number, number, number][] = [
    [2.5, 2, -2], [-2.2, 1.5, -1.5], [1.8, -0.5, -2.5], [-1.5, -1, -2], [0.5, 2.5, -3]
  ];
  const colors = ["#F97316", "#FCD34D", "#EF4444", "#8B5CF6", "#10B981"];

  return (
    <>
      {positions.map((pos, i) => (
        <Sparkles
          key={i}
          position={pos}
          count={20}
          size={2}
          speed={0.6}
          opacity={0.7}
          color={colors[i]}
          scale={1.5}
        />
      ))}
    </>
  );
};

const Podium = () => (
  <>
    <mesh position={[0, -2.3, 0]} receiveShadow>
      <cylinderGeometry args={[1.6, 1.9, 0.25, 32]} />
      <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.4} />
    </mesh>
    <mesh position={[0, -2.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.4, 1.9, 48]} />
      <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.9} transparent opacity={0.5} />
    </mesh>
    {/* Reflective floor under podium */}
    <mesh position={[0, -2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={25}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#f8f8f8"
        metalness={0.5}
        mirror={0}
      />
    </mesh>
  </>
);

const Scene = () => (
  <>
    <ambientLight intensity={0.9} />
    <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow />
    <pointLight position={[-4, 3, -2]} intensity={1.2} color="#F97316" />
    <pointLight position={[4, -1, 4]} intensity={0.7} color="#8B5CF6" />
    <pointLight position={[0, 3, 3]} intensity={0.6} color="#FCD34D" />

    <Sparkles count={100} size={1.5} speed={0.35} opacity={0.5} color="#F97316" scale={10} />
    <Sparkles count={60} size={2.5} speed={0.2} opacity={0.35} color="#FCD34D" scale={8} />
    <Sparkles count={40} size={1} speed={0.5} opacity={0.4} color="#EF4444" scale={7} />

    <FireworkBursts />
    <FloatingRocket />
    <Podium />

    <Environment preset="city" />
  </>
);

export const HeroScene3D = () => (
  <Canvas
    camera={{ position: [0, 0.3, 6.5], fov: 42 }}
    gl={{ antialias: true, alpha: true }}
    style={{ background: "transparent" }}
    shadows
  >
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  </Canvas>
);
