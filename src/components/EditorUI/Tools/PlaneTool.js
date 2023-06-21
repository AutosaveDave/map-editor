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

    return (
        <>
            
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

                <Form.Control
                    className="plane-tool"
                    type="range"
                    value={gridValue}
                    min={0}
                    max={ axisMax[ gridAxis ] }
                    step={1}
                    onChange={(e) => setGridValue(e.target.value)}
                    style={{
                        backgroundColor:styles.colors.lightTeal,
                    }}
                />
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
        </>
    )

}

export default PlaneTool;