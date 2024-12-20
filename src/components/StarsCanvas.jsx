"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props) => {
    const ref = useRef();
    const [sphere, setSphere] = useState(new Float32Array(1500));
    const [size, setSize] = useState(0.0025);
    const [shootingStars, setShootingStars] = useState([]);

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

    useEffect(() => {
        // Create shooting stars at intervals
        const interval = setInterval(() => {
            const directionX = Math.random() > 0.5 ? 1 : -1;
            const directionY = Math.random() > 0.5 ? 1 : -1;
            setShootingStars((stars) => [
                ...stars,
                {
                    id: Date.now(),
                    position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
                    velocity: [
                        directionX * (Math.random() * 0.8 + 1), // Increased velocity
                        directionY * (Math.random() * 0.8 + 1), // Increased velocity
                        0,
                    ],
                    size: Math.random() * 0.03 + 0.02, // Randomize size
                    life: 120, // Lifespan in frames
                },
            ]);
        }, 1000); // Add a new shooting star every second

        return () => clearInterval(interval);
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 70;
            ref.current.rotation.y -= delta / 85;
        }

        // Update shooting stars
        setShootingStars((stars) =>
            stars
                .map((star) => ({
                    ...star,
                    position: [
                        star.position[0] + star.velocity[0] * delta,
                        star.position[1] + star.velocity[1] * delta,
                        star.position[2] + star.velocity[2] * delta,
                    ],
                    life: star.life - 1,
                }))
                .filter((star) => star.life > 0) // Remove expired stars
        );
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
            {shootingStars.map((star) => (
                <mesh key={star.id} position={star.position}>
                    <sphereGeometry args={[star.size, 16, 16]} /> {/* Randomized size */}
                    <meshBasicMaterial
                        color="white"
                        transparent
                        opacity={Math.max(0.2, star.life / 120)} // Fade out over time
                    />
                </mesh>
            ))}
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
