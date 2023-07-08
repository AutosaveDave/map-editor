import React from 'react';
import { styles } from '../../utils/styles.js';
import { useMapInfo } from '../../context/MapInfoContext.js';

export default function MapNameDisplay() {

    const { mapName } = useMapInfo();

    return (
        <h5 style={{ ...(styles.pos.abs.br) }} >{mapName}</h5>
    )
}