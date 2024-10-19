import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    product_name: '',
    brand: '',
    model: '',
    price: '',
    quantity: '',
    description: '',
    supplier_id: ''
  });

  useEffect(() => {
  
    axios.get(`http://localhost:8020/api/inventory/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
   
    axios.put(`/api/inventory/${id}`, product)
      .then(() => {
        alert('Product updated successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  
  const pageStyle = {
    backgroundColor: "#000000", 
    minHeight: "100vh", 
    display: "flex", 
    justifyContent: "center",
    alignItems: "center", 
    padding: "20px"
  };

  const containerStyle = {
    maxWidth: '500px', 
    width: '100%', 
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  };
  

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const textAreaStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '18px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838',
  };

  return (
    <div style={pageStyle}>
    <div style={containerStyle}>
      <h2 style={headingStyle}>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Brand:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Model:</label>
          <input
            type="text"
            name="model"
            value={product.model}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            style={textAreaStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Supplier ID:</label>
          <input
            type="text"
            name="supplier_id"
            value={product.supplier_id}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Update Product
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProduct;
