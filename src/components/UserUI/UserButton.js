import React from "react";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import userIcon from '../../assets/icons/person-circle.svg';
import { useUserAuth } from "../../context/UserAuthContext";

const UserButton = ( props ) => {

  const { setShowUserModal, canvHeightRatio } = props;

  const { user } = useUserAuth();

  // const userIcon = () => { 
    
  //   return (
  //   <>
  //     <svg xmlns="http://www.w3.org/2000/svg" height="100%" fill="#FFFFFF" class="bi bi-person-circle" viewBox="0 0 16 16">
  //       <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  //       <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  //     </svg>
  //   </>
  // ) };

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
      <Button className="d-inline-block text-center h-100 mx-1 px-3" variant="primary" onClick={handleClick} 
        style={{
          backgroundImage:`url(${userIcon})`, 
          backgroundPosition:'center', 
          backgroundSize:'70%', 
          backgroundRepeat:'no-repeat',
          borderRadius:'50%'
        }}
      >
        
      </Button>
    </>
  );
};

export default UserButton;