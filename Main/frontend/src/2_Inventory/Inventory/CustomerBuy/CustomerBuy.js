import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CustomerPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8020/api/customer-purchases')
      .then((response) => {
        setPurchases(response.data);
      })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
      });
  }, []);

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      axios.delete(`/api/customer-purchases/${id}`)
        .then(() => {
          alert('Purchase deleted');
          setPurchases(purchases.filter((purchase) => purchase._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting purchase:', error);
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

  const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '3px',
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
        placeholder="Search by customer name or product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Brand</th>
              <th style={thStyle}>Model</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <tr key={purchase._id} style={rowHoverStyle}>
                  <td style={tdStyle}>{purchase._id}</td>
                  <td style={tdStyle}>{purchase.customer_name}</td>
                  <td style={tdStyle}>{purchase.product_name}</td>
                  <td style={tdStyle}>{purchase.brand}</td>
                  <td style={tdStyle}>{purchase.model}</td>
                  <td style={tdStyle}>{purchase.quantity}</td>
                  <td style={tdStyle}>${purchase.price}</td>
                  <td style={tdStyle}>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(purchase._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={noItemsStyle}>No purchases found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPurchases;
