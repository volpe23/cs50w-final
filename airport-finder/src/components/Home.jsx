import { useState, useEffect } from "react";
import { FromDestinationContext } from "../contexts/FromDestinationContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Map from "./Map";
import Finder from "./FInder";
import usePrivateAxios from "../hooks/usePrivateAxios";

export default function Home() {
  const { userAccount, setUserAccount } = useAuth();
  const [from, setFrom] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stopovers, setStopovers] = useState(null);
  const axiosPrivate = usePrivateAxios();

  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    if (!userAccount) {
      const getUser = async () => {
        try {
          const user = await axiosPrivate.get(`/auth/users/me/`, {
            signal: controller.signal
          });
        //   console.log(user);
          setUserAccount(user?.data);
          console.log('Success');
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
    return () => controller.abort();
  }, []);

  return (
    <FromDestinationContext.Provider
      value={{
        fromAirport: [from, setFrom],
        destinationAirport: [destination, setDestination],
        stopovers: { stopovers, setStopovers },
      }}
    >
      <Finder />
      <Map from={from} destination={destination} stopovers={stopovers}></Map>
    </FromDestinationContext.Provider>
  );
}
