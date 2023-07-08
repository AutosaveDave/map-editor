import { createContext, useContext, useState, useEffect } from "react";

const sizingContext = createContext(null);

export function SizingContextProvider( { children } ) {
  
    const toolBarHeight = () => {
        let h = 36;
        if( window.innerHeight >= 660) {
          h = 40;
        } else if( window.innerHeight >= 890) {
          h = 44;
        } else if( window.innerHeight >= 1020) {
          h = 48;
        } else if( window.innerHeight >= 1200) {
          h = 52;
        }
        return h;
      }
    
      const canvasHeight = () => {
        return window.innerHeight - toolBarHeight();
      }
      
      const [aspectRatio, setAspectRatio] = useState( window.innerWidth / canvasHeight() );
    
      // Create listener for window resize & handle resizing
      useEffect(() => {
        function handleResize() {
          setAspectRatio(window.innerWidth / canvasHeight() );
        }
        window.addEventListener('resize', handleResize);
      });

  return (
    <sizingContext.Provider
        value= {{ aspectRatio, toolBarHeight, canvasHeight }} 
    >
      {children}
    </sizingContext.Provider>
  );
}

export function useSizing() {
  return useContext(sizingContext);
}