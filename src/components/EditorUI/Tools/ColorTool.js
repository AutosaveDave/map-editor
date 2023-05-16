// Color Selector tool
import * as React from 'react';
import { useState } from 'react';


function ColorTool( props ) {
    const { currentColor, setCurrentColor } = props;

    function handleChange(e) {
        setCurrentColor(e.target.value);
    }

    return (
        <>
            <input type="color"
                id="colorInput1" name="colorInput1"
                value={currentColor} onChange={handleChange}/>
        </>
    );
}

export default ColorTool;