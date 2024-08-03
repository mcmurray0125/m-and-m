import React, { memo } from 'react'
import { Container } from 'react-bootstrap'

import { memories } from '../data/memories'
import Memory from '../components/Memory'

export default function MemoryLane() {
  return (
    <Container>
        <h1>Memory Lane</h1>
        {memories.map((memory, index) => {
            return (
                <Memory memory={memory} key={index}/>
            )
        })}
    </Container>
  )
}
