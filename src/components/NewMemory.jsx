import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function NewMemory( { show, setShow } ) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');

  const handleClose = () => setShow(false);

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
      // Send the memory object to the API
      const response = await axios.post('/api/memories', memoryObject);
      console.log('Memory saved successfully:', response.data);
      // You might want to close the modal or reset the form here
      handleClose();
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
      </Modal>
    </>
  );
}

export default NewMemory;