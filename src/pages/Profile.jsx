import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Footer, Navbar } from '../components';

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    birthDate: '',
    imgSrc: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        if (!userId) {
          console.error('User ID not available yet.');
          return;
        }

        console.log(`Fetching details for user ID: ${userId}`);
        const response = await axios.get(`http://localhost:3000/users/details-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const formData = new FormData();
      formData.append('firstName', userDetails.firstName);
      formData.append('lastName', userDetails.lastName);
      formData.append('phone', userDetails.phone);
      formData.append('gender', userDetails.gender);
      formData.append('birthDate', userDetails.birthDate);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      console.log(`Updating details for user ID: ${userId}`);
      console.log('Form data:', {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        gender: userDetails.gender,
        birthDate: userDetails.birthDate,
        imgSrc: selectedFile ? selectedFile.name : 'No file selected',
      });

      const response = await axios.post(`http://localhost:3000/users/details-user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating user details:', error);
      console.log('Error details:', error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" name="firstName" value={userDetails.firstName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={userDetails.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="phone" name="phone" value={userDetails.phone} onChange={handleChange} required />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input type="text" className="form-control" id="gender" name="gender" value={userDetails.gender} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="birthDate" className="form-label">Birth Date</label>
              <input type="text" className="form-control" id="birthDate" name="birthDate" value={userDetails.birthDate} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="imgSrc" className="form-label">Image Source URL</label>
            <input type="text" className="form-control" id="imgSrc" name="imgSrc" value={userDetails.imgSrc} onChange={handleChange} />
            <input type="file" className="form-control mt-2" id="file" name="file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
