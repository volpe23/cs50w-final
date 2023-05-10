import { useState, useEffect, useRef, createContext } from 'react';
import { Marker } from 'react-map-gl';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import AuthProvider from './GlobalStates';
import './styles/App.scss';

import Home from './components/Home';
import Register from './authentication/Register';
import Login from './authentication/Login';
import PrivateRoute from './authentication/PrivateRoute';


function App() {

	return (
		<AuthProvider>
			<Navbar />
			<main className="main">
				<Layout>
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path='/' element={<Home />} />
						</Route>
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</Layout>
			</main>
		</AuthProvider>
	)
	}

export default App
