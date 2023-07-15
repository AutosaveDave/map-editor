import React from "react";
import Button from 'react-bootstrap/Button';
import { useUserAuth } from "../../context/UserAuthContext";
import { useUserData } from "../../context/UserDataContext";
import { useUi } from "../../context/UiContext";
import {styles} from '../../utils/styles.js';

export default function LogoutButton() {

  const { setUiPage, triggerUi } = useUi();
  const { clearData, triggerUserData } = useUserData();
  const { logOut, user } = useUserAuth();
  
  function handleClick() {
    clearData( true, true );
    logOut();
    triggerUi();
    triggerUserData();
    setUiPage("Account");
  }

  if (!user) {
    return (
      <>
        <div></div>
      </>
    );
  }

  return (
    <>
      <Button variant="tertiary" onClick={handleClick}
      >Logout</Button>
    </>
  );
};