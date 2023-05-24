import { Outlet } from "react-router-dom";
import useAuth from "@/components/hooks/useAuth";



export default function  PersistLogin() {

  const { authTokens, userAccount } = useAuth();

  return (
    <Outlet />
  )
}