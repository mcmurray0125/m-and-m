import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MemoryCard ( {memory} ) {
  return (
    <Card className='memory-card'>
      <Link to={`/memory/${memory.id}`} state={{data: memory}} >
        {memory.coverPhoto.length ? 
        <Card.Img src={memory.coverPhoto}/>
        :
        <div className='card-img' style={{background: 'linear-gradient(to right,#56efea,#d6cb81)', height: '300px'}}></div>
        }
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
