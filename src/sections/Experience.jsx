import {Canvas} from "@react-three/fiber";
import {workSpace} from "../constants/index.js";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
// import CanvasLoader from "../components/CanvasLoader.jsx";
import {Suspense, useState} from "react";
import Developer from "../components/Developer.jsx";

const Experience = function(){
    const[animationName, setAnimationName] = useState('idle');

    return(
        <section className={"c-space mt-20 mb-0 md:my-20"} id={"work"}>
            <div className={"w-full text-white-600"}>
                <h3 className={"head-text"}>My Design Tools</h3>
                <div className={"work-container"}>
                    <div className={"work-canvas"}>
                        <Canvas>
                            {/* Perspective Camera for a top-down view */}
                            <PerspectiveCamera
                                makeDefault
                                position={[-0.15, 5.2, 4.5]}  // Position the camera above the model
                                rotation={[-Math.PI / 2, 0, 0]}  // Rotate the camera to look down
                            />

                            <ambientLight intensity={2}/>
                            {/* Lighting to illuminate the scene */}
                            <directionalLight position={[10, 10, 10]} intensity={1}/>
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                            {/* Additional lighting */}

                            {/* Suspense to load 3D content */}
                            <Suspense fallback={null}>
                                <Developer
                                    position={[0, -1, 2]}  // Position the model closer to the viewer
                                    rotation={[0, 0, 0]}  // Rotate the model to view it from the top
                                    scale={2.5}  // Scale the model
                                    animationName={animationName}
                                />
                            </Suspense>
                            <OrbitControls enableZoom={false}/>
                        </Canvas>
                    </div>

                    <div className={"work-content"}>
                        <div className={"sm:py-10 py-5 sm:px-5 px-2.5"}>
                            {workSpace.map((
                                {
                                    id,
                                    name,
                                    pos,
                                    duration,
                                    title,
                                    icon,
                                    animation
                                }, index) => (
                                <div key={id || index}
                                     className={"work-content_container group"}
                                     onClick={() => setAnimationName(animation.toLowerCase())}
                                     onPointerOver={() => setAnimationName(animation.toLowerCase())}
                                     onPointerOut={() => setAnimationName('idle')}>
                                    <div className={"flex flex-col h-full justify-start items-center py-2"}>
                                        <div className={"work-content_logo"}>
                                            <img src={icon} alt={"logo"} className={"w-full h-full"}/>
                                        </div>
                                        <div className={"work-content_bar"}/>

                                    </div>
                                    <div className={"sm:p-5 px-2.5 py-5"}>
                                        <p className={"font-bold text-white-800"}>
                                            {name}
                                        </p>
                                        <p className={"text-sm mb-5"}>{pos} -- {duration}</p>
                                        <p className={"group-hover:text-white transition ease-in-out duration-500"}>{title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience;