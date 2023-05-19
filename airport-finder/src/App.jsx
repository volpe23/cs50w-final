import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import AuthProvider from './GlobalStates';
import './styles/App.scss';

import Home from './components/Home';
import Register from './authentication/Register';
import Login from './authentication/Login';
import PrivateRoute from './authentication/PrivateRoute';
import Profile from './authentication/Profile';


function App() {

	return (
		<AuthProvider>
			<main className="main">
				<Layout>
					<Navbar />
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path='/' element={<Home />} />
							<Route path='/account' element={<Profile />} />
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
