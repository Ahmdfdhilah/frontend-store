import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { FAQButton, Footer, Navbar } from '../../components';

const Orders = () => {
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderStatusHistory = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://trust-d4cbc4aea2b1.herokuapp.com/orders/${orderId}/update-status-from-midtrans`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching status for order ${orderId}:`, error);
      return {};
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const userResponse = await axios.get(`https://trust-d4cbc4aea2b1.herokuapp.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const userOrders = userResponse.data.orders || [];

        if (userOrders.length === 0) {
          setOrders([]);
        } else {
          const ordersWithDetails = await Promise.all(
            userOrders.map(async (order) => {
              try {
                const statusHistory = await getOrderStatusHistory(order.id);
                const latestStatus = statusHistory.statusHistory[statusHistory.statusHistory.length - 1]?.transaction_status || 'N/A';
                const latestDate = statusHistory.statusHistory[statusHistory.statusHistory.length - 1]?.transaction_time || 'N/A';

                return {
                  id: order.id,
                  total: order.total,
                  status: latestStatus,
                  date: latestDate,
                };
              } catch (error) {
                console.error(`Error fetching details for order ${order.id}:`, error);
                return {
                  id: order.id,
                  total: order.total,
                  status: 'N/A',
                  date: 'N/A',
                };
              }
            })
          );

          setOrders(ordersWithDetails);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Skeleton Loading Component
  const SkeletonLoading = () => (
    <div className="container py-5 h-100">
      <div className="text-center">
        <div className="mb-4 w-25 mx-auto rounded bg-light" style={{ height: '20px' }}></div>
        <div className="mb-4 w-75 mx-auto rounded bg-light" style={{ height: '20px' }}></div>
        <div className="mb-4 w-50 mx-auto rounded bg-light" style={{ height: '20px' }}></div>
        <div className="mb-4 w-100 mx-auto rounded bg-light" style={{ height: '20px' }}></div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoading />;
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <section className="h-100 gradient-custom">
          <div className="container py-5 h-100">
            <h1 className="text-center">Orders History</h1>
            <hr />
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-8">
                <div className="text-center py-5">
                  <h4 className="display-5">You haven't placed any orders yet.</h4>
                  <p className="mt-3">
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa fa-arrow-left"></i> Continue Shopping
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <FAQButton />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-custom">
        <div className="container-fluid py-5">
          <h1 className="text-center">Orders History</h1>
          <hr />
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="table-responsive">
                <table className="table table-dark table-borderless mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Total</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <th scope="row"><a href={`/orders/${order.id}`}>{order.id}</a></th>
                        <td>Rp. {order.total}</td>
                        <td>{order.status || 'Failed'}</td>
                        <td>{order.date ? formatDate(order.date) : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Orders;