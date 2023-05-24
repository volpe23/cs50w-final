import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./GlobalStates";

const user = JSON.parse(sessionStorage.getItem("user"));
const tokens = JSON.parse(localStorage.getItem("tokens"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider user={user} tokens={tokens}>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
