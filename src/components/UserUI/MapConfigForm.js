import React, { useState } from "react";
import { Form, Alert} from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import {styles} from '../../utils/styles.js';


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

  return (
    <>
      <div className="p-1 pt-3 box" style={{textAlign: 'center', minWidth:'30vw',maxWidth:'80vw', }}>
        <h4 className="mb-1 ">Map Settings</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form style={{minWidth:'250px', maxWidth:'720px', }}>
          <Form.Group className="mb-1 py-2 text-start" >
            <Form.Label htmlFor="mapNameInput">Map Name</Form.Label>
            <Form.Control
              value={mapName}
              type="text"
              placeholder="Map Name"
              onChange={(e) => setMapName(e.target.value)}
              style={{...(styles.input.secondary)}}
            />
          </Form.Group>

          <Form.Group className="mb-1 text-start py-2" >
            <Form.Label htmlFor="mapDescrInput">Map Description</Form.Label>
            <Form.Control
              value={mapDescr}
              as="textarea"
              placeholder="Map Description"
              onChange={(e) => setMapDescr(e.target.value)}
              style={{minHeight:'100px', ...(styles.input.secondary)}}
            />
          </Form.Group>

          <Form.Group className="py-2 text-start">
            <Form.Label htmlFor="mapGroundColorInput">Ground Color</Form.Label>
            <Form.Control
              type="color"
              value={groundColor}
              title="Ground Color"
              onChange={(e) => setGroundColor(e.target.value)}
              style={{
                backgroundColor:groundColor,
                borderColor:groundColor,
                borderWidth:'3px',
                borderStyle:'outset'}}
            />
          </Form.Group>
        </Form>
        
      </div>
    </>
  );
};

export default MapConfigForm;