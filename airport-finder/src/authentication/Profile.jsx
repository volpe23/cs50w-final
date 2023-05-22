import { useEffect } from "react";
import useAuth from "../hooks/useAuth"
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