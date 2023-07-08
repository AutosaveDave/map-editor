import { createContext, useContext, useEffect, useState } from "react";
import { queryUserMaps } from "../utils/queries";
import { useUserAuth } from "./UserAuthContext";
import { createNewMap } from "../utils/mutations";
import { useMapCamera } from "./MapCameraContext";
import { saveMap } from "../utils/mutations";
import { useColorTool } from "./ColorToolContext";
import { useMapInfo } from "./MapInfoContext";
import { useMapPanels } from "./MapPanelsContext";
import { useMapEditor } from "./MapEditorContext";
import { useMapConfig } from "./MapConfigContext";


const userDataContext = createContext(null);

export function UserDataContextProvider( { children } ) {

  const auth = useUserAuth();
  const { user } = auth;

  const { cameraAngle, setCameraAngle,
          cameraSwivel, setCameraSwivel,
          cameraDistance, setCameraDistance,
          cameraFocus, setCameraFocus,
          cameraPosition, setCameraPosition,
          frustum, setFrustum,
          cameraZoom, setCameraZoom,
          camFocusToPos, camFocusToPos2 } = useMapCamera();

  const { currentColor, setCurrentColor,
          colorPalette, setColorPalette } = useColorTool();
  
  const { mapName, setMapName,
          mapDescr, setMapDescr } = useMapInfo();

  const { panels, setPanels,
          currentId, setCurrentId } = useMapPanels();

  const { gridAxis, setGridAxis,
          gridValue, setGridValue,
          wallThickness, setWallThickness } = useMapEditor();

  const { tileSize, setTileSize,
          mapWidth, setMapWidth,
          mapLength, setMapLength,
          mapHeight, setMapHeight,
          groundColor, setGroundColor } = useMapConfig();

  const [savedMaps, setSavedMaps] = useState({});
  const [selectedMap, setSelectedMap] = useState('');

  useEffect( () => {   
    async function getMaps() {
        const result = await getUserMaps().then( (maps) => { 
            return maps;
        } );
        return result;
    }     
    if(user)
        getMaps();
  },[]);

  async function refreshMaps( newId ) {
    const result = await getUserMaps()
      .then( maps => {
        let selectedId = "";
        Object.entries(maps).map( ( [key, value] ) => {
          if( key === newId ) {
            selectedId = key;
          }
          return "";
        });
        if( selectedId )
          setSelectedMap(selectedId);
        return maps[selectedId];
      })
      .catch( error => {
        console.log(error);
      });
      return result;
  }

  async function createMap( newName, newDescr ) {
    const result = await createNewMap( auth, newName, newDescr )
        .then( data => {
            const newPath = data._key.path.segments;
            const newId = newPath[newPath.length-1];
            return refreshMaps(newId);
        })
        .catch( (error) => {
            console.log(error);
        });
      return result;
  }

  async function getUserMaps() {
    const userMaps = {};
    const result = await queryUserMaps( user )
        .then( data => {
            data.forEach( thisResult => { 
                const pathSegs = thisResult._document.key.path.segments;
                userMaps[ `${pathSegs[ pathSegs.length - 1 ]}` ] = { ...(thisResult.data()) };
            } );
            if( Object.keys(userMaps).length === 0 ) {
              return userMaps;
            }
          }).then( userMaps => {
            setSavedMaps(userMaps);
            console.log("queryUserMaps result");
            console.log(user);
            return userMaps;
        })
        .catch((error) => {
            console.log(error);
            console.log(user);
        })
        return result;
  }

  async function saveCurrentMap( user ) {

    return await saveMap( user, selectedMap, getMapSaveData() )
      .then( ( mapInfo ) => {
        let newSavedMaps = savedMaps;
        Object.entries(mapInfo).forEach( entry => {
          const [key, value] = entry;
          newSavedMaps[selectedMap][key] = value;
        });
        setSavedMaps(newSavedMaps);
      });
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

    return allData;
  }

  function getMapSaveData() {
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
    
    return {
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
  }

  return (
    <userDataContext.Provider
      value= {{ savedMaps, setSavedMaps, 
                selectedMap, setSelectedMap,
                clearData, saveCurrentMap,
                loadMap, getUserMaps,
                createMap 
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(userDataContext);
}