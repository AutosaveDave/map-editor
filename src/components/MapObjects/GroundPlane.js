// Component for ground
import React, { useRef } from "react";
import { useMapConfig } from "../../context/MapConfigContext";

export default function GroundPlane() {
    const { mapWidth, mapLength, groundColor } = useMapConfig();
    const plane = useRef();

    return (
        <mesh receiveShadow ref={plane} position={[mapWidth/2,mapLength/2,0]} >
            <planeGeometry  attach="geometry" args={[mapWidth, mapLength]} />
            <meshStandardMaterial attach="material" color={groundColor} />
        </mesh>
    );
};