
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import './App.css';
import MapObjects from "./components/MapObjects/MapObjects.js";
import UserToolBar from "./components/UserUI/UserToolBar";
import UserModal from "./components/UserUI/UserModal";
import CameraTool from "./components/EditorUI/Tools/CameraTool.js"
import {queryUserMaps} from "./utils/queries";
import {saveMap} from "./utils/mutations";
import {styles} from "./utils/styles.js";

import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {

  const canvHR = 94;  // default canvas "height ratio" (percent of window height taken by canvas)

  const [showUserModal, setShowUserModal] = useState(false);

  const [currentColor, setCurrentColor] = useState("#EE9900");
  const [colorPalette, setColorPalette] = useState([]);
  const [canvHeightRatio, setCanvHeightRatio] = useState(canvHR);
  const [aspectRatio, setAspectRatio] = useState( window.innerWidth / (window.innerHeight * canvHR/100) );

  const [mapName, setMapName] = useState("Unititled");
  const [mapDescr, setMapDescr] = useState("No description.");

  const [gridAxis, setGridAxis] = useState(0);
  const [gridValue, setGridValue] = useState(0);
  const [tileSize, setTileSize] = useState(1);
  const [mapWidth, setMapWidth] = useState(10);
  const [mapLength, setMapLength] = useState(10);
  const [mapHeight, setMapHeight] = useState(10);
  const [wallThickness, setWallThickness] = useState(0.1);
  
  const [cameraAngle, setCameraAngle] = useState(1);          // Angle of declination
  const [cameraSwivel, setCameraSwivel] = useState(7);        // Rotation around z-axis
  const [cameraDistance, setCameraDistance] = useState(20);
  const [cameraFocus, setCameraFocus] = useState([4,4,0]);    // Panel coords for where the camera is centered
  const [cameraPosition, setCameraPosition] = useState( camFocusToPos( 1, 7 ) );
  const [frustum, setFrustum] = useState( 16 );
  const [cameraZoom, setCameraZoom] = useState( 1 );
  const [panels, setPanels] = useState( [] );
  const [savedMaps,setSavedMaps] = useState( {} );

  const [currentMapRef,setCurrentMapRef] = useState(false);
  const [currentId, setCurrentId] = useState( 0 );
  const [groundColor, setGroundColor] = useState("#119944");

  const [uiPage, setUiPage] = useState("Account");
  const [selectedMap, setSelectedMap] = useState("");

  // Create listener for window resize & handle resizing
  React.useEffect(() => {
    function handleResize() {
      setAspectRatio(window.innerWidth / (window.innerHeight * canvHeightRatio/100));
    }

    window.addEventListener('resize', handleResize);
  });

  function camFocusToPos( angle, swivel ) {  // Returns approriate camera position
    return ( [                // based on camera angle, swivel, and distance
        cameraFocus[0] + cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.sin( swivel*Math.PI/4 ),
        cameraFocus[1] - cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.cos( swivel*Math.PI/4 ),
        cameraFocus[2] + cameraDistance * Math.cos( angle*Math.PI/4 )
    ] );
  }

  async function saveCurrentMap( user ) {
    const panelObjects = [];
    panels.forEach( ( thisPanel ) => {
      const panelObj = {
        x: thisPanel[0], y: thisPanel[1], z: thisPanel[2],
        width: thisPanel[3], length: thisPanel[4], height: thisPanel[5],
        xRotation: thisPanel[6], yRotation: thisPanel[7], zRotation: thisPanel[8],
        color: thisPanel[9], 
        material: thisPanel[10], 
        panel_id: thisPanel[11],
      };
      panelObjects.push( panelObj );
    })
    
    const mapSaveData = {
      name: mapName,
      descr: mapDescr,
      panels: panelObjects,
      camera: {
        angle: cameraAngle,
        distance: cameraDistance,
        focus: cameraFocus,
        frustum: frustum,
        position: cameraPosition,
        swivel: cameraSwivel,
        zoom: cameraZoom,
      },
      mapConfig: {
        canvHeightRatio: canvHeightRatio,
        colorPalette: colorPalette,
        currentColor: currentColor,
        currentId: currentId,
        gridAxis: gridAxis,
        gridValue: gridValue,
        groundColor: groundColor,
        mapDimensions: [ mapWidth, mapLength, mapHeight ],
        tileSize: tileSize,
        wallThickness: wallThickness,
      },
    };
    return await saveMap( user, selectedMap, mapSaveData );
  }

  function loadMap( mapData ) {
    
    console.log(mapData)
    setMapName(mapData.name);
    setMapDescr(mapData.descr);
    // setCurrentMapRef(savedMapRefs[mapIndex]);
    setCameraAngle(mapData.camera.angle);
    setCameraDistance(mapData.camera.distance);
    setCameraFocus(mapData.camera.focus);
    setFrustum(mapData.camera.frustum);
    setCameraPosition(mapData.camera.position);
    setCameraSwivel(mapData.camera.swivel);
    setCameraZoom(mapData.camera.zoom);
    const panelsArray = [];
    mapData.panels.forEach( ( p ) => {
      const panelArray = [ 
        p.x, p.y, p.z,
        p.width, p.length, p.height,
        p.xRotation, p.yRotation, p.zRotation,
        p.color, p.material, p.panel_id
      ];
      panelsArray.push(panelArray);
    })
    setPanels(panelsArray);
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

  const clearData = (allData, nameDescr) => {
    // allData : true => reset ALL data; false => reset only current map data
    // nameDescr : true=> reset mapName & mapDescr
    setCurrentColor("#EE9900");
    setColorPalette([]);
    if(nameDescr) {
      setMapName("");
      setMapDescr("");
    }
    
    setGridAxis(0);
    setGridValue(0);
    setTileSize(1);
    setMapWidth(10);
    setMapLength(10);
    setMapHeight(10);
    setWallThickness(0.1);
    setCameraPosition([-2,-2,10]);
    setCameraAngle(1);
    setCameraSwivel(7);
    setCameraDistance(20);
    setCameraFocus([4,4,0]);
    setFrustum(16);
    setCameraZoom(1);
    setPanels([]);
    setGroundColor("#119944");
    setCurrentId(0);

    if(allData) {
      setSavedMaps({});
      setSelectedMap("");
    }
  }

  return (
    <>
      <UserAuthContextProvider setSavedMaps={setSavedMaps}>
        <section style={{height:"100vh", width:"100vw"}} >
          <UserToolBar className="bg-secondary"
            canvHeightRatio={canvHeightRatio} 
            currentColor={currentColor} 
            setCurrentColor={setCurrentColor} 
            setShowUserModal={setShowUserModal}
            colorPalette={colorPalette}
            setColorPalette={setColorPalette}
            currentMapRef={currentMapRef}
            setCurrentMapRef={setCurrentMapRef}
            mapName={mapName} setMapName={setMapName}
            mapDescr={mapDescr} setMapDescr={setMapDescr}
            saveCurrentMap={saveCurrentMap}
            selectedMap={selectedMap} setSelectedMap={setSelectedMap}
            groundColor={groundColor} setGroundColor={setGroundColor}
            aspectRatio={aspectRatio}
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
            loadMap={loadMap}
            uiPage={uiPage} setUiPage={setUiPage}
            clearData={clearData}
          />
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
              groundColor={groundColor}
            />
          </Canvas>
          { showUserModal &&
            <UserModal setShowUserModal={setShowUserModal}
              canvHeightRatio={canvHeightRatio} 
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
              
              loadMap={loadMap} 
              currentMapRef={currentMapRef} setCurrentMapRef={setCurrentMapRef}
              mapName={mapName} setMapName={setMapName}
              mapDescr={mapDescr} setMapDescr={setMapDescr}

              uiPage={uiPage} setUiPage={setUiPage}
              selectedMap={selectedMap} setSelectedMap={setSelectedMap}
              clearData={clearData}
              />
          }
        </section>
        <h4 style={{ ...(styles.pos.abs.br) }} >{cameraFocus[0]}, {cameraFocus[1]} / swivel: {cameraSwivel} / {mapName}</h4>
        <div style={{ ...(styles.pos.abs.bl) }} >
          <CameraTool 
            cameraPosition={cameraPosition} setCameraPosition={setCameraPosition}
            cameraAngle={cameraAngle} setCameraAngle={setCameraAngle}
            cameraSwivel={cameraSwivel} setCameraSwivel={setCameraSwivel}
            cameraDistance={cameraDistance} setCameraDistance={setCameraDistance}
            cameraFocus={cameraFocus} setCameraFocus={setCameraFocus}
            camFocusToPos={camFocusToPos}
            frustum={frustum} setFrustum={setFrustum}
            cameraZoom={cameraZoom} setCameraZoom={setCameraZoom}
            mapWidth={mapWidth} mapLength={mapLength}
          />
        </div>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
