import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router'
import { db } from '../firebase'
import { collection, getDocs, query, where } from "firebase/firestore"

import { Container, Button } from 'react-bootstrap'

import PhotoStack from '../components/PhotoStack'
import "../styles/memory-lane.css"

export default function Memory(props) {
  const [memory, setMemory] = useState({});
  const [loading, setLoading] = useState(true);
  const [stackView, setStackView] = useState(true);
  const location = useLocation();
  const data = location.state?.data; 

  const memoryId = useParams().id.toString();

  function toggleStack () {
    setStackView(!stackView);
  }

  useEffect(() => {
    if (data) {
      // data from router
      setMemory(data);
      setLoading(false);
      console.log('Passed Data',data);
    } else {
      // data from database
      async function fetchMemoryFromDatabase(memoryId) {
        const q = query(collection(db, "memories"), where('__name__', "==", memoryId));
        try {
          const querySnapshot = await getDocs(q);
          setMemory(querySnapshot.docs[0].data());
          setLoading(false);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      }
      fetchMemoryFromDatabase(memoryId);
    }
  }, [memoryId, data]);

  return (
    <Container className={`mt-4 ${stackView && 'stack'}`}>
      {!loading && 
        <>
          <div className='d-flex justify-content-between align-items-center'>
            <h2>{memory.title}</h2>
            <span>{memory.date}</span>
          </div>
          <Button className='mb-3' style={{zIndex: '20', position: 'relative'}} onClick={toggleStack}>Toggle View</Button>
          <PhotoStack loading={loading} memory={memory} stackView={stackView}/>
          <p>{memory.description}</p>
        </>
      }
    </Container>
  )
}
