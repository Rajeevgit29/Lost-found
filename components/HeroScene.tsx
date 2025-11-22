import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (sphereRef.current) {
      // Rotate slowly
      sphereRef.current.rotation.z = clock.getElapsedTime() * 0.1;
      
      // Subtle mouse influence
      const x = (mouse.x * 0.5);
      const y = (mouse.y * 0.5);
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, y, 0.1);
      sphereRef.current.rotation.y = THREE.MathUtils.lerp(sphereRef.current.rotation.y, x, 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 128, 128]} ref={sphereRef} scale={2.2}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          bumpScale={0.005}
        />
      </Sphere>
    </Float>
  );
};

const SceneContent = () => {
  return (
    <>
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      {/* @ts-ignore */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F472B6" />
      
      <AnimatedSphere />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
    </>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default HeroScene;