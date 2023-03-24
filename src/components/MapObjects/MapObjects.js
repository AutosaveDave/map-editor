import React, { useRef, useState } from "react";

import { OrthographicCamera } from "@react-three/drei";
import Panel from "./Panel";
import EditorGrid from "../EditorUI/EditorGrid"

function MapObjects() {
    const scene = useRef();

    const [panels] = useState([
        [
            0,0,0, // x, y, z
            1,1,1, // width, length, height
            0,0,0,  // xRotation, yRotation, zRotation
            255,0,255 // rColor, gColor, bColor
        ],
        [
            3,0,0, // x, y, z
            1,1,0.3, // width, length, height
            0,0,0,  // xRotation, yRotation, zRotation
            255,0,0 // rColor, gColor, bColor
        ],
        [
            0,3,0, // x, y, z
            1,1,1, // width, length, height
            0,0,0,  // xRotation, yRotation, zRotation
            255,255,0 // rColor, gColor, bColor
        ],
        [
            1,1,0, // x, y, z
            1,1,2, // width, length, height
            0,0,0,  // xRotation, yRotation, zRotation
            0,255,0 // rColor, gColor, bColor
        ],
    ]);

    // const [gridAxis] = useState([ 'x', 'y', 'z' ]);
    
    const aspectRatio = window.innerWidth/window.innerHeight;
    const frust = 16;

    return (
        <>
        <OrthographicCamera
                makeDefault
                zoom={1}
                left={-frust*aspectRatio/2}
                right={frust*aspectRatio/2}
                top={frust/2}
                bottom={-frust/2}
                near={1}
                far={500}
                position={[0, 0, 5]}
                rotation-order='ZYX'
                rotation-z={7*Math.PI/4}
                rotation-x={Math.PI/4}
            />
        <group ref={scene}>
            <ambientLight intensity={0.5} />
            <pointLight color="white" intensity={0.6} position={[-1, -5, 12]} />
            <EditorGrid props={[ 2, 0, 1, 30, 30, 10 ]} />
            { panels.map( ( thisPanel, i ) => (
                <Panel props={thisPanel} key={`panel${i}`} />
            ))}
        </group>
        </>
    );
}

export default MapObjects;