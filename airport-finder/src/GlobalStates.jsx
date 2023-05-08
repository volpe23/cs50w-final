import { useState, createContext, useEffect } from "react";
import { getUser } from "./authentication/Login";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export default function AuthProvider(props) {
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState("1");
    const [userAccount, setUserAccount] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('tokens')) {
            setAuthTokens('hello')
            console.log(authTokens);
            const user = getUser(authTokens?.access);
            setUserAccount(user);
            navigate('/');
        }
    }, [])

    return (
        <AuthContext.Provider value={{authTokens, setAuthTokens, userAccount, setUserAccount}}>
            {props.children}
        </AuthContext.Provider>
    )
}