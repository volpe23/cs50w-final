import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = () => {
    const { userAccount } = useAuth();

    return (
        userAccount
            ? <Outlet />
            : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute;