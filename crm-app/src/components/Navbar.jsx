import React from 'react'
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav>
      <p>ALPHA CRM</p>
      <Link to="/">All Customers</Link>
      <br />
      <Link to="/contacts"><h3>All Contacts</h3></Link>
      <br />
      <Link to="/communication">All Communications</Link>
      <br />
      <Link to="/newCustomer">New Customer</Link>
      <br />
      <Link to="/newContact">New Contact</Link>
      {/* <br />
      <Link to="/newCommunication">New Communication</Link> */}
    </nav>
  )
}

export default Navbar
