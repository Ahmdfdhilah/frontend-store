import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { Navbar, Footer } from '../../components';
import { useNavigate } from 'react-router-dom';
import FloatingFAQButton from '../../components/FAQButton';

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk loading
  const navigate = useNavigate();

  const handleCreateUserDetails = () => {
    navigate('/user/details/create');
  };

  const handleCreateUserAddress = () => {
    navigate('/user/address/create');
  };

  const handleUpdateUserDetails = () => {
    navigate('/user/details/update');
  };

  const handleUpdateUserAddress = () => {
    navigate('/user/address/update');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          return;
        }

        const userDetailsResponse = await axios.get(`https://trust-d4cbc4aea2b1.herokuapp.com/users/details-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(userDetailsResponse.data);
        setLoading(false); // Setelah data terambil, berhenti loading
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false); // Jika error, berhenti loading
      }
    };

    const fetchUserAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          return;
        }

        const userAddressResponse = await axios.get(`https://trust-d4cbc4aea2b1.herokuapp.com/users/user-address/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserAddress(userAddressResponse.data[0]);
        setLoading(false); // Setelah data terambil, berhenti loading
      } catch (error) {
        console.error('Error fetching user address:', error);
        setLoading(false); // Jika error, berhenti loading
      }
    };

    fetchUserDetails();
    fetchUserAddress();
  }, [userId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="h-100 gradient-custom-2">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center">
              <div className="col col-lg-9 col-xl-8">
                <div className="card">
                  <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#212529", height: "200px" }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}>
                      <div className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: "150px", zIndex: 1, backgroundColor: "rgba(255, 255, 255, 0.15)" }} />
                      <div className="d-flex mb-4">
                        <button className="btn btn-outline-dark text-body mb-2 me-1" style={{ zIndex: 1, pointerEvents: 'none', opacity: 0.5 }}>
                          Loading...
                        </button>
                        <button className="btn btn-outline-dark text-body mb-2 me-1" style={{ zIndex: 1, pointerEvents: 'none', opacity: 0.5 }}>
                          Loading...
                        </button>
                      </div>
                    </div>
                    <div className="ms-3" style={{ marginTop: "130px" }}>
                      <h5>Loading...</h5>
                      <p>Loading...</p>
                    </div>
                  </div>
                  <div className="p-4 text-black bg-body-tertiary">
                    <div className="d-flex justify-content-end text-center py-1 text-body">
                      Loading...
                    </div>
                  </div>
                  <div className="card-body p-4 text-black">
                    <div className="mb-5 text-body">
                      <p className="lead fw-normal mb-1 pt-5">Personal Information</p>
                      <div className="p-4 bg-body-tertiary">
                        <p className='font-italic mb-1'>First Name: Loading...</p>
                        <p className='font-italic mb-1'>Last Name: Loading...</p>
                        <p className='font-italic mb-1'>Phone: Loading...</p>
                        <p className='font-italic mb-1'>Gender: Loading...</p>
                        <p className='font-italic mb-0'>Birth Date: Loading...</p>
                      </div>
                    </div>
                    <div className="mb-5 text-body">
                      <p className="lead fw-normal mb-1">Address Information</p>
                      <div className="p-4 bg-body-tertiary">
                        <p className='font-italic mb-1'>Street: Loading...</p>
                        <p className='font-italic mb-1'>City: Loading...</p>
                        <p className='font-italic mb-1'>State: Loading...</p>
                        <p className='font-italic mb-1'>Country: Loading...</p>
                        <p className='font-italic mb-0'>Postal Code: Loading...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <FloatingFAQButton />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center">
            <div className="col col-lg-9 col-xl-8">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#212529", height: "200px" }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}>
                    <img
                      src={userDetails ? userDetails.imgSrc : '/img/placeholder.png'}
                      alt="User"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", zIndex: 1 }}
                    />
                    <div className="d-flex mb-4">
                      <button className="btn btn-outline-dark text-body mb-2 me-1" onClick={userDetails ? handleUpdateUserDetails : handleCreateUserDetails}>
                        {userDetails ? 'Edit User Details' : 'Create User Details'}
                      </button>
                      <button className="btn btn-outline-dark text-body mb-2 me-1" onClick={userAddress ? handleUpdateUserAddress : handleCreateUserAddress}>
                        {userAddress ? 'Edit User Address' : 'Create User Address'}
                      </button>
                    </div>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>{userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : 'No User Details'}</h5>
                    <p>{userDetails ? userDetails.city : ''}</p>
                  </div>
                </div>
                <div className="p-4 text-black bg-body-tertiary">
                  <div className="d-flex justify-content-end text-center py-1 text-body">
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5 text-body">
                    <p className="lead fw-normal mb-1 pt-5">Personal Information</p>
                    <div className="p-4 bg-body-tertiary">
                      <p className='font-italic mb-1'>First Name: {userDetails ? userDetails.firstName : 'N/A'}</p>
                      <p className='font-italic mb-1'>Last Name: {userDetails ? userDetails.lastName : 'N/A'}</p>
                      <p className='font-italic mb-1'>Phone: {userDetails ? userDetails.phone : 'N/A'}</p>
                      <p className='font-italic mb-1'>Gender: {userDetails ? userDetails.gender : 'N/A'}</p>
                      <p className='font-italic mb-0'>Birth Date: {userDetails ? userDetails.birthDate : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="mb-5 text-body">
                    <p className="lead fw-normal mb-1">Address Information</p>
                    <div className="p-4 bg-body-tertiary">
                      <p className='font-italic mb-1'>Street: {userAddress ? userAddress.street : 'N/A'}</p>
                      <p className='font-italic mb-1'>City: {userAddress ? userAddress.city : 'N/A'}</p>
                      <p className='font-italic mb-1'>State: {userAddress ? userAddress.state : 'N/A'}</p>
                      <p className='font-italic mb-1'>Country: {userAddress ? userAddress.country : 'N/A'}</p>
                      <p className='font-italic mb-0'>Postal Code: {userAddress ? userAddress.postalCode : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingFAQButton />
    </>
  );
};

export default Profile;