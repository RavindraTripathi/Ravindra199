
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeSceneProps {
  page: string;
}

const Rig = ({ page }: { page: string }) => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    // Basic mouse movement parallax - safely check for mouse availability
    if (mouse) {
      camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, 10), 0.05);
    }
    
    // Page specific camera adjustments
    if (page === 'about') {
      camera.position.lerp(vec.set(-5, 2, 12), 0.02);
    } else if (page === 'skills') {
      camera.position.lerp(vec.set(5, -2, 8), 0.02);
    } else if (page === 'experience') {
      camera.position.lerp(vec.set(0, 5, 15), 0.02);
    }
    
    camera.lookAt(0, 0, 0);
  });
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 3000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.z = time * 0.01;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingShapes = ({ page }: { page: string }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[2, 1, -5]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#008fd3" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-4, -2, -8]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[5, -3, -2]}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

const ThreeScene: React.FC<ThreeSceneProps> = ({ page }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030712]">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#030712', 1);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ParticleField />
        <FloatingShapes page={page} />
        <Rig page={page} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
