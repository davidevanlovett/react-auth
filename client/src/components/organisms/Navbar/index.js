import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/auth';
import './navbar.css';

const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <nav>
            <ul>
                <li><strong>Navbar</strong></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to='/notes'>Notes</Link></li>
                {isLoggedIn() ?
                    <>
                        <li>Hello, {getProfile().email}</li>
                        <li><Link onClick={() => logout()} to='/'>Logout</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                }

            </ul>

        </nav>
    );
};

export default Navbar;