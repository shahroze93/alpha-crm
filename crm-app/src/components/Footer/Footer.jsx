import "./Footer.css"
import React from "react";
import { Link } from "react-router-dom";

function Footer () {
  return (
    <footer className="footer">
      <p>© AlphaCRM - Shahroze Husain 2021</p>
      <a class="fab fa-linkedin" href="https://www.linkedin.com/in/shahrozehusain" target="_blank"><span>Linkedin</span></a>
    </footer>
  )
}

export default Footer