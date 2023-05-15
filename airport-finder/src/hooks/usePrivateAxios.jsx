import { useEffect } from "react";
import { axiosPrivate } from "./useAxios";
import useRefreshToken from "./useRefreshToken";

const usePrivateAxios = () => {
  const refreshTokens = useRefreshToken();
  
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `JWT ${tokens?.access}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      response => response,
      async(error) => {
        console.log(error);
        const prevRequest = error?.config;
        if (error?.response?.status === 401 || error?.response?.stauts === 400) {
          const newTokens = await refreshTokens();
          prevRequest.headers['Authorization'] = `JWT ${newTokens?.refresh}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    }
  }, []);

  return axiosPrivate;
}

export default usePrivateAxios;