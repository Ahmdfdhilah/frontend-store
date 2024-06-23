import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TopCustomersByPurchaseAmount = () => {
  const [customerData, setCustomerData] = useState([]);

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
      aggregateCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response);
    }
  };

  const aggregateCustomerData = (orders) => {
    const customerSales = {};

    orders.forEach(order => {
      if (order.statusHistory.some(status => status.transaction_status === 'settlement')) {
        const customerId = order.user.id;
        const totalAmount = order.total;

        if (customerSales[customerId]) {
          customerSales[customerId] += totalAmount;
        } else {
          customerSales[customerId] = totalAmount;
        }
      }
    });

    const sortedCustomers = Object.keys(customerSales).map(customerId => ({
      customerId,
      totalAmount: customerSales[customerId],
    }));

    sortedCustomers.sort((a, b) => b.totalAmount - a.totalAmount);

    const topCustomers = sortedCustomers.slice(0, 5);

    setCustomerData(topCustomers);
  };

  const barChartData = {
    labels: customerData.map(customer => `Customer ID: ${customer.customerId}`),
    datasets: [
      {
        label: 'Total Purchase Amount',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: customerData.map(customer => customer.totalAmount),
      },
    ],
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <h3>Top Customers by Purchase Amount</h3>
      <Bar data={barChartData} />
    </div>
  );
};

export default TopCustomersByPurchaseAmount;