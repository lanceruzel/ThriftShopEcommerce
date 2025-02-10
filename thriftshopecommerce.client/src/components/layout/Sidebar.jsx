import React from 'react'
import { NavLink } from 'react-router-dom';
import { SHOP_NAME } from '../../lib/constants';

function Sidebar() {
    return (
        <>
            <nav className='navbar flex-column navbar-expand-lg bg-white rounded-3 shadow-sm p-3 responsive-sidebar bg-primary'>
                <div className='d-flex justify-content-between w-100'>
                    <h1 className='fw-bold'>{SHOP_NAME}</h1>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className='show d-lg-block mt-3 mt-lg-0 w-100' id="sidebar">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <NavLink to='/admin/dashboard' className="nav-link">Dashboard</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/accounts' className="nav-link" href="#">Account Management</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/orders' className="nav-link" href="#">Order Management</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/products' className="nav-link" href="#">Product Management</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/admin/settings' className="nav-link" href="#">Settings</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">View Home</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Sidebar