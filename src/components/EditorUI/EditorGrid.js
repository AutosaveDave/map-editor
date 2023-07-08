import React, { useRef } from "react";
import { Line } from '@react-three/drei';
import { DoubleSide } from "three";
import { useMapEditor } from "../../context/MapEditorContext";

export default function EditorGrid() {

    const { handleEditorClick, getGridLinesAndPlane } = useMapEditor();  
    const gridlines = useRef();

    const { lines, plane } = getGridLinesAndPlane();

    return(
        <>
        <group ref={gridlines}>
            { lines.map( (thisLine, i) => (
                <Line points={[[thisLine[0],thisLine[1],thisLine[2]],[thisLine[3],thisLine[4],thisLine[5]]]} color={'black'} linewidth={1} key={`gridline${i}`}>
                    <lineBasicMaterial attach="material" color={'black'} linewidth={1} />
                </Line>
            ))}
            <mesh position={plane.position} rotation={plane.rotation} visible={false} 
                onClick={handleEditorClick}
            >
                <planeGeometry  attach="geometry" args={plane.size} />
                <meshStandardMaterial attach="material" side={DoubleSide} color={`rgb(255,200,200)`}/>
            </mesh>
        </group>
        </>
    );

}