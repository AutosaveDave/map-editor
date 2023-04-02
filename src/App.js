import './App.css';
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import MapObjects from "./components/MapObjects/MapObjects.js";

function App() {

  const [gridAxis, setGridAxis] = useState(0);
  const [gridValue, setGridValue] = useState(0);
  const [tileSize, setTileSize] = useState(1);
  const [mapWidth, setMapWidth] = useState(10);
  const [mapLength, setMapLength] = useState(10);
  const [mapHeight, setMapHeight] = useState(10);
  const [aspectRatio, setAspectRatio] = useState( window.innerWidth / window.innerHeight );
  
  const [currentColor, setCurrentColor] = useState([200,130,100]);
  const [wallThickness, setWallThickness] = useState(0.1);

  function switchGridAxis() {
    if( gridAxis < 2 ) { setGridAxis( gridAxis + 1 ); }
    else { setGridAxis( 0 ); }
  }

  function handleWheel( e ) {
    let limit = mapHeight;
    console.log(e);
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

  return (
    <>
      <section className='App-header'  width='100vw' height='100vh'>
        <Canvas onMouseDown={handleMouseDown} onWheel={handleWheel} >
          <MapObjects 
            gridAxis={gridAxis} setGridAxis={setGridAxis}
            gridValue={gridValue} setGridValue={setGridValue}
            tileSize={tileSize} setTileSize={setTileSize}
            mapWidth={mapWidth} setMapWidth={setMapWidth}
            mapLength={mapLength} setMapLength={setMapLength}
            mapHeight={mapHeight} setMapHeight={setMapHeight}
            currentColor={currentColor} setCurrentColor={setCurrentColor}
            wallThickness={wallThickness} setWallThickness={setWallThickness}
            aspectRatio={aspectRatio}
          />
        </Canvas>
      </section>
    </>
  );
}

export default App;
