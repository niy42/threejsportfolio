import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import Button from "../components/Button.jsx";
import { projectItem } from "./Projects.jsx";
import { TypeAnimation } from "react-type-animation";
import { debounce } from "../utils/helper.js";

// Globe with memoized textures and smooth rotation
const Globe = () => {
  const globeRef = useRef();
  const earthTexture = useMemo(
    () =>
      new THREE.TextureLoader().load(
        "//unpkg.com/three-globe/example/img/earth-day.jpg",
      ),
    [],
  );
  const bumpTexture = useMemo(
    () =>
      new THREE.TextureLoader().load(
        "//unpkg.com/three-globe/example/img/earth-topology.png",
      ),
    [],
  );

  useFrame((state, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture}
        bumpMap={bumpTexture}
        bumpScale={0.05}
      />
    </mesh>
  );
};

const About = () => {
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isXtraSmall = useMediaQuery({ maxWidth: 380 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [showAnimation1, setShowAnimation1] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // Lazy load Canvas
  const [loadCanvas, setLoadCanvas] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoadCanvas(true);
      },
      { rootMargin: "200px" }, // start loading 200px before visible
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  // Debounced resize handler
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debounced scroll handler
  useEffect(() => {
    const handleScroll = debounce(() => {
      setShowAnimation(window.scrollY > (isSmall ? 600 : 650));
      setShowAnimation1(window.scrollY > (isSmall ? 2200 : 1100));
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSmall]);

  const handleCopy = () => {
    navigator.clipboard?.writeText("obanlaniyi42@gmail.com");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const cameraPosition = windowSize.width < 768 ? [4, 0, 6] : [0, 0, 5];

  return (
    <section className="c-space my-20" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 h-full">
        {/* Intro text */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="/assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Hi, I&apos;m Adeniyi</p>
              <p className="grid-subtext">
                {showAnimation && (
                  <TypeAnimation
                    sequence={[
                      "With over a year of experience, I have honed and continue to develop my skills in full-stack development, with a focus on animated 3D websites.",
                      1500,
                    ]}
                    wrapper="span"
                    cursor
                    repeat={Infinity}
                    style={{ fontSize: "1em", display: "inline-block" }}
                  />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="/assets/niystack.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in JavaScript and TypeScript, with a focus on React
                and Next.js.
              </p>
            </div>
          </div>
        </div>

        {/* Lazy-loaded Globe */}
        <div className="col-span-1 xl:row-span-4" ref={canvasRef}>
          <div className="grid1-container relative">
            <div className="w-full sm:h-[326px] h-96 rounded-3xl flex justify-center items-center">
              {loadCanvas && (
                <Canvas shadows>
                  <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={cameraPosition} />
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />
                    <Globe />
                    <OrbitControls
                      minDistance={isSmall ? 6.6 : isXtraSmall ? 12 : 4.8}
                      maxDistance={isSmall ? 3 : 10}
                    />
                  </Suspense>
                </Canvas>
              )}
            </div>

            <div>
              <p className="grid-headtext">
                I work remotely across most time zones
              </p>
              <p className="grid-subtext">
                I&apos;m based in Nigeria, with remote work available
              </p>
              <Button
                name="Contact Me"
                isBeam
                containerClass="w-full mt-10"
                href="contact"
              />
            </div>
          </div>
        </div>

        {/* Passion for coding */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src="/assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                {showAnimation1 && (
                  <TypeAnimation
                    sequence={[
                      "I am deeply passionate about coding as it allows me to solve complex problems and create innovative solutions. For me, coding is not just a profession, it's a true passion that drives my continuous learning and growth in the tech industry.",
                      1500,
                    ]}
                    wrapper="span"
                    cursor
                    repeat={Infinity}
                    style={{ fontSize: "1em", display: "inline-block" }}
                  />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="/assets/grid4.png"
              alt="grid-4"
              className="sm:h-[156px] w-full md:h-[176px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact Me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
                  alt="copy"
                />
                <p className="text-gray_gradient text-white font-medium text-base lg:text-lg">
                  obanlaniyi42@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
