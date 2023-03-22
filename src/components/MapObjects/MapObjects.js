import React, { useRef, useState } from "react";
//import PointLight from "../Lighting/LightPoint";
//import { Canvas } from "@react-three/fiber";
import Panel from "./Panel";

function MapObjects() {
    const scene = useRef();
    const [panels] = useState([
        [
            0,0,0, // x, y, z
            1,1,1, // width, length, depth
            1,0,0,  // xRotation, yRotation, zRotation
            255,0,0 // rColor, gColor, bColor
        ],
    ]);
    console.log(panels);

    return (
        <group ref={scene}>
            <ambientLight intensity={0.5} />
            <pointLight color="white" intensity={1} position={[10, 10, 10]} />
            { panels.map( ( thisPanel, i ) => (
                <Panel args={thisPanel} key={`panel${i}`} />
            ))}
        </group>
    );
}

export default MapObjects;