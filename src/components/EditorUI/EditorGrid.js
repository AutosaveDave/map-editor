
import React, { useRef, useState, useEffect } from "react";
import { Line } from '@react-three/drei';
import { DoubleSide } from "three";

function EditorGrid( props ) {
    const {   // mapWidth, mapLength, and mapHeight expressed in number of tiles
        gridAxis, setGridAxis, 
        gridValue, setGridValue, 
        tileSize, 
        mapWidth, mapLength, mapHeight, 
        addPanel, 
        currentColor,  
        wallThickness, setWallThickness
    } = props;  
    const gridlines = useRef();
    const lines = [];   // lines array to be filled with coordinates for each line => [x1,y1,z1,x2,y2,z2]
    const plane = {};

    function clickCoords ( u, v ) {
        switch(gridAxis) {
            case 0:
                return [
                    gridValue * tileSize,
                    Math.floor( v * mapLength ) * tileSize,
                    Math.floor( u * mapHeight ) * tileSize
                ];
            case 1:
                return [
                    Math.floor( u * mapWidth ) * tileSize,
                    gridValue * tileSize,
                    Math.floor( v * mapHeight ) * tileSize
                ];
            default:
            case 2:
                return [
                    Math.floor( u * mapWidth ) * tileSize,
                    Math.floor( v * mapLength ) * tileSize,
                    gridValue * tileSize,
                ];
        }
    }

    

    function handleClick( e ) {    //returns [x,y,z]
        const [ x, y, z ] = clickCoords( e.uv.x, e.uv.y )
        switch( gridAxis ) {
            case 0:
                addPanel( [
                    gridAxis,
                    x, y + 0.5*tileSize, z + 0.5*tileSize,
                    wallThickness*tileSize, tileSize, tileSize,
                    currentColor,
                    0
                ]);
                break;
            case 1:
                addPanel( [
                    gridAxis,
                    x + 0.5*tileSize, y, z + 0.5*tileSize,
                    tileSize, wallThickness*tileSize, tileSize,
                    currentColor,
                    0
                ]);
                break;
                default:
            case 2:
                addPanel( [
                    gridAxis,
                    x + 0.5*tileSize, y + 0.5*tileSize, z,
                    tileSize, tileSize, wallThickness*tileSize,
                    currentColor,
                    0
                ]);
                break;
        }
            // gridAxis,
            // x, y, z,
            // w, l, h,
            // rColor, gColor, bColor,
            // material 
        
    }

    switch(gridAxis) {
        case 0:     // x-axis value is constant
            for( let a = 0 ; a <= mapLength ; a += 1 ) {
                lines.push(
                    [
                        gridValue * tileSize, a * tileSize, 0,
                        gridValue * tileSize, a * tileSize, mapHeight * tileSize
                    ]
                )
            }
            for( let b = 0 ; b <= mapHeight ; b += 1 ) {
                lines.push(
                    [
                        gridValue * tileSize, 0, b * tileSize,
                        gridValue * tileSize, mapLength * tileSize, b * tileSize
                    ]
                )
            }

            
            plane.position = [ gridValue * tileSize, mapLength*tileSize/2, mapHeight*tileSize/2 ];
            plane.size = [ mapHeight*tileSize, mapLength*tileSize ];
            plane.rotation = [ 0, -Math.PI/2, 0 ];
            
            break;
        case 1:     // y-axis value is constant
            for( let a = 0 ; a <= mapWidth ; a += 1 ) {
                lines.push(
                    [
                        a * tileSize, gridValue * tileSize, 0,
                        a * tileSize, gridValue * tileSize, mapHeight * tileSize
                    ]
                )
            }
            for( let b = 0 ; b <= mapLength ; b += 1 ) {
                lines.push(
                    [
                        0, gridValue * tileSize, b * tileSize,
                        mapWidth * tileSize, gridValue * tileSize, b * tileSize
                    ]
                )
            }

            plane.position = [ mapWidth*tileSize/2, gridValue * tileSize, mapHeight*tileSize/2 ];
            plane.size = [ mapWidth*tileSize, mapHeight*tileSize ];
            plane.rotation = [ Math.PI/2, 0, 0 ];

            break;
        case 2:     // z-axis value is constant
        default:    // default to z-axis being constant
            for( let a = 0 ; a <= mapWidth ; a += 1 ) {
                lines.push(
                    [
                        a * tileSize, 0, gridValue * tileSize,
                        a * tileSize, mapLength * tileSize, gridValue * tileSize
                    ]
                )
            }
            for( let b = 0 ; b <= mapLength ; b += 1 ) {
                lines.push(
                    [
                        0, b * tileSize, gridValue * tileSize,
                        mapWidth * tileSize, b * tileSize, gridValue * tileSize
                    ]
                )
            }

            plane.position = [ mapWidth*tileSize/2, mapLength*tileSize/2, gridValue * tileSize ];
            plane.size = [ mapWidth*tileSize, mapLength*tileSize ];
            plane.rotation = [ 0, 0, 0 ];

            break;
    }

    return(
        <>
        <group ref={gridlines}>
            { lines.map( (thisLine, i) => (
                <Line points={[[thisLine[0],thisLine[1],thisLine[2]],[thisLine[3],thisLine[4],thisLine[5]]]} color={'black'} linewidth={1} key={`gridline${i}`}>
                    <lineBasicMaterial attach="material" color={'black'} linewidth={1} />
                </Line>
            ))}
            <mesh position={plane.position} rotation={plane.rotation} visible={false} 
                onClick={handleClick}
            >
                <planeGeometry  attach="geometry" args={plane.size} />
                <meshStandardMaterial attach="material" side={DoubleSide} color={`rgb(255,200,200)`}/>
            </mesh>
        </group>
        </>
    );

}

export default EditorGrid;