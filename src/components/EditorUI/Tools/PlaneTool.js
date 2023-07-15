import React from 'react';
import { Form, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import {styles} from '../../../utils/styles.js';
import { useMapEditor } from '../../../context/MapEditorContext.js';
import { useMapConfig } from '../../../context/MapConfigContext.js';
import { CaretDownIcon, CaretUpIcon } from '../../icons/Icons.js';

export default function PlaneTool() {

    const { gridAxis, setGridAxis,
            gridValue, setGridValue } = useMapEditor();
    const { mapWidth, mapLength, mapHeight } = useMapConfig();

    const axisMax = [ mapWidth, mapLength, mapHeight ];
    const axisNames = [ 'X','Y','Z' ];

    function currentGridVal() {
        return gridValue;
    }

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
                <Button variant="tertiary"
                    onClick={ (e) => {
                        let gv = currentGridVal();
                        let gmax = axisMax[gridAxis];
                        setGridValue( (gv + 1) % (gmax + 1) );
                    }}
                    style={{
                        position:'absolute',
                        bottom:'100%',
                        right:'1px',
                        aspectRatio: 1,
                        width:'26px',
                        height:'26px',
                        alignContent:'middle',
                        align:'center',
                        padding:'5px'
                    }}
                >
                    <div className="d-inline-block h-100 w-100" style={{verticalAlign:'top'}} >
                        <CaretUpIcon size='100%'/>
                    </div>
                </Button>
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
                    orientation='vertical'
                    direction='vertical'
                    value={gridValue}
                    min={ 0 }
                    max={ axisMax[ gridAxis ] }
                    step={1}
                    onChange={(e) => { 
                        let gv = e.currentTarget.value;
                        setGridValue(gv); } }
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
                variant="tertiary"
                    onClick={(e) => {
                        let gv = gridValue;
                        let gmax = axisMax[gridAxis];
                        setGridValue( (gv - 1 + gmax+1) % (gmax + 1) );
                    }}
                    style={{
                        aspectRatio: 1,
                        position:'absolute',
                        top:'100%',
                        right:'1px',
                        width:'26px',
                        height:'26px',
                        alignContent:'middle',
                        align:'center',
                        padding:'5px'
                    }}
                >
                    <div className="d-inline-block h-100 w-100" style={{verticalAlign:'top'}} >
                        <CaretDownIcon size='100%'/>
                    </div>
                </Button>
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
                        variant="secondary"
                        onClick={(e) => {
                            const val = (gridAxis + 1) % 3;
                            setGridAxis(val);
                        }}
                        style={{
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
                                color:styles.colors.black,
                            }}
                        >{ axisNames[ gridAxis ] }</h2>
                    </Button>
                </OverlayTrigger>
        </>
    )

}