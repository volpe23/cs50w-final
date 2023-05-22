import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

  const navigate = useNavigate();
  const { setAuthTokens, setIsLoading } = useAuth();

  const login = ({ access, refresh }) => {
    const tokens = {
      access,
      refresh,
    };
    console.log(tokens);
    setAuthTokens({
      ...tokens,
    });
    localStorage.setItem("tokens", JSON.stringify(tokens));
    
    navigate("/");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return login;
}

export default useLogin;