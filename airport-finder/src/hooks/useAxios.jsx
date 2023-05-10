import axios from "axios";
import { useEffect, useState } from "react";

export default axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL
});
