import React from 'react'
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav>
      <Link to="/">Alpha CRM</Link>
      <Link to="/customers">Customers</Link>
      <Link to="/new-recipe">Add Customer</Link>
    </nav>
  )
}

export default Navbar

