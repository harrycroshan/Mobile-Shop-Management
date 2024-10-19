import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8020/api/supplierorder')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`http://localhost:8020/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`http://localhost:8020/api/supplierorder/${id}`)
        .then(() => {
          alert('Order deleted');
          setOrders(orders.filter((order) => order._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
        });
    }
  };

  // CSS styles
  const pageStyle = {
    backgroundColor: 'black',
    minHeight: '100vh',
    padding: '20px',
  };

  const tableContainerStyle = {
    backgroundColor: '#000000',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  };

  const tdStyle = {
    backgroundColor: '#fff',
    color: '#333',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  };

  const rowHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  const actionButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '3px',
    marginRight: '5px',
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#f44336',
  };

  const noItemsStyle = {
    textAlign: 'center',
    padding: '20px',
    color: '#777',
  };

  return (
    <div style={pageStyle}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Item Name</th>
              <th style={thStyle}>Brand</th>
              <th style={thStyle}>Model</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} style={rowHoverStyle}>
                  <td style={tdStyle}>{order._id}</td>
                  <td style={tdStyle}>{order.product_name}</td>
                  <td style={tdStyle}>{order.brand}</td>
                  <td style={tdStyle}>{order.model}</td>
                  <td style={tdStyle}>{order.quantity}</td>
                  <td style={tdStyle}>
                    <button style={actionButtonStyle} onClick={() => handleEdit(order._id)}>Edit</button>
                    <button style={deleteButtonStyle} onClick={() => handleDelete(order._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={noItemsStyle}>No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
