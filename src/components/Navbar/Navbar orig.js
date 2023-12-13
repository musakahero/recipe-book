import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Navbar = (props) => {

    const [userPanelClicked, setUserPanelClicked] = useState(false)
    const { isAuthenticated, onLogoutClick, userEmail } = useContext(AuthContext);

    const onUserPanelClick = () => {
        setUserPanelClicked(!userPanelClicked);
        console.log(userPanelClicked);
    };

    return (
        <>
            <nav className="nav">
                <li className="nav-item"><Link to="/">LogoHome</Link></li>
                <li className="nav-item"><Link to="/catalog">All recipes</Link></li>
                {true ? (<>
                    <li className="nav-item"><Link to="/create">Add new recipe</Link></li>
                    <li className="nav-item" onClick={onUserPanelClick}><span>Welcome, {userEmail}</span></li>
                    {/* <li className="nav-item"><Link to="logout">Logout</Link></li> */}
                </>)
                    : (<>
                        <li className="nav-item"><Link to="/login">Login</Link></li>
                        <li className="nav-item"><Link to="/register">Register</Link></li>
                    </>)}

            </nav>
            {userPanelClicked ?
                <div className="userPanel">
                    <div className="userPanel-content">logout?
                    </div>
                    <div className="userPanel-content">logout?
                    </div>
                    <div className="userPanel-content">logout?
                    </div>
                </div>
                : null}
        </>
    );
};

