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
    } = props;

    async function getUserMaps() {
        const userMaps = [];
        const mapRefs = [];
        const result = await queryUserMaps( user )
            .then( result => {
                result.forEach( thisResult => { 
                    userMaps.push(thisResult.data());
                    const pathSegs = thisResult._document.key.path.segments;
                    mapRefs.push(pathSegs[pathSegs.length-1]);
                } );
                setSavedMaps(userMaps);
                setSavedMapRefs(mapRefs);
                console.log("queryUserMaps result");
                console.log(mapRefs);
                return mapRefs;
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
        case "Save Map":
            return (
                <Container className="justify-content-center" >
                    <Row>
                        <Col>
                            
                            {/*          

                            So...

                            You need to make a component that goes here.
                            It should have text fields for name and description
                            (user can change name/descr of map on save)
                            Also a function here or at UserModal level called
                            saveCurrentMap(). It should use the 
                            saveMap( data, mapRef, map ) function from 
                            ../../utils/mutations.

                            Also, write a loadSelectedMap() function 
                            (probably at App level).
                            loadSelectedMap() shouldn't need 
                            to query the server,
                            but instead it should use the 
                            selectedMap and 
                            selectedMapData state values

                            move uiPage and setUiPage() to App level
                            
                            */}
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
                        />
                </Container>
            );
    }
    
}

export default UserInterface;