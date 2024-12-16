import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export default function HeroCamera({ children, isSmall }) {
    const groupRef = useRef(null);

    // Auto-rotation parameters for mobile
    let autoRotationSpeed = 0.001; // Adjust the speed of auto-rotation
    let rotationAmount = 0;

    useFrame((state, delta) => {
        if (isSmall) {
            // Mobile: Apply auto-rotation
            easing.damp3(state.camera?.position, [0, 0, 30], 0.025, delta);
            rotationAmount += autoRotationSpeed; // Increment rotation for auto-rotation effect
            if (groupRef.current) {
                groupRef.current.rotation.y = rotationAmount; // Rotate around the Y-axis
            }
        } else {
            // Desktop: Pointer-based rotation
            rotationAmount = 0; // Reset rotationAmount when not in mobile mode
            if (groupRef.current) {
                easing.dampE(
                    groupRef.current.rotation,
                    [-state.pointer.y / 5, -state.pointer.x / 5, 0],
                    0.025,
                    delta
                );
            }
        }
    });

    return <group ref={groupRef}>{children}</group>;
}
