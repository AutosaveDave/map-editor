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

function MapConfigDrop( props ) {

  const { mapName, setMapName, 
    mapDescr, setMapDescr, 
    selectedMap, groundColor, setGroundColor,} = props;

  return (
    <Dropdown className="justify-content-between m-0 p-0 ">
      <OverlayTrigger
        key={'bottom'}
        placement={'bottom'}
        overlay={
            <Tooltip id={`tooltip-map-settings`} >
                Map Settings
            </Tooltip>
        }
      >
        <Dropdown.Toggle className="text-end m-0 py-1 px-2" variant="success" id="dropdown-basic"
          style={{ 
            maxWidth:'80px',
            minWidth:'52px',
            backgroundImage: `url(${gearIcon})`, 
            backgroundRepeat:'no-repeat',
            backgroundSize:'auto 70%',
            backgroundPositionY: 'center',
            backgroundPositionX:'20%',
            backgroundOrigin:'padding-box',
          }}
        />
      </OverlayTrigger>
      <Dropdown.Menu>
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