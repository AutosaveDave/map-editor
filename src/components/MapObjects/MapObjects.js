import React, { useRef, useState, useEffect } from "react";
import { OrthographicCamera, Sky } from "@react-three/drei";
import AllPanels from "./AllPanels";
import EditorGrid from "../EditorUI/EditorGrid";
import GroundPlane from "./GroundPlane";

function MapObjects(props) {

    const { currentColor, aspectRatio,
        gridAxis, setGridAxis,
        gridValue, setGridValue,
        tileSize, setTileSize,
        mapWidth, mapLength, mapHeight,
        wallThickness, setWallThickness,
        cameraPosition, setCameraPosition,
        cameraAngle, setCameraAngle,
        cameraSwivel, setCameraSwivel,
        cameraDistance, setCameraDistance,
        cameraFocus, setCameraFocus,
        frustum, setFrustum,
        cameraZoom, setCameraZoom,
        panels, setPanels,
        currentId, setCurrentId,
        groundColor
        } = props;

    const swivelIncr = 1;

    useEffect( () => {
        document.addEventListener('keydown', handleKeyDown)
    });

    function nextId() {
        const cid = currentId;
        setCurrentId( cid + 1 );
        return cid + 1;
    }

    function switchGridAxis() {
        if( gridAxis < 2 ) { setGridAxis( gridAxis + 1 ); }
        else { setGridAxis( 0 ); }
      }
    
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

    
    
    function addPanel( args ) {
        const [ axis,
                x, y, z,
                w, l, h,
                color,
                material, panel_id
        ] = [ ...args, nextId() ];
        setPanels( [ ...panels, 
                    [ x, y, z,
                      w, l, h,
                      0, 0, 0,
                      color,
                      material, panel_id ] ] );
    }

    function sortPanels() {
        
    }

    function camFocusToPos( angle, swivel ) {  // Returns approriate camera position
        return [                // based on camera angle, swivel, and distance
            cameraFocus[0] + cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.sin( swivel*Math.PI/4 ),
            cameraFocus[1] - cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.cos( swivel*Math.PI/4 ),
            cameraFocus[2] + cameraDistance * Math.cos( angle*Math.PI/4 )
        ];
    }

    function handleKeyDown( e ) {
        switch( e.key ) {
            
                default:
        }
    }

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
            <directionalLight  instensity={0.35} castShadow position={ [ -20, -40, 30 ] } shadow-mapSize={[2048, 2048]}>
                <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30]} />
            </directionalLight>
            <ambientLight intensity={0.1} /> 
            <GroundPlane args={[mapWidth*tileSize, mapLength*tileSize, groundColor ]} />
            <EditorGrid
                gridAxis={gridAxis} setGridAxis={setGridAxis}
                gridValue={gridValue} setGridValue={setGridValue}
                tileSize={tileSize}
                mapWidth={mapWidth} mapLength={mapLength} mapHeight={mapHeight}
                addPanel={addPanel}
                currentColor={currentColor} 
                wallThickness={wallThickness} setWallThickness={setWallThickness}
            />
            <AllPanels panels={panels} setPanels={setPanels} />
            <Sky/>
        </group>
        
        </>
    );
}

export default MapObjects;