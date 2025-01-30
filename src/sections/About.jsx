import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {OrbitControls, PerspectiveCamera} from '@react-three/drei';
import Button from "../components/Button.jsx";
import {projectItem} from "./Projects.jsx";
import {useMediaQuery} from "react-responsive";
import {TypeAnimation} from "react-type-animation";

const Globe = () => {
    const globeRef = useRef();

    // This will be used to rotate the globe automatically
    useEffect(() => {
        const animateRotation = () => {
            if (globeRef.current) {
                // Rotate the globe around its Y-axis (horizontal rotation)
                globeRef.current.rotation.y += 0.005; // Slow horizontal rotation
            }
            requestAnimationFrame(animateRotation); // Request the next frame
        };
        animateRotation();
    }, []);

    return (
        <>
            {/* Globe Mesh */}
            <mesh ref={globeRef}>
                <sphereGeometry args={[2, 64, 64]} /> {/* Increased size (radius = 2) */}
                <meshStandardMaterial
                    map={new THREE.TextureLoader().load("//unpkg.com/three-globe/example/img/earth-day.jpg")}
                    bumpMap={new THREE.TextureLoader().load("//unpkg.com/three-globe/example/img/earth-topology.png")}
                    bumpScale={0.05}
                />
            </mesh>
        </>
    );
};

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [showAnimation1, setShowAnimation1] = useState(false);
    const isSmall = useMediaQuery({ maxWidth: 480 }); // Small screens (e.g., phones)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleCopy = () => {
        navigator.clipboard?.writeText('obanlaniyi42@gmail.com');
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }

    // Update window size on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = () => {
        setShowAnimation(window.scrollY > (isSmall ? 600 : 650));
        setShowAnimation1(window.scrollY > (isSmall ? 800 : 1100));
        console.log("Window height on scrollY", window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // Adjust camera for small screens
    const cameraPosition = windowSize.width < 768 ? [4, 0, 6] : [0, 0, 5];

    return (
        <section className="c-space my-20" id={'about'}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">Hi, I&apos;m Adeniyi</p>
                            <p className="grid-subtext">
                                {showAnimation && (
                                    <TypeAnimation
                                        sequence={[
                                            "With over a year of experience, I have honed and continue to \n" +
                                            "develop my skills in full-stack development, with a focus on animated 3D websites.",
                                            1500
                                        ]}
                                        wrapper="span"
                                        cursor={true}
                                        repeat={Infinity}
                                        style={{ fontSize: '1em', display: 'inline-block' }}
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/niystack.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">
                                I specialize in JavaScript and TypeScript, with a focus on React and Next.js.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid1-container relative">
                        <div className={"absolute top-0 right-0"}>
                            <img src={projectItem} alt={"spotlight"}
                                 className={"w-full h-96 object-cover rounded-xl"}/>
                        </div>
                        <div className="w-full sm:h-[326px] h-96 rounded-3xl flex justify-center items-center">
                            <Canvas>
                                <PerspectiveCamera makeDefault position={cameraPosition}/>
                                <Suspense fallback={null}>
                                    {/* Lighting */}
                                    <ambientLight intensity={0.7}/>
                                    {/* Soft ambient light */}
                                    <directionalLight
                                        position={[5, 10, 5]}
                                        intensity={1}
                                        castShadow
                                        shadow-mapSize-width={1024}
                                        shadow-mapSize-height={1024}
                                    />
                                    {/* Globe with Atmosphere and Graticules */}
                                    <Globe/>
                                    {/* OrbitControls for interactivity */}
                                    <OrbitControls
                                        minDistance={isSmall ? 6.1 : 4.8}
                                        maxDistance={10}
                                    />
                                </Suspense>
                            </Canvas>
                        </div>

                        <div>
                            <p className={"grid-headtext"}>I work remotely across most time zones</p>
                            <p className={"grid-subtext"}>I&apos;m based in Nigeria, with remote work available</p>
                            <Button name={"Contact Me"} isBeam containerClass={"w-full mt-10"} href={'contact'}/>
                        </div>
                    </div>
                </div>

                <div className={"xl:col-span-2 xl:row-span-3"}>
                    <div className={"grid-container"}>
                        <img src={"/assets/grid3.png"} alt={"grid-3"}
                             className={"w-full sm:h-[266px] h-fit object-contain"}/>
                        <div>
                            <p className="grid-headtext">
                                My Passion for Coding
                            </p>
                            <p className="grid-subtext">
                                {showAnimation1 && (
                                    <TypeAnimation
                                        sequence={[
                                            "I am deeply passionate about coding as it allows me to solve complex problems and\n" +
                                            "create innovative solutions. For me, coding is not just a profession, it's a true\n" +
                                            "passion that drives my continuous learning and growth in the tech industry.",
                                            1500
                                        ]}
                                        wrapper="span"
                                        cursor={true}
                                        repeat={Infinity}
                                        style={{ fontSize: '1em', display: 'inline-block' }}
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={"xl:col-span-1 xl:row-span-2"}>
                    <div className={"grid-container"}>
                        <img src={"/assets/grid4.png"} alt={"grid-4"}
                             className={"sm:h-[156px] w-full md:h-[176px] h-fit object-cover sm:object-top"}/>
                        <div className={"space-y-2"}>
                            <p className={"grid-subtext text-center"}> Contact Me</p>
                            <div className={"copy-container"} onClick={handleCopy}>
                                <img src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"} alt={"copy"}/>
                                <p className={"text-gray_gradient text-white font-medium md:text-md lg:text-lg"}>obanlaniyi42@gmail.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
