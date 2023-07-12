import React from "react";
import { Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useUserAuth } from "../../context/UserAuthContext";
import { useUi } from "../../context/UiContext";
import { useUserData } from "../../context/UserDataContext";
import { styles } from '../../utils/styles.js';
import { RefreshIcon } from '../icons/Icons.js';

export default function RefreshMapsListButton() {

    const { user } = useUserAuth();
    const { triggerUi, mapListLoading, setMapListLoading } = useUi();
    const { getUserMaps, triggerUserData } = useUserData();

    const refreshMaps = async () => {
        setMapListLoading(true);
        return await getUserMaps()
            .then((res) => {
                setMapListLoading(false);
                triggerUi();
                return res;
            });
      }

    function handleRefresh() {
        if( !mapListLoading ){
            refreshMaps()
                .then( () => {
                    triggerUserData();
                    triggerUi();
                });
        }
    }

    if( !user ) {
        return ( <> <div/> </> );
    }
  
    return (
        <>
            { mapListLoading && 
                <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-saving`} >
                            Loading Maps...
                        </Tooltip>
                    }
                >
                    <Spinner className="d-inline-block text-align-left mx-0" variant="warning"/>
                </OverlayTrigger>
            }
            { !mapListLoading && 
                <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-save-map`} >
                            Refresh List
                        </Tooltip>
                    }
                >
                    <Button className="p-1" variant="secondary"
                        onClick={handleRefresh}
                        style={{
                            height:'38px',
                            aspectRatio:'1',
                            position:'absolute',
                            left:'36px', top:'24px',
                            align:'middle',
                        }}
                    >
                        <RefreshIcon size="100%" />
                    </Button>
                </OverlayTrigger>
            }
        </>
    );
};