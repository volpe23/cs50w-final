import { Routes, Route } from "react-router-dom";
import AirportContextProvider from "@/components/AirportContext";
import "@/styles/App.scss";

import Layout from "@/components/Layout";
import Home from "./components/Home";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import Profile from "./authentication/Profile";

function App() {
  return (
    <Routes>
			<Route path='/' element={<Layout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route element={<AirportContextProvider />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="account" element={<Profile />} />
          </Route>
        </Route>
				</Route>
    </Routes>
  );
}

export default App;
