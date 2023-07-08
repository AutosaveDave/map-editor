// Component for floor and wall objects on map
import React, { useRef } from "react";
import Panel from "./Panel";
import { useMapPanels } from "../../context/MapPanelsContext";

export default function AllPanels() {
    const allPanels = useRef();
    const { panels } = useMapPanels();
    
    return (
        <>
            <group ref={allPanels}>
            { panels.map( ( thisPanel, i ) => (
                <Panel thisPanel={thisPanel} key={`panel${i}`} />
            ))}
            </group>
        </>
    );
}