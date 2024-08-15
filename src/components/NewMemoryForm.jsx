import { useState, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from './Spinner';

import { formatMemory } from '../forms/memoryFormatter';

function NewMemoryForm( { handleClose } ) {
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const imagesRef = useRef();
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors

    try {
      // Format the memory object
      const memoryObject = formatMemory(
        titleRef.current.value,
        dateRef.current.value,
        descriptionRef.current.value,
        imagesRef.current.value.split('\n') // Separate Photos by each new line
      );

      const storage = getStorage();

      for (const image of images) {
        const imageId = uid(6);
        const imageStorageRef = ref(storage, `memory-${memoryObject.id}/${image.name + '-' + imageId}`);
        const uploadTask = uploadBytesResumable(imageStorageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Upload failed", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              memoryObject.images.push(downloadURL);
              resolve();
            }
          );
        });
      }

      // Use uploaded image file as cover photo if no photo links provided in the form
      if (!memoryObject.coverPhoto.length && memoryObject.images.length) {
        memoryObject.coverPhoto = memoryObject.images[0];
      }

       // Write memory data to Firestore
      await setDoc(doc(db, 'memories', memoryObject.id), memoryObject);

      console.log("Memory successfully saved!");
      // handleClose(); // Close the modal if needed
    } catch (error) {
      console.error("Error saving memory:", error);
      setError("Failed to save memory. Please try again.");
    } finally {
      setImages([]);
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {loading && <Spinner/>}
      <Modal.Header closeButton>
        <Modal.Title>New Memory</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="newMemory.Name">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" ref={titleRef} placeholder="Memory Name" autoFocus required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control required ref={dateRef} type='date' rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' as='textarea' ref={descriptionRef} rows={3} style={{maxHeight:"200px"}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Images" >
            <Form.Label>Images</Form.Label>
            <Tabs
              defaultActiveKey="Files"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="Files" title="Upload Images">
                <Form.Control
                  type='file'
                  multiple
                  accept="image/*" 
                  rows={3}
                  onChange={handleImageChange}
                />
              </Tab>
              <Tab eventKey="Links" title="Add Image Links">
                <Form.Control type='text' as='textarea' ref={imagesRef} rows={3} style={{maxHeight:"200px"}}/>
              </Tab>
            </Tabs>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default NewMemoryForm;