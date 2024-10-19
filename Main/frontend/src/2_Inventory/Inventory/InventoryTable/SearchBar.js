import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div style={{ position: 'relative', width: '25%' }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            padding: '10px',
            width: '50%',
            textAlign: 'center',
            borderRadius: '5px',
            border: '1px solid #ccc',
            paddingRight: '40px', // Add space for the icon
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#888',
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
