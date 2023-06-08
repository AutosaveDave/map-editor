import React, { useState } from "react";

import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { createNewMap } from "../../utils/mutations";


const NewMapForm = ( props ) => {

    const { setShowUserModal,
        setSelectedMap, 
        savedMaps,
        getUserMaps,
        loadMap
    } = props;

  const auth = useUserAuth();

  const [mapName, setMapName] = useState("");
  const [mapDescr, setMapDescr] = useState("");
  const [error, setError] = useState("");

  function createMap() {
    createNewMap( auth, mapName, mapDescr )
        .then(result => {
            console.log(result)
            getUserMaps().then( () => {
                console.log(savedMaps)
                savedMaps.forEach( ( thisMap, i ) => {
                if( thisMap.name === mapName ) {
                    setSelectedMap(i);
                }
                });
            })
            
        })
        .catch((error) => {
            console.log(error)
        });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const newMapResult = await createNewMap(auth, mapName, mapDescr);
      console.log("newMapResult:");
      console.log(newMapResult);
      setShowUserModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-1 pt-3 box" style={{textAlign: 'center'}}>
        <h4 className="mb-1 ">Create New Map</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="formMapName">
            <Form.Control
              type="text"
              placeholder="Map Name"
              onChange={(e) => setMapName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formMapDescr">
            <Form.Control
              type="text"
              placeholder="Map Description"
              onChange={(e) => setMapDescr(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-1" >
            <Button variant="primary" type="Submit">
              Create Map
            </Button>
          </div>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default NewMapForm;