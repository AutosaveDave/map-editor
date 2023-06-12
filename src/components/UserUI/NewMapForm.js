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
        loadMap,
        setPage,
        savedMapRefs, setSavedMapRefs,
        setCurrentMapRef
    } = props;

  const auth = useUserAuth();

  const [mapName, setMapName] = useState("");
  const [mapDescr, setMapDescr] = useState("");
  const [error, setError] = useState("");

  async function refreshMaps( newId ) {
    let selectedIndex = -1;
    const result = await getUserMaps()
      .then( maprefs => {
        console.log(maprefs)
        maprefs.forEach( ( thisRef, i ) => {
          if( thisRef === newId ) {
            setSelectedMap(i);
            setCurrentMapRef(thisRef);
            selectedIndex = i;
          }
        });
        return selectedIndex;
      })
      .catch( error => {
        console.log(error);
      });
      return result;
  }

  async function createMap() {
    const result = await createNewMap( auth, mapName, mapDescr )
        .then( data => {
            const newPath = data._key.path.segments;
            const newId = newPath[newPath.length-1];
            
            console.log('createNewMap()=> newId')
            console.log(newId)
            
            return refreshMaps(newId);
        })
        .catch( (error) => {
            console.log(error);
        });
        return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //const newMapResult = 
    await createMap()
      .then( result => {
        console.log('createMap result:');
        console.log(result);
        loadMap(savedMaps[result]);
        setPage('Account');
      })
      .catch( (err) => {
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