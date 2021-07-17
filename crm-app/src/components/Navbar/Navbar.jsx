import "./Navbar.css"
import { React, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(false)

  // added a function that will close the mobile navbar upon clicking one of the clicks by toggling: https://stackoverflow.com/questions/8206565/check-uncheck-checkbox-with-javascript
  const handleClick = () => {
    document.getElementById("nav-toggle").checked = false;
  }

  return (
      <nav class="nav">
      <input id="nav-toggle" type="checkbox" />
      <Link to="/" className="logo" >ALPHA CRM</Link>
      <ul class="links">
      <li className="pagelinks"><Link to="/" onClick={handleClick} >Customers</Link></li>
      <li className="pagelinks"><Link to="/contacts" onClick={handleClick} >Contacts</Link></li>
      <li className="pagelinks"><Link to="/communication" onClick={handleClick} >Communications</Link></li>
      <li className="pagelinks"><Link to="/newCustomer" onClick={handleClick} >Add Customer</Link></li>
      </ul>
      <label for="nav-toggle" class="icon-burger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </label>
    </nav>
  )
}

export default Navbar
