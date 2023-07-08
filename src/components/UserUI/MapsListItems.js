import React from "react";
import { Spinner } from 'react-bootstrap';
import { useUserData } from "../../context/UserDataContext.js";
import { useUi } from "../../context/UiContext.js";
import MapsListItem from './MapsListItem.js';

export default function MapListItems() { 

    const { savedMaps } = useUserData();
    const { mapListLoading } = useUi();

    const maps = Object.entries( savedMaps );

    return ( <>
        { maps.length > 0 && !mapListLoading &&
            <>
            { maps.map( ( [key, value] ) =>  ( 
                <MapsListItem className="w-100" 
                    key={`map-list-item-${key}`} 
                    mapId={key}
                    name={value.name} 
                    descr={value.descr}
                    createdOn={`${value.createdOn.toDate().toLocaleString()}`}
                    lastEdited={`${value.lastEdited.toDate().toLocaleString()}`}
                    groundColor={value.mapConfig.groundColor}
                    colorPalette={value.mapConfig.colorPalette} 
                    thisMap={value}
                />
            ) ) }
            </>
        }
        { mapListLoading &&
            <Spinner/>
        }
    </> ); 
}