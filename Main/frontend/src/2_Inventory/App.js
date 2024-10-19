import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Inventory/Header';
import Navbar from './Inventory/Navbar';
import Footer from './Inventory/Footer';
import InventoryTable from './Inventory/InventoryTable/InventoryTable';
import InventoryAdd from './Inventory/InventoryAdd/InventoryAdd';
import EditProduct from './Inventory/EditProduct/EditProduct';
import OrderPage from './Inventory/OrderPage/orderPage';
import OrderHistory from './Inventory/OrderPage/OrderHistory/orderHistory';
import TechnicianOrder from './Inventory/TechnicianOrder/TechnicianOrder';
import CustomerPurchases from './Inventory/CustomerBuy/CustomerBuy';
import Login from './Inventory/Login/Login'; // Import the new Login component

function App() {
  

  return (
    <Router>
      {/* Keep Header and Navbar constant */}
      <Header />
      <Navbar />

      {/* Define a dashboard-like main layout */}
      <main style={{ display: 'flex', flexDirection: 'column', flex: '1', padding: '20px' }}>
        <Routes>
        
          <Route path="/" element={<InventoryTable />} />
          <Route path="/add" element={<InventoryAdd />} />
          <Route path="/edit/:id" element={<EditProduct />}  />
          <Route path="/customerbuy" element={<CustomerPurchases />}/>
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/technicianOrder" element={<TechnicianOrder />} />


        </Routes>
      </main>

      {/* Footer remains constant */}
      <Footer />
    </Router>
  );
}

export default App;
