import { NavLink } from 'react-router-dom';
import { SHOP_NAME } from '../../lib/Constants';
import { useAuth } from '../../lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <nav className='navbar flex-column navbar-expand-lg bg-white rounded-3 shadow-sm p-3 responsive-sidebar bg-primary'>
                <div className='d-flex justify-content-between w-100'>
                    <NavLink to='/' className="fw-bold fs-1 text-dark text-decoration-none text-center w-100">{SHOP_NAME}</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className='show d-lg-block mt-3 mt-lg-0 w-100' id="sidebar">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <NavLink to='/admin' className="nav-link" end>Dashboard</NavLink>
                        </li>

                        {/*<li className="nav-item">*/}
                        {/*    <NavLink to='/admin/accounts' className="nav-link" href="#">Account Management</NavLink>*/}
                        {/*</li>*/}

                        <li className="nav-item">
                            <NavLink to='/admin/orders' className="nav-link" href="#">Order Management</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/products' className="nav-link" href="#">Product Management</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/collections' className="nav-link" href="#">Collection Management</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/settings' className="nav-link" href="#">Settings</NavLink>
                        </li>

                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link w-100 text-start">Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Sidebar