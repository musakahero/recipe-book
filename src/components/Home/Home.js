import { Link } from 'react-router-dom';
import styles from './Home.module.css';


export const Home = (props) => {
    return (
        <div className={styles["home-img-container"]}>
            <Link className={styles['home-start-btn']} to={'/login'}>Get Started</Link>
        </div>
    );
}