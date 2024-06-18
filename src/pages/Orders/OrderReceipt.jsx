import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FAQButton, Footer, Navbar } from '../../components';
import { AuthContext } from '../../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const OrderReceipt = () => {
  const { userId } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const orderResponse = await axios.get(`https://trust-d4cbc4aea2b1.herokuapp.com/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setOrder(orderResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrderDetails();
  }, [userId, orderId]);

  if (!order || !userId) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReviewClick = (orderItemId, productId) => {
    console.log(orderItemId);
    console.log(productId);
    navigate(`/orders/${orderId}/reviews/${productId}/orderItem/${orderItemId}`);
  };

  const handleUpdateReviewClick = (orderItemId, productId, reviewsId) => {
    console.log(orderItemId);
    console.log(productId);
    console.log(reviewsId);
    navigate(`/orders/${orderId}/reviews/${productId}/orderItem/${orderItemId}/update/${reviewsId}`);
  };

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: '10px' }}>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Thanks for your Order, <span style={{ color: '#111' }}>{order.user.username}</span>!
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0" style={{ color: '#111' }}>Receipt</p>
                    <p className="small text-muted mb-0">Receipt Voucher : {order.id}</p>
                  </div>
                  {order.items.map(item => (
                    <div className="card shadow-0 border mb-4" key={item.id}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src={`${item.product.imgSrc}`}
                              className="img-fluid"
                              alt={item.product.name}
                            />
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">{item.product.name}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">{item.color}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">{item.product.category}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Rp. {item.product.price.toLocaleString('id-ID')}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Rp. {(item.product.price * item.quantity).toLocaleString('id-ID')}</p>
                          </div>
                          <div className="col-md-12 text-center d-flex justify-content-start align-items-start mt-3">
                            {order.statusHistory[order.statusHistory.length - 1].transaction_status === 'settlement' ? (
                              !item.productReviews ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleReviewClick(item.id, item.product.id)}
                                >
                                  Give a Review
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning"
                                  onClick={() => handleUpdateReviewClick(item.id, item.product.id, item.productReviews.id)}
                                >
                                  Update a Review
                                </button>
                              )
                            ) : (
                              <div>No review options available</div> 
                            )}

                          </div>
                        </div>
                        <hr className="mb-4" style={{ backgroundColor: '#111', opacity: 1 }} />
                        <div className="row d-flex align-items-center">
                          <div className="col-md-2">
                            <p className="text-muted mb-0 small">Track Order</p>
                          </div>
                          <div className="col-md-10">
                            <div className="progress" style={{ height: '6px', borderRadius: '16px' }}>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: '65%', borderRadius: '16px', backgroundColor: '#111' }}
                                aria-valuenow="65"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="d-flex justify-content-around mb-1">
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                              <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Status</span>
                      {order.statusHistory[order.statusHistory.length - 1].transaction_status}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Invoice Number : {order.id}</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Discount</span> Rp. 0.00
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">Invoice Date : {formatDate(order.statusHistory[0].updated_at)}</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Delivery Charges</span>Rp. {(order.shippingDetails.shippingCost).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">Receipts Voucher : {order.id}</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span> Rp. {order.total.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FAQButton/>
    </>
  );
};

export default OrderReceipt;