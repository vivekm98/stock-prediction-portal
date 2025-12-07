import {useState,useContext, createContext} from 'react'


const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [IsLoggedin,setIsLoggedin] = useState(!!localStorage.getItem('accessToken'))
  return (
     <AuthContext.Provider value={{IsLoggedin,setIsLoggedin}}>
        {children}
     </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}