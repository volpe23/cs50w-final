import { Link, useNavigate } from "react-router-dom";
import '../styles/Navbar.scss';
import logo from '../imgs/icons8-airplane-96.png';
import useAuth from "../hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate()

    const { userAccount } = useAuth();

    

    return (
      <nav className="navbar">
        <ul className="navbar-list">
            <img src={logo} />
          <div className="navbar-start">
              <li >
                <Link className="nav-item" to="/">Home</Link>
              </li>
          </div>
          <div className="navbar-end">
            {!userAccount ? (
              <>
                <li >
                  <Link className="nav-btn nav-btn-primary" to="/register">Register</Link>
                </li>
                <li >
                  <Link className="nav-btn btn-outline" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li onClick={() => {
                  navigate('/login', {
                    state: { 
                      text : 'You are logged out!',
                      operation : 'logout'
                      }
                  })
                }}>
                <Link className="nav-btn btn-outline" >Logout</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    );
}

