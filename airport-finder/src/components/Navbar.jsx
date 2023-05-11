import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../GlobalStates';
import '../styles/Navbar.scss';
import logo from '../imgs/icons8-airplane-96.png';


export default function Navbar() {

    const navigate = useNavigate()

    const { userAccount, authTokens, setUserAccount, setAuthTokens } = useContext(AuthContext);
    const logout = () => {
      localStorage.removeItem('tokens');
      setUserAccount(null);
      setAuthTokens(null);
      navigate('/login');
        console.log("Logged out")
    }

    return (
      <nav className="navbar">
      <p>{`${userAccount?.username}, ${authTokens?.access}`}</p>
        <ul className="navbar-list">
            <img src={logo} />
          <div className="navbar-start">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
          </div>
          <div className="navbar-end">
            {!userAccount ? (
              <>
                <li className="nav-btn nav-btn-primary">
                  <Link to="/register">Register</Link>
                </li>
                <li className="nav-btn btn-outline">
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li className="nav-btn btn-outline">
                <Link onClick={() => logout()}>Logout</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    );
}

