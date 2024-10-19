// AddOrder.js
import React, { useState } from 'react';

function AddOrder({ suppliers, onSubmitOrder, loading }) {
    const [newOrder, setNewOrder] = useState({
        supplierId: '',
        itemCategory: '',
        quantity: '',
        deliveryDays: ''
    });
    const [error, setError] = useState('');

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newOrder.supplierId || !newOrder.itemCategory || !newOrder.quantity || !newOrder.deliveryDays) {
            setError('Please fill out all fields.');
            return;
        }
        onSubmitOrder(newOrder); // Call the parent function
        setNewOrder({ supplierId: '', itemCategory: '', quantity: '', deliveryDays: '' });
        setError('');
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <select name="supplierId" value={newOrder.supplierId} onChange={handleOrderChange}>
                    <option value="">Select Supplier</option>
                    {suppliers.length === 0 ? (
                        <option disabled>No suppliers available</option>
                    ) : (
                        suppliers.map(supplier => (
                            <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                        ))
                    )}
                </select>
                <input
                    type="text"
                    name="itemCategory"
                    value={newOrder.itemCategory}
                    onChange={handleOrderChange}
                    placeholder="Item Category"
                />
                <input
                    type="number"
                    name="quantity"
                    value={newOrder.quantity}
                    onChange={handleOrderChange}
                    placeholder="Quantity"
                />
                <input
                    type="number"
                    name="deliveryDays"
                    value={newOrder.deliveryDays}
                    onChange={handleOrderChange}
                    placeholder="Delivery Days"
                />
                <button type="submit" disabled={loading}>
                    Place Order
                </button>
            </form>
        </div>
    );
}

export default AddOrder;
