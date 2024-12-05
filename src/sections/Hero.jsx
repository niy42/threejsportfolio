import { useEffect, useState } from 'react'; // Import React and hooks
import { Canvas, useFrame } from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
//import Model from "../components/Terminal.jsx"; // Import the Model component
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
//import {Leva, useControls} from "leva";
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogoModel from "../components/ReactLogo.jsx";
import Rings from "../components/Rings.jsx";
import Cube from "../components/Cube.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import ComputerDeskModel from "../components/computer_desk.jsx";
import Button from "../components/Button.jsx";

export default function Hero() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const isSmall = useMediaQuery({ maxWidth: 440});
    const isMobile = useMediaQuery({ maxWidth: 768});
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

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

    // Dynamic scale based on window size
    const modelScale = windowSize.width < 768 ? 2.5 : 4.5;  // Scale down for smaller screens
    const cameraPosition = windowSize.width < 768 ? [0, 0, 20] : [0, 0, 30];  // Adjust camera for small screens
    // const modelPosition = windowSize.width < 768 ? [0, -5, -10] : [6, -10, -10];  // Adjust model position for smaller screens

    // Custom hook to rotate the model
    /*const RotatingModel = () => {
        const ref = useRef();

        // Rotate the model continuously
        seFrame(({ clock }) => {
            if (ref.current) {
                ref.current.rotation.y = clock.elapsedTime * 0.2;  // Adjust rotation speed
            }
        });

        return (
            <Model
                ref={ref}
                scale={modelScale}  // Adjust scale based on screen size logic
                position={modelPosition}  // Adjust position based on screen size logic
                rotation={[0, -Math.PI / 2, 0]}  // Initial rotation
            />
        );
    };*/

    return (
        <section className="min-h-screen max-lg:border-2 w-full flex flex-col relative border-blue-500">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 gap-3">
                <div className="mx-auto inline-flex items-center space-x-2">
                    <p className="sm:text-3xl text-xl font-medium text-white font-generalsans">
                        Hi, I am Adeniyi
                    </p>
                    <img
                        src="/assets/wavetrans.gif"
                        alt="hand-waving"
                        className="h-9 w-9 sm:h-12 sm:w-12 cursor-pointer"
                    />
                </div>
                <p className="hero_tag text-gray_gradient">Crafting Seamless Web Experiences</p>
                <div className="h-full w-full absolute inset-0">
                    <Canvas className="w-full h-full">
                        <Suspense fallback={<CanvasLoader />}>
                            <PerspectiveCamera makeDefault position={cameraPosition} />
                           <HeroCamera isMobile={isMobile}>
                               <ComputerDeskModel
                                   position={sizes.deskPosition}
                                   rotation={[ 0, -Math.PI / 6, 0]}
                                   scale={modelScale}
                               />
                           </HeroCamera>
                            <group>
                                <Target position={sizes.targetPosition}/>
                                <ReactLogoModel position={sizes.reactLogoPosition}/>
                                <Cube position={sizes.cubePosition}/>
                                <Rings position={sizes.ringPosition}/>
                            </group>
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[10, 10, 10]} intensity={1.5} />
                        </Suspense>
                    </Canvas>
                    <div className={'absolute right-0 left-0 z-10 c-space w-full bottom-7 md:bottom-3 md:left-1/2 transform md:-translate-x-1/2 mx'}>
                        <a href={'#contact'} className={'w-fit'}>
                            <Button name={"Let's work together"} isBeam containerClass={"sm:w-fit w-full sm:min-w-9"}/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
