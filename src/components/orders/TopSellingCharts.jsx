import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TopSellingCharts = () => {
  const [productSales, setProductSales] = useState([]);

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
      aggregateProductSales(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response);
    }
  };

  const aggregateProductSales = (orders) => {
    const salesData = {};

    orders.forEach(order => {
      if (order.statusHistory.some(status => status.transaction_status === 'settlement')) {
        order.items.forEach(item => {
          const productName = item.product.name;
          if (salesData[productName]) {
            salesData[productName] += item.quantity;
          } else {
            salesData[productName] = item.quantity;
          }
        });
      }
    });

    const aggregatedSales = Object.keys(salesData).map(productName => ({
      name: productName,
      quantity: salesData[productName],
    }));

    setProductSales(aggregatedSales);
  };

  const barChartData = {
    labels: productSales.map(sale => sale.name),
    datasets: [
      {
        label: 'Quantity Sold',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: productSales.map(sale => sale.quantity),
      },
    ],
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <h3>Top Selling Products</h3>
      <Bar data={barChartData} />
    </div>
  );
};

export default TopSellingCharts;