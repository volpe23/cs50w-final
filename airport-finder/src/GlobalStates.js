import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {

    const [authState, setAuthState] = useState({
        id : '',
        
    })

    return (
        <AuthContext.Provider>
            {props.children}
        </AuthContext.Provider>
    )
}