import React from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import userIcon from '../../assets/icons/person-circle.svg';
import { useUserAuth } from "../../context/UserAuthContext";

const UserButton = ( props ) => {

  const { setShowUserModal, canvHeightRatio } = props;

  const { user } = useUserAuth();

  function handleClick() {
    setShowUserModal(true);
  }

  const buttonSize = 0.9 * ( 100 - canvHeightRatio )

  if (!user) {
    return (
      <>
        <Button variant="success" onClick={handleClick}>
          <Image fluid src={userIcon}/>
        </Button>
      </>
    );
  }
  return (
    <>
      <Button className="px-1 py-0 text-center" variant="primary" onClick={handleClick} 
        style={{
          minWidth:`${buttonSize}vh`,
          minHeight:`${buttonSize}vh`
        }}
      >
        <div className="p-0 m-0">
          <Image className="p-0 m-0" src={userIcon} fluid={true} />
        </div>
        
      </Button>
    </>
  );
};

export default UserButton;