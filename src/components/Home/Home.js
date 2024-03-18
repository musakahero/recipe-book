import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useTrans } from '../../hooks/useTrans';

export const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { mounted } = useTrans(false);

    return (
        <div className={styles["home-img-container"]}
            style={mounted &&
                {
                    transform: 'translate(0%, 0%)'
                }
            }
        >
            {isAuthenticated() ?
                <Link className={styles['home-start-btn']} to={'/catalog'}>Get Started</Link>
                : <Link className={styles['home-start-btn']} to={'/login'}>Get Started</Link>
            }
        </div>
    );
}