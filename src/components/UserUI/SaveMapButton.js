import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useUserAuth } from "../../context/UserAuthContext";
import { useUserData } from "../../context/UserDataContext";
import { styles } from '../../utils/styles.js';

export default function SaveMapButton( props ) {

    const { user } = useUserAuth();

    const { saveCurrentMap, sortSavedMaps } = useUserData();

    const [savingMap, setSavingMap] = useState(false);

    function handleSave() {
        if( !savingMap ){
            setSavingMap( true );
            saveCurrentMap( user )
                .then( () => { setSavingMap( false ); sortSavedMaps(); })
                .catch((error) => { console.log(error); });
        }
    }

    if( !user ) {
        return ( <> <div/> </> );
    }
  
    return (
        <>
            { savingMap && 
                <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-saving`} >
                            Saving Map...
                        </Tooltip>
                    }
                >
                    <Spinner className="d-inline-block text-align-left mx-0" variant="warning"/>
                </OverlayTrigger>
            }
            { !savingMap && 
                <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-save-map`} >
                            Save Map
                        </Tooltip>
                    }
                >
                    <Button className="d-inline-block "
                        onClick={handleSave}
                        style={{
                            height:'85%',
                            aspectRatio:'1',
                            ...(styles.bgImage.save),
                            position:'relative',
                            align:'middle',
                            ...(styles.button.secondary)
                        }}
                    />
                </OverlayTrigger>
            }
        </>
    );
};