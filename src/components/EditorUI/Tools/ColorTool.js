// Color Selector tool
import * as React from 'react';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ColorPalette from './ColorPalette';
import { useColorTool } from '../../../context/ColorToolContext';
import { useSizing } from '../../../context/SizingContext';
import {styles} from '../../../utils/styles.js';

export default function ColorTool() {

    const { currentColor, setCurrentColor, handleAddColor } = useColorTool();

    const { toolBarHeight } = useSizing();

    return (
        <>
        <Container className="m-0 py-0 px-1 h-100 align-middle" 
                    style={{...(styles.surface.secondary)}} 
        >
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
                    <ColorPalette/>
                </Col>
            </Row>
        </Container>
        </>
    );
}