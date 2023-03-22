import './App.css';
import { Canvas } from "@react-three/fiber";
import LightPoint from "./components/Lighting/LightPoint";
import MapObjects from "./components/MapObjects/MapObjects.js";


function App() {
  
  return (
    <>
      <section className='App-header'>
        <Canvas>
          
          <MapObjects />
        </Canvas>
      </section>
    </>
  );
}

export default App;
