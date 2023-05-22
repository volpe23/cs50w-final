import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
    const { authTokens } = useAuth();

    return (
        (authTokens)
            ? <Outlet />
            : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute;