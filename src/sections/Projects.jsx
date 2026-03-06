import { myProjects } from "../constants/index.js";
import { Suspense, useState, useRef, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader.jsx";
import DemoComputer from "../components/DemoComputer.jsx";

export const projectItem = myProjects[0].spotlight;

export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projectCount = myProjects.length;

  const currentProject = useMemo(
    () => myProjects[selectedProjectIndex],
    [selectedProjectIndex],
  );

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prev) => {
      if (direction === "previous") {
        return prev === 0 ? projectCount - 1 : prev - 1;
      }
      return prev === projectCount - 1 ? 0 : prev + 1;
    });
  };

  // Lazy load Canvas
  const canvasContainerRef = useRef(null);
  const [loadCanvas, setLoadCanvas] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCanvas(true);
        }
      },
      { rootMargin: "200px" },
    );

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="c-space my-20">
      <p className="head-text">My Work</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-5 w-full">
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              src={currentProject.logo}
              alt="logo"
              className="w-8 h-8 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold">
              {currentProject.title}
            </p>

            <p>{currentProject.desc}</p>
            <p>{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <p>Check Dev App</p>
              <img src="/assets/arrow-up.png" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <img src="/assets/left-arrow.png" className="w-4 h-4" />
            </button>

            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <img src="/assets/right-arrow.png" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL (3D) */}
        <div
          ref={canvasContainerRef}
          className="border-black-300 bg-black-200 rounded-lg h-96 md:h-full"
        >
          {loadCanvas && (
            <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />

              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={2}
                    position={[0, -3, 0]}
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>

              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                maxPolarAngle={Math.PI / 2}
                minDistance={4.9}
                maxDistance={8}
              />
            </Canvas>
          )}
        </div>
      </div>
    </section>
  );
}
