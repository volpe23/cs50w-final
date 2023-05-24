import { useState, useEffect, createContext } from "react";
import useFetchUser from "../hooks/useFetchUser";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/utils/Spinner";
import { useNavigate, Outlet } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import axios from "axios";

export const AirportContext = createContext(null);

export default function AirportContextProvider() {
  const fetchUser = useFetchUser();
  const navigate = useNavigate();
  const logout = useLogout();
  const [airports, setAirports] = useState(null);
  const { authTokens, userAccount } = useAuth();

  const getAirports = async () => {
    const airports = await fetch(
      "https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json"
    );
    const results = await airports.json();
    return setAirports(results);
  };

  useEffect(() => {
    console.log("Rendered");
    const controller = new AbortController();
    getAirports();
    if (authTokens && !userAccount) {
      fetchUser(controller);
    }

    return () => controller.abort();
  }, []);

  return (
    <>
      <AirportContext.Provider value={airports}>
        <Outlet />
      </AirportContext.Provider>
    </>
  );
}
