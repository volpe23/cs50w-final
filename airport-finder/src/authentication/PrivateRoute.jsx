import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../GlobalStates";
import { useContext, useEffect } from "react";

const PrivateRoute = ({children}) => {
    const navigate = useNavigate()
    const { authTokens, userAccount } = useContext(AuthContext);

    useEffect(() => {
        if (!authTokens && !userAccount) navigate('/login');

    }, [])


    return children;
}

export default PrivateRoute;