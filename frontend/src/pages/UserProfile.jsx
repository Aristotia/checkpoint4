import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";

export default function UserProfile() {
  const { userConnected } = useContext(UserContext);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userConnected.id}`);
  }, []);

  return (
    <div>
      <Header />
      {userConnected.pseudo}
    </div>
  );
}
