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
            <Container fluid={true} className="">
                <Button className="w-100 p-1 m-1" 
                    variant={`${listItemVariant(selectedMap,mapIndex)}`}
                    onClick={(e) => { e.preventDefault(); handleMapClick(thisMap, mapIndex); } }
                >
                    <Stack direction='horizontal' className="">
                        <Stack className="text-start justify-content-between" fluid={true}>
                                    <div className="">
                                        <h5 className="mt-0">{name}</h5>
                                    </div>
                                    <div className="">
                                        <p className="mb-0" style={{ verticalAlign:'end' }}>{descr}</p>
                                    </div>
                                    

                        </Stack>
                        <Stack className="text-end justify-content-between" fluid={true} >
                                    <div className="">
                                        <p className="m-0 p-0 mb-1">{createdOn} 💡</p>
                                    </div>
                                    <div className="justify-content-end">
                                        <Container fluid={true} className="w-100 p-0 m-0">
                                            <Row className="w-100 justify-content-end p-0 m-0" >
                                                { colorPalette.map( ( buttonColor, i ) => {
                                                    return (
                                                        <>
                                                        <Col className={'d-inline-block h-100 p-1 m-0'} xs={1} 
                                                            key={`map-palette-${name}-${i}`}
                                                            style={ { 
                                                                backgroundColor: `${buttonColor}`,
                                                                minHeight: '16px',
                                                                maxHeight: '48px'
                                                            } }
                                                        >
                                                        </Col>  
                                                        </>
                                                    );
                                                })}
                                            </Row>
                                        </Container>
                                    </div>
                                    <div className="">
                                        <p className="m-0 p-0 mt-1" style={{ verticalAlign:'end' }}>{lastEdited} 💾</p>
                                    </div>
                        </Stack>
                    </Stack>
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
                    createdOn={`${thisMap.createdOn.toDate().toLocaleString()}`}
                    lastEdited={`${thisMap.lastEdited.toDate().toLocaleString()}`}
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
                <Stack className="justify-content-between mr-1 " direction='horizontal'>
                    <h5 className='text-start'>Your Maps</h5>

                    <Button className="p-2 ml-2 mb-3 mr-0"
                        onClick={ () => { setPage("Create New Map") } }
                        variant='warning'
                    >Create    
                    </Button>
                </Stack>
                <div>
                    {mapListItems}
                </div>
                
            </Stack>
            
        </Container>
    );
}

export default MapsList;