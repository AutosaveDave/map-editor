import React, { useState } from "react";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { useUi } from "../../context/UiContext";
import {styles} from '../../utils/styles.js';

export default function SignupForm() {

  const { setShowUserModal, setPage } = useUi();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const { signUp } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    setError("");
    try {
      await signUp(email, password)
        .then( () => { 
          setSigningUp(false);
          setPage("Account");
          setShowUserModal(false);
        });
    } catch (err) {
      setError(err.message);
      setSigningUp(false);
    } 
  };
  
  return (
    <>
      <div className="p-1 box m-1" style={{textAlign: 'center'}}>
        <h4 className="mb-1">Signup</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{...(styles.input.secondary)}}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{...(styles.input.secondary)}}
            />
          </Form.Group>
          <div className="d-grid gap-1 justify-content-center">
            { signingUp && 
              <>
              <div className="text-center">
                <Spinner variant="warning" />
              </div>
              </>
            }
            { !signingUp && 
              <Button type="Submit" style={{...(styles.button.secondary),}}>
                Sign up
              </Button>
            }
          </div>
        </Form>
      </div>
    </>
  );
};