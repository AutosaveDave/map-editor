import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import { UserIcon } from '../icons/Icons';
import { useUserAuth } from "../../context/UserAuthContext";
import LogoutButton from "./LogoutButton.js";
import UserInterface from './UserInterface.js';
import { useUi } from '../../context/UiContext';
import { useSizing } from '../../context/SizingContext';
import {styles} from '../../utils/styles.js';

export default function UserDrop() {

    const { user } = useUserAuth();

    const { uiPage, setUiPage } = useUi();
    const { toolBarHeight } = useSizing();

    const dropWidth = () => {
        if( window.innerWidth <= 576 ) return '100vw';
        if( window.innerWidth <= 768 ) return '90vw';
        if( window.innerWidth <= 992 ) return '65vw';
        if( window.innerWidth <= 1200 ) return '50vw';
        if( window.innerWidth <= 1400 ) return '40vw';
        return '25vw';
    }
    
    if(user) {
        return (
            <Dropdown className="">
                <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Tooltip id={`tooltip-map-settings`} >
                            User Console
                        </Tooltip>
                    }
                >
                    <Dropdown.Toggle className="toolbar-dropdown justify-text-end m-0 p-1" 
                        variant="primary" 
                        id="dropdown-basic"
                        style={{ 
                            position:'relative',
                            top:'3px',
                            maxWidth:'80px',
                            minWidth:'52px',
                            height:`${ toolBarHeight() - 6 }px`,
                        }}
                    >
                        <div className='d-inline-flex align-start' 
                            style={{position:'relative', alignSelf:'start', 
                                    left:0, aspectRatio:1,height:'100%'}}
                        >
                            <UserIcon size='100%'/>
                        </div>
                    </Dropdown.Toggle>
                </OverlayTrigger>

                <Dropdown.Menu className="m-0"
                    style={{ 
                        width: dropWidth(),
                        ...(styles.button.secondary),
                    }}
                >
                    <Stack>
                        <div className="w-100" style={{textAlign:'center'}}>
                            <h4 >{uiPage}</h4>
                            <h6 >{user.email}</h6>
                        </div>
                        <hr className='m=0 p-0' style={{ border:`4px solid ${styles.colors.maroon}`}}/>
                        { user && 
                            <div >
                                <UserInterface/>
                            </div>
                        }
                        <div>
                            <Stack xs={3} className='justify-content-between align-items-middle' direction='horizontal'>
                                <div className="d-inline-block px-3 h-100" xs={1}>
                                    { !( uiPage === "Account" ) &&
                                        <Button className="" 
                                            variant="primary" 
                                            onClick={ () => setUiPage("Account") } 
                                            style={{...(styles.button.tertiary)}}
                                        >Back</Button> 
                                    }
                                </div>
                                <div className="d-inline-block px-3 mx-4 pb-2 h-100" xs={1}>
                                    <LogoutButton className="d-inline-block justify-content-center"/>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (<></>);
    }
}