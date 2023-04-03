import React, { useRef, useState } from "react";
import { OrthographicCamera, Sky } from "@react-three/drei";
import AllPanels from "./AllPanels";
import EditorGrid from "../EditorUI/EditorGrid";
import GroundPlane from "./GroundPlane";

function MapObjects() {

    const [gridAxis, setGridAxis] = useState(0);
    const [gridValue, setGridValue] = useState(0);
    const [tileSize, setTileSize] = useState(1);
    const [mapWidth, setMapWidth] = useState(10);
    const [mapLength, setMapLength] = useState(10);
    const [mapHeight, setMapHeight] = useState(10);
    const [aspectRatio, setAspectRatio] = useState( window.innerWidth / window.innerHeight );
    
    const [currentColor, setCurrentColor] = useState([200,130,100]);
    const [wallThickness, setWallThickness] = useState(0.1);

    const [currentId, setCurrentId] = useState( 0 );

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

    const [panels, setPanels] = useState( [] );
    const [frust] = useState( 16 );
    
    function addPanel( args ) {
        const [ axis,
                x, y, z,
                w, l, h,
                rColor, gColor, bColor,
                material, panel_id
        ] = [ ...args, nextId() ];
        setPanels( [ ...panels, 
                    [ x, y, z,
                      w, l, h,
                      0, 0, 0,
                      rColor, gColor, bColor,
                      material, panel_id ] ] );
        console.log(panel_id);
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
        
            <ambientLight intensity={0.1} />
            <pointLight color="white" intensity={0.7} position={[-1, -5, 12]} />
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
            <AllPanels panels={panels} setPanels={setPanels} />
            <Sky/>
        </group>
        
        </>
    );
}

export default MapObjects;