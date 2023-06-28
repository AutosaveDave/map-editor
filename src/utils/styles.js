import rotCwImage from "../assets/icons/arrow-clockwise.svg";
import rotCcwImage from "../assets/icons/arrow-counterclockwise.svg";
import mapConfigImage from "../assets/icons/gear.svg";
import userImage from "../assets/icons/person-circle.svg";
import addColorImage from "../assets/icons/plus-circle.svg";
import saveImage from "../assets/icons/save2.svg";
import arrowImageDL from "../assets/icons/arrow-down-left.svg";
import arrowImageL from "../assets/icons/arrow-left.svg";
import arrowImageUL from "../assets/icons/arrow-up-left.svg";
import arrowImageU from "../assets/icons/arrow-up.svg";
import arrowImageUR from "../assets/icons/arrow-up-right.svg";
import arrowImageR from "../assets/icons/arrow-right.svg";
import arrowImageDR from "../assets/icons/arrow-down-right.svg";
import arrowImageD from "../assets/icons/arrow-down.svg";
import cameraImage from "../assets/icons/camera-reels.svg";
import caretImageDown from "../assets/icons/caret-down.svg";
import caretImageUp from "../assets/icons/caret-up.svg";
import gridImage from "../assets/icons/grid-3x3.svg";

const colors = {
    black:'#000000',
    white:'#FFFFFF',
    orange:'#F49E4C',
    vanilla:'#F5EE9E',
    maroon:'#89023E',
    lightTeal:'#3B8EA5',
    darkTeal:'#2D728F',
    navy:'#000055',
}

export const styles = { 
    colors: {
        ...colors
    },
    button: {    // Styles for buttons
        primary: {
            backgroundColor: colors.vanilla,
            color: colors.black,
            borderColor: colors.maroon,
            borderWidth:'2px',
        },
        secondary: {
            backgroundColor: colors.orange,
            color: colors.black,
            borderColor: colors.maroon,
            borderWidth:'2px'
        },
        tertiary: {
            backgroundColor: colors.maroon,
            color: colors.white,
            borderColor:colors.vanilla,
            borderWidth:'2px'
        },
        },
    surface: {  // Styles for surfaces like <div> and <Container>
        primary: {
            backgroundColor: colors.lightTeal,
            color: colors.vanilla,
            border:0
        },
        secondary: {
            backgroundColor: colors.darkTeal,
            color: colors.white,
            border:0
        },
        tertiary: {
            backgroundColor: colors.maroon,
            color: colors.white,
            border:0
        }
    },
    input: {    // Styles for text input
        primary: {
            backgroundColor: colors.white,
            color: colors.black,
        },
        secondary: {
            backgroundColor: '#f5ee9e',
            color: '#000000',
        },
        tertiary: {
            backgroundColor: colors.orange,
            color: colors.black,
        }
    },
    bgImage: {  // Styles for specific .svg background images 
        rotateCW: {
            backgroundImage:`url(${rotCwImage})`, 
            backgroundBlendMode:'difference',
            backgroundPosition:'center', 
            backgroundSize:'60%', 
            backgroundRepeat:'no-repeat',
        },
        rotateCCW: {
            backgroundImage:`url(${rotCcwImage})`, 
            backgroundBlendMode:'difference',
            backgroundPosition:'center', 
            backgroundSize:'60%', 
            backgroundRepeat:'no-repeat',
        },
        save: {
            backgroundImage:`url(${saveImage})`, 
            backgroundPosition:'center', 
            backgroundSize:'60%', 
            backgroundRepeat:'no-repeat',
        },
        mapConfig: {
            backgroundImage: `url(${mapConfigImage})`, 
            backgroundBlendMode: 'difference',
            backgroundRepeat:'no-repeat',
            backgroundSize:'auto 70%',
            backgroundPositionY: 'center',
            backgroundPositionX:'20%',
            backgroundOrigin:'padding-box',
        },
        userButton: {
            backgroundImage:`url(${userImage})`, 
            backgroundPosition:'center', 
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
        },
        userDrop: {
            backgroundImage:`url(${userImage})`, 
            backgroundBlendMode:'difference',
            backgroundRepeat:'no-repeat',
            backgroundSize:'auto 70%',
            backgroundPositionY:'center',
            backgroundPositionX:'20%',
            backgroundOrigin:'padding-box',
        },
        addColor: {
            backgroundImage:`url(${addColorImage})`,
            backgroundBlendMode:'difference' , 
            backgroundPositionY:'50%', 
            backgroundPositionX:'50%',
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
        },
        camTool: {
            backgroundImage:`url(${cameraImage})`,
            backgroundPosition:'center', 
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
        },
        gridValUp: {
            backgroundImage:`url(${caretImageUp})`, 
            backgroundPosition:'center', 
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
        },
        gridValDown: {
            backgroundImage:`url(${caretImageDown})`, 
            backgroundPosition:'center', 
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
        },
        axis: {
            backgroundImage:`url(${gridImage})`,
            backgroundBlendMode:'hard-light', 
            backgroundPosition:'center', 
            backgroundSize:'70%', 
            backgroundRepeat:'no-repeat',
        },
        moveCamImage: [
            {
                backgroundImage:`url(${arrowImageUL})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                backgroundImage:`url(${arrowImageU})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                backgroundImage:`url(${arrowImageUR})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                backgroundImage:`url(${arrowImageL})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                
            },
            {
                backgroundImage:`url(${arrowImageR})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                backgroundImage:`url(${arrowImageDL})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                backgroundImage:`url(${arrowImageD})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
            {
                backgroundImage:`url(${arrowImageDR})`, 
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            },
        ]
        
    },
    pos: {      // Styles for positioning
        abs: {  //      absolute position
            bl: {   //  bottom-left absolute position
                position:'absolute',
                bottom:'0px',
                left:'5px',
                textAlign:'start',
            },
            br: {   //  bottom-right absolute position
                position:'absolute',
                bottom:'0px',
                right:'5px',
                textAlign:'end',
            },
            rs: {   //  right-stretch absolute position
                position:'fixed',
                height:'auto',
                width:'30px',
                right:'8px',
                textAlign:'end',
            }
        }
    },
};