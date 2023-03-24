
import React, { useRef, useState } from "react";
import { Line } from '@react-three/drei'

function EditorGrid( { props } ) {
    console.log(props);
    const [ axis, value, tileSize, mapWidth, mapLength, mapHeight ] = props;   // mapWidth, mapLength, and mapHeight expressed in number of tiles
    const gridlines = useRef();
    const lines = [];   // lines array to be filled with coordinates for each line => [x1,y1,z1,x2,y2,z2]
    switch(axis) {
        case 0:     // x-axis value is constant
            for( let a = 0 ; a <= mapLength ; a += 1 ) {
                lines.push(
                    [
                        [value, a * tileSize, 0],
                        [value, a * tileSize, mapHeight * tileSize]
                    ]
                )
            }
            for( let b = 0 ; b <= mapHeight ; b += 1 ) {
                lines.push(
                    [
                        value, 0, b * tileSize,
                        value, mapLength * tileSize, b * tileSize
                    ]
                )
            }
            break;
        case 1:     // y-axis value is constant
            for( let a = 0 ; a <= mapWidth ; a += 1 ) {
                lines.push(
                    [
                        a * tileSize, value, 0,
                        a * tileSize, value, mapHeight * tileSize
                    ]
                )
            }
            for( let b = 0 ; b <= mapLength ; b += 1 ) {
                lines.push(
                    [
                        0, value, b * tileSize,
                        mapWidth * tileSize, value, b * tileSize
                    ]
                )
            }
            break;
        case 2:     // z-axis value is constant
        default:    // default to z-axis being constant
            for( let a = 0 ; a <= mapWidth ; a += 1 ) {
                lines.push(
                    [
                        a * tileSize, 0, value,
                        a * tileSize, mapLength * tileSize, value
                    ]
                )
            }
            for( let b = 0 ; b <= mapLength ; b += 1 ) {
                lines.push(
                    [
                        0, b * tileSize, value,
                        mapWidth * tileSize, b * tileSize, value
                    ]
                )
            }
            break;
    }

    const [lineList] = useState(lines);
    console.log('lineList:');
    console.log(lineList);
    return(
        <>
        <group ref={gridlines}>
            { lineList.map( (thisLine, i) => (
                <Line points={[[thisLine[0],thisLine[1],thisLine[2]],[thisLine[3],thisLine[4],thisLine[5]]]} color={'black'} linewidth={1} key={`gridline${i}`}>
                    
                    <lineBasicMaterial attach="material" color={'black'} linewidth={1} />
                </Line>
            ))}
        </group>
        </>
    );
}

export default EditorGrid;