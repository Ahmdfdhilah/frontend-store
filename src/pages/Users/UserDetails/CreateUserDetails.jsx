import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navbar, Footer } from '../../../components';
import { AuthContext } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import FloatingFAQButton from '../../../components/FAQButton';

const CreateUserDetails = () => {
  const {userId} = useContext(AuthContext)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    birthDate: '',
    imgSrc: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    console.log(userId);
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
      formData.append('userRoles', 'user')
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axios.post(`https://trust-d4cbc4aea2b1.herokuapp.com/users/details-user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Create successful:', response.data);
      navigate('/user/details')
    } catch (error) {
      console.error('Error creating user details:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <h5 className="card-header">Create User Details</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={userDetails.firstName} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={userDetails.lastName} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={userDetails.phone} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="gender" name="gender" value={userDetails.gender} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">Birth Date</label>
                    <input type="text" className="form-control" id="birthDate" name="birthDate" value={userDetails.birthDate} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imgSrc" className="form-label">Image</label>
                    <input type="file" className="form-control mt-2" id="file" name="file" onChange={handleFileChange} required/>
                  </div>
                  <button type="submit" className="btn btn-primary">Create Profile</button>
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

export default CreateUserDetails;