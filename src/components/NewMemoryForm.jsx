import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { formatMemory } from '../forms/memoryFormatter';

function NewMemoryForm( { handleClose } ) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the memory object
    const memoryObject = formatMemory({
      name,
      date,
      description,
      images: images.split('\n') // Assuming each photo URL is on a new line
    });

    try {

    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New Memory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newMemory.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Memory Name" autoFocus required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control required type='date' rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' as='textarea' rows={3} style={{maxHeight:"200px"}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Images" >
            <Form.Label>Images</Form.Label>
            <Form.Control type='text' as='textarea' rows={3} style={{maxHeight:"200px"}}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
}

export default NewMemoryForm;