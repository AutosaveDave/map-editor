import './App.css';
import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import MapObjects from "./components/MapObjects/MapObjects.js";

function App() {

  

  

  return (
    <>
      <section className='App-header'  width='100vw' height='100vh'>
        <Canvas>
          <MapObjects />
        </Canvas>
      </section>
    </>
  );
}

export default App;
