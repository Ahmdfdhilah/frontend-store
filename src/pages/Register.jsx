import React, { useState } from 'react';
import { Footer, Navbar } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisLoginModal from '../components/RegisLoginModal';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [modal, setModal] = useState({ show: false, title: '', message: '' });
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModal({ show: false, title: '', message: '' });
    if (modal.title === 'Registration Successful') {
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
      addresses: [],
      details: [],
      userRole: 'user',
      reviews: []
    };

    try {
      const response = await axios.post('http://localhost:3000/auth/register', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setModal({
        show: true,
        title: 'Registration Successful',
        message: 'You have successfully registered. You will be redirected to the login page.'
      });
    } catch (error) {
      setModal({
        show: true,
        title: 'Registration Error',
        message: 'There was an error registering. Please try again later.'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
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
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
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

export default Register;
