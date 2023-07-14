import React from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSizing } from "../../context/SizingContext";
import { useUi } from '../../context/UiContext';
import { UserIcon } from "../icons/Icons";

export default function UserButton() {

  const { setShowUserModal } = useUi();
  const { toolBarHeight } = useSizing();

  function handleClick() {
    setShowUserModal(true);
  }

  return (
    <>
      <OverlayTrigger
        key={'bottom'}
        placement={'bottom'}
        overlay={
            <Tooltip id={`tooltip-login-signup`} >
                Login/Signup
            </Tooltip>
        }
      >
        <Button className="d-inline-block text-center" onClick={handleClick} 
          variant='danger'
          style={{
            height:`${toolBarHeight()-2}px`,
            width:`${toolBarHeight()-2}px`,
            aspectRatio:1,
            position:'relative',
            top:'1px',
            right:'0px',
            alignContent:'middle',
            align:'center',
            verticalAlign:'middle',
            padding:'3px'
          }}
        >
          <UserIcon size='100%'/>
        </Button>
      </OverlayTrigger>
    </>
  );
}