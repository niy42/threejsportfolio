// src/DayNightCycle.js

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const DayNightCycle = () => {
    const mountRef = useRef(null);
    const [dayProgress, setDayProgress] = useState(0);
    const [skyColor, setSkyColor] = useState(new THREE.Color(0x87CEEB)); // Light blue sky color for day

    useEffect(() => {
        // Initialize the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Set up the ambient light and directional light (sunlight)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light
        scene.add(ambientLight);

        const sunlight = new THREE.DirectionalLight(0xffffff, 1);
        sunlight.position.set(5, 5, 5);
        scene.add(sunlight);

        // Load cloud texture
        const textureLoader = new THREE.TextureLoader();
        const cloudTexture = textureLoader.load('https://www.transparenttextures.com/patterns/clouds.png');  // Cloud texture from external URL

        // Create clouds with different positions and speeds for organic movement
        const clouds = [];
        const cloudSpeeds = [0.001, 0.002, 0.003, 0.004, 0.005]; // Different cloud speeds for variety
        for (let i = 0; i < 15; i++) {
            const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);
            const cloudMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true, opacity: 0.8 });
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);

            // Random cloud position and size
            cloud.position.set(
                Math.random() * 30 - 15, // Random x
                Math.random() * 10 + 5,  // Random y (higher to simulate floating)
                Math.random() * 30 - 15  // Random z
            );
            cloud.scale.set(Math.random() * 2 + 1, Math.random() * 2 + 1, Math.random() * 2 + 1); // Random scale
            cloud.speed = cloudSpeeds[i % cloudSpeeds.length]; // Assign random speed for cloud movement

            clouds.push(cloud);
            scene.add(cloud);
        }

        // Sky (gradient background)
        const skyGeometry = new THREE.PlaneGeometry(100, 100);
        const skyMaterial = new THREE.MeshBasicMaterial({ color: skyColor });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        sky.rotation.x = -Math.PI / 2; // Rotate to face camera
        sky.position.set(0, 50, 0);
        scene.add(sky);

        // Camera position
        camera.position.z = 10;

        // Handle day-night cycle
        const handleDayNightCycle = () => {
            let newDayProgress = dayProgress + 0.001;
            if (newDayProgress > 1) newDayProgress = 0; // Reset to 0 after a full cycle
            setDayProgress(newDayProgress);

            // Sky color transition (from morning to afternoon to dusk and night)
            if (newDayProgress < 0.25) {
                // Morning to afternoon (light blue to yellow)
                setSkyColor(new THREE.Color().setHSL(0.5 - (newDayProgress * 2) * 0.5, 0.7, 0.8));
            } else if (newDayProgress < 0.75) {
                // Afternoon to evening (yellow to orange)
                setSkyColor(new THREE.Color().setHSL(0.25 - (newDayProgress - 0.25) * 0.5, 0.7, 0.6));
            } else {
                // Evening to night (orange to dark blue)
                setSkyColor(new THREE.Color().setHSL(0.1 - (newDayProgress - 0.75) * 0.5, 0.7, 0.3));
            }

            // Move clouds
            clouds.forEach((cloud, index) => {
                cloud.position.x += cloud.speed * (index % 2 === 0 ? 1 : -1); // Cloud movement with random speed direction
                if (cloud.position.x > 15) cloud.position.x = -15; // Reset position
                if (cloud.position.x < -15) cloud.position.x = 15; // Reset position
            });

            // Sun movement (Directional light position change)
            sunlight.position.set(Math.sin(newDayProgress * 2 * Math.PI) * 5, Math.cos(newDayProgress * 2 * Math.PI) * 5, sunlight.position.z);
        };

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            handleDayNightCycle();
            sky.material.color = skyColor; // Update sky color
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', () => {});
            scene.dispose();
        };
    }, [dayProgress, skyColor]);

    return <div ref={mountRef} style={{ height: '100vh', width: '100%' }} />;
};

export default DayNightCycle;
