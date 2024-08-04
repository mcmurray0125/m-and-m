import React from 'react'
import "../styles/memory-card.css"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MemoryCard ( {memory} ) {
  return (
    <Card className='memory-card'>
      <Link to={`/memory/${memory.id}`}>
        <Card.Img src={memory.coverPhoto}/>
        <Card.ImgOverlay>
          <Card.Title>{memory.title}</Card.Title>
          <Card.Text>{memory.date}</Card.Text>
        </Card.ImgOverlay>
      </Link>
    </Card>
  )
}
