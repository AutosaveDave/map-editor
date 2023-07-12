import React from "react";
import { Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useUserAuth } from "../../context/UserAuthContext";
import { useUi } from "../../context/UiContext";
import { useUserData } from "../../context/UserDataContext";
import { styles } from '../../utils/styles.js';

export default function CustomButton( props ) {
    const { onClick, bgColor, color } = props;
    return (
        <>
            
            <OverlayTrigger
                key={'bottom'}
                placement={'bottom'}
                overlay={
                    <Tooltip id={`tooltip-save-map`} >
                        Refresh List
                    </Tooltip>
                }
            >
                <Button className="d-inline-block "
                    onClick={onClick}
                    style={{
                        height:'38px',
                        aspectRatio:'1',
                        ...(styles.bgImage.refresh),
                        position:'absolute',
                        left:'36px', top:'24px',
                        align:'middle',
                        // ...(styles.button.tertiary)
                        
                    }}
                />
            </OverlayTrigger>
        </>
    );
};