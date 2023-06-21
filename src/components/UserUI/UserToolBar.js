import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ColorTool from "../EditorUI/Tools/ColorTool.js";
import UserDrop from "./UserDrop.js";
import UserButton from "./UserButton.js";
import MapConfigDrop from './MapConfigDrop.js';
import { useUserAuth } from '../../context/UserAuthContext.js';
import saveIcon from '../../assets/icons/save2.svg';
import {styles} from '../../utils/styles.js';


function UserToolBar( props ) {

    const { user } = useUserAuth();

    const { canvHeightRatio, 
        currentColor, 
        setCurrentColor, 
        colorPalette, 
        setColorPalette,
        mapName, setMapName,
        mapDescr, setMapDescr,
        saveCurrentMap,
        groundColor, setGroundColor,
        uiPage, setUiPage,
        setPanels,
        selectedMap, setSelectedMap,
        savedMaps, setSavedMaps,
        loadMap,
        clearData,
        setShowUserModal,
    } = props;

    const [savingMap, setSavingMap] = useState(false);

    function handleSave() {
        if( !savingMap ){
            setSavingMap( true );
            saveCurrentMap( user )
                .then( () => { setSavingMap( false ); })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <>
            <Container fluid={true} className="w-100 m-0 px-1 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%`, ...(styles.surface.primary) }}>
                <Row className="w-100 h-100 m-0 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%` }}>
                    <Col xs={3} className="h-100 px-0" style={{ textAlign:'left' }}>
                    { (user && !(selectedMap==="")) && 
                        <div className="justify-content-left h-100 p-0" >
                            <Stack direction='horizontal' gap={1} className="p-0 m-0 h-100">
                            
                                    <MapConfigDrop mapName={mapName} setMapName={setMapName}
                                        mapDescr={mapDescr} setMapDescr={setMapDescr}
                                        selectedMap={selectedMap}
                                        groundColor={groundColor} setGroundColor={setGroundColor}
                                        saveCurrentMap={saveCurrentMap}
                                    />
                               
                                { savingMap && 
                                    <OverlayTrigger
                                        key={'bottom'}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-saving`} >
                                                Saving Map...
                                            </Tooltip>
                                        }
                                    >
                                        <Spinner className="d-inline-block text-align-left mx-0" variant="warning"/>
                                    </OverlayTrigger>
                                }
                                { !savingMap && 
                                    <OverlayTrigger
                                        key={'bottom'}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-save-map`} >
                                                Save Map
                                            </Tooltip>
                                        }
                                    >
                                        <Button className="d-inline-block "
                                            onClick={handleSave}
                                            style={{
                                                height:'85%',
                                                aspectRatio:'1',
                                                ...(styles.bgImage.save),
                                                position:'relative',
                                                align:'middle',
                                                ...(styles.button.secondary)
                                            }}
                                        />
                                    </OverlayTrigger>
                                }
                            </Stack>
                        </div>
                    }
                    </Col>
                    <Col xs={7} className="h-100 py-0 m-0 px-1 align-middle text-center">
                        <ColorTool 
                            currentColor={currentColor} 
                            setCurrentColor={setCurrentColor}
                            colorPalette={colorPalette}
                            setColorPalette={setColorPalette}/>
                    </Col>
                    <Col xs={2} className="h-100 px-0 py-0 align-middle" style={{ textAlign:'right' }}>
                        { user && 
                            <UserDrop 
                                user={user} 
                                currentColor={currentColor} setPanels={setPanels}
                                selectedMap={selectedMap} setSelectedMap={setSelectedMap}
                                savedMaps={savedMaps} setSavedMaps={setSavedMaps}
                                loadMap={loadMap}
                                mapName={mapName} setMapName={setMapName}
                                mapDescr={mapDescr} setMapDescr={setMapDescr}
                                clearData={clearData}
                                uiPage={uiPage} setUiPage={setUiPage}
                            />
                        }
                        { !user &&
                            <UserButton 
                                user={user} 
                                currentColor={currentColor} setPanels={setPanels}
                                selectedMap={selectedMap} setSelectedMap={setSelectedMap}
                                savedMaps={savedMaps} setSavedMaps={setSavedMaps}
                                loadMap={loadMap}
                                mapName={mapName} setMapName={setMapName}
                                mapDescr={mapDescr} setMapDescr={setMapDescr}
                                clearData={clearData}
                                uiPage={uiPage} setUiPage={setUiPage}
                                setShowUserModal={setShowUserModal}
                            />
                        }
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserToolBar;