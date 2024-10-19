import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AddOrder() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [product_name, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [supplier_id, setSupplierId] = useState("");

  const pageStyle = {
    backgroundColor: "#000000",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative",
  };

  const buttonStyle = {
    position: "absolute",
    top: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const orderHistoryButtonStyle = {
    ...buttonStyle,
    left: "20px",
  };


  const formStyle = {
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
  };

  const buttonStylesubmit = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const sendData = (e) => {
    e.preventDefault();

    const newOrder = {
      product_name,
      category,
      brand,
      model,
      quantity: Number(quantity),
      description,
      date_added: new Date(),
      supplier_id,
    };

    if (!product_name || !category || !brand || !model || !quantity || !description || !supplier_id) {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("http://localhost:8020/api/supplierorder/add", newOrder)
      .then(() => {
        alert("Product Added");
        setProductName("");
        setCategory("");
        setBrand("");
        setModel("");
        setQuantity("");
        setDescription("");
        setSupplierId("");
      })
      .catch((err) => {
        alert(err.message);
      });

    console.log(newOrder);
  };

  return (
    <div style={pageStyle}>
      <button 
        style={orderHistoryButtonStyle}
        onClick={() => navigate('/orderHistory')} // Use navigate function correctly
      >
        Order History
      </button>
      
      <div style={formStyle}>
        <form onSubmit={sendData}>
          <div style={formGroupStyle}>
            <label htmlFor="product_name" style={labelStyle}>
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              placeholder="Enter Product Name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="category" style={labelStyle}>
              Category
            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="brand" style={labelStyle}>
              Brand
            </label>
            <input
              type="text"
              id="brand"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="model" style={labelStyle}>
              Model
            </label>
            <input
              type="text"
              id="model"
              placeholder="Enter Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="quantity" style={labelStyle}>
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="description" style={labelStyle}>
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={textareaStyle}
            ></textarea>
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="supplier_id" style={labelStyle}>
              Supplier ID
            </label>
            <input
              type="text"
              id="supplier_id"
              placeholder="Enter Supplier ID"
              value={supplier_id}
              onChange={(e) => setSupplierId(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStylesubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
