import React from "react";
import { Stack, Container, Button } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { styles } from '../../utils/styles.js';
import { useUi } from "../../context/UiContext.js";
import MapsListItems from './MapsListItems.js';

export default function MapsList() {
    
    const { setUiPage } = useUi();

    return (
        <Container fluid className="justify-content-center">
            <Stack className="p-2" xs={2}>
                <Stack className=" pl-3 pr-2 mb-2" direction='horizontal'>
                    <div className="w-25 px-3 text-start"/>
                    <div className="w-75 px-2 text-end">
                        <OverlayTrigger
                            key={'left'}
                            placement={'left'}
                            overlay={
                                <Tooltip id={`tooltip-create-map`}>
                                    Create New Map
                                </Tooltip>
                            }
                        >
                            <Button className="mt-4 mr-4"
                                onClick={ () => { setUiPage("Create New Map") } }
                                style={{...(styles.button.primary),
                                    position:'absolute',
                                    right:'36px', top:'0px',
                                }}
                            >Create</Button>
                        </OverlayTrigger>
                    </div>
                </Stack>
                <div className="" style={{overflowY:'auto', maxHeight:'60vh'}}>
                    <MapsListItems/>
                </div>
            </Stack>
        </Container>
    );
}