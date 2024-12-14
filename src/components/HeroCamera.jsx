import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export default function HeroCamera({ children, isMobile, isSmall}) {
    const groupRef = useRef(null);

    // For auto-rotation effect on mobile devices
    let autoRotationSpeed = 0.001; // Adjust the speed of auto-rotation
    let rotationAmount = 0;

    useFrame((state, delta) => {
        // Apply easing to camera position
        easing.damp3(state.camera?.position, [0, 0, 30], 0.025, delta);

        // For mobile: Apply automatic rotation
        if (isMobile || isSmall) {
            rotationAmount += autoRotationSpeed; // Increment rotation for auto-rotation effect
            if (groupRef.current) {
                // Apply the auto-rotation to the group (camera or objects)
                groupRef.current.rotation.y = rotationAmount; // Rotate around the Y-axis
            }
        }
        // For desktop: Apply pointer-based rotation
        else {
            easing.dampE(groupRef.current?.rotation, [-state.pointer.y / 5, -state.pointer.x / 5, 0], 0.025, delta);
        }
    });

    return (
        <group ref={groupRef}>{children}</group>
    );
}
