import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={styles["home-img-container"]}>
            {isAuthenticated() ?
                <Link className={styles['home-start-btn']} to={'/catalog'}>Get Started</Link>
                : <Link className={styles['home-start-btn']} to={'/login'}>Get Started</Link>
            }
        </div>
    );
}