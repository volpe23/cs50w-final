import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {

    const [authTokens, setAuthTokens] = useState(null);
    const [userAccount, setUserAccount] = useState(null);

    return (
        <AuthContext.Provider value={{authTokens, setAuthTokens, userAccount, setUserAccount}}>
            {props.children}
        </AuthContext.Provider>
    )
}