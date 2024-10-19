import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#00ACC1', padding: '10px', gap:'5px', flex:'wrap', width:'100%', boxSizing:'border-box'}}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/add" style={linkStyle}>Add Items</Link>
      <Link to="/order" style={linkStyle}>Order</Link>
      <Link to="/technicianOrder" style={linkStyle}>Part Request</Link>
    </nav>
  );
};
const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  padding: '10px 150px',
  borderRadius: '20px',
  border: '3px solid white',
  backgroundColor: '#00ACC1',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  
};


linkStyle[':hover'] = {
  backgroundColor: '#00ACC1',
};


export default Navbar;
