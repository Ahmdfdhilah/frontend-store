import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, selectColor } from "../redux/action";
import { Link } from "react-router-dom";
import Toaster from "../components/Toaster";

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [selectedColors, setSelectedColors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      let isValid = true;
      cartItems.forEach((item) => {
        if (!selectedColors[item.id]) {
          isValid = false;
        }
      });
      setIsFormValid(isValid);
    };
  
    validateForm(); 
  }, [selectedColors, cartItems]); 
  

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    setToasterMessage(`${product.name} removed from cart`);
    setShowToaster(true);
    dispatch(delCart(product));
  };

  const selectProductColor = (productId, color) => {
    setSelectedColors({
      ...selectedColors,
      [productId]: color,
    });
    dispatch(selectColor(productId, color));
  };

  const ShowCart = () => {
    if (!cartItems || cartItems.length === 0) {
      return <EmptyCart />;
    }

    let subtotal = 0;
    let totalItems = 0;

    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>
                <div className="card-body">
                  {cartItems.map((item) => {
                    subtotal += item.price * item.qty;
                    totalItems += item.qty;
                    return (
                      <div key={item.id}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12">
                            <div
                              className="bg-image rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={item.imgSrc}
                                alt={item.title}
                                width={100}
                                height={75}
                              />
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6">
                            <p>
                              <strong>{item.name}</strong>
                            </p>
                            <div>
                              <label htmlFor={`colorSelect-${item.id}`}>
                                Select Color:
                              </label>
                              <select
                                id={`colorSelect-${item.id}`}
                                className="form-select"
                                value={selectedColors[item.id] || ""}
                                onChange={(e) =>
                                  selectProductColor(item.id, e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  -- select color --
                                </option>
                                {item.color.map((color, index) => (
                                  <option key={index} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn px-3"
                                onClick={() => removeItem(item)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <p className="mx-5">{item.qty}</p>
                              <button
                                className="btn px-3"
                                onClick={() => addItem(item)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <p className="text-start text-md-center">
                              <strong>
                                <span className="text-muted">{item.qty}</span>{" "}
                                x Rp. ({item.price.toLocaleString('id-ID')})
                              </strong>
                            </p>
                          </div>
                        </div>
                        <hr className="my-4" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})
                      <span>Rp. ({Math.round(subtotal).toLocaleString('id-ID')})</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>Rp. ({Math.round(subtotal).toLocaleString('id-ID')})</strong>
                      </span>
                    </li>
                  </ul>
                  <Link
                    to="/checkout"
                    className={`btn btn-dark btn-lg btn-block ${
                      !isFormValid ? "disabled" : ""
                    }`}
                    onClick={(e) => {
                      if (!isFormValid) {
                        e.preventDefault();
                        alert("Please select color for each product.");
                      }
                    }}
                  >
                    Go to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Toaster
        message={toasterMessage}
        show={showToaster}
        onClose={() => setShowToaster(false)}
        color="danger"
      />
      <Footer />
    </>
  );
};

export default Cart;