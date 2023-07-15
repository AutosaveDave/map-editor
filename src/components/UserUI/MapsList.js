import React from "react";
import { Container } from 'react-bootstrap';
import MapsListItems from './MapsListItems.js';

export default function MapsList() {

    return (
        <Container fluid className="justify-content-center h-100" 
                    style={{overflowY:'scroll'}}
        >
                    <MapsListItems/>
        </Container>
    );
}