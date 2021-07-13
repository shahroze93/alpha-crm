import React from 'react'
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav>
      <Link to="/">ALL CUSTOMERS</Link>
      <br />
      <Link to="/new">New Customer</Link>
    </nav>
  )
}

export default Navbar
