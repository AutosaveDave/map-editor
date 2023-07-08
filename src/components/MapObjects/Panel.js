// Component for floor and wall objects on map
import React, { useRef, useState } from "react";
import { useMapPanels } from "../../context/MapPanelsContext";

export default function Panel( props ) {
    const [ x, y, z, 
        width, length, depth, 
        xRotation, yRotation, zRotation, 
        color, material, panel_id 
    ] = props.thisPanel;

    const { deletePanel } = useMapPanels();

    function handleRightClick( e ) {
        e.nativeEvent.preventDefault();
        e.stopPropagation();
        deletePanel(panel_id);
    }
    const box = useRef();

    return (
        <mesh ref={box} rotation={[xRotation, yRotation, zRotation]} position={[x,y,z]}
            onContextMenu={ handleRightClick }
            castShadow receiveShadow
        >
            <boxGeometry attach="geometry" args={[width, length, depth]} />
            <meshStandardMaterial attach="material" color={color} />
        </mesh>
    );
};