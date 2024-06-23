import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const PriceProductChart = () => {
  const [products, setProducts] = useState([]);

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
    } catch (error) {
      console.error('Error fetching products:', error.response);
    }
  };

  const getPriceDistributionData = () => {
    const priceRanges = {
      '0-5.000.000': 0,
      '5.000.001-10.000.000': 0,
      '10.000.001-15.000.000': 0,
      '15.000.001-20.000.000': 0,
      '20.000.001-25.000.000': 0,
      '25.000.001+': 0,
    };

  
    products.forEach((product) => {
      const price = product.price;
      if (price <= 5000000) {
        priceRanges['0-5.000.000'] += 1;
      } else if (price <= 10000000) {
        priceRanges['5.000.001-10.000.000'] += 1;
      } else if (price <= 15000000) {
        priceRanges['10.000.001-15.000.000'] += 1;
      } else if (price <= 20000000) {
        priceRanges['15.000.001-20.000.000'] += 1;
      } else if (price <= 25000000) {
        priceRanges['20.000.001-25.000.000'] += 1;
      } else {
        priceRanges['25.000.001+'] += 1;
      }
    });

    // Prepare data for chart
    const labels = Object.keys(priceRanges);
    const data = Object.values(priceRanges);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Price Distribution',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: data,
        },
      ],
    };
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <h4>Price Distribution of Products</h4>
      <Bar
        data={getPriceDistributionData()}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Products',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Price Range (IDR)',
              },
            },
          },
        }}
      />
    </div>
    
  );
};

export default PriceProductChart;
