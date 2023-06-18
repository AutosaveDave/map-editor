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
import {styles} from '../../utils/styles.js';

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


    return (
        <div
            className="modal show p-2 m-2"
            style={{ display: 'block', position: 'fixed', }}
        >
            <Modal.Dialog style={{right: 0, top:`${100-canvHeightRatio}%`, }}>
                <Modal.Header style={{...(styles.surface.secondary)}}>
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
                </Modal.Header>
                
                <Modal.Footer className="justify-content-between" style={{...(styles.surface.secondary)}}>
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
                        style={{...(styles.button.tertiary)}}
                        onClick={handleClose} 
                    >Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
            
        </div>
    );
}

export default UserModal;