import React, { useState, useEffect } from "react";
import { Footer, Navbar, FAQButton } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, selectColor } from "../../redux/action";
import { Link } from "react-router-dom";
import Toaster from "../../components/Toaster";

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [selectedColors, setSelectedColors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    setLoading(false);
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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discounts && item.discounts.discount) {
        const discountedPrice = item.price * (item.discounts.discount / 100);
        const discountAmount = discountedPrice * item.qty;
        return total + discountAmount;
      }
      return total;
    }, 0);
  };

  const ShowCart = () => {
    if (loading) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>
                <div className="card-body">
                  {[...Array(3)].map((_, index) => (
                    <div key={index}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-md-12">
                          <div
                            className="bg-image rounded"
                            data-mdb-ripple-color="light"
                            style={{ height: "75px" }}
                          ></div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                          <p className="mb-0">
                            <span>&nbsp;</span>
                          </p>
                          <div className="mb-2">
                            <select className="form-select" disabled>
                              <option>-- select color --</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="d-flex mb-4">
                            <button className="btn px-3" disabled>
                              <i className="fas fa-minus"></i>
                            </button>
                            <p className="mx-5">&nbsp;</p>
                            <button className="btn px-3" disabled>
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <p className="text-muted">0 x Rp. (0)</p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
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
                      Products (0)
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>Rp. (0)</strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total discount</strong>
                      </div>
                      <span>
                        <strong>Rp. (0)</strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total summary</strong>
                      </div>
                      <span>
                        <strong>Rp. (0)</strong>
                      </span>
                    </li>
                  </ul>
                  <Link
                    to="/checkout"
                    className="btn btn-dark btn-lg btn-block disabled"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Please wait until items are loaded.");
                    }}
                  >
                    Go to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return <EmptyCart />;
    }

    const subtotal = calculateSubtotal();
    const totalDiscount = calculateTotalDiscount();
    const totalSummary = subtotal - totalDiscount;

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
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-md-12">
                          <div
                            className="bg-image rounded"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={item.imgSrc}
                              alt={item.name}
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
                              x Rp. ({item.price.toLocaleString("id-ID")})
                            </strong>
                            {item.discounts && (
                              <span className="badge bg-success ml-2">Discounted</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
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
                      <strong>Products ({cartItems.length})</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>
                          Rp. ({Math.round(subtotal).toLocaleString("id-ID")})
                        </strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total discount</strong>
                      </div>
                      <span>
                        <strong>
                          Rp. ({Math.round(totalDiscount).toLocaleString("id-ID")})
                        </strong>
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total summary</strong>
                      </div>
                      <span>
                        <strong>
                          Rp. ({Math.round(totalSummary).toLocaleString("id-ID")})
                        </strong>
                      </span>
                    </li>
                  </ul>
                  <Link
                    to="/checkout"
                    className={`btn btn-dark btn-lg btn-block ${!isFormValid ? "disabled" : ""
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
      <FAQButton />
    </>
  );
};

export default Cart;