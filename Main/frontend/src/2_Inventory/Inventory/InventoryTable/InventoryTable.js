import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8020/api/inventory')
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredInventory(
      inventory.filter((item) =>
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, inventory]);

  const generateReports = () => {
    const doc = new jsPDF();
    doc.text('All Item Report', 14, 16);

    const tableColumn = ['ID', 'Item Name', 'Brand','email', 'Model', 'Quantity', 'Status'];
    const tableRows = inventory.map(item => [
      item._id,
      item.product_name,
      item.brand,
      item.model,
      item.quantity,
      item.quantity > 0 ? 'In Stock' : 'Out of Stock',
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('vehicles_report.pdf');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`/api/inventory/${id}`)
        .then(() => {
          alert('Product deleted');
          setInventory(inventory.filter((item) => item._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  };

  const pageStyle = {
    backgroundColor: 'black',
    minHeight: '100vh',
    padding: '20px',
  };

  const tableContainerStyle = {
    backgroundColor: '#fff',
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

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const searchBarStyle = {
    flex: 1,
    marginRight: '10px',
  };

  // New style for buttons container
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
    gap: '10px', // Space between buttons
  };

  return (
    <div style={pageStyle}>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          float: 'left',
          marginBottom: '20px',
        }}
        onClick={() => navigate('/Login')}
      >
        Logout
      </button>

      <div style={buttonContainerStyle}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          onClick={generateReports}
        >
          Generate Report
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          onClick={() => navigate('/CustomerBuy')}
        >
          Customer Update
        </button>
      </div>

      <div style={tableContainerStyle}>
        <div style={searchContainerStyle}>
          <div style={searchBarStyle}>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Item Name</th>
              <th style={thStyle}>Brand</th>
              <th style={thStyle}>Model</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr
                  key={item._id}
                  style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = rowHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={tdStyle}>{item._id}</td>
                  <td style={tdStyle}>{item.product_name}</td>
                  <td style={tdStyle}>{item.brand}</td>
                  <td style={tdStyle}>{item.model}</td>
                  <td style={tdStyle}>{item.quantity}</td>
                  <td style={tdStyle}>{item.quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(item._id)}
                      style={actionButtonStyle}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={deleteButtonStyle}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={noItemsStyle}>No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
