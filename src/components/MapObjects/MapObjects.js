import React, { useRef, useState } from "react";

import { OrthographicCamera } from "@react-three/drei";
import Panel from "./Panel";
import EditorGrid from "../EditorUI/EditorGrid";
import GroundPlane from "./GroundPlane";

function MapObjects() {
    const scene = useRef();

    const [editorProperties, setEditorProperties] = useState([
        2,      // grid axis
        0,      // grid value
        1,      // tileSize
        30,     // map width (x)
        30,     // map length (y)
        10      // map height (z)
    ]);

    function getGridAxis() { return editorProperties[0]; }
    function getGridValue() { return editorProperties[1]; }
    function getTileSize() { return editorProperties[2]; }
    function getMapWidth() { return editorProperties[3]; }
    function getMapLength() { return editorProperties[4]; }
    function getMapHeight() { return editorProperties[5]; }
    

    function setGridAxis( axis ) {
        let eProps = editorProperties;
        eProps[0] = axis;
        setEditorProperties(eProps);
    }

    function switchGridAxis() {
        const axis = getGridAxis();
        if( axis < 2 ) { setGridAxis( axis + 1 ); }
        else { setGridAxis( 0 ); }
    }

    const [panels, setPanels] = useState([
        [
            0,0,0,      // x, y, z
            1,1,1,      // width, length, height
            0,0,0,      // xRotation, yRotation, zRotation
            255,0,255   // rColor, gColor, bColor
        ],
        [
            3,0,0,      // x, y, z
            1,1,0.3,    // width, length, height
            0,0,0,      // xRotation, yRotation, zRotation
            255,0,0     // rColor, gColor, bColor
        ],
        [
            0,3,0,      // x, y, z
            1,1,1,      // width, length, height
            0,0,0,      // xRotation, yRotation, zRotation
            255,255,0   // rColor, gColor, bColor
        ],
        [
            1,1,0,      // x, y, z
            1,1,2,      // width, length, height
            0,0,0,      // xRotation, yRotation, zRotation
            0,255,0     // rColor, gColor, bColor
        ],
    ]);
    
    function addPanel( args ) {
        const [ axis,
                x, y, z,
                w, l, h,
                rColor, gColor, bColor,
                material ] = args;
        setPanels( [ ...panels, 
                    [ x+0.5*w, y+0.5*l, z+0.5*h,
                      w, l, h,
                      0, 0, 0,
                      rColor, gColor, bColor,
                      material ] ] );
        
    }

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
                position={[-2, -2, 8]}
                rotation-order='ZYX'
                rotation-z={7*Math.PI/4}
                rotation-x={Math.PI/4}
                
            />
        <group ref={scene}>
            <ambientLight intensity={0.5} />
            <pointLight color="white" intensity={0.6} position={[-1, -5, 12]} />
            <GroundPlane props={[getMapWidth()*getTileSize(), getMapLength()*getTileSize(), 0, 150, 0 ]} />
            <EditorGrid props={editorProperties} />
            { panels.map( ( thisPanel, i ) => (
                <Panel props={thisPanel} key={`panel${i}`} />
            ))}
        </group>
        </>
    );
}

export default MapObjects;