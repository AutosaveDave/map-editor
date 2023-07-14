import { createContext, useContext, useState } from "react";
import { useMapConfig } from "./MapConfigContext";
import { useMapPanels } from "./MapPanelsContext";
import { useColorTool } from "./ColorToolContext";

const mapEditorContext = createContext(null);

export function MapEditorContextProvider( { children } ) {

  const { tileSize, mapWidth, 
      mapLength, mapHeight } = useMapConfig();
  const { addPanel } = useMapPanels();
  const { currentColor } = useColorTool();

  const [gridAxis, setGridAxis] = useState(0);
  const [gridValue, setGridValue] = useState(0);
  const [wallThickness, setWallThickness] = useState(0.1);

  function clickCoords( u, v ) {
    switch(gridAxis) {
        case 0:
            return [ gridValue * tileSize, Math.floor( v * mapLength ) * tileSize,
                Math.floor( u * mapHeight ) * tileSize ];
        case 1:
            return [ Math.floor( u * mapWidth ) * tileSize,
                gridValue * tileSize, Math.floor( v * mapHeight ) * tileSize ];
        default:
        case 2:
            return [ Math.floor( u * mapWidth ) * tileSize,
                Math.floor( v * mapLength ) * tileSize, gridValue * tileSize ];
    }
  }

  function handleEditorClick( e ) {    //returns [x,y,z]
    const [ x, y, z ] = clickCoords( e.uv.x, e.uv.y );
    switch( gridAxis ) {
        case 0:
            addPanel( [ gridAxis, x, y + 0.5*tileSize, z + 0.5*tileSize,
                wallThickness*tileSize, tileSize, tileSize, currentColor, 0 ] );
            break;
        case 1:
            addPanel( [ gridAxis, x + 0.5*tileSize, y, z + 0.5*tileSize,
                tileSize, wallThickness*tileSize, tileSize, currentColor, 0 ] );
            break;
            default:
        case 2:
            addPanel( [ gridAxis, x + 0.5*tileSize, y + 0.5*tileSize, z,
                tileSize, tileSize, wallThickness*tileSize, currentColor, 0 ] );
            break;
    }
}

  function switchGridAxis() {
    if( gridAxis < 2 ) { setGridAxis( gridAxis + 1 ); }
    else { setGridAxis( 0 ); }
  }

  function getGridLinesAndPlane() {
    const lines = [];
    let plane = {};
    switch(gridAxis) {
      case 0:     // x-axis value is constant
          for( let a = 0 ; a <= mapLength ; a += 1 ) {
              lines.push( [ gridValue * tileSize, a * tileSize, 0,
                  gridValue * tileSize, a * tileSize, mapHeight * tileSize ] );
          }
          for( let b = 0 ; b <= mapHeight ; b += 1 ) {
              lines.push( [ gridValue * tileSize, 0, b * tileSize,
                  gridValue * tileSize, mapLength * tileSize, b * tileSize ] );
          }

          plane.position = [ gridValue * tileSize, mapLength*tileSize/2, mapHeight*tileSize/2 ];
          plane.size = [ mapHeight*tileSize, mapLength*tileSize ];
          plane.rotation = [ 0, -Math.PI/2, 0 ];
          
          break;
      case 1:     // y-axis value is constant
          for( let a = 0 ; a <= mapWidth ; a += 1 ) {
              lines.push( [ a * tileSize, gridValue * tileSize, 0,
                      a * tileSize, gridValue * tileSize, mapHeight * tileSize ] );
          }
          for( let b = 0 ; b <= mapHeight ; b += 1 ) {
              lines.push( [ 0, gridValue * tileSize, b * tileSize,
                      mapWidth * tileSize, gridValue * tileSize, b * tileSize ] );
          }
          plane.position = [ mapWidth*tileSize/2, gridValue * tileSize, mapHeight*tileSize/2 ];
          plane.size = [ mapWidth*tileSize, mapHeight*tileSize ];
          plane.rotation = [ Math.PI / 2, 0, 0 ];
          break;
      case 2:     // z-axis value is constant
      default:    // default to z-axis being constant
          for( let a = 0 ; a <= mapWidth ; a += 1 ) {
              lines.push( [ a * tileSize, 0, gridValue * tileSize,
                      a * tileSize, mapLength * tileSize, gridValue * tileSize ] );
          }
          for( let b = 0 ; b <= mapLength ; b += 1 ) {
              lines.push( [ 0, b * tileSize, gridValue * tileSize,
                      mapWidth * tileSize, b * tileSize, gridValue * tileSize ] );
          }
          plane.position = [ mapWidth*tileSize/2, mapLength*tileSize/2, gridValue * tileSize ];
          plane.size = [ mapWidth*tileSize, mapLength*tileSize ];
          plane.rotation = [ 0, 0, 0 ];
          break;
    }
    return { lines, plane };
  }

  return (
    <mapEditorContext.Provider
        value= {{ gridAxis, setGridAxis,
            gridValue, setGridValue,
            wallThickness, setWallThickness, 
            switchGridAxis, getGridLinesAndPlane,
            clickCoords, handleEditorClick }} 
    >
      {children}
    </mapEditorContext.Provider>
  );
}

export function useMapEditor() {
  return useContext(mapEditorContext);
}