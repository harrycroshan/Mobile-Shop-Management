import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importing the autoTable plugin for better table formatting
import './SupplierMan.css';

export default function Supplier() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNumber] = useState("");
  const [item, setItem] = useState("");
  const [contractdate, setContractDate] = useState("");
  const [address, setAddress] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const [loading, setLoading] = useState(false); // New state for loading
  const [searchQuery, setSearchQuery] = useState("");

  // Edit state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editContactno, setEditContactNumber] = useState("");
  const [edititem, setEditItem] = useState("");
  const [editcontractdate, setEditContractDate] = useState("");
  const [editaddress, setEditAddress] = useState("");

  const apiUrl = "http://localhost:8020";

  const validateForm = () => {
    // Simple validation logic
    //const emailRegex = /\S+@\S+\.\S+/;
   // if (!emailRegex.test(email)) {
    //  setError("Please enter a valid email.");
     // return false;
    //}

    //if (!/^\d+$/.test(contactno)) {
    //  setError("Contact number should contain only digits.");
    //  return false;
    //}

    return true;
  };

  const handleSubmit = () => {
    setError("");
    if (
      name.trim() !== "" &&
      email.trim() !== "" &&
      contactno.trim() !== "" &&
      item.trim() !== "" &&
      contractdate.trim() !== "" &&
      address.trim() !== "" &&
      validateForm()
    ) {
      setLoading(true); // Show loading
      fetch(apiUrl + "/supplier/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, contactno, item, contractdate, address }),
      })
        .then((res) => {
          setLoading(false); // Hide loading
          if (res.ok) {
            const newSupplier = { name, email, contactno, item, contractdate, address };
            setSuppliers([...suppliers, newSupplier]);
            setFilteredSuppliers([...filteredSuppliers, newSupplier]);
            setName("");
            setEmail("");
            setContactNumber("");
            setItem("");
            setContractDate("");
            setAddress("");
            setMessage("Supplier added successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            // Scroll to the newly added supplier
            document.getElementById("supplier-list").scrollIntoView({ behavior: "smooth" });
          } else {
            setError("Unable to add supplier");
          }
        })
        .catch(() => {
          setLoading(false); // Hide loading
          setError("Unable to add supplier");
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    setLoading(true); // Show loading
    fetch(apiUrl + "/supplier/supplier")
      .then((res) => res.json())
      .then((res) => {
        setLoading(false); // Hide loading
        setSuppliers(res);
        setFilteredSuppliers(res);
      })
      .catch(() => {
        setLoading(false); // Hide loading
        setError("Unable to fetch suppliers.");
      });
  };

  const handleEdit = (items) => {
    setEditId(items._id);
    setEditName(items.name);
    setEditEmail(items.email);
    setEditContactNumber(items.contactno);
    setEditItem(items.item);
    setEditContractDate(items.contractdate);
    setEditAddress(items.address);
  };

  const handleUpdate = () => {
    setError("");
    if (
      editName.trim() !== "" &&
      editEmail.trim() !== "" &&
      editContactno.trim !== "" &&
      edititem.trim() !== "" &&
      editcontractdate.trim() !== "" &&
      editaddress.trim() !== "" &&
      validateForm()
    ) {
      setLoading(true); // Show loading
      fetch(apiUrl + "/supplier/supplier/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          contactno: editContactno,
          item: edititem,
          contractdate: editcontractdate,
          address: editaddress,
        }),
      })
        .then((res) => {
          setLoading(false); // Hide loading
          if (res.ok) {
            const updatedSuppliers = suppliers.map((items) => {
              if (items._id === editId) {
                items.name = editName;
                items.email = editEmail;
                items.contactno = editContactno;
                items.item = edititem;
                items.contractdate = editcontractdate;
                items.address = editaddress;
              }
              return items;
            });
            setSuppliers(updatedSuppliers);
            setFilteredSuppliers(updatedSuppliers);
            setEditName("");
            setEditEmail("");
            setEditContactNumber("");
            setEditItem("");
            setEditContractDate("");
            setEditAddress("");
            setMessage("Supplier updated successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEditId(-1);
          } else {
            setError("Unable to update supplier");
          }
        })
        .catch(() => {
          setLoading(false); // Hide loading
          setError("Unable to update supplier");
        });
    }
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setLoading(true); // Show loading
      fetch(apiUrl + "/supplier/supplier" + id, {
        method: "DELETE",
      })
        .then(() => {
          setLoading(false); // Hide loading
          const updatedSuppliers = suppliers.filter((items) => items._id !== id);
          setSuppliers(updatedSuppliers);
          setFilteredSuppliers(updatedSuppliers);
        })
        .catch(() => {
          setLoading(false); // Hide loading
          setError("Unable to delete supplier");
        });
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.email.toLowerCase().includes(query) ||
        supplier.item.toLowerCase().includes(query) ||
        supplier.address.toLowerCase().includes(query)
    );
    setFilteredSuppliers(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Supplier Management Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Using autoTable to format data in table format
    doc.autoTable({
      startY: 40,
      head: [["Name", "Email", "Contact No", "Item", "Contract Date", "Address"]],
      body: filteredSuppliers.map((supplier) => [
        supplier.name,
        supplier.email,
        supplier.contactno,
        supplier.item,
        supplier.contractdate,
        supplier.address,
      ]),
    });

    doc.save("Supplier_Report.pdf");
  };

  return (
    <body className="maindiv" style={{ backgroundColor: "black", minHeight: "100vh", color: "white", width:"100vw" , left: "calc(-50vw + 50%)", position:"relative", padding:"50px" }}>
      
        <h1 style={{textAlign: "center", fontFamily:"Bungee",marginBottom:"30px",fontSize:"50px"}}>Supplier Management</h1>
      

      {loading && <p>Loading...</p>} {/* Loading indicator */}

      
        <h3 className="subhead" style={{textAlign:"center", margin:"10px", fontFamily:"Comfortaa"}}>Add Supplier</h3>
        {message && <p className="text-success">{message}</p>}
        <div class="formdiv glow">
          <div style={{backgroundColor:"black", padding:"15px",paddingLeft:"30px",paddingRight:"30px",paddingTop:"25px", borderRadius:"20px", marginLeft:"1px",height:"100%",width:"100%",textAlign:"center"}}>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} className="addsup_input" type="text" />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} className="addsup_input" type="text" />
          <input placeholder="Contact Number" onChange={(e) => setContactNumber(e.target.value)} value={contactno} className="addsup_input" type="text" />
          <input placeholder="Item" onChange={(e) => setItem(e.target.value)} value={item} className="addsup_input" type="text" />
          <input placeholder="Contract Date" onChange={(e) => setContractDate(e.target.value)} value={contractdate} className="addsup_input" type="date" />
          <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={address} className="addsup_input" type="text" />
          {error && <p className="text-danger">{error}</p>}
          <button onClick={handleSubmit} className="addsup_submitbtn">Add Supplier</button>
          </div>
        </div>
      

      
       
        
      

      <div className="div5">
        <h3 className="subhead" style={{textAlign:"center", marginTop:"40px", fontFamily:"Comfortaa"}}>Supplier List</h3>
        <div style={{display:"flex", justifyContent:"center"}}>
        <div className="searchdiv">
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by name, email, item, or address" className="sup_searchbar" />
        <span class="material-symbols-outlined">search</span>
        </div>
        </div>
        <table className="sup_listtable">
          <thead>
            <tr>
              <th style={{fontFamily:"Exo"}}>Name</th>
              <th style={{fontFamily:"Exo"}}>Email</th>
              <th style={{fontFamily:"Exo"}}>Contact No</th>
              <th style={{fontFamily:"Exo"}}>Item</th>
              <th style={{fontFamily:"Exo"}}>Contract Date</th>
              <th style={{fontFamily:"Exo"}}>Address</th>
              <th style={{fontFamily:"Exo"}}>Actions</th>
            </tr>
          </thead>
          <tbody id="supplier-list">
            {filteredSuppliers.map((items) => (
              <tr key={items._id}>
                <td style={{fontFamily:"Ubuntu"}}>{items.name}</td>
                <td style={{fontFamily:"Ubuntu"}}>{items.email}</td>
                <td style={{fontFamily:"Ubuntu"}}>{items.contactno}</td>
                <td style={{fontFamily:"Ubuntu"}}>{items.item}</td>
                <td style={{fontFamily:"Ubuntu"}}>{items.contractdate}</td>
                <td style={{fontFamily:"Ubuntu"}}>{items.address}</td>
                <td>
                  <button className="sup_editbtn" onClick={() => handleEdit(items)}>Edit</button>
                  <button className="sup_deletebtn" onClick={() => handleDelete(items._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <div style={{textAlign:"center"}}>
        <button className="reportbutton" onClick={generatePDF} style={{width:"20%", marginTop:"20px"}}>Generate PDF</button>
      </div>

      {editId !== -1 && (
        <div className="row">
          <h3>Edit Supplier</h3>
          <div className="form-group">
            <input placeholder="Name" onChange={(e) => setEditName(e.target.value)} value={editName} className="addsup_input" type="text" />
            <input placeholder="Email" onChange={(e) => setEditEmail(e.target.value)} value={editEmail} className="addsup_input" type="text" />
            <input placeholder="Contact Number" onChange={(e) => setEditContactNumber(e.target.value)} value={editContactno} className="addsup_input" type="text" />
            <input placeholder="Item" onChange={(e) => setEditItem(e.target.value)} value={edititem} className="addsup_input" type="text" />
            <input placeholder="Contract Date" onChange={(e) => setEditContractDate(e.target.value)} value={editcontractdate} className="addsup_input" type="date" />
            <input placeholder="Address" onChange={(e) => setEditAddress(e.target.value)} value={editaddress} className="addsup_input" type="text" />
            {error && <p className="text-danger">{error}</p>}
            <button onClick={handleUpdate} className="sup_editbtn">Update Supplier</button>
            <button onClick={handleEditCancel} className="sup_deletebtn">Cancel</button>
          </div>
        </div>
      )}
      
    </body>
  );
}