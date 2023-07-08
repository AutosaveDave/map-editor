import { useUi } from '../../context/UiContext.js';
import { useSizing } from '../../context/SizingContext';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import React from 'react';
import Login from "./Login.js";
import Signup from "./Signup.js";
import LogoutButton from "./LogoutButton.js";
import {styles} from '../../utils/styles.js';

export default function UserModal() {

    const { showUserModal, setShowUserModal, uiPage, setUiPage } = useUi();
    const { toolBarHeight } = useSizing();

    function handleClose() {
        setShowUserModal(false);
    }

    if( showUserModal ) {
        return (
            <div
                className="modal show p-2 m-2"
                style={{ display: 'block', position: 'fixed', }}
            >
                <Modal.Dialog style={{right: 0, top:`${ toolBarHeight() }px`, }}>
                    <Modal.Header style={{...(styles.surface.secondary)}}>
                        <Container>
                            <div>
                                <Row>
                                    <div className='m-1 justify-content-center'>
                                        <Col>
                                            <Login/>
                                        </Col>
                                    </div>
                                    <div className='m-1 justify-content-center'>
                                        <Col>
                                            <Signup/>
                                        </Col>
                                    </div>
                                    
                                </Row>
                            </div>
                        </Container>
                    </Modal.Header>
                    
                    <Modal.Footer className="justify-content-between" style={{...(styles.surface.secondary)}}>
                        <Container className="d-inline-block w-100 h-100">
                            { !( uiPage === "Account" ) &&
                                <Button className="mx-1 mb-3" 
                                    variant="primary" 
                                    onClick={ () => setUiPage("Account") } 
                                >Back</Button> 
                            }
                        </Container>
                        <LogoutButton className="d-inline-block m-3" />
                        <Button className="d-inline-block mx-1 mb-3" 
                            style={{...(styles.button.tertiary)}}
                            onClick={ handleClose } 
                        >Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>   
            </div>
        );
    }
    return (<></>);
}