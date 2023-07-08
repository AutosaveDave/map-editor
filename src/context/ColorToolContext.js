import { createContext, useContext, useState } from "react";

const colorToolContext = createContext(null);

export function ColorToolContextProvider( { children } ) {

  const [currentColor, setCurrentColor] = useState("#EE9900");
  const [colorPalette, setColorPalette] = useState([]);
  const [colorToolFlip, setColorToolFlip] = useState(0);

  function triggerColorTool() {   // Triggers re-renders for changes to colorPalette
    const flip = ( colorToolFlip + 1 ) % 2;
    setColorToolFlip(flip);
  }

  function isColorInPalette(color) {
    for( let a = 0 ; a < colorPalette.length ; a += 1 ){
        if( colorPalette[a] === color ) {
            return true;
        }
    }
    return false;
  }

function handleAddColor() {
    if( !isColorInPalette(currentColor) ) {
        const tempPalette = colorPalette;
        tempPalette.push(currentColor);
        setColorPalette(tempPalette);
        triggerColorTool();
    }
  }

  return (
    <colorToolContext.Provider
        value= {{ currentColor, setCurrentColor,
            colorPalette, setColorPalette, handleAddColor }} 
    >
      {children}
    </colorToolContext.Provider>
  );
}

export function useColorTool() {
  return useContext(colorToolContext);
}