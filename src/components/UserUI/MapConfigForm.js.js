import React, { useState } from "react";

import { Form, Alert, Button, Spinner } from "react-bootstrap";

import { useUserAuth } from "../../context/UserAuthContext";
import { saveMap } from "../../utils/mutations";


const MapConfigForm = ( props ) => {

    const { setShowUserModal,
        selectedMap,
        setSelectedMap, 
        savedMaps,
        getUserMaps,
        loadMap,
        setPage,
        savedMapRefs, setSavedMapRefs,
        mapName, setMapName,
        mapDescr, setMapDescr,
        setCurrentMapRef,
        setPanels, clearData
    } = props;

  const auth = useUserAuth();

  const [error, setError] = useState("");
  const [awaitingSave, setAwaitingSave] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const mapConfigData = { name: mapName, descr: mapDescr };
    setAwaitingSave(true);
    saveMap( auth, selectedMap, mapConfigData)
      .then( result => {
        setAwaitingSave(false);
        clearData(false);
        loadMap(savedMaps[result]);
        setPage('Account');
      })
      .catch( (err) => {
        setAwaitingSave(false);
        setError(err.message);
      });
  };

  return (
    <>
      <div className="p-1 pt-3 box" style={{textAlign: 'center'}}>
        <h4 className="mb-1 ">Create New Map</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="formMapName">
            <Form.Control
              value={mapName}
              type="text"
              placeholder="Map Name"
              onChange={(e) => setMapName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formMapDescr">
            <Form.Control
              value={mapDescr}
              type="text"
              placeholder="Map Description"
              onChange={(e) => setMapDescr(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-1 justify-content-center" >
            { awaitingSave && 
              <Spinner variant="primary" className=""/>
            }
            { !awaitingSave && 
              <Button variant="warning" type="Submit">
                Save Changes
              </Button>
            }
            
          </div>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default MapConfigForm;