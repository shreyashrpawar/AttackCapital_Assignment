// lib/auth-context.js
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [token,setToken]=useState('');

  const authenticate = async (email, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ws/oauth2/grant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key':'f69902ad-c2bc-4b30-aa89-e136d26a04b3'
      },
      // credentials: 'include',
      body: JSON.stringify({ 'grant':'password','username':'fhir_pmOYS','password': 'NmrxdT7I34' })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Authentication failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.access_token)
    setToken(data.token)
    console.log("User logged in:", data.message);
    console.log(token);
  }

  return (
    <AuthContext.Provider value={{ token, authenticate, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}