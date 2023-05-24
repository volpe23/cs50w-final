import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import Spinner from "@/components/utils/spinner";
import axios from '@/hooks/useAxios'


export default function  PersistLogin() {

  const [isLoading, setIsLoading] = useState(true);  

  const { authTokens, userAccount } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController();
    console.log(authTokens);
    const verifyJwt = async () => {
      const body = {
        token: authTokens?.refresh,
      };
      try {
        const res = await axios.post("/auth/jwt/verify/", JSON.stringify(body), {
          signal: controller.signal,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 401) {
          navigate("/login", {
            state: {
              text: "Your session has expired!",
              operation: "logout",
            },
          });
          logout("Your session has expired!");
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    (authTokens) ? verifyJwt() : setIsLoading(false);

    return () => {
      controller.abort()
      isMounted = false
    };
  }, [])

  return (
    <>
      {
        authTokens
        ? <Outlet />
        : isLoading 
          ? <Spinner />
          : <Outlet />
        }
    </>

  )
}