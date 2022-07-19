/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import batmanIcon from "../assets/Images/batman_icon.png";

export default function Counter(props) {
  const { handleDisplay } = props;
  const validationSchema = yup.object().shape({
    pseudo: yup.string().required(),
    email: yup.string().email().required(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  // eslint-disable-next-line no-unused-vars
  const { errors } = formState;

  const handleConnexion = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, data)
      .then((response) => console.error(response))
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
        <input type="text" placeholder="Votre Pseudo" {...register("pseudo")} />
        <input
          type="text"
          placeholder="Votre Mot de Passe"
          {...register("password")}
        />
        <input type="submit" value="Se connecter" />
        <button
          type="button"
          className="register-button"
          onClick={handleDisplay}
        >
          <h4>S'enregistrer</h4>
        </button>
      </form>
    </div>
  );
}
