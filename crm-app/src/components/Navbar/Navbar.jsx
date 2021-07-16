import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav className="nav-links">
      <h2 className="Alpha" >ALPHA CRM</h2>
      <Link to="/"><h3>Customers</h3></Link>
      <Link to="/contacts"><h3>Contacts</h3></Link>
      <Link to="/communication"><h3>Communications</h3></Link>
      <Link to="/newCustomer"><h3>Add Customer</h3></Link>
    </nav>
  )
}

export default Navbar
