import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import useFetchUser from "../hooks/useFetchUser";

const PrivateRoute = () => {
    const fetchUser = useFetchUser();
    const { authTokens } = useAuth();

    useEffect(() => {
        const controller = new AbortController();

        fetchUser(controller);

        return () => controller.abort();
    }, [])

    return (
        authTokens
            ? <Outlet />
            : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute;