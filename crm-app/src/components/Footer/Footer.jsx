import "./Footer.css"
import React from "react";

function Footer (props) {
  return (
    <footer className="footer">
      <p>© AlphaCRM - Shahroze Husain 2021</p>
      <a className="fab fa-linkedin" href="https://www.linkedin.com/in/shahrozehusain" >Linkedin</a>
      <i className="fas fa-adjust" onClick={props.themeToggler}></i>
    </footer>
  )
}

export default Footer