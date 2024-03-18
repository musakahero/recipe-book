import styles from "./Navbar.module.css";
import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import { DropDown } from "./DropDown/DropDown";
import { useTrans } from "../../hooks/useTrans";

export const Navbar = () => {
    //style to apply for active tabs
    const activeStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#3fb472" : "",
            // color: isActive ?  "white" : "black"
        };
    };

    const [userPanelClicked, setUserPanelClicked] = useState(false);
    const { isAuthenticated, username } = useContext(AuthContext);
    const toggleDropdownRef = useRef(null);
    const dropdownRef = useRef(null);
    const { mounted } = useTrans(false);


    useEffect(() => {
        // Function to close dropdown when clicked outside
        const handleClickOutside = (e) => {
            if (toggleDropdownRef.current
                && !toggleDropdownRef.current.contains(e.target) //check if click is not within the Welcome element
                && dropdownRef.current
                && !dropdownRef.current.contains(e.target)) {  //check if click is not within the drop-down element
                setUserPanelClicked(false);
            }
        }
        // attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // remove the event listener on cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleDropdownRef, dropdownRef]);


    return (
        <>
            <nav className={styles["nav"]}
                style={mounted ?
                    {
                        transform: 'translate(0%, 0%)'
                    } : null
                }
            >
                <Link to="/">
                    <div className={styles["logo"]}>
                        <FontAwesomeIcon
                            icon={faKitchenSet} /> CookBook</div>
                </Link>
                <ul className={styles["menu"]}>
                    <NavLink to="/catalog" style={activeStyle}>
                        <li className={styles["nav-item"]}>All recipes</li>
                    </NavLink>

                    {/* Check if authenticated, private side */}
                    {isAuthenticated() ?
                        (<>
                            <NavLink to="/create"
                                style={activeStyle}>
                                <li className={styles["nav-item"]}>Add recipe</li>
                            </NavLink>
                            <a><li className={`${styles["nav-item"]} ${styles["dropdown-open"]}`}
                                ref={toggleDropdownRef}
                                onClick={() => setUserPanelClicked(!userPanelClicked)}>Hello, {username}</li></a>
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
                {
                    userPanelClicked
                    && (<DropDown
                        dropdownRef={dropdownRef}
                        userPanelClicked={userPanelClicked}
                        setUserPanelClicked={setUserPanelClicked} />)
                }
            </nav>

        </>
    );
};

