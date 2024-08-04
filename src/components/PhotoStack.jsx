import React from 'react'
import "../styles/photostack.css"

export default function PhotoStack ( { memory, viewMode } ) {
  return (
    <div className={`photostack ` + viewMode}>
        {memory.images.map((image, index) => {
            return (
            <img src={image} className='memory-image' alt={`image-${index}`}/>
            )
        })}
    </div>
  )
}
