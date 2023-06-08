import React from "react";
import Button from 'react-bootstrap/Button';
import { useUserAuth } from "../../context/UserAuthContext";

const LogoutButton = ( props ) => {

  const { setShowUserModal } = props;
  const { logOut, user } = useUserAuth();
  

  function handleClick() {
    logOut();
    setShowUserModal(false);
  }

  if (!user) {
    return (
      <>
        <p>Not logged in.</p>
      </>
    );
  }
  return (
    <>
      <Button variant="primary" onClick={handleClick}>Logout</Button>
    </>
  );
};

export default LogoutButton;