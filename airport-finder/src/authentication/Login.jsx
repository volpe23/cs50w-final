import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useLogin from '@/hooks/useLogin';
import axios from '@/hooks/useAxios';
import useLogout from '@/hooks/useLogout';
import useFetchUser from '@/hooks/useFetchUser';

import '@/authentication/styles/Authentication.scss';
import Button from '@/components/utils/Button';

export default function Login() {
    const { setIsLoading, authTokens } = useAuth()
    const logout = useLogout();
    const [isError, setIsError] = useState(false)
    const [formData, setFromData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const location = useLocation();
    const login = useLogin();
    const fetchUser = useFetchUser();

    const onChange = (e) => {
        setFromData({...formData, [e.target.name]: e.target.value})
    }

    const getToken = async (e) => {
        e.preventDefault();

        const body = JSON.stringify(formData);
        const controller = new AbortController();
        try {
            setIsLoading(true);
            const res = await axios.post(`/auth/jwt/create/`, body);
            localStorage.setItem('tokens', JSON.stringify(res?.data));
            fetchUser(controller);
            login(res?.data)
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            setIsError(err.response?.data?.detail)
            controller.abort();
        }
    }

    useEffect(() => {
        if (authTokens) navigate('/')
        if (location?.state) {
            setIsError(location.state.text);
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



