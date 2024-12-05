
import { useRef, forwardRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Forward the ref to the group for external manipulation
const Model = forwardRef((props, ref) => {
    const group = useRef();
    const {nodes, materials, animations} = useGLTF('/models/robot.glb');
    const {actions} = useAnimations(animations, group);

    // Apply rotation to the model in the useFrame loop
    useFrame(({clock}) => {
        if (group.current) {
            group.current.rotation.y = clock.elapsedTime * 0.1;  // Adjust rotation speed as needed
        }
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group
                        name="5d577c67868349f68637a7189311791cfbx"
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={0.01}>
                        <group name="Object_2">
                            <group name="RootNode">
                                <group
                                    name="Light"
                                    position={[407.625, 590.386, -100.545]}
                                    rotation={[1.89, 0.881, -2.045]}
                                    scale={100}>
                                    <group name="Object_5" rotation={[Math.PI / 2, 0, 0]}>
                                        <group name="Object_6"/>
                                    </group>
                                </group>
                                <group
                                    name="Camera"
                                    position={[735.889, 495.831, 692.579]}
                                    rotation={[Math.PI, 0.756, 2.68]}
                                    scale={100}>
                                    <group name="Object_8"/>
                                </group>
                                <group
                                    name="legs5_Low004"
                                    position={[49.808, 249.655, -169.826]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                                <group
                                    name="legs5_Low012"
                                    position={[29.822, 249.655, -126.424]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                                <group
                                    name="legs5_Low013"
                                    position={[30.882, 249.655, -214.018]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                                <group
                                    name="legs5_Low014"
                                    position={[-60.808, 249.655, -169.826]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                                <group
                                    name="legs5_Low015"
                                    position={[-40.823, 249.655, -126.424]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                                <group
                                    name="legs5_Low016"
                                    position={[-41.883, 249.655, -214.018]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                />
                                <group
                                    name="legs5_Low003"
                                    position={[-6.64, 294.986, -85.3]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}>
                                    <mesh
                                        name="legs5_Low003_BODY_BODY_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.legs5_Low003_BODY_BODY_0.geometry}
                                        material={materials.BODY_BODY}
                                    />
                                    <mesh
                                        name="legs5_Low003_LIMBS_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.legs5_Low003_LIMBS_0.geometry}
                                        material={materials.LIMBS}
                                    />
                                    <group name="Armature" position={[0.564, 0.845, -0.453]}>
                                        <group name="Object_19">
                                            <primitive object={nodes._rootJoint}/>
                                            <skinnedMesh
                                                name="Object_22"
                                                geometry={nodes.Object_22.geometry}
                                                material={materials.LIMBS}
                                                skeleton={nodes.Object_22.skeleton}
                                            />
                                            <group
                                                name="Object_21"
                                                position={[49.808, 249.655, -169.826]}
                                                rotation={[-Math.PI / 2, 0, 0]}
                                                scale={100}
                                            />
                                        </group>
                                    </group>
                                    <group
                                        name="legs5_Low026"
                                        position={[0.004, 0.838, 1.295]}
                                        rotation={[0, 0, 0.279]}>
                                        <mesh
                                            name="legs5_Low026_BODY_BODY_0"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.legs5_Low026_BODY_BODY_0.geometry}
                                            material={materials.BODY_BODY}
                                        />
                                    </group>
                                    <group name="legs5_Low001" position={[0.394, 1.64, 0.043]}>
                                        <mesh
                                            name="legs5_Low001_LIMBS_0"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.legs5_Low001_LIMBS_0.geometry}
                                            material={materials.LIMBS}
                                        />
                                        <group name="Armature001" position={[0.014, -0.086, 0.001]}>
                                            <group name="Object_34">
                                                <primitive object={nodes._rootJoint_1}/>
                                            </group>
                                        </group>
                                    </group>
                                    <group name="legs5_Low008" position={[-0.374, 1.64, 0.043]}>
                                        <mesh
                                            name="legs5_Low008_LIMBS_0"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.legs5_Low008_LIMBS_0.geometry}
                                            material={materials.LIMBS}
                                        />
                                        <group name="Armature002" position={[-0.014, -0.086, 0.001]}>
                                            <group name="Object_53">
                                                <primitive object={nodes._rootJoint_2}/>
                                            </group>
                                        </group>
                                    </group>
                                    <group name="Armature003" position={[0.365, 0.411, -0.453]}>
                                        <group name="Object_70">
                                            <primitive object={nodes._rootJoint_3}/>
                                            <skinnedMesh
                                                name="Object_73"
                                                geometry={nodes.Object_73.geometry}
                                                material={materials.LIMBS}
                                                skeleton={nodes.Object_73.skeleton}
                                            />
                                            <group
                                                name="Object_72"
                                                position={[29.822, 249.655, -126.424]}
                                                rotation={[-Math.PI / 2, 0, 0]}
                                                scale={100}
                                            />
                                        </group>
                                    </group>
                                    <group name="Armature004" position={[0.375, 1.287, -0.453]}>
                                        <group name="Object_81">
                                            <primitive object={nodes._rootJoint_4}/>
                                            <skinnedMesh
                                                name="Object_84"
                                                geometry={nodes.Object_84.geometry}
                                                material={materials.LIMBS}
                                                skeleton={nodes.Object_84.skeleton}
                                            />
                                            <group
                                                name="Object_83"
                                                position={[30.882, 249.655, -214.018]}
                                                rotation={[-Math.PI / 2, 0, 0]}
                                                scale={100}
                                            />
                                        </group>
                                    </group>
                                    <group name="Armature005" position={[-0.542, 0.845, -0.453]}>
                                        <group name="Object_92">
                                            <primitive object={nodes._rootJoint_5}/>
                                            <skinnedMesh
                                                name="Object_95"
                                                geometry={nodes.Object_95.geometry}
                                                material={materials.LIMBS}
                                                skeleton={nodes.Object_95.skeleton}
                                            />
                                            <group
                                                name="Object_94"
                                                position={[-60.808, 249.655, -169.826]}
                                                rotation={[-Math.PI / 2, 0, 0]}
                                                scale={100}
                                            />
                                        </group>
                                    </group>
                                    <group name="Armature006" position={[-0.342, 0.411, -0.453]}>
                                        <group name="Object_103">
                                            <primitive object={nodes._rootJoint_6}/>
                                            <skinnedMesh
                                                name="Object_106"
                                                geometry={nodes.Object_106.geometry}
                                                material={materials.LIMBS}
                                                skeleton={nodes.Object_106.skeleton}
                                            />
                                            <group
                                                name="Object_105"
                                                position={[-40.823, 249.655, -126.424]}
                                                rotation={[-Math.PI / 2, 0, 0]}
                                                scale={100}
                                            />
                                        </group>
                                    </group>
                                    <group name="Armature007" position={[-0.352, 1.287, -0.453]}>
                                        <group name="Object_114">
                                            <primitive object={nodes._rootJoint_7}/>
                                            <skinnedMesh
                                                name="Object_117"
                                                geometry={nodes.Object_117.geometry}
                                                material={materials.LIMBS}
                                                skeleton={nodes.Object_117.skeleton}
                                            />
                                            <group
                                                name="Object_116"
                                                position={[-41.883, 249.655, -214.018]}
                                                rotation={[-Math.PI / 2, 0, 0]}
                                                scale={100}
                                            />
                                        </group>
                                    </group>
                                </group>
                                <group
                                    name="legs5_Low018"
                                    position={[-6.614, 251.758, -170.652]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}>
                                    <mesh
                                        name="legs5_Low018_BODY_BODY_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.legs5_Low018_BODY_BODY_0.geometry}
                                        material={materials.BODY_BODY}
                                    />
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
});

Model.displayName = 'Model';
useGLTF.preload('/models/robot.glb')

export default Model;
