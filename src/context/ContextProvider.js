import React, { createContext, useState } from 'react'

export const addData = createContext();

export const ContextProvider = ({children}) => {

    const [useradd, setUseradd] = useState("");
  return (
    <>
    <addData.Provider value={{ useradd, setUseradd }}>
        {children}
    </addData.Provider>
    </>
  )
}
