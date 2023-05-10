import { useContext } from "react";
import { AuthContext } from "../GlobalStates";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;