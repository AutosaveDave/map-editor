// Color Selector tool
import * as React from 'react';
import { Container, Row } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useColorTool } from '../../../context/ColorToolContext';
import ColorPaletteButton from './ColorPaletteButton';

export default function ColorPalette() {

    const { colorPalette } = useColorTool();

    return (
        <>
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
                    {colorPalette.map( (buttonColor) => (
                        <ColorPaletteButton buttonColor={buttonColor}/>
                    ))}
                </Row>
            </Container>
        </OverlayTrigger>
        </>
    );
}