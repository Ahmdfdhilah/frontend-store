import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
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
  const [shippingMethods, setShippingMethods] = useState([]);
  const [errorNotification, setErrorNotification] = useState(false);
  const [type, setType] = useState("")

  const handleShippingChange = (e) => {
    setSelectedShipping(e.target.value);
  };

  const handleMethodChange = (e) => {
    setType(e.target.value);
  };

  const handleShippingSelected = () => {
    setSelectedShipping("jne"); // Set the default shipping method here
    setType(""); // Clear the selected shipping type
    setShippingPrice(0); // Reset shipping price
    setShippingMethods([]); // Clear shipping methods
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders/shipping/province");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders/shipping/city");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchShippingPrice = async (provinceId, selectedShipping, type) => {
    console.log(typeof (provinceId), typeof (selectedShipping));
    const request = {
      origin: "501",
      destination: provinceId,
      weight: 1000,
      courier: selectedShipping,
    };
    console.log(request);
    try {
      const response = await axios.post(`http://localhost:3000/orders/shipping/price`, request);
      const methods = response.data[0].costs
      console.log(methods);
      const shippingMethods = methods.map((method) => ({
        service: method.service,
        description: method.description,
        cost: method.cost
      }))
      console.log(shippingMethods)
      const price = methods.map((method) => {
        if (method.service === type) {
          return method.cost[0].value
        }
      })
      if (!type) {
        console.log("masuk !type");
        setShippingPrice(response.data[0].costs[0].cost[0].value);
        setShippingMethods(shippingMethods);
        setErrorNotification(false);
        return
      }
      console.log("tidak masuk !type");
      setShippingPrice(price);
      setErrorNotification(false);

    } catch (error) {
      console.error("Error fetching shipping price:", error);
      if (error.response && error.response.status === 500) {
        setErrorNotification(true);
      }
    }
  };

  useEffect(() => {
    handleShippingSelected();
  }, [selectedShipping]);

  useEffect(() => {
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
      fetchShippingPrice(selectedProvince, selectedShipping, type);
    }
  }, [selectedProvince, selectedShipping, type]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
    setShippingPrice(0);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

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
    let subtotal = 0;
    let totalItems = 0;
    const shipping = shippingPrice || 0;
    console.log(typeof(shipping));
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div>
                        <strong>Shipping Method</strong>
                      </div>
                      <select
                        value={selectedShipping}
                        onChange={handleShippingChange}
                        className="form-select"
                      >
                        <option value="jne">JNE</option>
                        <option value="jnt">JNT</option>
                        <option value="tiki">TIKI</option>
                      </select>
                      <select
                        value={type}
                        onChange={handleMethodChange}
                        className="form-select"
                      >
                        {shippingMethods.map((method) => (
                          <option key={method.service} value={method.service}>
                            {method.service}
                          </option>
                        ))}
                      </select>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" novalidate>
                    <div className="row g-3">
                      {errorNotification && (
                        <div className="alert alert-danger mt-3" role="alert">
                          There is no available shipping for the selected method. Please choose another shipping method.
                        </div>
                      )}
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address 2 <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="province" className="form-label">
                          Province
                        </label>
                        <select
                          className="form-select"
                          id="province"
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                          required
                        >
                          <option value="">Choose...</option>
                          {provinces.map((province) => (
                            <option key={province.province_id} value={province.province_id}>
                              {province.province}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid province.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <select
                          className="form-select"
                          id="city"
                          value={selectedCity}
                          onChange={handleCityChange}
                          required
                        >
                          <option value="">Choose...</option>
                          {filteredCities.map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid city.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <button className="w-100 btn btn-primary " type="submit" disabled>
                      Continue to checkout
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      {state.length === 0 && <EmptyCart />}
      {state.length !== 0 && <ShowCheckout />}
      <Footer />
    </>
  );
};

export default Checkout;
