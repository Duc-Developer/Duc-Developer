"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const Model = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (modelRef.current) {
            const time = state.clock.getElapsedTime();
            const loopDuration = 3;
            const normalizedTime = (time % loopDuration) / loopDuration; // Normalize time to [0, 1] range
            const easedTime = easeInOutSine(normalizedTime);
            const newY = Math.cos(easedTime * Math.PI * 2) * 0.4;
            const newZ = Math.sin(easedTime * Math.PI * 2) * 0.2;
            const newX = Math.sin(easedTime * Math.PI * 2) * 0.1 + Math.cos(easedTime * Math.PI * 2) * 0.1;

            modelRef.current.position.set(newX, newY, newZ);
            // modelRef.current.rotation.y = Math.cos(easedTime * Math.PI * 2) * 0.1;

            const direction = new THREE.Vector3(0, 1, 0).normalize();
            const targetQuaternion = new THREE.Quaternion();
            targetQuaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
            modelRef.current.quaternion.slerp(targetQuaternion, delta);
        }
    });

    return <primitive ref={modelRef} object={scene} scale={[1, 1, 1]} />;
};

const AstronautModel = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <div className="max-w-screen w-[20rem] h-[20rem] sm:w-[36rem] sm:h-[36rem] md:w-[42rem] md:h-[42rem] relative">
            <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [1, 6, 10], fov: 15 }} >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <Suspense fallback={null}>
                    <Model url={modelUrl} />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
            </Canvas>
        </div>
    );
};

export default AstronautModel;