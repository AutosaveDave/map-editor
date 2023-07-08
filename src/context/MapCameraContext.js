import { createContext, useContext, useState } from "react";

const mapCameraContext = createContext(null);

export function MapCameraContextProvider( { children } ) {

    const [cameraAngle, setCameraAngle] = useState(1);          // Angle of declination
    const [cameraSwivel, setCameraSwivel] = useState(7);        // Rotation around z-axis
    const [cameraDistance, setCameraDistance] = useState(20);
    const [cameraFocus, setCameraFocus] = useState([4,4,0]);    // Panel coords for where the camera is centered
    const [cameraPosition, setCameraPosition] = useState( camFocusToPos( 1, 7 ) );
    const [frustum, setFrustum] = useState( 16 );
    const [cameraZoom, setCameraZoom] = useState( 1 );

    function camFocusToPos( angle, swivel ) {  // Returns approriate camera position
        return ( [                // based on camera angle, swivel, and distance
          cameraFocus[0] + cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.sin( swivel*Math.PI/4 ),
          cameraFocus[1] - cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.cos( swivel*Math.PI/4 ),
          cameraFocus[2] + cameraDistance * Math.cos( angle*Math.PI/4 )
        ] );
      }
      function camFocusToPos2( angle, swivel, camFocus ) {  // Returns approriate camera position
        return ( [                // based on camera angle, swivel, and distance
          camFocus[0] + cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.sin( swivel*Math.PI/4 ),
          camFocus[1] - cameraDistance * Math.cos( angle*Math.PI/4 ) * Math.cos( swivel*Math.PI/4 ),
          camFocus[2] + cameraDistance * Math.cos( angle*Math.PI/4 )
        ] );
      }

  return (
    <mapCameraContext.Provider
        value= {{ cameraAngle, setCameraAngle,
            cameraSwivel, setCameraSwivel,
            cameraDistance, setCameraDistance,
            cameraFocus, setCameraFocus,
            cameraPosition, setCameraPosition,
            frustum, setFrustum,
            cameraZoom, setCameraZoom,
            camFocusToPos, camFocusToPos2
            }} 
    >
      {children}
    </mapCameraContext.Provider>
  );
}

export function useMapCamera() {
  return useContext(mapCameraContext);
}