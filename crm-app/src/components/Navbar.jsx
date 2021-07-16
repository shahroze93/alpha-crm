import React from 'react'
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav>
      <h2>ALPHA CRM</h2>
      <div className="headlinks">
      <Link to="/"><h3>Customers</h3></Link>
      {/* <br /> */}
      <Link to="/contacts"><h3>Contacts</h3></Link>
      {/* <br /> */}
      <Link to="/communication"><h3>Communications</h3></Link>
      {/* <br /> */}
      <Link to="/newCustomer"><h3>Customer</h3></Link>
      {/* <br />
      <Link to="/newContact"><h3>Contact</h3></Link> */}
      {/* <br />
      <Link to="/newCommunication">New Communication</Link> */}
      </div>
    </nav>
  )
}

export default Navbar
