import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Navbar = (props) => {

    const [userPanelClicked, setUserPanelClicked] = useState(false)
    const { isAuthenticated, onLogoutClick, userEmail } = useContext(AuthContext);

    const onUserPanelClick = () => {
        setUserPanelClicked(!userPanelClicked);
    };

    return (
        <nav className="nav">
            <span className="logo"><Link to="/">LogoHome</Link></span>
            <ul className="menu">
                <li className="nav-item"><Link to="/catalog">All recipes</Link></li>
                {isAuthenticated() ? (<>
                    <li className="nav-item"><Link to="/create">Add new recipe</Link></li>
                    <li className="userPanel nav-item" onClick={onUserPanelClick}>Welcome, {userEmail}
                        {userPanelClicked ?
                        <ul className="userPanel-dropdown">
                            <li className="userPanel-content">My Profile
                            </li>
                            <li className="userPanel-content"> <Link to="/logout">Log Out</Link>
                            </li>
                        </ul>
                         : null} 
                    </li>
                    {/* <li className="nav-item"><Link to="logout">Logout</Link></li> */}
                </>)
                    : (<>
                        <li className="nav-item"><Link to="/login">Login</Link></li>
                        <li className="nav-item"><Link to="/register">Register</Link></li>
                    </>)}
            </ul>
        </nav>
    );
};

