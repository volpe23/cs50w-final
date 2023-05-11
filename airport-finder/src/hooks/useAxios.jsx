import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type' : 'application/json' 
  }
})