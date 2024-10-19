import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Supplier from './Supplierfront';
import OrderManagement from './OrderManagement';
import './App.css';
import logo from './images/logo.png';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className='sup_nav'>
                    <img className="logo" src={logo} alt=''/>
                    <ul className='sup_ul'>
                        <li className='sup_li'>
                            <Link to="/suppliers">Supplier</Link>
                        </li>
                        <li className='sup_li'>
                            <Link to="/orders">Order</Link>
                        </li>
                        <li className='sup_li'>
                        <Link to="/suppliers">Order Requests</Link>
                        </li>
                    </ul>
                </nav>
                

                <Routes>
                    <Route path="/" element={<Navigate to="/suppliers" />} /> {/* Redirect root path */}
                    <Route path="/suppliers" element={<Supplier />} />
                    <Route path="/orders" element={<OrderManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

