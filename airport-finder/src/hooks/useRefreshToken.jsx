import axios from "./useAxios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { authTokens, setAuthTokens } = useAuth();

    const body = {
        refresh: authTokens?.refresh
    }
    
    const refreshTokens = async () => {
        try {
            const res = await axios.post('/auth/jwt/refresh/', JSON.stringify(body));
            const newTokens = res?.data;
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            console.log(newTokens)
            setAuthTokens(newTokens);
            return newTokens;

        }
        catch (err) {
            console.log(err);
        }
    }

    return refreshTokens;
}

export default useRefreshToken;