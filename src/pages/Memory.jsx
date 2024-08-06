import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import "../styles/memory-lane.css"
import { Container, Col, Button } from 'react-bootstrap'

import { memories } from '../data/memories'
import PhotoStack from '../components/PhotoStack'

export default function Memory() {
  const [memory, setMemory] = useState();
  const [loading, setLoading] = useState(true);
  const [stackView, setStackView] = useState(true);

  const memoryId = useParams().id.toString();

  function toggleStack () {
    setStackView(!stackView);
    console.log('Stack Mode: ' + stackView);
  }

  useEffect(() => {
    setMemory(memories.find((memory) => memory.id === memoryId))
    setLoading(false);
    console.log(memory);
  }, [memoryId]);

  return (
    <Container>
      {!loading && 
        <>
          <div className='d-flex justify-content-between align-items-center'>
            <h2>{memory.title}</h2>
            <span>{memory.date}</span>
          </div>
          <p>{memory.description}</p>
          <Button className='mb-3' style={{zIndex: '20', position: 'relative'}} onClick={toggleStack}>Toggle View</Button>
          <PhotoStack loading={loading} memory={memory} viewMode={stackView}/>
        </>
      }
    </Container>
  )
}
