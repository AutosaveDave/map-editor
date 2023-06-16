import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../context/UserAuthContext.js";
import { Stack, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
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

    const [mapListLoading, setMapListLoading] = useState(false);

    function listItemVariant( selected, mapIndex ) {
        if( selected === mapIndex ) {
            return "success";
        }
        return "primary";
    }

    function MapListItem( props ) {
        const { 
            mapId, 
            name, descr, 
            lastEdited, createdOn, 
            colorPalette,
        } = props;

        return (
            <Container fluid={true} className="">
                <Button className="w-100 p-1 m-1" 
                    variant={`${listItemVariant(selectedMap,mapId)}`}
                    onClick={(e) => { e.preventDefault(); handleMapClick(mapId); } }
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

    function handleMapClick( thisMapRef ) {
        setSelectedMap(thisMapRef); 
        loadMap(savedMaps[thisMapRef]);
    }

    const MapListItems = ( props ) => { 
        const maps = Object.entries( { ...(props.maps) } );
        return ( <>
            { maps.length > 0 &&
                <>
                { maps.map( ( [key, value] ) =>  ( 
                    <MapListItem className="w-100" 
                        key={`map-list-item-${key}`} 
                        mapId={key}
                        name={value.name} 
                        descr={value.descr}
                        createdOn={`${value.createdOn.toDate().toLocaleString()}`}
                        lastEdited={`${value.lastEdited.toDate().toLocaleString()}`}
                        groundColor={value.mapConfig.groundColor}
                        colorPalette={value.mapConfig.colorPalette} 
                        thisMap={value}
                    />
                ) ) }
                </>
            }
    </>); }

    useEffect( () => {
        async function getMaps() {
            setMapListLoading(true);
            const result = await getUserMaps().then( (maps) => { 
                setMapListLoading(false);
                return maps;
            } );
            return result;
        }
        
        getMaps();
    },[]);

    return (
        <Container fluid className="justify-content-center" >
            <Stack className="p-2" xs={2}>
                <Stack className=" pl-3 pr-2 mb-2" direction='horizontal'>
                    
                    
                    <div className="w-25 px-3 text-start">
                        { mapListLoading && 
                            <Spinner variant="primary" className=""/>
                        }
                    </div>
                    <div className="w-75 px-2 text-end">
                        <Button className=" p-2 m-0"
                            onClick={ () => { setPage("Create New Map") } }
                            variant='warning'
                        >Create    
                        </Button>
                    </div>
                    
                </Stack>
                
                <div>
                    <MapListItems maps={savedMaps}/>
                </div>
                
            </Stack>
            
        </Container>
    );
}

export default MapsList;