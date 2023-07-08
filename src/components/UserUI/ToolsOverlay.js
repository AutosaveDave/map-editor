import React from 'react';
import { styles } from '../../utils/styles.js';
import CameraTool from '../EditorUI/Tools/CameraTool.js';
import PlaneTool from '../EditorUI/Tools/PlaneTool.js';
import MapNameDisplay from './MapNameDisplay.js';
import { useSizing } from '../../context/SizingContext.js';

export default function ToolsOverlay() {

    const { toolBarHeight } = useSizing();

    return (
        <>
        <MapNameDisplay />
        <div style={{ ...(styles.pos.abs.bl) }} >
          <CameraTool/>
        </div>
        <div style={{ ...(styles.pos.abs.rs), top:`${toolBarHeight() + 32}px`, bottom: `${toolBarHeight() + 32 + 48 }px` }} >
          <PlaneTool toolBarHeight={toolBarHeight} />
        </div>
        </>
    )
}
