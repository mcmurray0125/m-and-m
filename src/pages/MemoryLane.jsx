import React, { memo } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

import { memories } from '../data/memories'
import MemoryCard from '../components/MemoryCard'

export default function MemoryLane() {

  return (
    <Container className='mt-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>Memory Lane</h1>
          <Button>Make a Memory</Button>
        </div>
        <Row gap={2} xs={2} sm={2} md={4}>
          {memories.map((memory, index) => {
              return (
                <Col key={index}>
                  <MemoryCard memory={memory} />
                </Col>
              )
          })}
        </Row>
    </Container>
  )
}
