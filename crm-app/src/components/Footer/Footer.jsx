import "./Footer.css"
import React from "react";

function Footer (props) {
  return (
    <footer className="footer">
      <p>© AlphaCRM - Shahroze Husain 2021</p>
      <i className="fab fa-linkedin" href="https://www.linkedin.com/in/shahrozehusain" ></i>
      {/* <p onClick={props.themeToggler}>Switch Theme</p> */}
      <i class="fas fa-adjust" onClick={props.themeToggler}></i>
    </footer>
  )
}

export default Footer