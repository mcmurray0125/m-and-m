import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

function LoginForm( { handleClose } ) {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
    } catch(error) {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Spinner/>}
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newMemory.Name">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" autoFocus required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Images" >
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder="Password" required/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit' onSubmit={handleLogin}>
          Log in
        </Button>
      </Modal.Footer>
    </>
  );
}

export default LoginForm;