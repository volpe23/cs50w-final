import { useEffect } from "react";
import useAuth from "../hooks/useAuth"
import useFetchUser from "../hooks/useFetchUser";
export default function Profile() {

  const { userAccount } = useAuth();

  useEffect(() => {
    console.log(userAccount);
  }, [userAccount])

  return (
    userAccount &&
    <div>
      {userAccount.username}
    </div>
  )
}