import React from "react";
import "../assets/CSS/Header.css";

import logo from "../assets/Images/logo.png";

export default function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="logo" id="logo" />
    </div>
  );
}
