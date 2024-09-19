// components/main/ModelViewer.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const Model = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);
    const gradientMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color("#ffffff") },
                color2: { value: new THREE.Color("#d3d3d3") },
            },
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
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
        });
    }, []);
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = gradientMaterial;
        }
    });

    useFrame((state, delta) => {
        if (modelRef.current) {
            const time = state.clock.getElapsedTime();

            // Adjust newX for horizontal movement and keep newY and newZ small
            const newX = Math.sin(time) * 6 + Math.cos(time * 0.3) * 2;
            const newY = Math.cos(time * 0.3) * 0.6;
            const newZ = Math.sin(time * 0.7) * 0.5 + Math.cos(time) *5;
      
            // Update model position
            modelRef.current.position.set(newX, newY, newZ);
      
            // Calculate direction vector for horizontal movement
            const direction = new THREE.Vector3(newX, -0.6, 0).normalize();
      
            // Calculate the target quaternion based on the direction vector
            const targetQuaternion = new THREE.Quaternion();
            targetQuaternion.setFromUnitVectors(new THREE.Vector3(0, 0.8, 5), direction);
      
            // Smoothly interpolate between the current and target rotation
            modelRef.current.quaternion.slerp(targetQuaternion, delta * 0.5); // Adjust the factor for smoothness
        }
    });

    return <primitive ref={modelRef} object={scene} scale={[1, 1, 1]} />;
};

const AstronautModel = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 10], fov: 85 }} >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <Suspense fallback={null}>
                    <Model url={modelUrl} />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default AstronautModel;