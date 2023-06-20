import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Container, Row, Col } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {styles} from '../../../utils/styles.js';

const CameraMoveTool = ( props ) => {
    const { camFocusToPos,
        cameraPosition, setCameraPosition,
        cameraSwivel, setCameraSwivel,
        cameraFocus, setCameraFocus,
        cameraAngle,
        mapWidth, mapLength
    } = props;

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
            setCameraPosition( camFocusToPos( cameraAngle, cameraSwivel ) );
        }

        const camSwivelOdd = !( cameraSwivel / 2 === Math.floor( cameraSwivel / 2 ) );
        const dIndexEven = ( dIndex / 2 === Math.floor( dIndex / 2 ) );

        if( (camSwivelOdd && dIndexEven) || (!camSwivelOdd && !dIndexEven) ) {
            return ( 
                <>
                    <Button className="" 
                        style={{ 
                            position:'relative',
                            aspectRatio:1,
                            height:'100%',
                            ...(styles.button.secondary),
                            ...(styles.bgImage.moveCamImage[dIndex]), 
                        }} 
                        onClick={ handleClick }
                    />
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
            <Container className="d-inline-block p-0" style={{ ...(styles.surface.secondary), ...(styles.bgImage.camTool),position:'relative',aspectRatio:1,height:'100px'}} >
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
                <Row fluid xs={{ cols: 3 }} style={{height:'33%', width:'100%'}}>
                    <Col >
                        <MoveCameraButton dIndex={ 3 } />
                    </Col>
                    <Col >
                        <div />
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

export default CameraMoveTool;