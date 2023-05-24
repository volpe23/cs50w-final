import { useState, useEffect, createContext } from "react";
import useFetchUser from "../hooks/useFetchUser";
import useAuth from "../hooks/useAuth";
import Spinner from "./utils/spinner";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import axios from "axios";

export const AirportContext = createContext(null);

export default function AirportContext(props) {
  const fetchUser = useFetchUser();
  const navigate = useNavigate();
  const logout = useLogout();
  const [airports, setAirports] = useState(null);
  const { authTokens, isLoading, setIsLoading } = useAuth();

  const getAirports = async () => {
    const airports = await fetch(
      "https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json"
    );
    const results = await airports.json();
    return setAirports(results);
  };

  const verifyJwt = async (controller) => {
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
    }
  };

  useEffect(() => {
    console.log("Rendered");
    const controller = new AbortController();
    getAirports();
    if (authTokens) {
      verifyJwt(controller);
      fetchUser(controller);
    }
    setIsLoading(false);

    return () => controller.abort();
  }, []);

  return (
    <>
      <AirportContext.Provider value={airports}>
        {isLoading ? <Spinner size="large" /> : props.children}
      </AirportContext.Provider>
    </>
  );
}
