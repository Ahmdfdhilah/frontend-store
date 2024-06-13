import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navbar, Footer } from '../../../components';
import { AuthContext } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateUserAddress = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState([{
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post(`http://localhost:3000/users/user-address/${userId}`, userAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Address creation successful:', response.data);
      navigate('/user/details');
    } catch (error) {
      console.error('Error creating user address:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <h5 className="card-header">Create User Address</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street</label>
                    <input type="text" className="form-control" id="street" name="street" value={userAddress.street} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" value={userAddress.city} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" name="state" value={userAddress.state} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" id="postalCode" name="postalCode" value={userAddress.postalCode} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" value={userAddress.country} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Create Address</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateUserAddress;