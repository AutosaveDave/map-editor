import { createContext, useContext, useEffect, useState } from "react";
import { queryUserMaps } from "../utils/queries";
import { createNewMap } from "../utils/mutations";
import { useMapCamera } from "./MapCameraContext";
import { saveMap } from "../utils/mutations";
import { useUserAuth } from "./UserAuthContext";
import { useColorTool } from "./ColorToolContext";
import { useMapInfo } from "./MapInfoContext";
import { useMapPanels } from "./MapPanelsContext";
import { useMapEditor } from "./MapEditorContext";
import { useMapConfig } from "./MapConfigContext";
import { useUi } from "./UiContext";
import { isEmpty } from "lodash";

const userDataContext = createContext(null);

export function UserDataContextProvider( { children } ) {

  const auth = useUserAuth();  

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

  const { setMapListLoading, triggerUi } = useUi();
  
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

  const [userDataFlip, setUserDataFlip] = useState(0);

  function triggerUserData() {   // Triggers re-renders for changes to savedMaps
    const flip = ( userDataFlip + 1 ) % 2;
    setUserDataFlip(flip);
  }

  function sortSavedMaps() {
    if( !isEmpty(savedMaps) ) {
      const mapsArray = Object.keys(savedMaps);
      mapsArray.sort( ( a, b ) => 
        savedMaps[b].lastEdited.seconds - savedMaps[a].lastEdited.seconds 
      );
      let mapsObj = {};
      for( let i = 0 ; i < mapsArray.length ; i += 1 ) {
        mapsObj[ mapsArray[i] ] = ( savedMaps[ mapsArray[i] ] );
      }
      setSavedMaps(mapsObj);
      triggerUserData();
      triggerUi();
    }
  }

  const addMapToSavedMaps = ( mapData, newId ) => {
    let result = {};
    result[newId] = mapData;
    result = { ...result, ...savedMaps };
    setSavedMaps(result);
    return result;
  }

  async function createMap( newName, newDescr ) {
    const result = await createNewMap( auth, newName, newDescr )
        .then( res => {
          const { mapData, data } = res;
          const newPath = data._key.path.segments;
          const newId = newPath[newPath.length-1];
          const maps = addMapToSavedMaps( mapData, newId );
          setSelectedMap( newId );
          loadMap( maps[ newId ] );
          return maps[ newId ];
        })
        .catch( (error) => {
            console.log(error);
        });
      return result;
  }

  async function getUserMaps() {
    let userMaps = {};
    return await queryUserMaps( auth.user )
        .then( data => {
            data.forEach( thisResult => { 
                const pathSegs = thisResult._document.key.path.segments;
                userMaps[ `${pathSegs[ pathSegs.length - 1 ]}` ] = { ...(thisResult.data()) };
            } );
            setSavedMaps(userMaps);
            triggerUserData();
            return userMaps;
        })
        .then( (userMaps) => {
          if( isEmpty(userMaps) )
            return createMap("Untitled", "No description yet.");
          const selectId = Object.keys(userMaps)[0];
          setSelectedMap( selectId ); // Select first map on sign-in
          loadMap( userMaps[ selectId ] );
          return userMaps;
        })
        .catch((error) => {
            console.log(error);
            console.log(auth.user);
        });
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
        triggerUi();
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
    if(allData){
      setSavedMaps({});
      setSelectedMap('');
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

  useEffect( () => {
    const getMaps = async () => {
      setMapListLoading(true);
      return await getUserMaps()
          .then(() => {
              setMapListLoading(false);
          });
    }
    if(auth.user) {
      getMaps()
        .then( () => {
          triggerUserData();
          triggerUi();
        });
    }
  },[auth.user]);

  return (
    <userDataContext.Provider
      value= {{ savedMaps, setSavedMaps, 
                selectedMap, setSelectedMap,
                clearData, saveCurrentMap,
                loadMap, getUserMaps,
                createMap, triggerUserData,
                sortSavedMaps
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(userDataContext);
}