import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MapConfigForm from "./MapConfigForm.js";
import { GearIcon } from '../icons/Icons.js';
import { styles } from '../../utils/styles.js';
import { useSizing } from '../../context/SizingContext.js';

export default function MapConfigDrop() {

  const { toolBarHeight } = useSizing();

  const dropWidth = () => {
    if( window.innerWidth <= 576 ) return '100vw';
    if( window.innerWidth <= 768 ) return '90vw';
    if( window.innerWidth <= 992 ) return '65vw';
    if( window.innerWidth <= 1200 ) return '50vw';
    if( window.innerWidth <= 1400 ) return '40vw';
    return '25vw';
  }

  return (
    <Dropdown className="" >
      <OverlayTrigger
        key={'bottom'}
        placement={'bottom'}
        overlay={
            <Tooltip id={`tooltip-map-settings`} >
                Map Settings
            </Tooltip>
        }
      >
        <Dropdown.Toggle className="toolbar-dropdown justify-text-end m-0 p-1" id="dropdown-basic"
          variant="primary"
          style={{ 
            maxWidth:'80px',
            minWidth:'52px',
            height:`${ toolBarHeight() - 6 }px`,
          }}
        >
          <div className='d-inline-flex align-start' 
              style={{position:'relative', alignSelf:'start', 
                      left:0, aspectRatio:1,height:'100%'}}
          >
            <GearIcon size="100%" />
          </div>
        </Dropdown.Toggle>
      </OverlayTrigger>
      <Dropdown.Menu className="" style={{ ...(styles.surface.secondary), width:dropWidth()}}>
        <Container>
          <Stack>
            <MapConfigForm/>
          </Stack>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
}