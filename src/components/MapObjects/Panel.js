// Component for floor and wall objects on map
import React, { useRef, useState } from "react";

const Panel = ( props ) => {
    const [ x, y, z, 
        width, length, depth, 
        xRotation, yRotation, zRotation, 
        rColor, gColor, bColor, material, panel_id 
    ] = props.thisPanel;

    const panels = props.panels;
    const setPanels = props.setPanels;

    function deletePanel( id ) {
        
        let newPanels = [];
        newPanels.push( ...panels );
        for( let a = 0 ; a < newPanels.length ; a+=1 ) {
            if( newPanels[ a ][ newPanels[ a ].length - 1 ] === id ) {
                newPanels.splice( a, 1 );
                a = newPanels.length;
            }
        }
        setPanels( newPanels );
        console.log(id);
        console.log(newPanels);
    }

    function handleRightClick( e ) {
        e.nativeEvent.preventDefault();
        deletePanel(panel_id);
        
    }
    
    const box = useRef();

    return (
        <mesh ref={box} rotation={[xRotation, yRotation, zRotation]} position={[x,y,z]}
            onContextMenu={ handleRightClick }
        >
            <boxGeometry attach="geometry" args={[width, length, depth]} />
            <meshStandardMaterial attach="material" color={`rgb(${rColor},${gColor},${bColor})`} />
        </mesh>
    );
};

export default Panel;