import React from "react";
import "../assets/CSS/Header.css";

import logo from "../assets/Images/logo.png";
import bobine from "../assets/Images/cinema-bobine.png";

export default function Header() {
  return (
    <div className="Header">
      <img src={bobine} alt="ciname-logo" id="cinema-logo" />
      <img src={logo} alt="website-name" id="website-logo" />
    </div>
  );
}
