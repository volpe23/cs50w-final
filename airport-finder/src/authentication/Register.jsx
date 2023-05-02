import { useState } from "react"
import Button from "../components/utils/Button"
import axios from "axios";

export default function Register() {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        re_password: ''
    })

    const { email, username, firstName, lastName, password, re_password } = formData;

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
            console.log(data.statusText);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        
        <form onSubmit={onUserRegister}>
            <div>
                <label htmlFor="email_field">Email</label>
                <input id="email_field" name="email" type="email"
                    onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="username_field">Username</label>
                <input id="username_field" name="username" type="username" onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="firstName_field">First Name</label>
                <input id="firstName_field" name="first_name" type="text" onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="lastName_field">Last Name</label>
                <input id="lastName_field" name="last_name" type="text" onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="password_field">Password</label>
                <input id="password_field" name="password" type="password" onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="re_password_field">Repeat password</label>
                <input id="re_password_field" name="re_password" type="password" onChange={onChange}/>
            </div>
            <Button type="submit">Register </Button>
        </form>
    )
}