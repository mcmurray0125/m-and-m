import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from "../firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    } 

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function loginDemo() {
      return (
        signInAnonymously(auth)
        )
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function emailChange(email) {
        return updateEmail(currentUser, email)
      }
    
      function passwordChange(password) {
        return updatePassword(currentUser, password)
      }

      
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
      })

      return unsubscribe
    }, [])
      
    const value = { 
        loading,
        currentUser,
        login,
        loginDemo,
        signup,
        logout,
        resetPassword,
        emailChange,
        passwordChange
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}