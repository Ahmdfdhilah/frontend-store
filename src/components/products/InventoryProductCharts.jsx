import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const InventoryProductCharts = () => {
  const [products, setProducts] = useState([]);
  const [inventoryStatusCounts, setInventoryStatusCounts] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setProducts(response.data);
      calculateInventoryStatusCounts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response);
    }
  };

  const calculateInventoryStatusCounts = (products) => {
    const counts = {
      low: 0,
      medium: 0,
      high: 0,
    };

    products.forEach((product) => {
      if (product.inventory <= 10) {
        counts.low += 1;
      } else if (product.inventory <= 50) {
        counts.medium += 1;
      } else {
        counts.high += 1;
      }
    });

    setInventoryStatusCounts(counts);
  };

  const inventoryStatusChartData = {
    labels: ['Low Stock x <= 10', 'Medium Stock 10 < x <= 50', 'High Stock x >= 50'],
    datasets: [
      {
        data: [inventoryStatusCounts.low, inventoryStatusCounts.medium, inventoryStatusCounts.high],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h4>Inventory Status of Products</h4>
      <Pie data={inventoryStatusChartData} />
    </div>
  );
};

export default InventoryProductCharts;