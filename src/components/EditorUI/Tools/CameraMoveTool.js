import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {styles} from '../../../utils/styles.js';
import { useMapCamera } from '../../../context/MapCameraContext.js';
import { useMapConfig } from '../../../context/MapConfigContext.js';
import { MoveCameraIcon, CameraIcon } from '../../icons/Icons.js';

export default function CameraMoveTool() {
    const { camFocusToPos2,
        setCameraPosition,
        cameraSwivel, 
        cameraFocus, setCameraFocus,
        cameraAngle
    } = useMapCamera();

    const { mapWidth, mapLength } = useMapConfig();

    function handleCenterClick(e) {
        const camFocus = [
            Math.floor(mapWidth/2), 
            Math.floor(mapLength/2),
            cameraFocus[2]
        ];
        setCameraFocus(camFocus);
        setCameraPosition( camFocusToPos2( cameraAngle, cameraSwivel, camFocus ) );
    }

    function MoveCameraButton( props ) {
        // dIndex is the location       0   1   2
        // of the button on a           3  (4)  5
        // 3x3 grid, like --->          6   7   8
        const { dIndex } = props;

        function handleClick ( e ) {
            let dx = 0;
            let dy = 0;
            switch( dIndex ) {
                case 0:     // Up-Left
                    if( cameraSwivel === 1 ) { dx = -1; }
                    else if( cameraSwivel === 3 ) { dy = -1; }
                    else if( cameraSwivel === 5 ) { dx = 1; }
                    else if( cameraSwivel === 7 ) { dy = 1; }
                    break;
                case 1:     // Up
                    if( cameraSwivel === 0 ) { dy = 1; }
                    else if( cameraSwivel === 2 ) { dx = -1; }
                    else if( cameraSwivel === 4 ) { dy = -1; }
                    else if( cameraSwivel === 6 ) { dx = 1; }
                    break;
                case 2:     // Up-Right
                    if( cameraSwivel === 1 ) { dy = 1; }
                    else if( cameraSwivel === 3 ) { dx = -1; }
                    else if( cameraSwivel === 5 ) { dy = -1; }
                    else if( cameraSwivel === 7 ) { dx = 1; }
                    break;
                case 3:     // Left
                    if( cameraSwivel === 0 ) { dx = -1; }
                    else if( cameraSwivel === 2 ) { dy = -1; }
                    else if( cameraSwivel === 4 ) { dx = 1; }
                    else if( cameraSwivel === 6 ) { dy = 1; }
                    break;
                case 5:     // Right
                    if( cameraSwivel === 0 ) { dx = 1; }
                    else if( cameraSwivel === 2 ) { dy = 1; }
                    else if( cameraSwivel === 4 ) { dx = -1; }
                    else if( cameraSwivel === 6 ) { dy = -1; }
                    break;
                case 6:     // Down-Left
                    if( cameraSwivel === 1 ) { dy = -1; }
                    else if( cameraSwivel === 3 ) { dx = 1; }
                    else if( cameraSwivel === 5 ) { dy = 1; }
                    else if( cameraSwivel === 7 ) { dx = -1; }
                    break;
                case 7:     // Down
                    if( cameraSwivel === 0 ) { dy = -1; }
                    else if( cameraSwivel === 2 ) { dx = 1; }
                    else if( cameraSwivel === 4 ) { dy = 1; }
                    else if( cameraSwivel === 6 ) { dx = -1; }
                    break;
                case 8:     // Down-Right
                    if( cameraSwivel === 1 ) { dx = 1; }
                    else if( cameraSwivel === 3 ) { dy = 1; }
                    else if( cameraSwivel === 5 ) { dx = -1; }
                    else if( cameraSwivel === 7 ) { dy = -1; }
                    break;
                default:
            }
            let camFocus = cameraFocus;
            if( camFocus[0] + dx >= 0  && camFocus[0] + dx <= mapWidth ) {
                camFocus[0] += dx;
            }
            if( camFocus[1] + dy >= 0  && camFocus[1] + dy <= mapLength ) {
                camFocus[1] += dy;
            }
            setCameraFocus(camFocus);
            setCameraPosition( camFocusToPos2( cameraAngle, cameraSwivel, camFocus ) );
        }

        const camSwivelOdd = !( cameraSwivel / 2 === Math.floor( cameraSwivel / 2 ) );
        const dIndexEven = ( dIndex / 2 === Math.floor( dIndex / 2 ) );

        if( (camSwivelOdd && dIndexEven) || (!camSwivelOdd && !dIndexEven) ) {
            return ( 
                <>
                    <Button className="p-1 align-content-middle" variant="tertiary"
                        style={{ 
                            position:'relative',
                            aspectRatio:1,
                            height:'100%',
                            
                            //...(styles.button.secondary),
                            //...(styles.bgImage.moveCamImage[dIndex]), 
                        }} 
                        onClick={ handleClick }
                    >
                        <MoveCameraIcon dIndex={dIndex} size="100%" />
                    </Button>
                </>
            );
        }
        return (
            <>
            <div/>
            </>
        )
    }

    return (
        <>
            <Container className="d-inline-block p-0" style={{ ...(styles.surface.primary),position:'relative',aspectRatio:1,height:'100px'}} >
                <Row xs={{ cols: 3 }} style={{height:'33%', width:'100%'}}>
                    <Col >
                        <MoveCameraButton dIndex={ 0 }/>
                    </Col>
                    <Col >
                        <MoveCameraButton dIndex={ 1 } />
                    </Col>
                    <Col >
                        <MoveCameraButton dIndex={ 2 } />
                    </Col>
                </Row>
                <Row xs={{ cols: 3 }} style={{height:'33%', width:'100%'}}>
                    <Col >
                        <MoveCameraButton dIndex={ 3 } />
                    </Col>
                    <Col >
                        <Button className="p-1" variant="primary"
                            onClick={handleCenterClick}
                            style={{
                                position:'relative',
                                aspectRatio:1,
                                height:'100%',
                                borderRadius:'50%',
                            }}
                        >
                            <CameraIcon size="100%" />
                        </Button>
                    </Col>
                    <Col >
                        <MoveCameraButton dIndex={ 5 } />
                    </Col>
                </Row>
                <Row xs={{ cols: 3 }} style={{height:'33%', width:'100%'}} >
                    <Col >
                        <MoveCameraButton dIndex={ 6 } />
                    </Col>
                    <Col >
                        <MoveCameraButton dIndex={ 7 } />
                    </Col>
                    <Col >
                        <MoveCameraButton dIndex={ 8 } />
                    </Col>
                </Row>
            </Container>
        </>
    )

}