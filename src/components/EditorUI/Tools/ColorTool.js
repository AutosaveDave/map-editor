// Color Selector tool
import * as React from 'react';
import { useState } from 'react';
import { Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PaletteButton from './PaletteButton';
import {styles} from '../../../utils/styles.js';
import addIcon from '../../../assets/icons/plus-circle.svg';

function ColorTool( props ) {
    const { currentColor, setCurrentColor, colorPalette, setColorPalette, toolBarHeight } = props;

    const [paletteSize,setPaletteSize] = useState(0);

    function handleChange(e) {
        setCurrentColor(e.target.value);
    }

    function isColorInPalette(color) {
        for( let a = 0 ; a < colorPalette.length ; a+=1 ){
            if( colorPalette[a] === color ) {
                return true;
            }
        }
        return false;
    }

    function handleAddColor() {
        if( !isColorInPalette(currentColor) ) {
            const tempPalette = colorPalette;
            tempPalette.push(currentColor);
            setColorPalette(tempPalette);
            setPaletteSize(tempPalette.length);
        }
        
    }

    return (
        <>
                <Container className="m-0 py-0 px-1 h-100 align-middle" style={{...(styles.surface.secondary)}} >
                    <Row className="w-100 h-100 m-0 p-0 align-middle" >
                        <Col className="h-100 p-0 m-0 align-middle text-center" xs={2} >
                            <div className="w-100 h-100">
                                <OverlayTrigger
                                    key={'bottom'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-select-color`} >
                                            Select Color
                                        </Tooltip>
                                    }
                                >
                                    <Form.Control
                                        className="w-100 m-0 p-0"
                                        type="color"
                                        value={currentColor}
                                        onChange={(e) => setCurrentColor(e.target.value)}
                                        style={{
                                            position:'relative',
                                            height:`${ toolBarHeight() - 6 }px`,
                                            top:'3px',
                                            backgroundColor:currentColor,
                                            borderColor:currentColor,
                                            borderWidth:'3px',
                                            borderStyle:'outset'
                                        }}
                                    />
                                </OverlayTrigger>
                            </div>
                        </Col>
                        <Col className="d-inline-block h-100 p-0 mx-2 my-0 align-middle" xs='auto'>
                            <div className="d-inline-block text-center m-0 p-0 h-100 w-100">
                                <OverlayTrigger
                                    key={'bottom'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-add-color`} >
                                            Add to Palette
                                        </Tooltip>
                                    }
                                >
                                    <Button 
                                        className="p-0" 
                                        variant="primary" 
                                        onClick={handleAddColor}
                                        style={{
                                            position:'relative',
                                            
                                            height:`${toolBarHeight()-10}px`,
                                            width:`${toolBarHeight()-10}px`,
                                            top:'5px',
                                            ...(styles.bgImage.addColor),
                                            borderRadius:'50%',
                                            ...(styles.button.primary)
                                        }}
                                    />
                                </OverlayTrigger>
                            </div>
                        </Col>
                        <Col className="d-inline-block h-100 p-0 m-0 align-middle" >
                            <OverlayTrigger
                                key={'bottom'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-palette-color`} >
                                        Color Palette
                                    </Tooltip>
                                }
                            >
                                <Container fluid className="h-100 w-100 p-0 m-0">
                                    <Row className="w-100 h-50 m-0 p-0 align-middle" >
                                        {colorPalette.map( (buttonColor) => {
                                            let border = 'border border-secondary';
                                            if( buttonColor === currentColor ) {
                                                border='border border-dark border-3';
                                            }
                                            return (
                                            
                                                <Col className={`d-inline-block h-100 text-left p-1 m-0 ${border}`} xs={3} sm={2} md={1}
                                                    onClick={ () => { setCurrentColor(buttonColor) } }
                                                    key={`palette-btn-${buttonColor}`}
                                                    style={ { 
                                                        backgroundColor: `${buttonColor}`,
                                                        borderWidth:3
                                                    } }
                                                >
                                                </Col>
                                            
                                        );
                                        })}
                                    </Row>
                                </Container>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Container>
        </>
    );
}

export default ColorTool;