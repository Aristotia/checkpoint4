import React, { useState } from "react";
import Connexion from "../components/Connexion";
import Register from "../components/Register";
import "../assets/CSS/ConnexionRegister.css";
import Header from "../components/Header";

export default function ConnexionRegister() {
  const [displayInterface, setDisplayInterface] = useState(false);

  const handleDisplay = () => {
    setDisplayInterface(!displayInterface);
  };

  return (
    <div className="connexion-register-page">
      <Header />
      {displayInterface ? (
        <Connexion handleDisplay={handleDisplay} />
      ) : (
        <Register handleDisplay={handleDisplay} />
      )}
    </div>
  );
}
