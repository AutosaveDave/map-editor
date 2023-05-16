
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import './App.css';
import MapObjects from "./components/MapObjects/MapObjects.js";
import ColorTool from "./components/EditorUI/Tools/ColorTool";


function App() {

  const canvHR = 94;

  const [currentColor, setCurrentColor] = useState("#EE9900");
  const [canvHeightRatio, setCanvHeightRatio] = useState(canvHR);
  const [aspectRatio, setAspectRatio] = useState( window.innerWidth / (window.innerHeight * canvHR/100) );

  // Create listener for window resize & handle resizing
  React.useEffect(() => {
    function handleResize() {
      setAspectRatio(window.innerWidth / (window.innerHeight * canvHeightRatio/100));
    }

    window.addEventListener('resize', handleResize);
  });

  return (
    <>
      
      <section style={{height:"100vh", width:"100vw"}} >
        <section style={{height:`${100-canvHeightRatio}%`}}>
          <ColorTool currentColor={currentColor} setCurrentColor={setCurrentColor}/>
        </section>
        <Canvas style={{height:`${canvHeightRatio}%`, width:"100%"}}>
          <MapObjects currentColor={currentColor} aspectRatio={aspectRatio}/>
          
        </Canvas>
      </section>
    </>
  );
}

export default App;
