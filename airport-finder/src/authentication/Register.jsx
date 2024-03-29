import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button"
import axios from "axios";

import './styles/Authentication.scss';

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    })

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onUserRegister = async (e) => {
        e.preventDefault();
        console.log(formData)
        const body = JSON.stringify(formData);
       try {
            const data = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/`, body, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            navigate('/login');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        
        <form className="auth-form" onSubmit={onUserRegister}>
            <div>
                <h3>Sign up</h3>
            </div>
            <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input id="email_field" name="email" type="email"
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="username_field">Username</label>
                <input id="username_field" name="username" type="username" onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstName_field">First Name</label>
                <input id="firstName_field" name="first_name" type="text" onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="lastName_field">Last Name</label>
                <input id="lastName_field" name="last_name" type="text" onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input id="password_field" name="password" type="password" onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="re_password_field">Repeat password</label>
                <input id="re_password_field" name="re_password" type="password" onChange={onChange}/>
            </div>
            <Button type="submit">Register </Button>
        </form>
    )
}