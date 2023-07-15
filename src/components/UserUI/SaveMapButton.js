import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useUserAuth } from "../../context/UserAuthContext";
import { useUserData } from "../../context/UserDataContext";
import { useSizing } from "../../context/SizingContext";
import { SaveIcon } from "../icons/Icons";

export default function SaveMapButton() {

    const { user } = useUserAuth();

    const { saveCurrentMap, sortSavedMaps } = useUserData();
    const { toolBarHeight } = useSizing();
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
                    <Button className=""
                        variant='secondary'
                        onClick={handleSave}
                        style={{
                            height:`${ toolBarHeight() - 6 }px`,
                            width:`${ toolBarHeight() - 6 }px`,
                            aspectRatio:'1',
                            alignContent:'middle',
                            align:'center',
                            verticalAlign:'middle',
                            padding:'5px'
                        }}
                    >
                        <SaveIcon size='100%'/>
                    </Button>
                </OverlayTrigger>
            }
        </>
    );
};