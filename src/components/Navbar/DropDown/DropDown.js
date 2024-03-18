import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import styles from './DropDown.module.css';
export const DropDown = ({dropdownRef, userPanelClicked, setUserPanelClicked}) => {

    const { userId } = useContext(AuthContext);

    return (
        <ul 
        onClick={() => setUserPanelClicked(!userPanelClicked)}
        ref={dropdownRef} className={styles["dropdown-container"]} >
            <Link 
            className={styles["dropdown-link"]} to={`/profile/${userId}`}>
                <li>My Profile</li>
                </Link>
            <Link 
            className={styles["dropdown-link"]} to="/logout">
                <li>Log Out</li>
                </Link>
        </ul>
    )
};