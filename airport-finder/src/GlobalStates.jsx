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
  const axiosPrivate = usePrivateAxios();

  const login = async ({ access, refresh }) => {
    setAuthTokens({
      access,
      refresh
    });
    getUser(access);
    navigate("/");
  };
  
  // useEffect(() => {
  //   console.log(authTokens);
  //   if (localStorage.getItem("tokens") && !userAccount) {
  //     getUser(authTokens?.access);
  //     console.log(authTokens?.access);
  //   } 
    
  // }, []);

  const getUser = async (access) => {
    try {
      const user = await axiosPrivate.get(`/auth/users/me/`);
      console.log(user)
      return setUserAccount(user?.data);
    } catch (err) {
      console.log(err);
      // delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens, setUserAccount, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
