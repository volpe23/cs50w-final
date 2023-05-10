import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./hooks/useAxios";

export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens")) || null);
  const [userAccount, setUserAccount] = useState(null);

  const login = async ({ access, refresh }) => {
    setAuthTokens({
      access,
      refresh
    });
    getUser(access);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      getUser(authTokens?.access);
      console.log(authTokens?.access);
      // navigate("/");
    }

  }, []);

  const getUser = async (access) => {
    try {
      const user = await axios.get(`/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${access}`,
          Accept: "application/json",
        },
      });
      // axios.defaults.headers.common['Authorization'] = `JWT ${access}`;
      return setUserAccount(user?.data);
    } catch (err) {
      console.log(err);
      // delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens }}>
      {props.children}
    </AuthContext.Provider>
  );
}
