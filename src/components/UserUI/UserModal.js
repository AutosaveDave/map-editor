import Modal from 'react-bootstrap/Modal';
import { useUserAuth } from "../../context/UserAuthContext.js";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import Login from "./Login.js";
import Signup from "./SignupForm.js";
import LogoutButton from "./LogoutButton.js";
import UserInterface from './UserInterface.js';

function UserModal( props ) {

    const { setShowUserModal, 
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
        savedMaps, setSavedMaps,
        savedMapRefs, setSavedMapRefs,
        currentMapRef, setCurrentMapRef,
        mapName, setMapName,
        mapDescr, setMapDescr,
        loadMap,
        uiPage, setUiPage,
        selectedMap, setSelectedMap,
        selectedMapData, setSelectedMapData,
        canvHeightRatio,
        clearData
    } = props;

    const { user } = useUserAuth();

    function handleClose() {
        setShowUserModal(false);
    }

    const setPage = (( page ) => { return setUiPage( page ) });

    if( !user ) {
        return (
            <div
                className="modal show p-2 m-2"
                style={{ display: 'block', position: 'fixed' }}
            >
                <Modal.Dialog style={{right: 0, top:`${100-canvHeightRatio}%`}}>
                    <Container>
                        <div>
                            <Row>
                                <div className='m-1 justify-content-center'>
                                    <Col>
                                        <Login setShowUserModal={setShowUserModal} setPage={setPage} />
                                    </Col>
                                </div>
                                <div className='m-1 justify-content-center'>
                                    <Col>
                                        <Signup setShowUserModal={setShowUserModal} setPage={setPage}/>
                                    </Col>
                                </div>
                                
                            </Row>
                        </div>
                    </Container>
                    <Modal.Footer className="justify-content-between">
                        <Container className="d-inline-block w-100 h-100">
                            { !( uiPage === "Account" ) &&
                                <Button className="mx-1 mb-3" 
                                    variant="primary" 
                                    onClick={ () => setPage("Account") } 
                                >Back</Button> 
                            }
                        </Container>
                        <LogoutButton setShowUserModal={setShowUserModal} clearData={clearData} setPage={setPage}
                            className="d-inline-block m-3 "
                        />
                        <Button className="d-inline-block mx-1 mb-3" 
                            variant="secondary" 
                            onClick={handleClose} 
                        >Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                
            </div>
        );
    }
    return (
        <div
        className="modal show"
        style= {{ display:'block', position:'fixed' }}
        >
        <Modal.Dialog className="m-0 w-100" xs={{maxWidth:'100%'}} md={{maxWidth:'90%'}} lg={{maxWidth:'80%'}} xl={{maxWidth:'70%'}} xxl={{maxWidth:'40%'}} scrollable={true} style={{ display:'block', position:'absolute', right: 0, top:`${100-canvHeightRatio}%`, height:`${canvHeightRatio}%` }}>
            <Modal.Header className="justify-content-center text-center">
                <div className="">
                    <h4 >{uiPage}</h4>
                    <h6 >{user.email}</h6>
                </div>
                
            </Modal.Header>

            <Modal.Body className="mt-0 pt-1">
                <UserInterface user={user} handleClose={handleClose} setShowUserModal={setShowUserModal} uiPage={uiPage} setPage={setPage} 
                    currentColor={currentColor} aspectRatio={aspectRatio}
                    gridAxis={gridAxis} setGridAxis={setGridAxis}
                    gridValue={gridValue} setGridValue={setGridValue}
                    tileSize={tileSize} setTileSize={setTileSize}
                    mapWidth={mapWidth} setMapWidth={setMapWidth}
                    mapLength={mapLength} setMapLength={setMapLength}
                    mapHeight={mapHeight} setMapHeight={setMapHeight}
                    wallThickness={wallThickness} setWallThickness={setWallThickness}
                    cameraPosition={cameraPosition} setCameraPosition={setCameraPosition}
                    cameraAngle={cameraAngle} setCameraAngle={setCameraAngle}
                    cameraSwivel={cameraSwivel} setCameraSwivel={setCameraSwivel}
                    cameraDistance={cameraDistance} setCameraDistance={setCameraDistance}
                    cameraFocus={cameraFocus} setCameraFocus={setCameraFocus}
                    frustum={frustum} setFrustum={setFrustum}
                    cameraZoom={cameraZoom} setCameraZoom={setCameraZoom}
                    panels={panels} setPanels={setPanels}
                    currentId={currentId} setCurrentId={setCurrentId}
                    selectedMap={selectedMap} setSelectedMap={setSelectedMap}
                    selectedMapData={selectedMapData} setSelectedMapData={setSelectedMapData}
                    savedMaps={savedMaps} setSavedMaps={setSavedMaps}
                    savedMapRefs={savedMapRefs} setSavedMapRefs={setSavedMapRefs}
                    loadMap={loadMap}
                    currentMapRef={currentMapRef} setCurrentMapRef={setCurrentMapRef}
                    mapName={mapName} setMapName={setMapName}
                    mapDescr={mapDescr} setMapDescr={setMapDescr}
                    clearData={clearData}
                />
            </Modal.Body>

            <Modal.Footer className="px-4 mx-2">
                <Container fluid className="">
                    <Row className="">
                        <Col className="text-start">

                            { !( uiPage === "Account" ) &&
                                <Button className="d-inline-block mx-1 mb-3" 
                                    variant="primary" 
                                    onClick={ () => setPage("Account") } 
                                >Back</Button> 
                            }
                        </Col>
                        <Col className="text-center">
                            <LogoutButton setShowUserModal={setShowUserModal} 
                                clearData={clearData} setPage={setPage}
                                className="d-inline-block m-3 justify-content-center"
                            />

                        </Col>
                        <Col className="text-end">
                            <Button className="d-inline-block mx-1 mb-3" 
                                variant="secondary" 
                                onClick={handleClose} 
                            >Close</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
    );
}

export default UserModal;