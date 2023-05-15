import axios from "./useAxios";
// import useAuth from "./useAuth";

const useRefreshToken = () => {
    // const { authTokens, setAuthTokens } = useAuth();
    const tokens = JSON.parse(localStorage.getItem('tokens'));

    const body = {
        refresh: tokens?.refresh
    }
    
    const refreshTokens = async () => {
        console.log(tokens)
        try {
            const res = await axios.post('/auth/jwt/refresh/', JSON.stringify(body));
            const newTokens = res?.data;
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            console.log(newTokens);
            // setAuthTokens(newTokens);
            return newTokens

        }
        catch (err) {
            console.log(err);
        }
    }

    return refreshTokens;
}

export default useRefreshToken;