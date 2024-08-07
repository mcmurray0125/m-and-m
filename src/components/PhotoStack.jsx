import { useState, useEffect, useRef } from 'react'
import getImagePositions from '../utilities/getImagePositions';
import "../styles/photostack.css"

export default function PhotoStack ( { stackView, memory } ) {
  const [imagesResolved, setImagesResolved] = useState(0);

  function handleImageLoad() {
    setImagesResolved(previous => previous + 1);
  }

  useEffect(() => {
    if (imagesResolved === memory.images.length) {
      const renderedImages = Array.from(document.querySelectorAll('.memory-image'));
      getImagePositions(renderedImages);
    }
  }, [imagesResolved])

  return (
    <div className='photostack'>
        {memory.images.map((image, index) => {
            return (
            <img src={image}
              className='memory-image'
              alt={`image-${index}`}
              key={index}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
            )
        })}
    </div>
  )
}
