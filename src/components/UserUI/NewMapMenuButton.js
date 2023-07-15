import React from "react";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useUi } from "../../context/UiContext";
import { LightBulbIcon } from "../icons/Icons";
import { styles } from '../../utils/styles.js';

export default function NewMapMenuButton() {

    const { uiPage, setUiPage } = useUi();
    if( uiPage === "Account" )
        return (
            <>
                <OverlayTrigger
                    key={'left'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip-create-map`}>
                            Create New Map
                        </Tooltip>
                    }
                >
                    <Button className="p-1"
                        variant="primary"
                        onClick={ () => { setUiPage("Create New Map") } }
                        style={{
                            height:'38px',
                            aspectRatio:'1',
                            align:'middle',
                        }}
                    >
                        <LightBulbIcon size='100%' />
                    </Button>
                </OverlayTrigger>
            </>
        );
    return (<div/>);
};