import { useEffect } from "react";
import FromDestinationProvider from "../contexts/FromDestinationContext";
import useAuth from "../hooks/useAuth";
import Map from "./Map";
import Finder from "./FInder";
import usePrivateAxios from "../hooks/usePrivateAxios";

export default function Home() {
    
  const { userAccount, setUserAccount } = useAuth();
  const axiosPrivate = usePrivateAxios();

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
    <FromDestinationProvider>
      <Finder />
      <Map></Map>
    </FromDestinationProvider>
  );
}
