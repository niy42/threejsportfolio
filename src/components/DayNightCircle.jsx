"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props) => {
    const ref = useRef();
    const [sphere, setSphere] = useState(new Float32Array(1500));
    const [size, setSize] = useState(0.0025);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const radius = Math.min(width, height) / 500; // Adjust the radius based on screen size
            setSphere(random.inSphere(new Float32Array(1500), { radius }));
            setSize(Math.max(0.002, Math.min(0.004, radius / 400))); // Adjust point size
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call on mount to set initial values

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 70;
            ref.current.rotation.y -= delta / 85;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#fff"
                    size={size}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = () => (
    <div className="w-full h-full fixed inset-0 z-[-9999]">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
            <Preload all />
        </Canvas>
    </div>
);

export default StarsCanvas;
