import React from 'react'
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav>
      <Link to="/">ALL CUSTOMERS</Link>
      <br />
      <Link to="/contacts">All Contacts</Link>
      <br />
      <Link to="/newCustomer">New Customer</Link>
      <br />
      <Link to="/newContact">New Contact</Link>
    </nav>
  )
}

export default Navbar
