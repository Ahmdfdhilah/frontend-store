import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../AuthContext';
import { Navbar, Footer } from '../../../components';
import { useNavigate } from 'react-router-dom';
import FloatingFAQButton from '../../../components/FAQButton';

const UpdateUserAddress = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState([{
    id: null,
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  }]);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          console.error('No token or userId found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:3000/users/user-address/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserAddress(response.data[0]);
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
    };

    fetchUserAddress();
  }, [userId]);

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
      if (!token || !userId || !userAddress.id) {
        console.error('No token, userId, or userAddress.id found in localStorage');
        return;
      }

      const response = await axios.put(`http://localhost:3000/users/user-address/${userId}`, userAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Update successful:', response.data);
      navigate('/user/details');
    } catch (error) {
      console.error('Error updating user address:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <h5 className="card-header">Update User Address</h5>
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
                  <button type="submit" className="btn btn-primary">Update Address</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingFAQButton />
    </>
  );
};

export default UpdateUserAddress;