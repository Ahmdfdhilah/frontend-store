import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const OrdersByCityChart = () => {
  const [ordersData, setOrdersData] = useState({});

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Filter settled orders and count orders by city
      const settledOrders = response.data.filter(order => order.statusHistory.some(status => status.transaction_status === 'settlement'));
      const ordersByCity = {};

      settledOrders.forEach(order => {
        const city = order.shippingDetails.city;

        if (ordersByCity[city]) {
          ordersByCity[city]++;
        } else {
          ordersByCity[city] = 1;
        }
      });

      // Prepare data for Chart.js
      const labels = Object.keys(ordersByCity);
      const data = Object.values(ordersByCity);

      setOrdersData({
        labels: labels,
        datasets: [
          {
            label: 'Orders Count by City',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            data: data,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching orders:', error.response);
    }
  };

  // Check if data is ready before rendering
  if (Object.keys(ordersData).length === 0) {
    return null; // or loading indicator
  }

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <h4>Orders Count by City</h4>
      <Bar
        data={ordersData}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1, // Ensure ticks are whole numbers
              },
            }],
          },
        }}
      />
    </div>
  );
};

export default OrdersByCityChart;