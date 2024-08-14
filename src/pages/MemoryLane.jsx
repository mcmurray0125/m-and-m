import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { doc, collection, getDocs } from "firebase/firestore"

// import { memories } from '../data/memories'
import MemoryCard from '../components/MemoryCard'
import MultiPurposeModal from '../components/MultiPurposeModal';

export default function MemoryLane() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [memories, setMemories] = useState([]);
  const { currentUser } = useAuth();

    // Get Memories from Database
  useEffect(() => {

    const checkData = async () => {
      try {
        let fetchedMemories = [];
        const querySnapshot = await getDocs(collection(db, 'memories'));
        querySnapshot.forEach((doc) => {
          fetchedMemories.push(doc.data());
        });

        //const docSnap = await getDoc(docRef);
        setMemories(fetchedMemories);
        setLoading(false);
      } catch(error) {
        console.log(error)
        setLoading(false);
      }
    }
    checkData();
  }, [currentUser])

  function handleShow() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <Container className='mt-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Memory Lane</h1>
        <Button onClick={handleShow}>Make a Memory</Button>
      </div>
      <Row className='row-gap-2' xs={2} sm={2} md={4}>
        {!loading && memories.map((memory, index) => {
            return (
              <Col xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                <MemoryCard memory={memory} />
              </Col>
            )
        })}
      </Row>
      <MultiPurposeModal show={showModal} handleClose={handleClose} user={currentUser}/>
    </Container>
  )
}
