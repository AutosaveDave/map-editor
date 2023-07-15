import Container from 'react-bootstrap/Container';
import MapsList from './MapsList.js';
import NewMapForm from './NewMapForm.js';
import { useUi } from "../../context/UiContext.js";
import { useSizing } from '../../context/SizingContext.js';
import { styles } from '../../utils/styles.js';

export default function UserInterface() {

    const { uiPage } = useUi();
    const { canvasHeight } = useSizing();

    switch( uiPage ) {
        default:
        case "Account": return (
            <Container className="justify-content-center w-100 h-100 py-1" style={{borderRadius:'10px', backgroundColor:styles.colors.lightTeal}} >
                <MapsList/>
            </Container>
        );
        case "Create New Map": return (
            <Container className="justify-content-center h-100" >
                    <NewMapForm/>
            </Container>
        );
    }
    
}