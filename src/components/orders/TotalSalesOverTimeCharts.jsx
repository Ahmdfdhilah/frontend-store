import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const TotalSalesOverTimeChart = () => {
  const [salesData, setSalesData] = useState([]);

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
      aggregateSalesData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response);
    }
  };

  const aggregateSalesData = (orders) => {
    const salesByDate = {};
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);

    orders.forEach(order => {
      order.statusHistory.forEach(status => {
        if (status.transaction_status === 'settlement') {
          const date = new Date(status.transaction_time);
          if (date >= pastDate && date <= currentDate) {
            const day = date.toLocaleDateString('id-ID');
            if (salesByDate[day]) {
              salesByDate[day] += order.total;
            } else {
              salesByDate[day] = order.total;
            }
          }
        }
      });
    });

    const aggregatedSales = [];
    for (let date = new Date(pastDate); date <= currentDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toLocaleDateString('id-ID');
      aggregatedSales.push({
        date: formattedDate,
        total: salesByDate[formattedDate] || 0,
      });
    }

    setSalesData(aggregatedSales);
  };

  const lineChartData = {
    labels: salesData.map(sale => sale.date),
    datasets: [
      {
        label: 'Total Sales',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: salesData.map(sale => sale.total),
      },
    ],
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <h4>Total Sales Over the Last 30 Days</h4>
      <Line data={lineChartData} />
    </div>
  );
};

export default TotalSalesOverTimeChart;