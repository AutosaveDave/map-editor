import React from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import userIcon from '../../assets/icons/person-circle.svg';
import { styles } from '../../utils/styles.js';
import { useUi } from '../../context/UiContext';

export default function UserButton() {

  const { setShowUserModal } = useUi();

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
          style={{
            height:'94%',
            aspectRatio:'1',
            backgroundImage:`url(${userIcon})`, 
            backgroundPosition:'center', 
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
            borderRadius:'50%',
            position:'relative',
            top:'3%',
            right:'3px',
            ...(styles.button.tertiary)
          }}
        />
      </OverlayTrigger>
    </>
  );
}