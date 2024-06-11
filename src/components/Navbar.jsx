import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext'; 
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/action'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.handleCart);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
    dispatch(clearCart());
    setIsAuthenticated(false)
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">T. rust</NavLink>
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            {!isAuthenticated && (
              <NavLink to="/login" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i> Login
              </NavLink>
            )}
            {!isAuthenticated && (
              <NavLink to="/register" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Register
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
              </NavLink>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger m-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
