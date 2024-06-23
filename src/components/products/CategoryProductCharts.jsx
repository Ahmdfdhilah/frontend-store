import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import "chart.js/auto";


const CategoryProductChart = () => {
  const [products, setProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({
    laptop: 0,
    smartphone: 0,
    tablet: 0,
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
      calculateCategoryCounts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response);
    }
  };

  const calculateCategoryCounts = (products) => {
    const counts = {
      laptop: 0,
      smartphone: 0,
      tablet: 0,
    };

    products.forEach((product) => {
      if (product.category === 'laptop') {
        counts.laptop += 1;
      } else if (product.category === 'smartphone') {
        counts.smartphone += 1;
      } else if (product.category === 'tablet') {
        counts.tablet += 1;
      }
    });

    setCategoryCounts(counts);
  };

  const pieChartData = {
    labels: ['Laptop', 'Smartphone', 'Tablet'],
    datasets: [
      {
        data: [categoryCounts.laptop, categoryCounts.smartphone, categoryCounts.tablet],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h4>Products Distribution by Category</h4>
      <Pie data={pieChartData} />
    </div>
  );
};

export default CategoryProductChart;