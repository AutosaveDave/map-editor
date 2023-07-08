import React from "react";
import { Stack, Container, Button, Row, Col } from 'react-bootstrap';
import { useUserData } from "../../context/UserDataContext.js";
import {styles} from '../../utils/styles.js';

export default function MapListItem( props ) {
    const { 
        mapId, 
        name, descr, 
        lastEdited, createdOn, 
        colorPalette,
    } = props;

    const { selectedMap, setSelectedMap,
            savedMaps, loadMap } = useUserData();

    function handleMapClick( thisMapRef ) {
        setSelectedMap(thisMapRef); 
        loadMap(savedMaps[thisMapRef]);
    }

    function listItemStyle( selected, mapIndex ) {
        if( selected === mapIndex ) {
            return styles.button.primary;
        }
        return styles.button.tertiary;
    }

    return (
        <Container className="">
            <Button className="w-100 p-1 m-1" 
                style={{ ...(listItemStyle(selectedMap, mapId)) }}
                onClick={(e) => { e.preventDefault(); handleMapClick(mapId); } }
            >
                <Stack direction='horizontal' className="">
                    <Stack className="text-start justify-content-between" >
                        <div className="">
                            <h5 className="mt-0">{name}</h5>
                        </div>
                        <div className="">
                            <p className="mb-0" style={{ verticalAlign:'end' }}>{descr}</p>
                        </div>
                    </Stack>
                    <Stack className="text-end justify-content-between">
                        <div>
                            <p className="m-0 p-0 mb-1">{createdOn} 💡</p>
                        </div>
                        <div className="justify-content-end">
                            <Container fluid={true} className="w-100 p-0 m-0">
                                <Row className="w-100 justify-content-end p-0 m-0" >
                                    { colorPalette && 
                                        colorPalette.map( ( buttonColor, i ) => {
                                            return (
                                                <Col className={'d-inline-block h-100 p-1 m-0'} xs={1} 
                                                    key={`map-palette-${name}-${i}`}
                                                    style={{ 
                                                        backgroundColor: `${buttonColor}`,
                                                        minHeight: '16px',
                                                        maxHeight: '48px'}}
                                                >
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </Container>
                        </div>
                        <div>
                            <p className="m-0 p-0 mt-1" 
                                style={{ verticalAlign:'end' }}
                            >{lastEdited} 💾</p>
                        </div>
                    </Stack>
                </Stack>
            </Button>
        </Container>
    );
}

