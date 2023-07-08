import { createContext, useContext, useState } from "react";

const mapInfoContext = createContext(null);

export function MapInfoContextProvider( { children } ) {
  
  const [mapName, setMapName] = useState("Unititled");
  const [mapDescr, setMapDescr] = useState("No description.");
  

  return (
    <mapInfoContext.Provider
        value= {{ mapName, setMapName,
                mapDescr, setMapDescr }} 
    >
      {children}
    </mapInfoContext.Provider>
  );
}

export function useMapInfo() {
  return useContext(mapInfoContext);
}