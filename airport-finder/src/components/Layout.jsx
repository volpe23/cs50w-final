import { useState, useEffect, createContext } from "react";
import useFetchUser from "../hooks/useFetchUser";
import useAuth from "../hooks/useAuth";
import Spinner from "./utils/spinner";

export const AirportContext = createContext(null);

export default function Layout(props) {
  const fetchUser = useFetchUser();
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
      if (err?.response?.status === 401)
        navigate("/login", {
          state: {
            text: "Your session has expired!",
            operation: "logout",
          },
        });
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
