import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
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
        selectedMap
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
            <Container fluid={true} className="w-100 m-0 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%` }}>
                <Row className="w-100 h-100 m-0 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%` }}>
                    <Col xs={4} className="h-100 px-0" style={{ textAlign:'left' }}>
                    { user && 
                        <div className="justify-content-left h-100 p-1" >
                            <Stack direction='horizontal' className="p-0 m-0">
                                <MapConfigDrop mapName={mapName} setMapName={setMapName}
                                    mapDescr={mapDescr} setMapDescr={setMapDescr}
                                    selectedMap={selectedMap}
                                />
                                { savingMap && 
                                    <Spinner className="mx-3" variant="primary"/>
                                }
                                { !savingMap && 
                                    <Button className="d-inline-block p-2 py-3 h-100"
                                        onClick={handleSave}
                                        style={{
                                            backgroundImage:`url(${saveIcon})`, 
                                            backgroundPosition:'center', 
                                            backgroundSize:'60%', 
                                            backgroundRepeat:'no-repeat'
                                        }}
                                    >
                                        <div className="px-2 h-100"/>
                                    </Button>
                                }
                            </Stack>
                            
                        </div>
                    }
                    </Col>
                    <Col xs={5} className="h-100 py-0 m-0 px-1 align-middle text-center">
                        <ColorTool 
                            currentColor={currentColor} 
                            setCurrentColor={setCurrentColor}
                            colorPalette={colorPalette}
                            setColorPalette={setColorPalette}/>
                    </Col>
                    <Col xs={3} className="h-100 px-0 py-1 align-middle" style={{ textAlign:'right' }}>
                        <UserButton setShowUserModal={setShowUserModal}/>
                    </Col>

                </Row>
                
                <UserButton setShowUserModal={setShowUserModal} canvHeightRatio={canvHeightRatio}/>
            </Container>
        </>
    );
}

export default UserToolBar;