// Component for ground
import React, { useRef } from "react";

const GroundPlane = ( {args} ) => {
    const [ width, length, 
            groundColor ] = args;
    const plane = useRef();

    return (
        <mesh ref={plane} position={[width/2,length/2,0]} >
            <planeGeometry  attach="geometry" args={[width, length]} />
            <meshStandardMaterial attach="material" color={groundColor} />
        </mesh>
    );
};

export default GroundPlane;