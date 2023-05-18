import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../hooks/useAxios';

import './styles/Authentication.scss';
import Button from '../components/utils/Button';

export default function Login() {
    const { login, logout, setIsLoading } = useAuth()
    const [isError, setIsError] = useState(false)
    const [formData, setFromData] = useState({
        email: '',
        password: ''
    })

    const location = useLocation();

    const onChange = (e) => {
        setFromData({...formData, [e.target.name]: e.target.value})
    }

    const getToken = async (e) => {
        e.preventDefault();

        const body = JSON.stringify(formData);
        
        try {
            setIsLoading(true);
            const res = await axios.post(`/auth/jwt/create/`, body);
            localStorage.setItem('tokens', JSON.stringify(res?.data));
            login(res?.data)
        } catch (err) {
            console.log(err);
            setIsError(err.response?.data?.detail)
        }
    }

    useEffect(() => {
        if (location?.state) {
            setIsError(location.state.text);
            location.state?.operation === 'logout' ? logout() : null;
        } 
        console.log(location);
    }, [])

    return (
        <form className='auth-form' onSubmit={getToken}>
            <div>
                <h3>Log in</h3>
            </div>
            {isError && <h4>{isError}</h4>}
            <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input id="email_field" name="email" type="email"
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input id="password_field" name="password" type="password" onChange={onChange}/>
            </div>
            <Button type='submit'>Log in</Button>
        </form>
    )
}



