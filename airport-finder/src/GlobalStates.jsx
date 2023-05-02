import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {

    const [authState, setAuthState] = useState({
        id : '',
        access: '',
        refresh: ''
    })

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    )
}