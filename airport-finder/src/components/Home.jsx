import { useEffect } from "react";
import FromDestinationProvider from "../contexts/FromDestinationContext";
import useAuth from "../hooks/useAuth";
import Map from "./Map";
import Finder from "./FInder";
import usePrivateAxios from "../hooks/usePrivateAxios";
import useFetchUser from "../hooks/useFetchUser";

export default function Home() {
    
  const { userAccount, setUserAccount } = useAuth();
  useEffect(() => {
    console.log(userAccount);
  }, [userAccount]);

  return (
    <FromDestinationProvider>
      <Finder />
      <Map></Map>
    </FromDestinationProvider>
  );
}
