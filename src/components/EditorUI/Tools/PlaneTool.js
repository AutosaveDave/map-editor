import React from 'react';
import { Form, Stack } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {styles} from '../../../utils/styles.js';

const PlaneTool = ( props ) => {

    const { 
        gridAxis, setGridAxis,
        gridValue, setGridValue,
        mapWidth, mapLength, mapHeight,
    } = props;

    const axisMax = [ mapWidth, mapLength, mapHeight ];
    const axisNames = [ 'X','Y','Z' ];
    return (
        <>
            <OverlayTrigger
                key={'tooltip-grid'}
                placement={'left'}
                overlay={
                    <Tooltip id={`tooltip-grid`} >
                        Move Grid
                    </Tooltip>
                }
            >
                <Button className=""
                    onClick={(e) => {
                        const val = gridValue-1;
                        if(val >= 0)
                            setGridValue(val);
                    }}
                    style={{
                        ...(styles.button.secondary),
                        ...(styles.bgImage.gridValUp),
                        position:'absolute',
                        bottom:'100%',
                        right:0,
                        aspectRatio: 1,
                        width:'26px',
                    }}
                />
            </OverlayTrigger>

            <OverlayTrigger
                key={'tooltip-grid-range'}
                placement={'left'}
                overlay={
                    <Tooltip id={`tooltip-grid-range`}  >
                        Move Grid
                    </Tooltip>
                }
            >
                <Form.Control
                    className="plane-tool"
                    type="range"
                    value={gridValue}
                    min={ 0 }
                    max={ axisMax[ gridAxis ] }
                    step={1}
                    onChange={(e) => setGridValue(e.target.value)}
                    style={{
                        backgroundColor:styles.colors.lightTeal,
                    }}
                />
            </OverlayTrigger>
            <OverlayTrigger
                key={'tooltip-grid3'}
                placement={'left'}
                overlay={
                    <Tooltip id={`tooltip-grid3`} >
                        Move Grid
                    </Tooltip>
                }
            >
                <Button className=""
                    
                    onClick={(e) => {
                        const val = gridValue + 1;
                        if(val <= axisMax[gridAxis])
                            setGridValue(val);
                    }}
                    style={{
                        ...(styles.button.secondary),
                        ...(styles.bgImage.gridValDown),
                        aspectRatio: 1,
                        position:'absolute',
                        top:'100%',
                        right:0,
                        width:'26px',
                    }}
                />
            </OverlayTrigger>
                <OverlayTrigger
                    key={'tooltip-axis'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip-axis`} >
                            Switch Current Axis
                        </Tooltip>
                    }
                >
                    <Button className=""
                        
                        onClick={(e) => {
                            const val = (gridAxis + 1) % 3;
                            setGridAxis(val);
                        }}
                        style={{
                            ...(styles.button.tertiary),
                            ...(styles.bgImage.axis),
                            aspectRatio: 1,
                            position:'absolute',
                            bottom:'-68px',
                            right:0,
                            width:'36px',
                            textAlign:'center',
                            verticalAlign:'text-bottom',
                        }}
                    >
                        <h2 className=""
                            style={{
                                position:'absolute',
                                width:'auto',
                                height:'auto',
                                top:'-2px',
                                bottom:0,
                                right:0,
                                left:0,
                                textAlign:'center',
                                fontWeight:'bold',
                                color:styles.colors.vanilla,
                            }}
                        >{ axisNames[ gridAxis ] }</h2>
                    </Button>
                </OverlayTrigger>
        </>
    )

}

export default PlaneTool;