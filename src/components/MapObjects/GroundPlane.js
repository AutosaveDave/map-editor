// Component for ground
import React, { useRef } from "react";

const GroundPlane = ( {props} ) => {
    const [ width, length, 
            rColor, gColor, bColor ] = props;
    const plane = useRef();

    return (
        <mesh ref={plane} position={[width/2,length/2,0]}>
            <planeGeometry  attach="geometry" args={[width, length]} />
            <meshStandardMaterial attach="material" color={`rgb(${rColor},${gColor},${bColor})`} />
        </mesh>
    );
};

export default GroundPlane;