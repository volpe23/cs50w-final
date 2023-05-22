import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./hooks/useAxios";
import Spinner from "./components/utils/spinner";
import usePrivateAxios from "./hooks/usePrivateAxios";
export const AuthContext = createContext();


export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens")) || null);
  const [userAccount, setUserAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  
  const axiosPrivate = usePrivateAxios();

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
    console.log('logged out', msg);
  }

  const fetchUser = async (controller) => {
    console.log(userAccount)
    if (!userAccount) {
        try {
          const user = await axiosPrivate.get(`/auth/users/me/`, {
            signal: controller.signal
          });
          setUserAccount(user?.data);
          console.log('Success');
          console.log(userAccount);
        } catch (err) {
          console.log(err);
        }
      };
  }

  useEffect(() => {
    console.log('Render');
    const controller = new AbortController();
    const body = {
      token : authTokens?.refresh
    }
    const verifyJwt = async () => {
      try {
        const res = await axios.post(
          "/auth/jwt/verify/",
          JSON.stringify(body),
          {
            signal: controller.signal,
          }
        );
        console.log(res);
      } catch (err) {
        if (err?.response?.status === 401)
          navigate("/login", {
            state: {
              text: "Your session has expired!",
              operation: "logout",
            },
          });
      }
    };
    if (authTokens) {
      verifyJwt();
      fetchUser();
      
    }
    setIsLoading(false);
    
    return () => controller.abort();
  }, [])


  return (
    <AuthContext.Provider value={{ authTokens, userAccount, login, setAuthTokens, setUserAccount, logout, setIsLoading }}>
    {/* <Spinner size='large spinner-page-center' /> */}
      {isLoading ? <Spinner size='large spinner-page-center' /> : props.children}
    </AuthContext.Provider>
  );
}
