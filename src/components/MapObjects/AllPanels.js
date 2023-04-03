// Component for floor and wall objects on map
import React, { useRef } from "react";
import Panel from "./Panel";

const AllPanels = ( props ) => {
    const allPanels = useRef();
    const { panels, setPanels } = props;
    
    return (
        <>
            <group ref={allPanels}>
            { panels.map( ( thisPanel, i ) => (
                <Panel thisPanel={thisPanel} panels={panels} setPanels={setPanels} key={`panel${i}`} />
            ))}
            </group>
        </>
    );

}

export default AllPanels;