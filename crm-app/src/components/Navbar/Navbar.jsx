import "./Navbar.css"
import React from "react";
import { Link } from "react-router-dom";

function Navbar () {
  return (
    <nav className="nav-links">
      <Link to="/" className="Alpha" ><h2>ALPHA CRM</h2></Link>
      <div className="nav-menu">
      <li className="pagelinks" ><Link to="/">Customers</Link></li>
      <li className="pagelinks"><Link to="/contacts">Contacts</Link></li>
      <li className="pagelinks"><Link to="/communication">Communications</Link></li>
      <li className="pagelinks"><Link to="/newCustomer">Add Customer</Link></li>
      </div>
    </nav>
  )
}

export default Navbar
