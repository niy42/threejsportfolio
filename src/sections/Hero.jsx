import { useEffect, useState } from "react"; // Import React and hooks
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogoModel from "../components/ReactLogo.jsx";
import Rings from "../components/Rings.jsx";
import Cube from "../components/Cube.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import ComputerDeskModel from "../components/computer_desk.jsx";
import Button from "../components/Button.jsx";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const text = `Hey there, I'm Adeniyi  
✨ Digital Architect | Blockchain Alchemist | Fullstack Developer   
🚀 Transforming "What if?" into "What’s next?" 
   >_  Let’s code the future together!`;

        setLines(text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0));
    }, []);

    // Create sequence before rendering to prevent re-renders
    const sequence = lines.flatMap(line => [line, 1500]);

    // Media queries for different screen sizes
    const isSmall = useMediaQuery({ maxWidth: 480 }); // Small screens (e.g., phones)
    const isMobile = useMediaQuery({ minWidth: 481, maxWidth: 767 }); // Medium screens (e.g., larger phones)
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 }); // Tablet screens
    const isLarge = useMediaQuery({ minWidth: 1025 }); // Large screens (e.g., desktops or larger tablets)

    // Calculate sizes dynamically based on screen size
    const sizes = calculateSizes(isSmall, isMobile, isTablet, isLarge);

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Dynamic scale based on screen size
    const modelScale = isSmall
        ? 2.5
        : isMobile
            ? 3
            : isTablet
                ? 3.5
                : 4; // Adjusted for larger screens

    const cameraPosition = isSmall
        ? [0, 0, 0]
        : isMobile
            ? [0, 0, 20]
            : isTablet
                ? [0, 0, 25]
                : [0, 0, 30]; // Camera position adjusts based on screen size

    return (
        <section className="min-h-screen w-full flex flex-col relative max-sm:py-8" id={"home"}>
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 gap-3">
                <div className="mx-auto inline-flex items-center space-x-2">
                    <div className="sm:text-3xl leading-relaxed text-center text-xl font-medium text-gray-300 font-generalsans text-wrap whitespace-pre-wrap">
                        {sequence.length > 0 && (
                            <TypeAnimation
                                sequence={sequence}
                                speed={50}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                            />
                        )}
                    </div>
                    <img
                        src="/assets/wavetrans.gif"
                        alt="hand-waving"
                        className="h-9 w-9 sm:h-12 sm:w-12 cursor-pointer"
                    />
                </div>
                <p className="hero_tag text-gray_gradient">
                    Crafting Seamless Web Experiences
                </p>
                <div className="h-full w-full absolute inset-0">
                    <Canvas className="w-full h-full">
                        <Suspense fallback={<CanvasLoader />}>
                            <PerspectiveCamera makeDefault position={cameraPosition} />
                            <HeroCamera
                                isSmall={isSmall}
                            >
                                <ComputerDeskModel
                                    position={sizes.deskPosition}
                                    rotation={[0, -Math.PI / 6, 0]}
                                    scale={modelScale}
                                />
                            </HeroCamera>
                            <group>
                                <Target position={sizes.targetPosition} />
                                <ReactLogoModel position={sizes.reactLogoPosition} />
                                <Cube position={sizes.cubePosition} />
                                <Rings position={sizes.ringPosition} />
                            </group>
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[10, 10, 10]} intensity={1.5} />
                        </Suspense>
                    </Canvas>
                    <div
                        className={
                            "absolute right-0 left-0 z-10 c-space w-full md:bottom-3 md:left-1/2 transform md:-translate-x-1/2 mx"
                        }
                    >
                        <Button
                            name={"Let's work together"}
                            isBeam
                            containerClass={"sm:w-fit w-full sm:min-w-9"}
                            href={"about"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
