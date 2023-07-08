import Container from 'react-bootstrap/Container';
import MapsList from './MapsList.js';
import NewMapForm from './NewMapForm.js';
import { useUi } from "../../context/UiContext.js";

export default function UserInterface() {

    const { uiPage } = useUi();

    switch( uiPage ) {
        default:
        case "Account": return (
            <Container className="justify-content-center p-2 w-100" 
                        style={{ maxHeight:'90vh' }} >
                <MapsList/>
            </Container>
        );
        case "Create New Map": return (
            <Container className="justify-content-center" >
                    <NewMapForm/>
            </Container>
        );
    }
    
}