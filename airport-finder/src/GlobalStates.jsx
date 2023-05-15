import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRefreshToken from './hooks/useRefreshToken';
import axios from "./hooks/useAxios";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens")) || null);
  const [userAccount, setUserAccount] = useState(null);
  // const refreshTokens = useRefreshToken();
  

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

  const logout = () => {
    localStorage.removeItem('tokens');
    setUserAccount(null);
    setAuthTokens(null);
    navigate('/login');
  }

  useEffect(() => {
    const controller = new AbortController();
    const body = {
      token : authTokens?.refresh
    }
    const verifyJwt = async () => {
      try {
        const res = await axios.post('/auth/jwt/verify/', JSON.stringify(body), {
        signal : controller.signal
      });
      console.log(res);
      } catch (err) {
          if (err?.response?.status === 401) logout();
      }
    }
    authTokens ? verifyJwt() : navigate('/login');
    return () => controller.abort();
  }, [])


  const getUser = async (controller) => {
    console.log('triggered');
    
  
      // delete axios.defaults.headers.common['Authorization'];
    
  };

  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens, setUserAccount, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
