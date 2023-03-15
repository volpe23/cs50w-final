import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <nav>
            <ul>
                <li>
                    <Link>Home</Link>
                </li>
                <li>
                    <Link>Register</Link>
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