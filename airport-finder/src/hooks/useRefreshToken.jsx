import axios from "./useAxios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { authTokens, setAuthTokens } = useAuth();

    const body = {
        refresh: authTokens?.refresh
    }

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const refresh = async () => {
        console.log(body)
        try {
            const res = await axios.post('/auth/jwt/refresh/', JSON.stringify(body));
            const newTokens = res?.data;
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            setAuthTokens(newTokens);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    return refresh;
}

export default useRefreshToken;