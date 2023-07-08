import { createContext, useContext, useState } from "react";

const mapPanelsContext = createContext(null);

export function MapPanelsContextProvider( { children } ) {

  const [panels, setPanels] = useState( [] );
  const [currentId, setCurrentId] = useState( 0 );

  function nextId() {
    const cid = currentId;
    setCurrentId( cid + 1 );
    return cid + 1;
  }

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

  function deletePanel( id ) {
    const newPanels = [];
    newPanels.push( ...panels );
    for( let a = 0 ; a < newPanels.length ; a += 1 ) {
        if( newPanels[ a ][ newPanels[ a ].length - 1 ] === id ) {
            newPanels.splice( a, 1 );   // delete panel from array
            a = newPanels.length;
        }
    }
    setPanels( newPanels );
  }

  return (
    <mapPanelsContext.Provider
        value= {{ panels, setPanels,
                addPanel, deletePanel,
                currentId, setCurrentId }} 
    >
      {children}
    </mapPanelsContext.Provider>
  );
}

export function useMapPanels() {
  return useContext(mapPanelsContext);
}