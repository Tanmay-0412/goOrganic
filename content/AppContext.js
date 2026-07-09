// context/AppContext.js
'use client'
import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('₹')

  return (
    <AppContext.Provider value={{ currency, setCurrency }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)