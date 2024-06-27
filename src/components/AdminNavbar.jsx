import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthContext } from '../AuthContext';
import { faSignOutAlt, faPlus, faTable } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/admin">
                    <img src="/assets/trustlogo.png" style={{ maxWidth: "150px" }} alt="Logo" />
                </NavLink>
                <button
                    className="navbar-toggler mx-2"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="manageProductsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Manage Products
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="manageProductsDropdown">
                                <li><NavLink className="dropdown-item" to="/admin/products/create"><FontAwesomeIcon icon={faPlus} className="me-1" /> Create Product</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/admin/products/show-products"><FontAwesomeIcon icon={faTable} className="me-1" /> View Product Table</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="manageOrdersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Manage Orders
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="manageOrdersDropdown">
                                <li><NavLink className="dropdown-item" to="/admin/orders/create"><FontAwesomeIcon icon={faPlus} className="me-1" /> Create Order</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/admin/orders/table"><FontAwesomeIcon icon={faTable} className="me-1" /> View Order Table</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="manageUsersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Manage Users
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="manageUsersDropdown">
                                <li><NavLink className="dropdown-item" to="/admin/users/create"><FontAwesomeIcon icon={faPlus} className="me-1" /> Create User</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/admin/users/table"><FontAwesomeIcon icon={faTable} className="me-1" /> View User Table</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        <button onClick={handleLogout} className="btn btn-outline-danger m-2">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;