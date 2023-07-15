import React, { useRef, useEffect } from "react";
import { OrthographicCamera, Sky } from "@react-three/drei";
import AllPanels from "./AllPanels";
import EditorGrid from "../EditorUI/EditorGrid";
import GroundPlane from "./GroundPlane";
import { useMapCamera } from '../../context/MapCameraContext';
import { useColorTool } from '../../context/ColorToolContext';
import { useSizing } from '../../context/SizingContext';
import { useMapEditor } from '../../context/MapEditorContext';
import { useMapConfig } from '../../context/MapConfigContext';
import { useMapPanels } from '../../context/MapPanelsContext';
import { useMapInfo } from '../../context/MapInfoContext';

function MapObjects() {

    const { cameraPosition, cameraAngle, 
            cameraSwivel, frustum, cameraZoom } = useMapCamera();
    const { currentColor } = useColorTool();
    const { aspectRatio } = useSizing();
    const { gridAxis, setGridAxis,
            switchGridAxis,
            gridValue, setGridValue,
            wallThickness, setWallThickness } = useMapEditor();
    const { tileSize, mapWidth, 
            mapLength, mapHeight } = useMapConfig();
    const { panels, setPanels, addPanel } = useMapPanels();
    const { groundColor } = useMapInfo();

    

    
    
      function handleWheel( e ) {
        let limit = mapHeight;
        if( gridAxis === 0 ) { 
            limit = mapWidth;
        } else if(gridAxis === 1 ) {
            limit = mapLength;
        }
        if( e.deltaY > 20 ) {
            if( gridValue < limit ) {
                setGridValue( gridValue + 1 );
            } else {
                setGridValue( 0 );
            }
        } else if( e.deltaY < -20 ) {
            if( gridValue > 0 ) {
                setGridValue( gridValue - 1 );
            } else {
                setGridValue( limit );
            }
        }
      }
    
      function handleMouseDown( e ) {
        if( e.button === 1 ) {
          switchGridAxis();
        }
      }

    const scene = useRef();

    return (
        <>
        <group ref={scene} 
            onWheel={handleWheel} 
            onPointerDown={handleMouseDown}
            onContextMenu={(e) => {
                e.nativeEvent.preventDefault();
            }}
        > 
            <OrthographicCamera
                makeDefault
                manual
                zoom={cameraZoom}
                left={-frustum*aspectRatio/2}
                right={frustum*aspectRatio/2}
                top={frustum/2}
                bottom={-frustum/2}
                near={1}
                far={500}
                position={cameraPosition}
                rotation-order='ZYX'
                rotation-z={cameraSwivel*Math.PI/4}
                rotation-x={cameraAngle*Math.PI/4}
                ref={scene}
            />
            <directionalLight  instensity={0.1} castShadow position={ [ -20, -40, 30 ] } shadow-mapSize={[2048, 2048]}>
                <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
            </directionalLight>
            <ambientLight intensity={0.3} /> 
            <GroundPlane/>
            <EditorGrid/>
            <AllPanels/>
            <Sky/>
        </group>
        
        </>
    );
}

export default MapObjects;