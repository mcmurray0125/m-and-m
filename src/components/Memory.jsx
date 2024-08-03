import React from 'react'
import "../styles/memory-lane.css"

export default function Memory( {memory} ) {
  return (
    <div>
        {memory.images.map((image, index) => {
            return (
                <img src={image} className='memory-image' key={index}/>
            )
        })}
        <h2>{memory.title}</h2>
        <p>{memory.description}</p>
    </div>
  )
}
