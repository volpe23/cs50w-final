import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import useFetchUser from "../hooks/useFetchUser";
import Spinner from "../components/utils/spinner";
const PrivateRoute = () => {
    const fetchUser = useFetchUser();
    const { authTokens } = useAuth();

    return (
        (authTokens)
            ? <Outlet />
            : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute;