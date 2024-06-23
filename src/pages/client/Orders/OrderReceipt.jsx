import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FAQButton, Footer, Navbar } from '../../../components';
import { AuthContext } from '../../../AuthContext';
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
        const orderResponse = await axios.get(`http://localhost:3000/orders/${orderId}`, {
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

  const Skeleton = ({ width, height }) => (
    <div style={{ width, height, backgroundColor: '#ccc', margin: '0 auto', borderRadius: '4px' }} />
  );

  if (!order || !userId) {
    return (
      <div className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: '10px' }}>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">Loading...</h5>
                </div>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <p className="lead fw-normal mb-0" style={{ color: '#111' }}>Receipt</p>
                    <p className="small text-muted mb-0">Receipt Voucher : Loading...</p>
                  </div>
                  {[...Array(3)].map((_, index) => (
                    <div className="card shadow-0 border mb-4" key={index}>
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-3 col-12 mb-3 mb-md-0 text-center">
                            <Skeleton width={100} height={100} />
                          </div>
                          <div className="col-md-3 col-6 text-center">
                            <Skeleton width={150} height={20} />
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            <Skeleton width={100} height={20} />
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            <Skeleton width={100} height={20} />
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            <Skeleton width={100} height={20} />
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            <Skeleton width={100} height={20} />
                          </div>
                        </div>
                        <hr className="mb-4" style={{ backgroundColor: '#111', opacity: 1 }} />
                        <div className="row align-items-center">
                          <div className="col-md-6 col-12 mb-3 mb-md-0 text-center">
                            <Skeleton width={200} height={20} />
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0 text-center">
                            <Skeleton width={200} height={20} />
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0 text-center">
                            <Skeleton width={200} height={20} />
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0 text-center">
                            <Skeleton width={200} height={20} />
                          </div>
                          <div className="col-md-6 col-12 text-center">
                            <Skeleton width={200} height={20} />
                          </div>
                          <div className="col-md-6 col-12 text-center">
                            <Skeleton width={200} height={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                <div className="card-header px-4 pt-3 pb-2">
                  <h5 className="text-muted mb-0">
                    Thanks for your Order, <span style={{ color: '#111' }}>{order.user.username}</span>!
                  </h5>
                  {order.statusHistory[order.statusHistory.length - 1].transaction_status === 'pending' ?
                    (
                      <a href={order.payments[0].link_payment}><div className="btn btn-dark text-white border-rounded my-4">Pay Orders</div></a>
                    ) : ((""))}
                </div>
                <div className="card-body p-4">
                  <div className="mb-4">
                    <p className="lead fw-normal mb-0" style={{ color: '#111' }}>Receipt</p>
                    <p className="small text-muted mb-0">Receipt Voucher : {order.id}</p>
                  </div>
                  {order.items.map(item => (
                    <div className="card shadow-0 border mb-4" key={item.id}>
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-3 col-12 mb-3 mb-md-0 text-center">
                            <img
                              src={`${item.product.imgSrc}`}
                              className="img-fluid"
                              alt={item.product.name}
                            />
                          </div>
                          <div className="col-md-3 col-6 text-center">
                            <p className="text-muted mb-0">{item.product.name}</p>
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            <p className="text-muted mb-0">{item.color}</p>
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                          </div>
                          <div className="col-md-2 col-6 text-center">
                            {
                              item.product.discounts ?
                                <p className="text-muted mb-0 small">
                                  Rp. {(item.product.price - (item.product.price * (item.product.discounts.discount/100)) * item.quantity).toLocaleString('id-ID')}</p> :
                                <p className="text-muted mb-0 small">
                                  Rp. {(item.product.price * item.quantity).toLocaleString('id-ID')}</p>}
                     
                            {console.log('Item discounts:', item.product.discounts)}
                          </div>
                          <div className="col-12 mt-3">
                            {order.statusHistory[order.statusHistory.length - 1].transaction_status === 'settlement' ? (
                              !item.productReviews ? (
                                <button
                                  className="btn btn-primary me-2"
                                  onClick={() => handleReviewClick(item.id, item.product.id)}
                                >
                                  Give a Review
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning me-2"
                                  onClick={() => handleUpdateReviewClick(item.id, item.product.id, item.productReviews.id)}
                                >
                                  Update a Review
                                </button>
                              )
                            ) : (
                              <>
                                <div>No review options available</div>
                              </>

                            )}
                          </div>
                        </div>
                        <hr className="mb-4" style={{ backgroundColor: '#111', opacity: 1 }} />
                        <div className="row align-items-center">
                          <div className="col-md-6 col-12 mb-3 mb-md-0">
                            <p className="text-muted mb-0 fw-bold">Order Details</p>
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0">
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-2">Status:</span>{order.statusHistory[order.statusHistory.length - 1].transaction_status}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0">
                            <p className="text-muted mb-0">Invoice Number : {order.id}</p>
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0">
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-2">Discount:</span> Rp. {(item.product.discounts? (item.product.price * (item.product.discounts.discount/100)) * item.quantity : 0).toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0">
                            <p className="text-muted mb-0">Invoice Date : {formatDate(order.statusHistory[0].updated_at)}</p>
                          </div>
                          <div className="col-md-6 col-12 mb-3 mb-md-0 ">
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-2">Delivery Charges:</span> Rp. {(order.shippingDetails.shippingCost).toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="col-md-6 col-12">
                            <p className="text-muted mb-0">Receipts Voucher : {order.id}</p>
                          </div>
                          <div className="col-md-6 col-12">
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-2">Total:</span> Rp. {order.total.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FAQButton />
    </>
  );
};

export default OrderReceipt;