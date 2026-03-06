import { useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../components/CanvasLoader";
import { calculateSizes } from "../constants/index.js";
import ComputerDeskModel from "../components/computer_desk.jsx";
import ReactLogoModel from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";
import { TypeAnimation } from "react-type-animation";
import { debounce } from "../utils/helper.js";

export default function Hero() {
  // Window size with debounce
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lines for TypeAnimation (outside Canvas)
  const lines = useMemo(() => {
    const text = `Hey there, I'm Adeniyi  
I'm a Digital Architect 
a Blockchain Alchemist
and a Fullstack Developer...   
Transforming "What if?" into "What’s next?" 
</> Let’s code the future together!`;

    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }, []);

  const sequence = useMemo(
    () => lines.flatMap((line) => [line, 1500]),
    [lines],
  );

  // Media queries
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ minWidth: 481, maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isLarge = useMediaQuery({ minWidth: 1025 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet, isLarge);

  const modelScale = isSmall ? 2.5 : isMobile ? 3 : isTablet ? 3.5 : 4;

  const cameraPosition = isSmall
    ? [0, 0, 0]
    : isMobile
      ? [0, 0, 20]
      : isTablet
        ? [0, 0, 25]
        : [0, 0, 30];

  // Memoized models
  const memoDesk = useMemo(
    () => (
      <ComputerDeskModel
        position={sizes.deskPosition}
        rotation={[0, -Math.PI / 6, 0]}
        scale={modelScale}
      />
    ),
    [sizes.deskPosition, modelScale],
  );

  const memoReactLogo = useMemo(
    () => <ReactLogoModel position={sizes.reactLogoPosition} />,
    [sizes.reactLogoPosition],
  );

  const memoCube = useMemo(
    () => <Cube position={sizes.cubePosition} />,
    [sizes.cubePosition],
  );

  const memoRings = useMemo(
    () => <Rings position={sizes.ringPosition} />,
    [sizes.ringPosition],
  );

  return (
    <section
      className="min-h-screen w-full flex flex-col relative max-sm:py-8 z-10"
      id="home"
    >
      {/* Top text */}
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 gap-3 z-20 relative">
        <div className="mx-auto inline-flex items-center space-x-2">
          <div className="sm:text-2xl leading-relaxed text-center text-xs font-medium text-gray-300 font-mono whitespace-pre-wrap">
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
      </div>

      {/* 3D Canvas */}
      <div className="h-full w-full absolute inset-0 z-0">
        <Canvas frameloop="always" shadows>
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={cameraPosition} />
            <HeroCamera isSmall={isSmall}>{memoDesk}</HeroCamera>
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} />
            <group>
              {memoReactLogo}
              {memoCube}
              {memoRings}
            </group>
          </Suspense>
        </Canvas>
      </div>
      <div className="mt-auto">
        {" "}
        <Button
          name={"Let's work together"}
          isBeam
          containerClass={"sm:w-fit w-full sm:min-w-9"}
          href={"about"}
        />
      </div>
    </section>
  );
}
