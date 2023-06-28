// Component for floor and wall objects on map
import React, { useRef, useState } from "react";

const Panel = ( props ) => {
    const [ x, y, z, 
        width, length, depth, 
        xRotation, yRotation, zRotation, 
        color, material, panel_id 
    ] = props.thisPanel;

    const panels = props.panels;
    const setPanels = props.setPanels;

    function deletePanel( id ) {
        
        const newPanels = [];
        newPanels.push( ...panels );
        for( let a = 0 ; a < newPanels.length ; a+=1 ) {
            if( newPanels[ a ][ newPanels[ a ].length - 1 ] === id ) {
                newPanels.splice( a, 1 );   // delete panel from array
                a = newPanels.length;
            }
        }
        setPanels( newPanels );
    }

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

export default Panel;