import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext.js";
import { Stack, Container, Button, Row, Col } from 'react-bootstrap';
import { queryUserMaps } from "../../utils/queries.js";
import { createNewMap } from "../../utils/mutations";

function MapsList( props ) {
    
    const { user, handleClose, setShowUserModal, 
        uiPage, setPage, 
        selectedMap, setSelectedMap, 
        selectedMapData, setSelectedMapData,
        savedMaps, setSavedMaps,
        savedMapRefs, setSavedMapRefs, setCurrentMapRefs,
        currentMapRef, setCurrentMapRef,
        mapName, setMapName,
        mapDescr, setMapDescr,
        getUserMaps, loadMap
    } = props;

    function listItemVariant( selected, mapIndex ) {
        if( selected === mapIndex ) {
            return "success";
        }
        return "primary";
    }

    function MapListItem( props ) {
        const { 
            mapIndex, 
            name, descr, 
            lastEdited, createdOn, 
            colorPalette, 
            thisMap 
        } = props;

        return (
            <Container fluid className="">
                <Button className="w-100 p-1 m-2" 
                    variant={`${listItemVariant(selectedMap,mapIndex)}`}
                    onClick={(e) => { e.preventDefault(); handleMapClick(thisMap, mapIndex); } }
                >
                    <Row className="w-100" >
                        <Col className="text-start">
                            <h5>{name}</h5>
                            <p>{descr}</p>
                        </Col>
                        <Col>
                            <p>{createdOn}</p>
                            <p>{lastEdited}</p>
                            <Container fluid className="h-100 w-100 p-0 m-0">
                                <Row className="w-100 h-50 m-0 p-0 align-middle" >
                                    { colorPalette.map( ( buttonColor, i ) => {
                                        return (
                                            <>
                                            <Col className={`d-inline-block h-100 text-center p-1 m-0`} xs={1}
                                                key={`map-palette-${name}-${i}`}
                                                style={ { 
                                                    backgroundColor: `${buttonColor}`,
                                                } }
                                            >
                                            </Col>  
                                            </>
                                        );
                                    })}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Button>
                
            </Container>
        );
    }

    function handleMapClick( thisMap, mapIndex ) {
        console.log(thisMap)
        setSelectedMap(mapIndex); 
        setSelectedMapData(thisMap); 
        setCurrentMapRef(savedMapRefs[mapIndex])
        loadMap(thisMap);
    }

    const mapListItems = ( <>
        { savedMaps.length > 0 &&
            <>
            { savedMaps.map( ( thisMap, i ) => ( 
                <MapListItem className="w-100" 
                    key={`map-list-item-${i}`} 
                    name={thisMap.name} 
                    mapIndex={i}
                    descr={thisMap.descr}
                    createdOn={`${thisMap.createdOn.toDate().toDateString()} ${thisMap.createdOn.toDate().toLocaleTimeString()}`}
                    lastEdited={`${thisMap.lastEdited.toDate().toDateString()} ${thisMap.lastEdited.toDate().toLocaleTimeString()}`}
                    groundColor={thisMap.mapConfig.groundColor}
                    colorPalette={thisMap.mapConfig.colorPalette} 
                    thisMap={thisMap}
                />
            ) ) }
            </>
        }
    </>);

    useEffect( () => {
        getUserMaps();
        console.log('getUserMaps() called');
    },[]);

    return (
        <Container fluid className="justify-content-center" >
            <Stack className="p-2" xs={2}>
                <div className="text-end w-100">
                    <Button className="p-2 ml-2 mb-3 mr-0"
                        onClick={ () => { setPage("Create New Map") } }
                        variant='warning'
                    >Create    
                    </Button>
                </div>
                <div>
                    {mapListItems}
                </div>
                
            </Stack>
            
        </Container>
    );
}

export default MapsList;