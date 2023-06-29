import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import userIcon from '../../assets/icons/person-circle.svg';
import { useUserAuth } from "../../context/UserAuthContext";
import LogoutButton from "./LogoutButton.js";
import UserInterface from './UserInterface.js';
import {styles} from '../../utils/styles.js';

function UserDrop( props ) {
    const { 
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
        mapName, setMapName,
        mapDescr, setMapDescr,
        loadMap,
        uiPage, setUiPage,
        selectedMap, setSelectedMap,
        clearData, user
    } = props;

    const setPage = (( page ) => { return setUiPage( page ) });

    const dropWidth = () => {
        if( window.innerWidth <= 576 ) return '100vw';
        if( window.innerWidth <= 768 ) return '90vw';
        if( window.innerWidth <= 992 ) return '65vw';
        if( window.innerWidth <= 1200 ) return '50vw';
        if( window.innerWidth <= 1400 ) return '40vw';
        return '25vw';
    }
    if(user) {
        return (
            <Dropdown className="">
                <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-map-settings`} >
                            User Console
                        </Tooltip>
                    }
                >
                    <Dropdown.Toggle className="text-end m-0 py-1 px-2" variant="primary" id="dropdown-basic"
                        style={{ 
                            maxWidth:'80px',
                            minWidth:'52px',
                            backgroundImage: `url(${userIcon})`, 
                            backgroundBlendMode:'difference',
                            backgroundRepeat:'no-repeat',
                            backgroundSize:'auto 70%',
                            backgroundPositionY: 'center',
                            backgroundPositionX:'20%',
                            backgroundOrigin:'padding-box',
                            ...(styles.button.primary)
                        }}
                    />
                </OverlayTrigger>

                <Dropdown.Menu className="m-0"
                    style={{ 
                        width: dropWidth(),
                        ...(styles.button.secondary),
                        
                    }}
                >
                    <Stack>

                        <div className="w-100" style={{textAlign:'center'}}>
                            <h4 >{uiPage}</h4>
                            <h6 >{user.email}</h6>
                        </div>

                        <hr className='m=0 p-0' style={{ border:`4px solid ${styles.colors.maroon}`}}/>
                        { user && 
                            <div >
                                <UserInterface user={user}  uiPage={uiPage} setPage={setPage} 
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
                                    savedMaps={savedMaps} setSavedMaps={setSavedMaps}
                                    loadMap={loadMap}
                                    mapName={mapName} setMapName={setMapName}
                                    mapDescr={mapDescr} setMapDescr={setMapDescr}
                                    clearData={clearData}
                                />
                            </div>
                        }
                        
                        <div>
                            <Stack xs={3} className='justify-content-between align-items-middle' direction='horizontal'>
                                <div className="d-inline-block px-3 h-100" xs={1}>
                                    { !( uiPage === "Account" ) &&
                                        <Button className="" 
                                            variant="primary" 
                                            onClick={ () => setPage("Account") } 
                                            style={{...(styles.button.tertiary)}}
                                        >Back</Button> 
                                    }
                                </div>
                                <div className="d-inline-block px-3 mx-4 pb-2 h-100" xs={1}>
                                    <LogoutButton 
                                        clearData={clearData} setPage={setPage}
                                        className="d-inline-block justify-content-center"
                                    />
                                </div>
                                
                            </Stack>
                        </div>
                    </Stack>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (<></>);
    }
}

export default UserDrop;