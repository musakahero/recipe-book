import styles from "./Navbar.module.css";
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
    //style to apply for active tabs
    const activeStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#fdc734" : "",
            color: isActive ? "black" : "white"
        };
    };

    const [userPanelClicked, setUserPanelClicked] = useState(false);
    const { isAuthenticated, username, userId } = useContext(AuthContext);

    return (
        <nav className={styles["nav"]}>
            <Link to="/"><span className={styles["logo"]}><FontAwesomeIcon icon={faKitchenSet} style={{fontSize: '3rem'}}/></span></Link>
            <ul className={styles["menu"]}>
                <NavLink to="/catalog" style={activeStyle}><li className={styles["nav-item"]}>All recipes</li></NavLink>
                {/* Check if authenticated, private side */}
                {isAuthenticated() ?
                    (<>
                        <NavLink to="/create"
                            style={activeStyle}
                        ><li className={styles["nav-item"]}>Add new recipe</li></NavLink>
                        <li className={`${styles["userPanel"]} ${styles["nav-item"]}`} 
                        onClick={() => { setUserPanelClicked(!userPanelClicked)}}>Welcome, {username}
                            {/* Drop-down functionality */}
                            {userPanelClicked &&
                                <ul className={styles["userPanel-dropdown"]}>
                                    <Link to={`/profile/${userId}`} ><li className={styles["userPanel-content"]}>My Profile
                                    </li>
                                    
                                    </Link>
                                    <Link to="/logout"><li className={styles["userPanel-content"]}>Log Out
                                    </li></Link>
                                </ul>
                            }
                        </li>
                    </>)
                    : (<>
                        <NavLink to="/login"
                            style={activeStyle}
                        ><li className={styles["nav-item"]}>Login</li></NavLink>
                        <NavLink to="/register"
                            style={activeStyle}
                        ><li className={styles["nav-item"]}>Register</li></NavLink>
                    </>)}
            </ul>
        </nav>
    );
};

