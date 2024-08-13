import { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'

import { memories } from '../data/memories'
import MemoryCard from '../components/MemoryCard'
import NewMemory from '../components/NewMemory';

export default function MemoryLane() {
  const [showNewMemory, setShowNewMemory] = useState(false);

  function handleShow() {
    setShowNewMemory(true);
  }

  return (
    <Container className='mt-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Memory Lane</h1>
        <Button onClick={handleShow}>Make a Memory</Button>
      </div>
      <Row className='row-gap-2' xs={2} sm={2} md={4}>
        {memories.map((memory, index) => {
            return (
              <Col xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                <MemoryCard memory={memory} />
              </Col>
            )
        })}
      </Row>
      <NewMemory show={showNewMemory} setShow={setShowNewMemory}/>
    </Container>
  )
}
