import React, { useRef, useState } from "react";
import { OrthographicCamera } from "@react-three/drei";
import Panel from "./Panel";

function MapObjects() {
    const scene = useRef();
    const [panels] = useState([
        [
            0,0,0, // x, y, z
            1,1,1, // width, length, depth
            0,0,0,  // xRotation, yRotation, zRotation
            255,0,255 // rColor, gColor, bColor
        ],
        [
            3,0,0, // x, y, z
            1,1,0.3, // width, length, depth
            0,0,0,  // xRotation, yRotation, zRotation
            255,0,0 // rColor, gColor, bColor
        ],
        [
            0,3,0, // x, y, z
            1,1,1, // width, length, depth
            0,0,0,  // xRotation, yRotation, zRotation
            255,255,0 // rColor, gColor, bColor
        ],
    ]);
    
    const aspectRatio = window.innerWidth/window.innerHeight;
    const frust = 16;

    return (
        <>
        <OrthographicCamera
            makeDefault
            zoom={1}
            left={frust*aspectRatio/2}
            right={-frust*aspectRatio/2}
            top={frust/2}
            bottom={-frust/2}
            near={1}
            far={500}
            position={[0, 0, 4]}
            rotation={[0,0,0]}
            />
        <group ref={scene}>
            
            <ambientLight intensity={0.5} />
            <pointLight color="white" intensity={1} position={[10, 10, 10]} />
            { panels.map( ( thisPanel, i ) => (
                <Panel props={thisPanel} key={`panel${i}`} />
            ))}
        </group>
        </>
    );
}

export default MapObjects;