import { Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <nav>
                <div className="container">
                    <ul>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">דף הבית</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">כל המוצרים</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">הרשם</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">התחבר</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">סל הקניות</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;