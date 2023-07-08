// Color Selector tool
import * as React from 'react';
import { Col } from "react-bootstrap";
import { useColorTool } from '../../../context/ColorToolContext';

export default function ColorPaletteButton( props ) {
    const { buttonColor } = props;
    const { currentColor, setCurrentColor } = useColorTool();

        let border = 'border border-secondary';
        if( buttonColor === currentColor ) {
            border='border border-dark border-3';
        }
        return (
            <Col className={`d-inline-block h-100 text-left p-1 m-0 ${border}`} xs={3} sm={2} md={1}
                onClick={ () => { setCurrentColor(buttonColor) } }
                key={`palette-btn-${buttonColor}`}
                style={ { backgroundColor: `${buttonColor}`, borderWidth: 3 } }
            />
        );
}