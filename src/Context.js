import React, { createContext, useState } from 'react'
 export const UserContext = createContext();

function Context({children}){
    const [user,setUser] = useState('');
    const [s,setS] = useState('hello');
  return <>
  <UserContext.Provider value={{user,setUser,s,setS}}>
   {children}
  </UserContext.Provider>
  </>
}

export default Context;