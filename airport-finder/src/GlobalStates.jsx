import { useState, createContext, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AuthProvider(props) {
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState(null);
    const [userAccount, setUserAccount] = useState(null);

    const login = useCallback(
      async (tokens) => {
          console.log(tokens, JSON.stringify(tokens));
        setAuthTokens({
            access: tokens?.access,
            refresh: tokens?.refresh
        });
        getUser(tokens?.access);
        // setUserAccount({...userData});
        navigate("/");
      },
      []
    );

    useEffect(() => {
        if (localStorage.getItem('tokens')) {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            setAuthTokens({
                access: tokens?.access,
                refresh: tokens?.refresh
            })
            console.log(tokens);
            // const userData = getUser(tokens?.access);
            getUser(tokens?.access);
            navigate('/');
        }
    }, [])
    

    const getUser = async (access) => {
        const user = await axios.get(`${BASE_URL}/auth/users/me/`, {
            headers: {
                'Authorization' : `JWT ${access}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return setUserAccount(user.data)
    }

    return (
        <AuthContext.Provider value={{authTokens, userAccount, login}}>
            {props.children}
        </AuthContext.Provider>
    )
}