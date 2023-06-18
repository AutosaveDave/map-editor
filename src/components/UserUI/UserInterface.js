import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext.js";
import { getAuth } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapsList from './MapsList.js';
import { queryUserMaps } from '../../utils/queries';
import NewMapForm from './NewMapForm.js';

function UserInterface( props ) {

    const { user, handleClose, setShowUserModal, uiPage, setPage, 
        currentColor, aspectRatio,
        gridAxis, setGridAxis,
        gridValue, setGridValue,
        tileSize, setTileSize,
        mapWidth, setMapWidth,
        mapLength, setMapLength,
        mapHeight, setMapHeight,
        wallThickness, setWallThickness,
        cameraPosition, setCameraPosition,
        cameraAngle, setCameraAngle,
        cameraSwivel, setCameraSwivel,
        cameraDistance, setCameraDistance,
        cameraFocus, setCameraFocus,
        frustum, setFrustum,
        cameraZoom, setCameraZoom,
        panels, setPanels,
        currentId, setCurrentId,
        selectedMap, setSelectedMap,
        selectedMapData, setSelectedMapData,
        savedMaps, setSavedMaps,
        savedMapRefs, setSavedMapRefs,
        loadMap,
        currentMapRef, setCurrentMapRef,
        mapName, setMapName,
        mapDescr, setMapDescr,
        clearData,
    } = props;

    async function getUserMaps() {
        const userMaps = {};
        const result = await queryUserMaps( user )
            .then( data => {
                data.forEach( thisResult => { 
                    const pathSegs = thisResult._document.key.path.segments;
                    userMaps[ `${pathSegs[ pathSegs.length - 1 ]}` ] = { ...(thisResult.data()) };
                } );
                setSavedMaps(userMaps);
                console.log("queryUserMaps result");
                console.log(userMaps);
                return userMaps;
            })
            .catch((error) => {
                console.log(error)
            })
            return result;
      }

    switch( uiPage ) {
        default:
        case "Account":
            return (
                <Container className="justify-content-center p-2" >
                            <MapsList
                                user={user} handleClose={handleClose}
                                setShowUserModal={setShowUserModal}
                                uiPage={uiPage} setPage={setPage}
                                selectedMap={selectedMap} 
                                setSelectedMap={setSelectedMap}
                                selectedMapData={selectedMapData} 
                                setSelectedMapData={setSelectedMapData}
                                savedMaps={savedMaps} setSavedMaps={setSavedMaps}
                                savedMapRefs={savedMapRefs} setSavedMapRefs={setSavedMapRefs}
                                getUserMaps={getUserMaps} loadMap={loadMap}
                                currentMapRef={currentMapRef}
                                setCurrentMapRef={setCurrentMapRef}
                                mapName={mapName} setMapName={setMapName}
                                mapDescr={mapDescr} setMapDescr={setMapDescr}
                            />
                </Container>
            );
        case "Map Settings":
            return (
                <Container className="justify-content-center" >
                    <Row>
                        <Col>
                            
                        </Col>
                    </Row>
                </Container>
            );
        case "Create New Map":
            return (
                <Container className="justify-content-center" >
                        <NewMapForm
                            setShowUserModal={setShowUserModal}
                            setSelectedMap={setSelectedMap}
                            savedMaps={savedMaps}
                            getUserMaps={getUserMaps}
                            loadMap={loadMap}
                            setPage={setPage}
                            savedMapRefs={savedMapRefs} setSavedMapRefs={setSavedMapRefs}
                            setCurrentMapRef={setCurrentMapRef}
                            mapName={mapName} setMapName={setMapName}
                            mapDescr={mapDescr} setMapDescr={setMapDescr}
                            setPanels={setPanels}
                            clearData={clearData}
                        />
                </Container>
            );
    }
    
}

export default UserInterface;