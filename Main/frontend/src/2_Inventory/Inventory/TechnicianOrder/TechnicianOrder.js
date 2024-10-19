// src/components/TechnicianOrder.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TechnicianOrder = ({ technicianId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch past orders for the technician
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8020/api/orders/technician/${technicianId}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [technicianId]);

  // Function to handle new order check
  const handleNewOrder = async () => {
    setMessage('');
    setError('');
    try {
      // Replace these with actual product/model/quantity for new orders
      const newOrderData = {
        product_name: 'Example Product', // Replace with dynamic data
        model: 'Example Model',         // Replace with dynamic data
        quantity: 5,                    // Replace with dynamic data
        technician_id: technicianId,
      };

      const response = await axios.post('http://localhost:8020/api/orders/check', newOrderData);

      setMessage(response.data.message);
      // Optionally re-fetch past orders after inventory update
      const updatedOrders = await axios.get(`http://localhost:8020/api/orders/technician/${technicianId}`);
      setOrders(updatedOrders.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Technician Orders</h1>

      {/* New Order Symbol */}
      <div style={styles.newOrderSymbol} onClick={handleNewOrder}>
        &#x2B50; {/* Star symbol as an example, customize it as needed */}
      </div>

      {/* Display message or error */}
      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}

      {/* Loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Product Name</th>
              <th style={styles.tableHeader}>Model</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{order.product_name}</td>
                <td style={styles.tableCell}>{order.model}</td>
                <td style={styles.tableCell}>{order.quantity}</td>
                <td style={styles.tableCell}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  newOrderSymbol: {
    fontSize: '30px',
    cursor: 'pointer',
    float: 'right',
    marginTop: '-40px',
    color: 'gold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  successMessage: {
    color: 'green',
    margin: '10px 0',
  },
  errorMessage: {
    color: 'red',
    margin: '10px 0',
  },
};

export default TechnicianOrder;
