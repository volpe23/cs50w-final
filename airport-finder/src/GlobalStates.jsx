import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {

    const [authTokens, setAuthTokens] = useState({
        id : '',
        access: '',
        refresh: ''
    })

    return (
        <AuthContext.Provider value={[authTokens, setAuthTokens]}>
            {props.children}
        </AuthContext.Provider>
    )
}