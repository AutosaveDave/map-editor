import * as React from 'react';
import Button from 'react-bootstrap/Button';

function PaletteButton( props ) {
    const { setCurrentColor, buttonColor } = props;

    function handleChange(e) {
        setCurrentColor(e.target.value);
    }

    function handleClick() {
        setCurrentColor(buttonColor);
    }

    return (
        <>
            <Button className="m-1" variant="primary" onClick={handleClick} style={{ backgroundColor:`${buttonColor}` }} >+</Button>
        </>
    );
}

export default PaletteButton;