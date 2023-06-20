import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {styles} from '../../../utils/styles.js';

const CameraTool = ( props ) => {

    const {
        cameraPosition, setCameraPosition,
        cameraAngle, setCameraAngle,
        cameraSwivel, setCameraSwivel,
        cameraDistance, setCameraDistance,
        cameraFocus, setCameraFocus,
        frustum, setFrustum,
        cameraZoom, setCameraZoom, 
    } = props;

    const swivelIncr = 1;

    function camFocusToPos( angle, swivel ) {  // Returns approriate camera position
        return [                // based on camera angle, swivel, and distance
            cameraFocus[0] + cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.sin( swivel*Math.PI/4 ),
            cameraFocus[1] - cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.cos( swivel*Math.PI/4 ),
            cameraFocus[2] + cameraDistance * Math.cos( angle*Math.PI/4 )
        ];
    }

    function handleRotateCW(e) {
        let swivel = cameraSwivel;
        swivel += swivelIncr;
        if( swivel >= 8 ) {
            swivel = swivel - 8;
        }
        setCameraSwivel( swivel );
        setCameraPosition( camFocusToPos( cameraAngle, swivel ) );
    }
    function handleRotateCCW(e) {
        let swivel = cameraSwivel;
        swivel -= swivelIncr;
        if( swivel < 0 ) {
            swivel = swivel + 8;
        }
        setCameraSwivel( swivel );
        setCameraPosition( camFocusToPos( cameraAngle, swivel ) );
    }

    return (
        <>
        <div className="p-1" style={{ ...(styles.surface.secondary) }} >
            <Stack direction='horizontal'>
                <OverlayTrigger
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-ccw`} style={{maxWidth:'70px'}}>
                            Rotate map CCW
                        </Tooltip>
                    }
                >
                    <Button className="p-3 m-1" 
                        style={{ ...(styles.button.primary), ...(styles.bgImage.rotateCCW) }}
                        onClick={ handleRotateCCW } 
                    />
                </OverlayTrigger>
                <OverlayTrigger
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-cw`} style={{maxWidth:'70px'}}>
                            Rotate map CW
                        </Tooltip>
                    }
                >
                    <Button className="p-3 m-1" 
                        style={{ ...(styles.button.primary), ...(styles.bgImage.rotateCW) }}
                        onClick={ handleRotateCW } 
                    />
                </OverlayTrigger>
            </Stack>

        </div>
        </>
    )
}

export default CameraTool;