import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";


export default function Home() {
  const {signup} = useAuth();
  
  return (
    <div>
      Home
      <button >Add User</button>
    </div>
  )
}
