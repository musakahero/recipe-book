import "./Navbar.css";
import { Link } from 'react-router-dom';

export const Navbar = (props) => {

    return (
        <div className="container">
            <nav className="nav">
            <li className="nav-item"><Link to="/">LogoHome</Link></li>
            <li className="nav-item"><Link to="/catalog">All recipes</Link></li>
            <li className="nav-item"><Link to="/create">Add new recipe</Link></li>
            <li className="nav-item"><Link to="/login">Login</Link></li>
            <li className="nav-item"><Link to="/register">Register</Link></li>
            <li className="nav-item"><Link to="logout">Logout</Link></li>
            </nav>
        </div>
    );
};

