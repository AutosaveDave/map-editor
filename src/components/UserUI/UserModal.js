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
        loadMap
    } = props;

    const { user } = useUserAuth();
    
    const [uiPage, setUiPage] = useState("Account");
    const [selectedMap, setSelectedMap] = useState(-1);
    const [selectedMapData, setSelectedMapData] = useState({});

    function handleClose() {
        setShowUserModal(false);
    }

    const setPage = (( page ) => { return setUiPage( page ) });

    if( !user ) {
        return (
            <div
                className="modal show p-2 m-2 r"
                style={{ display: 'block', position: 'fixed' }}
            >
                <Modal.Dialog>
                    <Container>
                        <div>
                            <Row>
                                <div className='m-1 justify-content-center'>
                                    <Col>
                                        <Login setShowUserModal={setShowUserModal}/>
                                    </Col>
                                </div>
                                <div className='m-1 justify-content-center'>
                                    <Col>
                                        <Signup setShowUserModal={setShowUserModal}/>
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
                        <LogoutButton setShowUserModal={setShowUserModal} 
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
        className="modal show "
        style= {{ display:'block', position:'fixed', textAlign:'center'}}
        >
        <Modal.Dialog>
            <Modal.Header className="justify-content-center">
                <div className="d-block">
                    <h4 >{uiPage}</h4>
                    <h6 >{user.email}</h6>
                </div>
                
            </Modal.Header>

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
            />

            <Modal.Footer>
                <Container fluid className="">
                    <Row fluid className="">
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