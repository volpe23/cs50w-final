import { useState, useEffect } from "react";
import { FromDestinationContext } from "../contexts/FromDestinationContext";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Map from "./Map";
import Finder from "./FInder";
import usePrivateAxios from "../hooks/usePrivateAxios";
// import { axiosPrivate } from "../hooks/useAxios";

export default function Home() {
  const refresh = useRefreshToken();
  const { userAccount, setUserAccount } = useAuth();
  const [from, setFrom] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stopovers, setStopovers] = useState(null);
  const axiosPrivate = usePrivateAxios();

  useEffect(() => {
    const controller = new AbortController();
    if (!userAccount) {
      console.log("need user");
      const getUser = async () => {
        try {
          const user = await axiosPrivate.get(`/auth/users/me/`, {
            signal: controller.signal
          });
          console.log(user);
          setUserAccount(user?.data);
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
      <button onClick={() => getUser()}>Clicke here</button>
      <Map from={from} destination={destination} stopovers={stopovers}></Map>
    </FromDestinationContext.Provider>
  );
}
