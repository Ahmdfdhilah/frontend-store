import React, { useRef, useEffect, useState, useCallback } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../redux/action';
import { Link } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const [selectedShipping, setSelectedShipping] = useState("jne");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [errorNotification, setErrorNotification] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [_, forceUpdate] = useState();

  const formData = useRef({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    zip: ""
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.current.firstName) errors.firstName = "First name is required.";
    if (!formData.current.lastName) errors.lastName = "Last name is required.";
    if (!formData.current.email) errors.email = "Email is required.";
    if (!formData.current.address) errors.address = "Address is required.";
    if (!selectedProvince) errors.province = "Province is required.";
    if (!selectedCity) errors.city = "City is required.";
    if (!formData.current.zip) errors.zip = "Zip code is required.";
    return errors;
  };

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    formData.current[id] = value;
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const token = localStorage.getItem("token");
    const cityName = findCityName(selectedCity);
    if (!token) {
      console.error("User not authenticated.");
      return;
    }
    setIsLoading(true);
    const orderData = {
      userId: userId,
      items: state.map((item) => ({
        productId: item.id,
        quantity: item.qty,
        color: item.selectColor
      })),
      statusHistory: [
        {
          transaction_status: "pending",
          transaction_time: new Date().toISOString(),
        },
      ],
      shippingDetails: {
        address: formData.current.address,
        city: cityName,
        postalCode: formData.current.zip,
        country: "Indonesia",
      },
      shippingCost: shippingPrice
    };
    console.log(userId);
    try {
      const response = await axios.post(
        "https://trust-d4cbc4aea2b1.herokuapp.com/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Order submitted successfully:", response.data);
      setTimeout(1000);
      localStorage.removeItem('persist:root');
      dispatch(clearCart());
      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingChange = (e) => {
    setShippingPrice(0);
    setSelectedShipping(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
    setShippingPrice(0);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const findCityName = (cityId) => {
    const city = cities.find((city) => city.city_id === cityId);
    return city ? city.city_name : "";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User not authenticated.');
        return;
      }

      try {
        const response = await axios.get('https://trust-d4cbc4aea2b1.herokuapp.com/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      const token = localStorage.getItem('token');
      if (userId) {
        try {
          const response = await axios.get(`https://trust-d4cbc4aea2b1.herokuapp.com/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.data && response.data.addresses) {
            formData.current.address = await response.data.addresses[0]?.street || "";
            formData.current.address2 = await response.data.addresses[0]?.address2 || "";
            formData.current.firstName = await response.data.details?.firstName || "";
            formData.current.lastName = await response.data.details?.lastName || "";
            formData.current.zip = await response.data.addresses[0]?.postalCode || "";
            formData.current.email = await response.data.email || "";
            forceUpdate({});
          }
        } catch (error) {
          console.error('Error fetching user address:', error);
        }
      }
    };

    if (userId) {
      fetchUserAddress();
    }
  }, [userId]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://trust-d4cbc4aea2b1.herokuapp.com/orders/shipping/province", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://trust-d4cbc4aea2b1.herokuapp.com/orders/shipping/city", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchProvinces();
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const filtered = cities.filter(city => city.province_id === selectedProvince);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedProvince, cities]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchShippingPrice = async (provinceId, selectedShipping) => {
        let totalWeight = 0;
        state.map((item) => {
          return (totalWeight += item.weight * item.qty);
        });
        const request = {
          origin: "501",
          destination: provinceId,
          weight: totalWeight,
          courier: selectedShipping,
        };

        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(`https://trust-d4cbc4aea2b1.herokuapp.com/orders/shipping/price`, request, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          setShippingPrice(response.data[0].costs[0].cost[0].value);
          setErrorNotification(false);
        } catch (error) {
          console.error("Error fetching shipping price:", error);
          if (error.response && error.response.status === 500) {
            setErrorNotification(true);
          }
        }
      };
      fetchShippingPrice(selectedProvince, selectedShipping);
    }
  }, [selectedProvince, selectedShipping, state]);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    return (
      <>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-black">Your cart</span>
                <span className="badge badge-secondary badge-pill">
                  {state.length}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {state.map((item) => {
                  const { id, name, price, qty, imgSrc, selectColor } = item;
                  return (
                    <li
                      key={id}
                      className="list-group-item d-flex justify-content-between lh-condensed"
                    >
                      <div>
                        <h6 className="my-0">{name}</h6>
                        <small className="text-muted">Qty: {qty}</small>
                        <br />
                        <small className="text-muted">Color: {selectColor}</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="text-muted">Rp. {(price * qty).toLocaleString('id-ID')}</span>
                        <img
                          src={imgSrc}
                          alt={name}
                          style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (IDR)</span>
                  <strong>
                    Rp.{" "}
                    {(state.reduce(
                      (total, item) => total + item.price * item.qty,
                      0
                    ) + shippingPrice).toLocaleString('id-ID')}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping Price (IDR)</span>
                  <strong>{shippingPrice ? "Rp. " + shippingPrice.toLocaleString('id-ID') : ""}</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-6 order-md-1">
              <h4 className="mb-3">Shipping address</h4>
              <form
                className="needs-validation"
                noValidate=""
                onSubmit={handleSubmitOrder}
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.firstName ? "is-invalid" : ""
                        }`}
                      id="firstName"
                      placeholder="first name"
                      defaultValue={formData.current.firstName}
                      onChange={handleInputChange}
                    />
                    {formErrors.firstName && (
                      <div className="invalid-feedback">{formErrors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.lastName ? "is-invalid" : ""
                        }`}
                      id="lastName"
                      placeholder="last name"
                      defaultValue={formData.current.lastName}
                      onChange={handleInputChange}
                    />
                    {formErrors.lastName && (
                      <div className="invalid-feedback">{formErrors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? "is-invalid" : ""
                      }`}
                    id="email"
                    placeholder="you@example.com"
                    defaultValue={formData.current.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.address ? "is-invalid" : ""
                      }`}
                    id="address"
                    placeholder="1234 Main St"
                    defaultValue={formData.current.address}
                    onChange={handleInputChange}
                  />
                  {formErrors.address && (
                    <div className="invalid-feedback">{formErrors.address}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="address2">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                    defaultValue={formData.current.address2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="province">Province</label>
                    <select
                      className={`custom-select d-block w-100 ${formErrors.province ? "is-invalid" : ""
                        }`}
                      id="province"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                    >
                      <option value="">Choose...</option>
                      {provinces.map((province) => (
                        <option key={province.province_id} value={province.province_id}>
                          {province.province}
                        </option>
                      ))}
                    </select>
                    {formErrors.province && (
                      <div className="invalid-feedback">{formErrors.province}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city">City</label>
                    <select
                      className={`custom-select d-block w-100 ${formErrors.city ? "is-invalid" : ""
                        }`}
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      <option value="">Choose...</option>
                      {filteredCities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.city_name}
                        </option>
                      ))}
                    </select>
                    {formErrors.city && (
                      <div className="invalid-feedback">{formErrors.city}</div>
                    )}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.zip ? "is-invalid" : ""
                        }`}
                      id="zip"
                      placeholder=""
                      defaultValue={formData.current.zip}
                      onChange={handleInputChange}
                    />
                    {formErrors.zip && (
                      <div className="invalid-feedback">{formErrors.zip}</div>
                    )}
                  </div>
                </div>
                <hr className="mb-4" />
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="jne"
                      name="shippingMethod"
                      type="radio"
                      className="custom-control-input"
                      value="jne"
                      checked={selectedShipping === "jne"}
                      onChange={handleShippingChange}
                      required=""
                    />
                    <label className="custom-control-label" htmlFor="jne">
                      JNE
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="pos"
                      name="shippingMethod"
                      type="radio"
                      className="custom-control-input"
                      value="pos"
                      checked={selectedShipping === "pos"}
                      onChange={handleShippingChange}
                      required=""
                    />
                    <label className="custom-control-label" htmlFor="pos">
                      POS
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="tiki"
                      name="shippingMethod"
                      type="radio"
                      className="custom-control-input"
                      value="tiki"
                      checked={selectedShipping === "tiki"}
                      onChange={handleShippingChange}
                      required=""
                    />
                    <label className="custom-control-label" htmlFor="tiki">
                      TIKI
                    </label>
                  </div>
                </div>
                {errorNotification && (
                  <div className="alert alert-danger">
                    Cannot calculate shipping cost, please try again later.
                  </div>
                )}
                <hr className="mb-4" />
                <div className="form-group">
                  <button type="submit" className="btn btn-success btn-block" disabled={isLoading}>
                    {isLoading ? 'Submitting Order...' : 'Submit Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };


  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">{state.length === 0 ? <EmptyCart /> : <ShowCheckout />}</div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;