import "./Navbar.css";
export const Navbar = (props) => {

    return (
        <div className="container">
            <nav className="nav">
            <li className="nav-item"><a href="/">LogoHome</a></li>
            <li className="nav-item"><a href="/catalog">All recipies</a></li>
            <li className="nav-item"><a href="/create">Add new recipe</a></li>
            <li className="nav-item"><a href="/login">Login</a></li>
            <li className="nav-item"><a href="/register">Register</a></li>
            <li className="nav-item"><a href="logout">Logout</a></li>
            </nav>
            
        </div>
    );
};

