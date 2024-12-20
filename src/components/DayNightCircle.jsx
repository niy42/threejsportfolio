"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const ShootingStar = ({ position, speed, direction, onComplete }) => {
    const starRef = useRef();

    useFrame(() => {
        if (starRef.current) {
            starRef.current.position.x += direction.x * speed;
            starRef.current.position.y += direction.y * speed;
            starRef.current.position.z += direction.z * speed;

            // Trigger completion when star moves out of bounds
            if (
                Math.abs(starRef.current.position.x) > 1 ||
                Math.abs(starRef.current.position.y) > 1 ||
                Math.abs(starRef.current.position.z) > 1
            ) {
                onComplete();
            }
        }
    });

    return (
        <Points ref={starRef} positions={[position[0], position[1], position[2]]} stride={3}>
            <PointMaterial
                transparent
                color="#fff"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
};

const StarBackground = (props) => {
    const ref = useRef();
    const [sphere, setSphere] = useState(new Float32Array(1500));
    const [shootingStars, setShootingStars] = useState([]);

    const generateRandomDirection = () => {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        const length = Math.sqrt(x * x + y * y + z * z);
        return { x: x / length, y: y / length, z: z / length };
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const radius = Math.min(width, height) / 500; // Adjust the radius based on screen size
            setSphere(random.inSphere(new Float32Array(1500), { radius }));
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call on mount to set initial values

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const createShootingStar = () => {
        const position = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
        const direction = generateRandomDirection();
        const speed = Math.random() * 0.05 + 0.1; // Random speed
        setShootingStars((prevStars) => [
            ...prevStars,
            { position, direction, speed }
        ]);
    };

    useEffect(() => {
        const interval = setInterval(createShootingStar, Math.random() * 1000 + 500); // Trigger shooting stars at random intervals
        return () => clearInterval(interval);
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
                    size={0.0025}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
            {shootingStars.map((star, index) => (
                <ShootingStar
                    key={index}
                    position={star.position}
                    speed={star.speed}
                    direction={star.direction}
                    onComplete={() => {
                        // Remove completed shooting star
                        setShootingStars((prevStars) =>
                            prevStars.filter((_, i) => i !== index)
                        );
                    }}
                />
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
