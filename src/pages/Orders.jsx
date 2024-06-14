import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Footer, Navbar } from '../components';

const Orders = () => {
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderStatusHistory = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/orders/${orderId}/update-status-from-midtrans`, {
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
        const userResponse = await axios.get(`http://localhost:3000/users/${userId}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <section className="h-100 gradient-custom">
          <div className="container py-5 h-100">
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
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="h-100 gradient-custom">
        <div className="container-fluid py-5"> {/* Use container-fluid to make the container full width */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10"> {/* Adjust column size to fit content */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
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
                        <td><a href={`/orders/${order.id}`}>{order.id}</a></td>
                        <td>Rp. {order.total}</td>
                        <td>{order.status || 'N/A'}</td>
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
    </>
  );
};

export default Orders;