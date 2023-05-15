import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRefreshToken from './hooks/useRefreshToken';
import axios from "./hooks/useAxios";
import usePrivateAxios from "./hooks/usePrivateAxios";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens")) || null);
  const [userAccount, setUserAccount] = useState(null);
  const refreshTokens = useRefreshToken();
  

  const login = async ({ access, refresh }) => {
    const tokens = {
      access,
      refresh
    }
    setAuthTokens({
    ...tokens  
    });
    localStorage.setItem('tokens', JSON.stringify(tokens));
    getUser();
    navigate("/")
  };

  // useEffect(() => {
  //   console.log(authTokens);
  //   if (localStorage.getItem("tokens") && !userAccount) {
  //     getUser(authTokens?.access);
  //     console.log(authTokens?.access);
  //   } 
    
  // }, []);

  useEffect(() => {
    console.log(authTokens);
  }, [])

  const getUser = async (access) => {
    console.log('triggered');
    
  
      // delete axios.defaults.headers.common['Authorization'];
    
  };

  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens, setUserAccount, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
