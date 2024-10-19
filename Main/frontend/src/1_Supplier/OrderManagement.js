import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import './OrderManagement.css'; // Import your CSS file

function OrderManagement() {
    const [suppliers, setSuppliers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        supplierId: '',
        itemCategory: '',
        quantity: '',
        deliveryDays: ''
    });
    const [editingOrder, setEditingOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchSuppliers();
        fetchOrders();
    }, []);

    // Fetch suppliers from the server
    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8020/supplier/supplier');
            setSuppliers(res.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching suppliers');
            setLoading(false);
        }
    };

    // Fetch orders from the server
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8020/order/orders');
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching orders');
            setLoading(false);
        }
    };

    // Handle input change for order fields
    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    // Submit new or edited order
    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (!newOrder.supplierId || !newOrder.itemCategory || !newOrder.quantity || !newOrder.deliveryDays) {
            setError('Please fill out all fields.');
            return;
        }
        setLoading(true);
        try {
            if (editingOrder) {
                await axios.put(`http://localhost:8020/order/order/${editingOrder._id}`, newOrder);
            } else {
                await axios.post('http://localhost:8020/order/order', newOrder);
            }
            fetchOrders();
            setNewOrder({ supplierId: '', itemCategory: '', quantity: '', deliveryDays: '' });
            setEditingOrder(null);
            setIsModalOpen(false);  // Close modal after submitting
            setError('');
        } catch (error) {
            setError('Error placing or updating order');
        }
        setLoading(false);
    };

    // Handle order edit
    const handleEditOrder = (order) => {
        setNewOrder({
            supplierId: order.supplierId,
            itemCategory: order.itemCategory,
            quantity: order.quantity,
            deliveryDays: order.deliveryDays
        });
        setEditingOrder(order);
        setIsModalOpen(true);  // Open modal when editing
    };

    // Handle order deletion
    const handleDeleteOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:8020/order/order/${orderId}`);
                fetchOrders();
                setError('');
            } catch (error) {
                setError('Error deleting order');
            }
            setLoading(false);
        }
    };

    // Cancel update and close modal
    const handleCancelUpdate = () => {
        setNewOrder({ supplierId: '', itemCategory: '', quantity: '', deliveryDays: '' });
        setEditingOrder(null);
        setIsModalOpen(false);
    };

    // Filter orders based on search term
    const filteredOrders = orders.filter(order =>
        (order.supplierId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.itemCategory.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <body className="main" style={{ backgroundColor: "black", minHeight: "100vh", color: "white", width: "100vw", position: "relative", padding: "50px" , left: "calc(-50vw + 50%)"}}>
            <h1 style={{fontFamily:"Bungee", marginBottom:"30px", fontSize:"50px"}}>Order Management</h1>

            <h3 style={{textAlign:"center", margin:"10px", fontFamily:"Comfortaa"}}>Make Order</h3>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* New Order Form */}
            {!editingOrder && (
                <div class="formdiv glow">
                <form onSubmit={handleSubmitOrder} style={{width:"100%", height:"100%", textAlign:"center", padding:"10px", paddingTop:"25px"}} className='submitform'>
                    <select name="supplierId" value={newOrder.supplierId} onChange={handleOrderChange} style={{ marginBottom: "10px", padding: "10px" }} className='addord_input'>
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
                        style={{ marginBottom: "10px", padding: "10px" }}
                        className='addord_input'
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={newOrder.quantity}
                        onChange={handleOrderChange}
                        placeholder="Quantity"
                        style={{ marginBottom: "10px", padding: "10px" }}
                        className='addord_input'
                    />
                    <input
                        type="number"
                        name="deliveryDays"
                        value={newOrder.deliveryDays}
                        onChange={handleOrderChange}
                        placeholder="Delivery Days"
                        style={{ marginBottom: "10px", padding: "10px" }}
                        className='addord_input'
                    />
                    <div style={{textAlign:"center"}}>
                    <button type="submit" disabled={loading} className="submitbtnn">
                        Place Order
                    </button>
                    </div>
                </form>
                </div>
            )}

            

            {/* Edit Order Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className='glowdiv'>
                    <div className="editdiv" style={{backgroundColor:"black", marginLeft:"1px"}}>
                        <form className="editmodal_form" onSubmit={handleSubmitOrder} style={{ backgroundColor:"black", borderRadius:"20px", textAlign:"center" }}>
                          <h2 style={{fontFamily:"Comfortaa", marginTop:"20px"}}>Edit Order</h2>
                            <select name="supplierId" value={newOrder.supplierId} onChange={handleOrderChange} className='inputbar'>
                                <option value="">Select Supplier</option>
                                {suppliers.map(supplier => (
                                    <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="itemCategory"
                                value={newOrder.itemCategory}
                                onChange={handleOrderChange}
                                placeholder="Item Category"
                                className='inputbar'
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={newOrder.quantity}
                                onChange={handleOrderChange}
                                placeholder="Quantity"
                                className='inputbar'
                            />
                            <input
                                type="number"
                                name="deliveryDays"
                                value={newOrder.deliveryDays}
                                onChange={handleOrderChange}
                                placeholder="Delivery Days ps-2"
                                className='inputbar'
                            />
                            <div style={{textAlign:"center"}}>
                            <button type="submit" disabled={loading} className='updatebtn'>
                                Update Order
                            </button>
                            </div>
                            <div style={{textAlign:"center"}}>
                            <button type="button" onClick={handleCancelUpdate} className="cancel-btn">
                                Cancel
                            </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            )}

           

            {/* Order List as a Table */}
            <h2 style={{textAlign:"center", margin:"10px", fontFamily:"Comfortaa", marginTop:"50px"}}>Orders</h2>
            <div style={{display:"flex", justifyContent:"center"}}>
            <div className='searchdiv'>
             {/* Search Input */}
             <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="  Search by Supplier or Item"
                className='sup_searchbar'
            />
            <span class="material-symbols-outlined">search</span>
            </div>
            </div>
            {loading && <p>Loading...</p>}
            {filteredOrders.length === 0 ? (
                <p>No orders match your search.</p>
            ) : (
                <table className="sup_listtable">
                    <thead>
                        <tr>
                            <th>Supplier</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Delivery Days</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td className='td'>{order.supplierId?.name || 'Supplier not found'}</td>
                                <td className='td'>{order.itemCategory}</td>
                                <td className='td'>{order.quantity}</td>
                                <td className='td'>{order.deliveryDays}</td>
                                <td className='td'>
                                    <button onClick={() => handleEditOrder(order)} className="sup_editbtn">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteOrder(order._id)} className="sup_deletebtn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className='reportdiv'>
            {/* Report Generation Button */}
            <CSVLink
                data={filteredOrders.map(order => ({
                    supplier: order.supplierId?.name || 'Supplier not found',
                    itemCategory: order.itemCategory,
                    quantity: order.quantity,
                    deliveryDays: order.deliveryDays
                }))}
                filename="orders_report.csv"
                className="csvbtn"
                style={{ marginBottom: "20px" }}
            >
                Download Orders Report
            </CSVLink>
            </div>
        </body>
    );
}

export default OrderManagement;