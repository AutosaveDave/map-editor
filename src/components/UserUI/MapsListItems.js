import React, { useEffect } from "react";
import { Spinner, Container } from 'react-bootstrap';
import { useUserData } from "../../context/UserDataContext.js";
import { useUi } from "../../context/UiContext.js";
import MapsListItem from './MapsListItem.js';
import { isEmpty } from 'lodash';
import { styles } from "../../utils/styles.js";

export default function MapsListItems() { 

    const { savedMaps, getUserMaps } = useUserData();
    const { mapListLoading, setMapListLoading, triggerUi } = useUi();

    if( !isEmpty(savedMaps) ) {
        const maps = Object.entries( savedMaps );
        return ( <>
            { !mapListLoading &&
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
            {/* { mapListLoading &&
                <>
                <div className="w-100 h-100 text-center">
                    <Spinner style={{ color: styles.colors.navy }}/>
                </div>
                </>
            } */}
        </> );
    }
    return  (
        mapListLoading ? 
            (<div className="w-100 h-100 text-center">
                <Spinner style={{ color: styles.colors.navy }}/>
            </div>)
        : 
            (<p>UH OH! No Maps!</p>) 
    );
}