import React, { useState } from "react";
import {styles} from '../../utils/styles.js';
import { Form, Alert, Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext.js";

const Login = ( props ) => {

  const { setShowUserModal, setPage } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { logIn } = useUserAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoggingIn(true);
    try {
      await logIn(email, password)
        .then( () => {
          setLoggingIn(false);
          setPage("Account");
        });
      setShowUserModal(false);
    } catch (err) {
      setError(err.message);
      setLoggingIn(false);
    }    
  };

  return (
    <>
      <div className="p-1 pt-3 box" style={{textAlign: 'center'}}>
        <h4 className="mb-1 ">Login</h4>
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

          <div className="d-grid gap-1 justify-content-center" >
            { loggingIn && 
              <div className="text-center">
                <Spinner variant="warning" />
              </div>
            }
            { !loggingIn && 
              <Button className="" type="Submit" style={{...(styles.button.secondary),}}>
              Log In
            </Button>
            }
          </div>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default Login;