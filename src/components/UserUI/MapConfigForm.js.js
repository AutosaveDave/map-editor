import React, { useState } from "react";

import { Form, Alert, Button, Spinner } from "react-bootstrap";

import { useUserAuth } from "../../context/UserAuthContext";
import { createNewMap } from "../../utils/mutations";


const MapConfigForm = ( props ) => {

    const { setShowUserModal,
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
  const [awaitingCreate, setAwaitingCreate] = useState(false);

  async function refreshMaps( newId ) {
    let selectedIndex = -1;
    const result = await getUserMaps()
      .then( maprefs => {
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
    const result = await createNewMap( auth, newName, newDescr )
        .then( data => {
            const newPath = data._key.path.segments;
            const newId = newPath[newPath.length-1];
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
    
    setAwaitingCreate(true);
    createMap()
      .then( result => {
        setAwaitingCreate(false);
        clearData(false);
        loadMap(savedMaps[result]);
        setPage('Account');
      })
      .catch( (err) => {
        setAwaitingCreate(false);
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
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formMapDescr">
            <Form.Control
              type="text"
              placeholder="Map Description"
              onChange={(e) => setNewDescr(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-1 justify-content-center" >
            { awaitingCreate && 
              <Spinner variant="primary" className=""/>
            }
            { !awaitingCreate && 
              <Button variant="warning" type="Submit">
                Create Map
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