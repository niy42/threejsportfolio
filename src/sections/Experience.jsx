import { Canvas } from "@react-three/fiber";
import { workSpace } from "../constants/index.js";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useEffect, useCallback } from "react";
import Developer from "../components/Developer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useMediaQuery } from "react-responsive";

const Experience = () => {
  const [animationName, setAnimationName] = useState("idle");
  const isSmall = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleAnimationChange = useCallback((anim) => {
    setAnimationName((prev) => (prev === anim ? prev : anim));
  }, []);

  return (
    <section className="c-space mt-20 mb-0 md:my-20" id="work">
      <div className="w-full text-white-600">
        <h3 className="head-text" data-aos="fade-down">
          My Design Tools
        </h3>

        <div className="work-container">
          {/* 3D Canvas */}
          <div className="work-canvas">
            <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
              <PerspectiveCamera
                makeDefault
                position={[-0.15, 5.2, 4.5]}
                rotation={[-Math.PI / 2, 0, 0]}
              />

              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} />

              <Suspense fallback={null}>
                <Developer
                  position={[0, -1, 2]}
                  rotation={[0, 0, 0]}
                  scale={isSmall ? 2.6 : 2.5}
                  animationName={animationName}
                />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </Canvas>
          </div>

          {/* Content */}
          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workSpace.map(
                (
                  { id, name, pos, duration, title, icon, animation },
                  index,
                ) => (
                  <div
                    key={id || index}
                    className="work-content_container group"
                    onClick={() => setAnimationName(animation.toLowerCase())}
                    onPointerOver={() =>
                      handleAnimationChange(animation.toLowerCase())
                    }
                    onPointerOut={() => handleAnimationChange("idle")}
                    data-aos="fade-down"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex flex-col h-full justify-start items-center py-2">
                      <div className="work-content_logo">
                        <img src={icon} alt="logo" className="w-full h-full" />
                      </div>
                      <div className="work-content_bar" />
                    </div>

                    <div className="sm:p-5 px-2.5 py-5">
                      <p className="font-bold text-white-800">{name}</p>
                      <p className="text-sm mb-5">
                        {pos} — {duration}
                      </p>
                      <p className="group-hover:text-white text-sm sm:text-base transition duration-500">
                        {title}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
