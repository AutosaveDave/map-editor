import React from "react";
import Button from 'react-bootstrap/Button';
import { useUserAuth } from "../../context/UserAuthContext";
import {styles} from '../../utils/styles.js';

const LogoutButton = ( props ) => {

  const { clearData, setPage } = props;
  const { logOut, user } = useUserAuth();
  

  function handleClick() {
    clearData(true);
    logOut();
    setPage("Account");

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
      <Button variant="primary" onClick={handleClick}
        style={{...(styles.button.tertiary)}}
      >Logout</Button>
    </>
  );
};

export default LogoutButton;