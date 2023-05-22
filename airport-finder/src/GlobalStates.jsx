import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./hooks/useAxios";
import Spinner from "./components/utils/spinner";

export const AuthContext = createContext();

export default function AuthProvider({ user, tokens, children }) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(tokens);
  const [userAccount, setUserAccount] = useState(user);
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
    navigate("/");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const logout = (msg) => {
    setUserAccount(null);
    setAuthTokens(null);
    localStorage.removeItem('tokens');
    sessionStorage.removeItem('user');
    console.log('logged out', msg);
  }

  useEffect(() => {
    console.log('Render');
  }, [])


  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens, setUserAccount, logout, setIsLoading }}>
    {/* <Spinner size='large spinner-page-center' /> */}
      {children}
    </AuthContext.Provider>
  );
}
