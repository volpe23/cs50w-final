import { useEffect } from "react";
import useAuth from "./useAuth";
import usePrivateAxios from "./usePrivateAxios";

const useFetchUser = () => {

  const { userAccount, setUserAccount } = useAuth();
  const axiosPrivate = usePrivateAxios();

  const fetchUser = async (controller) => {
    if (!userAccount) {
        try {
          const user = await axiosPrivate.get(`/auth/users/me/`, {
            signal: controller.signal
          });
          setUserAccount(user?.data);
          console.log('Success');
        } catch (err) {
          console.log(err);
        }
      };
  }

  return fetchUser;
}

export default useFetchUser