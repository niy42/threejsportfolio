import React from 'react'
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
    const { progress } = useProgress();

    console.log("Progress: " + progress); // Debugging to ensure progress is being updated.

    return (
        <Html
            as="div"
            center
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <span className="canvas-loader" />
            <p style={{ fontSize: 14, color: "#F1F1F1", fontWeight: 800, marginTop: 40 }}>
                {isNaN(progress) || progress === 0 ? "Loading..." : `${progress.toFixed(2)} %`}
            </p>
            CanvasLoader
        </Html>
    );
}

export default CanvasLoader;
