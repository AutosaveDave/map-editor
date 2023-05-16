
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import './App.css';
import MapObjects from "./components/MapObjects/MapObjects.js";
import ColorTool from "./components/EditorUI/Tools/ColorTool";


function App() {

  const [currentColor, setCurrentColor] = useState("#EE9900");

  return (
    <>
      
      <section className="fit-window">
        <ColorTool height={"10%"} currentColor={currentColor} setCurrentColor={setCurrentColor}/>
        <Canvas height={"90%"} width={"100%"}>
          <MapObjects currentColor={currentColor}/>
          
        </Canvas>
      </section>
    </>
  );
}

export default App;
