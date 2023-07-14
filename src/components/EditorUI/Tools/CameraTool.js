import React from 'react';
import Stack from 'react-bootstrap/Stack';
import CameraMoveTool from './CameraMoveTool.js';
import { useMapCamera } from '../../../context/MapCameraContext.js';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {styles} from '../../../utils/styles.js';
import { RotateCCWIcon, RotateCWIcon } from '../../icons/Icons.js';

export default function CameraTool() {

    const {
        setCameraPosition,
        cameraAngle,
        cameraSwivel, setCameraSwivel,
        cameraFocus,
        camFocusToPos2
    } = useMapCamera();

    const swivelIncr = 1;

    function handleRotateCW(e) {
        let swivel = cameraSwivel;
        swivel += swivelIncr;
        if( swivel >= 8 ) {
            swivel = swivel - 8;
        }
        setCameraSwivel( swivel );
        setCameraPosition( camFocusToPos2( cameraAngle, swivel, cameraFocus ) );
    }
    function handleRotateCCW(e) {
        let swivel = cameraSwivel;
        swivel -= swivelIncr;
        if( swivel < 0 ) {
            swivel = swivel + 8;
        }
        setCameraSwivel( swivel );
        setCameraPosition( camFocusToPos2( cameraAngle, swivel, cameraFocus ) );
    }

    return (
        <>
        <div className="p-1" >
            <Stack direction='vertical' className="p-2 justify-content-center" 
                    style={{ ...(styles.surface.secondary)}}
            >
                <Stack direction='horizontal' className="mb-3 justify-content-between">
                    <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-ccw`} style={{maxWidth:'70px'}}>
                                Rotate map CCW
                            </Tooltip>
                        }
                    >
                        <Button className="d-inline-block p-1 " variant="secondary"
                            style={{
                                aspectRatio:1,
                                height:'32px',
                            }}
                            onClick={ handleRotateCCW } 
                        >
                            <RotateCCWIcon />
                        </Button>
                    </OverlayTrigger>
                    
                    <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-cw`} style={{maxWidth:'70px'}}>
                                Rotate map CW
                            </Tooltip>
                        }
                    >
                        <Button className="d-inline-block p-1" onClick={ handleRotateCW } 
                            variant="secondary"
                            style={{
                                aspectRatio:1,
                                height:'32px',
                            }}
                        >
                            <RotateCWIcon size="100%" />
                        </Button>
                    </OverlayTrigger>
                </Stack>
                    <CameraMoveTool />
            </Stack>
        </div>
        </>
    );
}