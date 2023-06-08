
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
//import { Routes, Route } from "react-router-dom";
import './App.css';
import MapObjects from "./components/MapObjects/MapObjects.js";
import UserToolBar from "./components/UserUI/UserToolBar";
import UserModal from "./components/UserUI/UserModal";
import {queryUserMaps} from "./utils/queries";
import {saveMap} from "./utils/mutations";

import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {

  const canvHR = 94;  // default canvas "height ratio" (percent of window height taken by canvas)

  const [showUserModal, setShowUserModal] = useState(false);

  const [currentColor, setCurrentColor] = useState("#EE9900");
  const [colorPalette, setColorPalette] = useState([]);
  const [canvHeightRatio, setCanvHeightRatio] = useState(canvHR);
  const [aspectRatio, setAspectRatio] = useState( window.innerWidth / (window.innerHeight * canvHR/100) );

  const [gridAxis, setGridAxis] = useState(0);
  const [gridValue, setGridValue] = useState(0);
  const [tileSize, setTileSize] = useState(1);
  const [mapWidth, setMapWidth] = useState(10);
  const [mapLength, setMapLength] = useState(10);
  const [mapHeight, setMapHeight] = useState(10);
  const [wallThickness, setWallThickness] = useState(0.1);
  const [cameraPosition, setCameraPosition] = useState( [-2, -2, 10] );
  const [cameraAngle, setCameraAngle] = useState(1);          // Angle of declination
  const [cameraSwivel, setCameraSwivel] = useState(7);        // Rotation around z-axis
  const [cameraDistance, setCameraDistance] = useState(20);
  const [cameraFocus, setCameraFocus] = useState([4,4,0]);    // Panel coords for where the camera is centered
  const [frustum, setFrustum] = useState( 16 );
  const [cameraZoom, setCameraZoom] = useState( 1 );
  const [panels, setPanels] = useState( [] );
  const [savedMaps,setSavedMaps] = useState( [] );
  const [savedMapRefs,setSavedMapRefs] = useState( [] );
  const [currentId, setCurrentId] = useState( 0 );
  const [groundColor, setGroundColor] = useState("#119944");

  // Create listener for window resize & handle resizing
  React.useEffect(() => {
    function handleResize() {
      setAspectRatio(window.innerWidth / (window.innerHeight * canvHeightRatio/100));
    }

    window.addEventListener('resize', handleResize);
  });

  function loadMap( mapData ) {
    setCameraAngle(mapData.camera.angle);
    setCameraDistance(mapData.camera.distance);
    setCameraFocus(mapData.camera.focus);
    setFrustum(mapData.camera.frustum);
    setCameraPosition(mapData.camera.position);
    setCameraSwivel(mapData.camera.swivel);
    setCameraZoom(mapData.camera.zoom);
    setPanels(mapData.panels);
    setCanvHeightRatio(mapData.mapConfig.canvHeightRatio);
    setColorPalette(mapData.mapConfig.colorPalette);
    setCurrentColor(mapData.mapConfig.currentColor);
    setCurrentId(mapData.mapConfig.currentId);
    setGridAxis(mapData.mapConfig.gridAxis);
    setGridValue(mapData.mapConfig.gridValue);
    setGroundColor(mapData.mapConfig.groundColor);
    setMapWidth(mapData.mapConfig.mapDimensions[0]);
    setMapLength(mapData.mapConfig.mapDimensions[1]);
    setMapHeight(mapData.mapConfig.mapDimensions[2]);
    setTileSize(mapData.mapConfig.tileSize);
    setWallThickness(mapData.mapConfig.wallThickness);
    
  }

  return (
    <>
      <UserAuthContextProvider setSavedMaps={setSavedMaps}>
        <section style={{height:"100vh", width:"100vw"}} >
          <UserToolBar 
            canvHeightRatio={canvHeightRatio} 
            currentColor={currentColor} 
            setCurrentColor={setCurrentColor} 
            setShowUserModal={setShowUserModal}
            colorPalette={colorPalette}
            setColorPalette={setColorPalette}/>
          <Canvas style={{height:`${canvHeightRatio}%`, width:"100%"}}>
            <MapObjects 
              currentColor={currentColor} aspectRatio={aspectRatio}
              gridAxis={gridAxis} setGridAxis={setGridAxis}
              gridValue={gridValue} setGridValue={setGridValue}
              tileSize={tileSize} setTileSize={setTileSize}
              mapWidth={mapWidth} mapLength={mapLength} mapHeight={mapHeight}
              wallThickness={wallThickness} setWallThickness={setWallThickness}
              cameraPosition={cameraPosition} setCameraPosition={setCameraPosition}
              cameraAngle={cameraAngle} setCameraAngle={setCameraAngle}
              cameraSwivel={cameraSwivel} setCameraSwivel={setCameraSwivel}
              cameraDistance={cameraDistance} setCameraDistance={setCameraDistance}
              cameraFocus={cameraFocus} setCameraFocus={setCameraFocus}
              frustum={frustum} setFrustum={setFrustum}
              cameraZoom={cameraZoom} setCameraZoom={setCameraZoom}
              panels={panels} setPanels={setPanels}
              currentId={currentId} setCurrentId={setCurrentId}
              showUserModal={showUserModal}
            />
          </Canvas>
          { showUserModal &&
            <UserModal setShowUserModal={setShowUserModal}
              currentColor={currentColor} aspectRatio={aspectRatio}
              gridAxis={gridAxis} setGridAxis={setGridAxis}
              gridValue={gridValue} setGridValue={setGridValue}
              tileSize={tileSize} setTileSize={setTileSize}
              mapWidth={mapWidth} setMapWidth={setMapWidth} 
              mapLength={mapLength} setMapLength={setMapLength} 
              mapHeight={mapHeight} setMapHeight={setMapHeight}
              wallThickness={wallThickness} setWallThickness={setWallThickness}
              cameraPosition={cameraPosition} setCameraPosition={setCameraPosition}
              cameraAngle={cameraAngle} setCameraAngle={setCameraAngle}
              cameraSwivel={cameraSwivel} setCameraSwivel={setCameraSwivel}
              cameraDistance={cameraDistance} setCameraDistance={setCameraDistance}
              cameraFocus={cameraFocus} setCameraFocus={setCameraFocus}
              frustum={frustum} setFrustum={setFrustum}
              cameraZoom={cameraZoom} setCameraZoom={setCameraZoom}
              panels={panels} setPanels={setPanels}
              currentId={currentId} setCurrentId={setCurrentId}
              savedMaps={savedMaps} setSavedMaps={setSavedMaps}
              savedMapRefs={savedMapRefs} setSavedMapRefs={setSavedMapRefs}
              loadMap={loadMap}
              />
          }
        </section>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
