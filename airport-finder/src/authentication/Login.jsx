import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../GlobalStates';
import useAxios from '../hooks/useAxios';
import Button from '../components/utils/Button';
import axios from 'axios';
import './styles/Authentication.scss';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL

export default function Login() {
    const navigate = useNavigate();
    const { authTokens, login, userAccount } = useContext(AuthContext);

    const [isError, setIsError] = useState(false)

    const [formData, setFromData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setFromData({...formData, [e.target.name]: e.target.value})
    }

    const getToken = async (e) => {
        e.preventDefault();

        const body = JSON.stringify(formData);
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${BASE_URL}/auth/jwt/create/`, body, config);
            console.log(res)
            localStorage.setItem('tokens', JSON.stringify(res.data));
            login(res.data)
        } catch (err) {
            console.log(err);
            setIsError(err.response.data.detail)
        }
        // console.log(authTokens, userAccount)
    }

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



