import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./hooks/useAxios";
import Spinner from "./components/utils/spinner";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens")) || null);
  const [userAccount, setUserAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  

  const login = async ({ access, refresh }) => {
    const tokens = {
      access,
      refresh
    }
    setAuthTokens({
    ...tokens  
    });
    localStorage.setItem('tokens', JSON.stringify(tokens));
    navigate("/")
  };

  const logout = (msg) => {
    setUserAccount(null);
    setAuthTokens(null);
    localStorage.removeItem('tokens');
    console.log('logged out', msg)
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
          if (err?.response?.status === 401) navigate('/login', {
            state: {
              text: 'Your session has expired!',
              operation: 'logout'
            }
          });
      }
    }
    if (authTokens) verifyJwt();
    setIsLoading(false);
    return () => controller.abort();
  }, [])


  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens, setUserAccount, logout }}>
      {isLoading ? <Spinner /> : props.children}
    </AuthContext.Provider>
  );
}
