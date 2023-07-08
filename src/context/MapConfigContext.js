import { createContext, useContext, useState } from "react";

const mapConfigContext = createContext(null);

export function MapConfigContextProvider( { children } ) {

  const [tileSize, setTileSize] = useState(1);
  const [mapWidth, setMapWidth] = useState(10);
  const [mapLength, setMapLength] = useState(10);
  const [mapHeight, setMapHeight] = useState(10);
  const [groundColor, setGroundColor] = useState("#119944");

  return (
    <mapConfigContext.Provider
        value= {{ tileSize, setTileSize,
                mapWidth, setMapWidth,
                mapLength, setMapLength,
                mapHeight, setMapHeight,
                groundColor, setGroundColor }} 
    >
      {children}
    </mapConfigContext.Provider>
  );
}

export function useMapConfig() {
  return useContext(mapConfigContext);
}