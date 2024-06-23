import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const TransactionStatusPieChart = () => {
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const statusCounts = response.data.reduce((acc, order) => {
        const status = order.statusHistory[order.statusHistory.length-1]?.transaction_status || 'unknown';
        if (acc[status]) {
          acc[status]++;
        } else {
          acc[status] = 1;
        }
        return acc;
      }, {});

      const labels = Object.keys(statusCounts);
      const data = Object.values(statusCounts);

      setStatusData({
        labels: labels,
        datasets: [
          {
            label: 'Transaction Status',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching orders:', error.response);
    }
  };

  if (Object.keys(statusData).length === 0) {
    return null; 
  }

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h3>Transaction Status Distribution</h3>
      <Pie data={statusData} />
    </div>
  );
};

export default TransactionStatusPieChart;