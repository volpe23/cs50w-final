import { Routes, Route } from 'react-router-dom';
import AirportContext from '@/components/AirportContext';
import Navbar from './components/Navbar';
import './styles/App.scss';

import Home from './components/Home';
import Register from './authentication/Register';
import Login from './authentication/Login';
import PrivateRoute from './authentication/PrivateRoute';
import Profile from './authentication/Profile';


function App() {



	return (
			<main className="main">
					<Navbar />
				<AirportContext>
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path='/' element={<Home />} />
						</Route>
						<Route element={<PrivateRoute />}>
							<Route path='/account' element={<Profile />} />
						</Route>
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</AirportContext>
			</main>
	)
	}

export default App
