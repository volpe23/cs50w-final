import { useState, useEffect, useRef, createContext } from 'react';
import { Marker } from 'react-map-gl';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import './styles/App.scss';

import Home from './components/Home';



function App() {


	return (
		<main className="main">
		<Layout>
			<Routes>
				<Route path='/' element={<Home />}/>
			</Routes>
		</Layout>
		</main>
	)
	}

export default App
