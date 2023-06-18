import { useUserAuth } from "../../context/UserAuthContext.js";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MapConfigForm from "./MapConfigForm.js";
import gearIcon from "../../assets/icons/gear.svg";
import {styles} from '../../utils/styles.js';

function MapConfigDrop( props ) {

  const { mapName, setMapName, 
    mapDescr, setMapDescr, 
    selectedMap, groundColor, setGroundColor,} = props;

  const dropWidth = () => {
    if( window.innerWidth <= 576 ) return '100vw';
    if( window.innerWidth <= 768 ) return '90vw';
    if( window.innerWidth <= 992 ) return '65vw';
    if( window.innerWidth <= 1200 ) return '50vw';
    if( window.innerWidth <= 1400 ) return '40vw';
    return '25vw';
  }

  return (
    <Dropdown className="justify-content-between m-0 p-0" >
      <OverlayTrigger
        key={'bottom'}
        placement={'bottom'}
        overlay={
            <Tooltip id={`tooltip-map-settings`} >
                Map Settings
            </Tooltip>
        }
      >
        <Dropdown.Toggle className="text-end m-0 py-1 px-2" id="dropdown-basic"
          style={{ 
            maxWidth:'80px',
            minWidth:'52px',
            backgroundImage: `url(${gearIcon})`, 
            backgroundBlendMode: 'difference',
            backgroundRepeat:'no-repeat',
            backgroundSize:'auto 70%',
            backgroundPositionY: 'center',
            backgroundPositionX:'20%',
            backgroundOrigin:'padding-box',
            ...(styles.button.primary)
          }}
        />
      </OverlayTrigger>
      <Dropdown.Menu className="m-1" style={{ ...(styles.surface.secondary), width:dropWidth()}}>
        <Container>
          <Stack>
            <MapConfigForm selectedMap={selectedMap}
              mapName={mapName} setMapName={setMapName}
              mapDescr={mapDescr} setMapDescr={setMapDescr}
              groundColor={groundColor} setGroundColor={setGroundColor}
            />
          </Stack>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MapConfigDrop;