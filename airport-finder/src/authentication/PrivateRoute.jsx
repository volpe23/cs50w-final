import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../GlobalStates";
import { useContext } from "react";

const PrivateRoute = () => {
    const { authTokens } = useContext(AuthContext);

    


    return (
        authTokens
            ? <Outlet />
            : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute;