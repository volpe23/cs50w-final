import { Link } from "react-router-dom";
import '../styles/Navbar.scss';

export default function Navbar() {

    return (
        <nav className="navbar">
            <ul className="navbar-list">
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