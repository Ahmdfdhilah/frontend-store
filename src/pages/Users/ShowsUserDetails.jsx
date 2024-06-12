import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Navbar, Footer } from '../../components';
import { useNavigate } from 'react-router-dom';

const ShowUserDetails = () => {
  const { userId } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/user/details/create');
  };

  const handleUpdate = () => {
    navigate('/user/details/update');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          return;
        }

        const response = await axios.get(`http://localhost:3000/users/details-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
        console.log(response.data.imgSrc);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const renderActionButton = () => {
    if (userDetails === null) {
      return (
        <button className="btn btn-primary" onClick={handleCreate}>
          Create User Details
        </button>
      );
    } else {
      return (
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update User Details
        </button>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>User Details</h1>
        <div className="card">
          <div className="card-body">
          {userDetails ? (
              <>
                <p><strong>First Name:</strong> {userDetails.firstName}</p>
                <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                <p><strong>Phone:</strong> {userDetails.phone}</p>
                <p><strong>Gender:</strong> {userDetails.gender}</p>
                <p><strong>Birth Date:</strong> {userDetails.birthDate}</p>
                <img src={userDetails.imgSrc} alt="" />
              </>
            ) : (
              <p>No user details found.</p>
            )}
            {renderActionButton()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowUserDetails;