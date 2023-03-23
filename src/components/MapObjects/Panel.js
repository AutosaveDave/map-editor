// Component for floor and wall objects on map
import React, { useRef } from "react";

const Panel = ( {props} ) => {
    const [ x, y, z, 
            width, length, depth, 
            xRotation, yRotation, zRotation, 
            rColor, gColor, bColor ] = props;
    const box = useRef();

    return (
        <mesh ref={box} rotation={[xRotation, yRotation, zRotation]} position={[x,y,z]}>
            <boxGeometry attach="geometry" args={[width, length, depth]} />
            <meshStandardMaterial attach="material" color={`rgb(${rColor},${gColor},${bColor})`} />
        </mesh>
    );
};

export default Panel;