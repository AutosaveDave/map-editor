import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ColorTool from "../EditorUI/Tools/ColorTool.js";
import UserDrop from "./UserDrop.js";
import UserButton from "./UserButton.js";
import MapConfigDrop from './MapConfigDrop.js';
import SaveMapButton from './SaveMapButton.js';
import { useUserAuth } from '../../context/UserAuthContext.js';
import { useUserData } from '../../context/UserDataContext.js';
import { useSizing } from '../../context/SizingContext.js';
import {styles} from '../../utils/styles.js';

export default function UserToolBar() {

    const { user } = useUserAuth();

    const { selectedMap } = useUserData();

    const { toolBarHeight } = useSizing();

    return (
        <>
            <Container fluid={true} className="w-100 m-0 px-1 p-0 align-middle" style={{ height:`${toolBarHeight()}px`, ...(styles.surface.primary) }}>
                <Row className="w-100 h-100 m-0 p-0 align-middle" style={{ height:`${toolBarHeight()}px` }}>
                    <Col xs={3} className="h-100 px-0" style={{ textAlign:'left' }}>
                    { (user && !(selectedMap==="")) && 
                        <div className="justify-content-left h-100 p-0" >
                            <Stack direction='horizontal' gap={1} className="p-0 m-0 h-100">
                                <MapConfigDrop/>
                                <SaveMapButton/>
                            </Stack>
                        </div>
                    }
                    </Col>
                    <Col xs={7} className="h-100 py-0 m-0 px-1 align-middle text-center">
                        <ColorTool/>
                    </Col>
                    <Col xs={2} className="h-100 px-0 py-0 align-middle" style={{ textAlign:'right' }}>
                        { user && 
                            <UserDrop/>
                        }
                        { !user &&
                            <UserButton/>
                        }
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
}