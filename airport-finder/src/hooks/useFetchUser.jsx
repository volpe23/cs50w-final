import { useEffect } from "react";
import useAuth from "./useAuth";
import usePrivateAxios from "./usePrivateAxios";

const useFetchUser = () => {

  const { userAccount, setUserAccount } = useAuth();
  const axiosPrivate = usePrivateAxios();

  const fetchUser = async (controller) => {
    console.log(userAccount)
    if (!userAccount) {
        try {
          const user = await axiosPrivate.get(`/auth/users/me/`, {
            signal: controller.signal
          });
          setUserAccount(user?.data);
          sessionStorage.setItem('user', JSON.stringify(user?.data));
          console.log('Success');
          console.log(userAccount);
        } catch (err) {
          console.log(err);
        }
      };
  }

  return fetchUser;
}

export default useFetchUser