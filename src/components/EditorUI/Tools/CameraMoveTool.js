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
        cameraSwivel,
        cameraFocus, setCameraFocus,
        cameraAngle
    } = props;

    function MoveCameraButton( props ) {
        // dIndex is the location       0   1   2
        // of the button on a           3   4   5
        // 3x3 grid, like --->          6   7   8
        const { dIndex } = props;

        function handleClick ( e ) {
            switch( dIndex ) {
                case 0:

                    break;
                case 1:

                    break;
                case 2:

                    break;
                case 3:

                    break;
                case 4:

                    break;
                case 5:

                    break;
                case 6:

                    break;
                case 7:

                    break;
                case 8:

                    break;
                default:
            }
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
            <Container className="d-inline-block m-2 p-0" style={{position:'relative',aspectRatio:1,height:'100px'}} >
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