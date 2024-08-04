import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import "../styles/memory-lane.css"
import { Container, Col } from 'react-bootstrap'

import { memories } from '../data/memories'
import PhotoStack from '../components/PhotoStack'

export default function Memory() {
  const [memory, setMemory] = useState();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('stacked');

  const memoryId = useParams().id.toString();

  useEffect(() => {
    setMemory(memories.find((memory) => memory.id === memoryId))
    setLoading(false);
    console.log(memory);
  }, [memoryId]);


  console.log(memoryId);

  return (
    <Container>
      {!loading && 
        <>
          <div className='d-flex justify-content-between align-items-center'>
            <h2>{memory.title}</h2>
            <span>{memory.date}</span>
          </div>
          <p>{memory.description}</p>
          <PhotoStack memory={memory} viewMode={viewMode}/>
        </>
      }
    </Container>
  )
}
