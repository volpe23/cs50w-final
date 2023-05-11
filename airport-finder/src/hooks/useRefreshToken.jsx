import axios from "./useAxios";
// import useAuth from "./useAuth";

const useRefreshToken = () => {
    // const { authTokens, setAuthTokens } = useAuth();
    const { refresh } = localStorage.getItem('tokens');

    const body = {
        refresh
    }
    
    const refreshTokens = async () => {
        console.log(body)
        try {
            const res = await axios.post('/auth/jwt/refresh/', JSON.stringify(body));
            const newTokens = res?.data;
            localStorage.setItem('tokens', JSON.stringify(newTokens));
            // setAuthTokens(newTokens);
            return newTokens
            console.log(res);

        }
        catch (err) {
            console.log(err);
        }
    }

    return refreshTokens;
}

export default useRefreshToken;