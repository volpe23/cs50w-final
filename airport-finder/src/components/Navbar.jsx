import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../GlobalStates';
import '../styles/Navbar.scss';
import logo from '../imgs/icons8-airplane-96.png';


export default function Navbar() {

    const navigate = useNavigate()

    const { userAccount, setUserAccount, setAuthTokens } = useContext(AuthContext);
    const logout = () => {
        navigate('/login');
        setUserAccount(null);
        setAuthTokens(null);
        localStorage.removeItem('tokens');
        console.log("Logged out")
    }

    return (
      <nav className="navbar">
        <ul className="navbar-list">
            <img src={logo} />
          <div class="navbar-start">
              <li>
                <Link to="/">Home</Link>
              </li>
          </div>
          <div className="navbar-end">
            {!userAccount ? (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    );
}

