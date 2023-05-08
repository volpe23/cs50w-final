import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

const useAxios = (url, method) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await axios[method](url);
            setResponse(res.data);
        } catch (err) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    } 

    useEffect(() => {
        fetchData();
    }, [method, url])

    return { response, error, loading };
}

export default useAxios;