import { useEffect } from "react";
import useAuth from "../hooks/useAuth"
import useFetchUser from "../hooks/useFetchUser";
export default function Profile() {

  const { userAccount } = useAuth();
  // const fetchUser = useFetchUser();

  // useEffect(() => {
  //   const controller = new AbortController();
  //   fetchUser(controller);
  //   console.log(userAccount);
  //   return () => controller.abort();
  // }, [])

  useEffect(() => {
    console.log(userAccount);
  }, [userAccount])

  return (
    <div>
      {userAccount.username}
    </div>
  )
}