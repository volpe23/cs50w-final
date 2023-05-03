import { useState, useContext } from 'react';
import Button from '../components/utils/Button';
import axios from 'axios';
import { AuthContext } from '../GlobalStates';
import './styles/Authentication.scss';



export default function Login() {

    const [authTokens, setAuthTokens] = useContext(AuthContext);

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
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/create/`, body, config);
            setAuthTokens({
                access: res.data.access, 
                refresh: res.data.refresh
            })
            localStorage.setItem('tokens', JSON.stringify(res.data));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className='auth-form' onSubmit={getToken}>
            <div>
                <h3>Log in</h3>
            </div>
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