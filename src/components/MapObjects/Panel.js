// Component for floor and wall objects on map
import React, { useRef } from "react";

const Panel = ( {args} ) => {
    const [ x, y, z, 
            width, length, depth, 
            xRotation, yRotation, zRotation, 
            rColor, gColor, bColor] = args;
    const box = useRef();
    console.log(rColor);

    return (
        <mesh ref={box} rotation={[xRotation, yRotation, zRotation]} position={[x,y,z]}>
            <boxGeometry attach="geometry" args={[width, length, depth]} />
            <meshStandardMaterial attach="material" color={`rgb(${rColor},${gColor},${bColor})`} />
        </mesh>
    );
};

export default Panel;