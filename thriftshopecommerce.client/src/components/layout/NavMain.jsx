import { Link } from 'react-router-dom'
import { SHOP_NAME } from '../../lib/constants';

function NavMain() {
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg shadow-lg bg-white">
                <div className="container">
                    <a className="navbar-brand" href="#">{SHOP_NAME}</a>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-end w-100">
                            <Link className="nav-link fw-medium" to="/">Home</Link>
                            <a className="nav-link fw-medium" href="#">About</a>
                            <a className="nav-link fw-medium" href="#">FAQ</a>
                            <Link className="nav-link fw-medium" to="/cart">Cart</Link>
                            <Link className="nav-link fw-medium" to="/signin">Register</Link>
                            <Link className="nav-link fw-medium" to="/signup">Sign In</Link>
                            <a className="nav-link fw-medium" href="#">Sign out</a>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavMain