import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext.js";
import { getAuth } from 'firebase/auth';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapsList from './MapsList.js';
import { queryUserMaps } from '../../utils/queries';
import {styles} from '../../utils/styles.js';
import NewMapForm from './NewMapForm.js';

function UserInterface( props ) {

    const { user, handleClose, setShowUserModal, uiPage, setPage, 
        setPanels,
        selectedMap, setSelectedMap,
        selectedMapData, setSelectedMapData,
        savedMaps, setSavedMaps,
        loadMap,
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
                <Container className="justify-content-center p-2 w-100" style={{maxHeight:'90vh'}} >
                    <MapsList
                        user={user} handleClose={handleClose}
                        setShowUserModal={setShowUserModal}
                        uiPage={uiPage} setPage={setPage}
                        selectedMap={selectedMap} 
                        setSelectedMap={setSelectedMap}
                        selectedMapData={selectedMapData} 
                        setSelectedMapData={setSelectedMapData}
                        savedMaps={savedMaps} setSavedMaps={setSavedMaps}
                        getUserMaps={getUserMaps} loadMap={loadMap}
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