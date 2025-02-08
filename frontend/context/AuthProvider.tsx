import React,{createContext, useContext, useState, useEffect, ReactElement, ReactNode} from 'react'

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}:{children:ReactNode}) => {
const [isLogged, setIsLogged] = useState(false);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
  return (
    <AuthContext.Provider value={{isLogged, setIsLogged, user, setUser, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider