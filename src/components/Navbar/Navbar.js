import styles from "./Navbar.module.css";
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Navbar = () => {

    const [userPanelClicked, setUserPanelClicked] = useState(false);
    const { isAuthenticated, onLogoutClick, username, userId } = useContext(AuthContext);

    const onUserPanelClick = () => {
        setUserPanelClicked(!userPanelClicked);
    };

    return (
        <nav className={styles["nav"]}>
            <Link to="/"><span className={styles["logo"]}>Home</span></Link>
            <ul className={styles["menu"]}>
                <Link to="/catalog"><li className={styles["nav-item"]}>All recipes</li></Link>
                {/* Check if authenticated, private side */}
                {isAuthenticated() ?
                    (<>
                        <Link to="/create"><li className={styles["nav-item"]}>Add new recipe</li></Link>
                        <li className={`${styles["userPanel"]} ${styles["nav-item"]}`} onClick={onUserPanelClick}>Welcome, {username}
                        {/* Drop-down functionality */}
                            {userPanelClicked &&
                                <ul className={styles["userPanel-dropdown"]}>
                                    <Link to={`/profile/${userId}`}><li className={styles["userPanel-content"]}>My Profile
                                    </li></Link>
                                    <Link to="/logout"><li className={styles["userPanel-content"]}>Log Out
                                    </li></Link>
                                </ul>
                            }
                        </li>
                    </>)
                    : (<>
                        <Link to="/login"><li className={styles["nav-item"]}>Login</li></Link>
                        <Link to="/register"><li className={styles["nav-item"]}>Register</li></Link>
                    </>)}
            </ul>
        </nav>
    );
};

