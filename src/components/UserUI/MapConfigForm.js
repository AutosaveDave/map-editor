import React, { useState } from "react";

import { Form, Alert, Button, Spinner } from "react-bootstrap";

import { useUserAuth } from "../../context/UserAuthContext";
import { saveMap } from "../../utils/mutations";


const MapConfigForm = ( props ) => {

    const { 
        selectedMap,
        mapName, setMapName,
        mapDescr, setMapDescr,
        groundColor, setGroundColor,
    } = props;

  const auth = useUserAuth();

  const [error, setError] = useState("");
  const [awaitingSave, setAwaitingSave] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   const mapConfigData = { name: mapName, descr: mapDescr, mapConfig['groundColor']: groundColor };
  //   setAwaitingSave(true);
  //   console.log('MAPCONFIGFORM selectedMap');
  //   console.log(selectedMap)
  //   saveMap( auth, selectedMap, mapConfigData)
  //     .then( result => {
  //       setAwaitingSave(false);
  //       // clearData(false);
  //       // loadMap(savedMaps[result]);
  //       // setPage('Account');
  //     })
  //     .catch( (err) => {
  //       setAwaitingSave(false);
  //       setError(err.message);
  //     });
  // };

  return (
    <>
      <div className="p-1 pt-3 box" style={{textAlign: 'center', minWidth:'30vw',maxWidth:'80vw'}}>
        <h4 className="mb-1 ">Map Settings</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form style={{minWidth:'250px', maxWidth:'720px'}}>
          <Form.Group className="mb-1 py-2 text-start" controlId="formMapName">
            <Form.Label htmlFor="mapNameInput">Map Name</Form.Label>
            <Form.Control
              value={mapName}
              id='mapNameInput'
              type="text"
              placeholder="Map Name"
              onChange={(e) => setMapName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-1 text-start py-2" controlId="formMapDescr">
            <Form.Label htmlFor="mapDescrInput">Map Description</Form.Label>
            <Form.Control
              value={mapDescr}
              as="textarea"
              id='mapDescrInput'
              placeholder="Map Description"
              onChange={(e) => setMapDescr(e.target.value)}
              style={{minHeight:'100px'}}
            />
          </Form.Group>

          <Form.Group className="py-2 text-start">
            <Form.Label htmlFor="mapGroundColorInput">Ground Color</Form.Label>
            <Form.Control
              type="color"
              id="mapGroundColorInput"
              value={groundColor}
              title="Ground Color"
              onChange={(e) => setGroundColor(e.target.value)}
            />
          </Form.Group>

          {/* <div className="d-grid gap-1 justify-content-center" >
            { awaitingSave && 
              <Spinner variant="primary" className=""/>
            }
            { !awaitingSave && 
              <Button variant="warning" type="Submit">
                Save Changes
              </Button>
            }
            
          </div> */}
        </Form>
        
      </div>
    </>
  );
};

export default MapConfigForm;