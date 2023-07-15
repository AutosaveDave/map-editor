import React from 'react';
import { Stack, Container, Dropdown, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { UserIcon } from '../icons/Icons';
import { useUserAuth } from "../../context/UserAuthContext";
import LogoutButton from "./LogoutButton.js";
import UserInterface from './UserInterface.js';
import { useUi } from '../../context/UiContext';
import { useSizing } from '../../context/SizingContext';
import {styles} from '../../utils/styles.js';
import NewMapMenuButton from './NewMapMenuButton';
import RefreshMapsListButton from './RefreshMapsListButton';

export default function UserDrop() {

    const { user } = useUserAuth();

    const { uiPage, setUiPage } = useUi();
    const { toolBarHeight, canvasHeight, dropWidth } = useSizing();

    const uiHeaderHeight = 62; // in px
    const uiFooterHeight = 45; // in px

    const uiHeight = () => {
        const result = canvasHeight() - 32 - uiHeaderHeight - uiFooterHeight;
        if( result >= 16 )
            return result;
        return 0;
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

                <Dropdown.Menu className=""
                    style={{ 
                        width: dropWidth(),
                        ...(styles.surface.secondary),
                        height:`${canvasHeight()-10}px`,
                        borderRadius:'15px',
                        marginTop:'4px'
                    }}
                >
                    <Stack className="h-100 ">
                        <Container className="w-100 px-3" style={{height:`${uiHeaderHeight}px`, textAlign:'center'}}>
                            <Stack className="justify-content-between" 
                                    direction='horizontal' 
                            >
                                <RefreshMapsListButton/>
                                <Container style={{overflowX:'hidden'}}>
                                    <h4 className="w-100" >{uiPage}</h4>
                                    <h6 className="w-100" >{user.email}</h6>
                                </Container>
                                <NewMapMenuButton/>
                            </Stack>
                        </Container>
                        { user && ( uiHeight() > 0 ) && 
                            <div style={{height:`${uiHeight()}px`}}>
                                <UserInterface/>
                            </div>
                        }
                        <Container className="pt-2" style={{height:`${uiFooterHeight}px`}}>
                            <Stack xs={3} className='justify-content-between align-items-middle h-100' 
                                    direction='horizontal'
                            >
                                <div className="d-inline-block px-3 h-100" xs={1}>
                                    { !( uiPage === "Account" ) &&
                                        <Button className="" 
                                            variant="tertiary" 
                                            onClick={ () => setUiPage("Account") } 
                                        >Back</Button> 
                                    }
                                </div>
                                <div className="d-inline-block px-3  h-100" xs={1}>
                                    <LogoutButton className="d-inline-block justify-content-center"/>
                                </div>
                            </Stack>
                        </Container>
                    </Stack>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (<></>);
    }
}