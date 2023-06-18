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
import UserButton from "./UserButton.js";
import MapConfigDrop from './MapConfigDrop.js';
import { useUserAuth } from '../../context/UserAuthContext.js';
import saveIcon from '../../assets/icons/save2.svg';


function UserToolBar( props ) {

    const { user } = useUserAuth();

    const { canvHeightRatio, 
        currentColor, 
        setCurrentColor, 
        setShowUserModal, 
        colorPalette, 
        setColorPalette,
        currentMapRef, setCurrentMapRef,
        mapName, setMapName,
        mapDescr, setMapDescr,
        saveCurrentMap,
        selectedMap,
        groundColor, setGroundColor,
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
            <Container fluid={true} className="w-100 m-0 px-1 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%`, backgroundColor:'#002299' }}>
                <Row className="w-100 h-100 m-0 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%` }}>
                    <Col xs={3} className="h-100 px-0" style={{ textAlign:'left' }}>
                    { user && 
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
                                        <Spinner className="d-inline-block text-align-left mx-0" variant="primary"/>
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
                                                backgroundImage:`url(${saveIcon})`, 
                                                backgroundPosition:'center', 
                                                backgroundSize:'60%', 
                                                backgroundRepeat:'no-repeat',
                                                position:'relative',
                                                align:'middle',
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
                        <UserButton setShowUserModal={setShowUserModal}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserToolBar;