import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import RegisLoginModal from '../components/RegisLoginModal';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); 
  const [modal, setModal] = useState({ show: false, title: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('http://localhost:3000/auth/validate-token', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsAuthenticated(true);
          navigate('/home');
        } catch (error) {
          console.error('Token verification failed:', error);
        }
      }
    };
    checkToken();
  }, [navigate]);

  const handleCloseModal = () => {
    setModal({ show: false, title: '', message: '' });
    if (modal.title === 'Login Successful') {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', JSON.stringify({
        username,
        password
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login successful:', response.data);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.data.accessToken);
      setModal({
        show: true,
        title: 'Login Successful',
        message: 'You have successfully logged in.'
      });
    } catch (error) {
      setModal({
        show: true,
        title: 'Login Error',
        message: 'Invalid username or password. Please try again.'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="Username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <p>
                  New here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <RegisLoginModal
        show={modal.show}
        handleClose={handleCloseModal}
        title={modal.title}
        message={modal.message}
      />
    </>
  );
};

export default Login;
