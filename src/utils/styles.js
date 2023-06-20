import rotCwImage from "../assets/icons/arrow-clockwise.svg";
import rotCcwImage from "../assets/icons/arrow-counterclockwise.svg";
import mapConfigImage from "../assets/icons/gear.svg";
import userImage from "../assets/icons/person-circle.svg";
import addColorImage from "../assets/icons/plus-circle.svg";
import saveImage from "../assets/icons/save2.svg";

export const styles = { 
        button:{    // Styles for buttons
            primary: {
                backgroundColor: '#f5ee9e',
                color: '#000000',
                borderColor:'#F49E4C',
                borderWidth:'2px',
            },
            secondary: {
                backgroundColor: '#F49E4C',
                color: '#000000',
                borderColor:'#89023E',
                borderWidth:'2px'
            },
            tertiary: {
                backgroundColor: '#89023E',
                color: '#FFFFFF',
                borderColor:'#f5ee9e',
                borderWidth:'2px'
            },
            },
        surface: {  // Styles for surfaces like <div> and <Container>
            primary: {
                backgroundColor: '#3B8EA5',
                color: '#f5ee9e',
                border:0
            },
            secondary: {
                backgroundColor: '#2D728F',
                color: '#FFFFFF',
                border:0
            },
            tertiary: {
                backgroundColor: '#89023E',
                color: '#FFFFFF',
                border:0
            }
        },
        input: {    // Styles for text input
            primary: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
            },
            secondary: {
                backgroundColor: '#f5ee9e',
                color: '#000000',
            },
            tertiary: {
                backgroundColor: '#F49E4C',
                color: '#000000',
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
                backgroundBlendMode:'lighten',
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
                backgroundPosition:'center', 
                backgroundSize:'70%', 
                backgroundRepeat:'no-repeat',
            }
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
                }
            }
        },
};