import { useLoader, useFrame } from '@react-three/fiber'
import { AnimationMixer } from 'three'
import { FBXLoader } from 'three-stdlib'
import { useEffect, useRef, useState } from 'react'

// eslint-disable-next-line react/prop-types
const AnimatedModel = ({ url }) => {
    const [model, setModel] = useState(null)
    const mixer = useRef(null)

    // Load the FBX model
    const loadedModel = useLoader(FBXLoader, url, (loader) => {
        loader.load(url, (object) => {
            console.log('FBX model loaded:', object)
            setModel(object)
        })
    })

    useEffect(() => {
        if (loadedModel && loadedModel.animations) {
            console.log('Animations loaded:', loadedModel.animations)
            mixer.current = new AnimationMixer(loadedModel)
            loadedModel.animations.forEach((clip) => mixer.current.clipAction(clip).play())
        }
    }, [loadedModel])

    // Update animations during each frame
    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta)
        }
    })

    if (!loadedModel) {
        return <mesh><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="gray" /></mesh> // Fallback: Show a loading sphere if model is not loaded
    }

    // Set the scale, position, and rotation as needed
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <primitive
                object={loadedModel}
                position={[0, 0, 0]}   // Adjust the model position
                scale={[1, 1, 1]}      // Adjust the scale if needed
            />
        </>
    )
}

export default AnimatedModel
