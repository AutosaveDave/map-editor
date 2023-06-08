import React from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useUserAuth } from "../../context/UserAuthContext";

const UserButton = ( props ) => {

  const { setShowUserModal } = props;

  const { user } = useUserAuth();

  function handleClick() {
    setShowUserModal(true);
  }

  if (!user) {
    return (
      <>
        <Button variant="secondary" onClick={handleClick}>
          <Image fluid src='/user-icon.svg'/>
        </Button>
      </>
    );
  }
  return (
    <>
      <Button variant="primary" onClick={handleClick}>
        <Image fluid src='/user-icon.svg'/>
      </Button>
    </>
  );
};

export default UserButton;