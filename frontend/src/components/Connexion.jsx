/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { UserContext } from "../contexts/UserContext";

import batmanIcon from "../assets/Images/batman_icon.png";

export default function Counter(props) {
  const { handleDisplay } = props;

  const navigate = useNavigate();

  const { setUserConnected } = useContext(UserContext);

  const validationSchema = yup.object().shape({
    pseudo: yup.string().required("Le pseudo est requis"),
    password: yup.string().required("Le mot de passe est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  // eslint-disable-next-line no-unused-vars
  const { errors } = formState;

  const handleConnexion = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, data)
      .then((res) => {
        setUserConnected(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .then(() => navigate("/home", { replace: true }))
      .catch((error) => console.error(error));
  };
  return (
    <div className="connexion-register-interface">
      <div className="connexion-register-image-container">
        <img src={batmanIcon} alt="avatar_icon" />
      </div>
      <h1>Connexion</h1>
      <form
        onSubmit={handleSubmit(handleConnexion)}
        className="connexion-register-form"
      >
        <label htmlFor="pseudo">
          <input
            type="text"
            placeholder="Votre Pseudo"
            {...register("pseudo")}
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            placeholder="Votre Mot de Passe"
            {...register("password")}
          />
        </label>

        <input type="submit" value="Se connecter" id="connect-button" />
      </form>
      <button type="button" className="redirect-button" onClick={handleDisplay}>
        <h4>S'enregistrer</h4>
      </button>
    </div>
  );
}
