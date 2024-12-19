import { useGLTF, useTexture } from '@react-three/drei'

export default function ComputerDeskModel(props) {
    const { nodes, materials } = useGLTF('/models/computer_desk.glb');
    const monitorTexture = useTexture('/textures/desk/cpu.png');

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials['Material.016']}
                position={[0.062, 0, -0.621]}
                rotation={[0, 0, Math.PI]}
                scale={1.252}
            >
                <meshStandardMaterial map={monitorTexture}/>
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials['Material.016']}
                position={[0, 0, -0.787]}
            />


        </group>
    )
}

useGLTF.preload('/models/computer_desk.glb')
