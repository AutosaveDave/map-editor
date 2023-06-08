import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ColorTool from "../EditorUI/Tools/ColorTool.js";
import UserButton from "./UserButton.js";


function UserToolBar( props ) {
    
    const { canvHeightRatio, currentColor, setCurrentColor, setShowUserModal, colorPalette, setColorPalette } = props;
    
    return (
        <>
            <Container fluid className="w-100 m-0 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%` }}>
                <Row className="w-100 h-100 m-0 p-0 align-middle" style={{ height:`${100-canvHeightRatio}%` }}>
                    <Col xs={4} className="h-100" style={{ textAlign:'left' }}>

                    </Col>
                    <Col xs={5} className="h-100 py-0 m-0 px-1 align-middle text-center">
                        <ColorTool 
                            currentColor={currentColor} 
                            setCurrentColor={setCurrentColor}
                            colorPalette={colorPalette}
                            setColorPalette={setColorPalette}/>
                    </Col>
                    <Col xs={3} className="h-100 align-middle" style={{ textAlign:'right' }}>
                        <UserButton setShowUserModal={setShowUserModal}/>
                    </Col>

                </Row>
                
                <UserButton setShowUserModal={setShowUserModal}/>
            </Container>
        </>
    );
}

export default UserToolBar;