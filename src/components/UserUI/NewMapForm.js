import React, { useState } from "react";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import {styles} from '../../utils/styles.js';
import { useUserData } from "../../context/UserDataContext.js";
import { useUi } from "../../context/UiContext.js";


export default function NewMapForm() {

  const { setUiPage } = useUi();
  const { createMap, clearData, loadMap } = useUserData();
  const [newName, setNewName] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [error, setError] = useState("");
  const [awaitingCreate, setAwaitingCreate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAwaitingCreate(true);
    createMap( newName, newDescr )
      .then( result => {
        setAwaitingCreate(false);
        clearData(false, false);
        loadMap(result);
        setUiPage('Account');
      })
      .catch( (err) => {
        setAwaitingCreate(false);
        setError(err.message);
      });
  };

  return (
    <>
      <div className="p-1 pt-3 box" style={{textAlign: 'center'}}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="formMapName">
            <Form.Control
              type="text"
              placeholder="Map Name"
              onChange={(e) => setNewName(e.target.value)}
              style={{...(styles.input.secondary)}}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formMapDescr">
            <Form.Control
              type="text"
              placeholder="Map Description"
              onChange={(e) => setNewDescr(e.target.value)}
              style={{...(styles.input.secondary)}}
            />
          </Form.Group>

          <div className="d-grid gap-1 justify-content-center" >
            { awaitingCreate && 
              <Spinner variant="warning" className=""/>
            }
            { !awaitingCreate && 
              <Button style={{...(styles.button.primary)}} type="Submit">
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