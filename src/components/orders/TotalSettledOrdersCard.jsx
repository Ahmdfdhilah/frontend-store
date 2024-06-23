import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalSettledOrdersCard = () => {
  const [totalSettledAmount, setTotalSettledAmount] = useState(0);

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

      const settledOrders = response.data.filter(order => order.statusHistory.some(status => status.transaction_status === 'settlement'));
      const totalAmount = settledOrders.reduce((acc, order) => acc + order.total, 0);

      setTotalSettledAmount(totalAmount);
    } catch (error) {
      console.error('Error fetching orders:', error.response);
    }
  };

  return (
    <>
      <h5 >Total Amount of Settled Orders</h5>
      <p >Total Amount: {totalSettledAmount.toLocaleString('id-ID')} IDR</p>
    </>
  );
};

export default TotalSettledOrdersCard;