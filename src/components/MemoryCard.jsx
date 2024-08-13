import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MemoryCard ( {memory} ) {
  return (
    <Card className='memory-card'>
      <Link to={`/memory/${memory.id}`}>
        <Card.Img src={memory.coverPhoto}/>
        <Card.ImgOverlay className='p-0'>
          <div className='ps-3 pb-3'>
            <Card.Title>{memory.title}</Card.Title>
            <Card.Text>{memory.date}</Card.Text>
          </div>
        </Card.ImgOverlay>
      </Link>
    </Card>
  )
}
