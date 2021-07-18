import "./Footer.css"
import React from "react";

function Footer (props) {
  return (
    <footer className="footer">
      <p>© AlphaCRM - Shahroze Husain 2021</p>
      <a className="fab fa-linkedin" href="https://www.linkedin.com/in/shahrozehusain" ><span>Linkedin</span></a>
      <button onClick={props.themeToggler}>Switch Theme</button>
    </footer>
  )
}

export default Footer