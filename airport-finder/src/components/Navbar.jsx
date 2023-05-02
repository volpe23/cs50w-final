import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link>Login</Link>
                </li>
                <li>
                    <Link>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}