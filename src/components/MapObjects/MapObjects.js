import React, { useRef, useState } from "react";

import { OrthographicCamera } from "@react-three/drei";
import Panel from "./Panel";
import EditorGrid from "../EditorUI/EditorGrid";
import GroundPlane from "./GroundPlane";

function MapObjects( props ) {
    console.log('MapObjects props:');
    console.log(props);

    const { 
        gridAxis, setGridAxis, 
        gridValue, setGridValue, 
        tileSize, setTileSize,
        mapWidth, setMapWidth,
        mapLength, setMapLength,
        mapHeight, setMapHeight,
        currentColor, setCurrentColor,
        wallThickness, setWallThickness,
        aspectRatio
    } = props;

    const scene = useRef();

    const [panels, setPanels] = useState( [] );
    const [frust] = useState( 16 );
    
    function addPanel( args ) {
        const [ axis,
                x, y, z,
                w, l, h,
                rColor, gColor, bColor,
                material ] = args;
        setPanels( [ ...panels, 
                    [ x, y, z,
                      w, l, h,
                      0, 0, 0,
                      rColor, gColor, bColor,
                      material ] ] );
        
    }

    

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
                ref={scene}
            />
        <group ref={scene} >
            <ambientLight intensity={0.5} />
            <pointLight color="white" intensity={0.6} position={[-1, -5, 12]} />
            <GroundPlane args={[mapWidth*tileSize, mapLength*tileSize, 0, 150, 0 ]} />
            <EditorGrid
                gridAxis={gridAxis} setGridAxis={setGridAxis}
                gridValue={gridValue} setGridValue={setGridValue}
                tileSize={tileSize}
                mapWidth={mapWidth} mapLength={mapLength} mapHeight={mapHeight}
                addPanel={addPanel}
                currentColor={currentColor} setCurrentColor={setCurrentColor}
                wallThickness={wallThickness} setWallThickness={setWallThickness}
                />
            { panels.map( ( thisPanel, i ) => (
                <Panel props={thisPanel} key={`panel${i}`} />
            ))}
        </group>
        </>
    );
}

export default MapObjects;