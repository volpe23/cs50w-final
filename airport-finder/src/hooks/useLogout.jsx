import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setUserAccount, setAuthTokens } = useAuth();
  const navigate = useNavigate();

  const logout = (msg) => {
    setUserAccount(null);
    setAuthTokens(null);
    localStorage.removeItem("tokens");
    sessionStorage.removeItem("user");
    console.log("logged out");
    navigate('/login', {
      state: { 
        text : msg,
        operation : 'logout'
        }
    })
  }

  return logout;
}

export default useLogout;