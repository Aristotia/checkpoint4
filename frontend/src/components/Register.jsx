/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

export default function Counter(props) {
  const { handleDisplay } = props;
  const validationSchema = yup.object().shape({
    pseudo: yup.string().required("Le pseudo est requis"),
    email: yup.string().email().required("L'email est requis"),
    password: yup.string().required("Le mot de passe est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  // eslint-disable-next-line no-unused-vars
  const { errors } = formState;
  const handleRegister = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, data)
      .then(() => handleDisplay())
      .catch((error) => console.error(error));
  };

  return (
    <div className="connexion-register-interface">
      <h1>Inscription</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="connexion-register-form"
      >
        <label htmlFor="pseudo">
          <input
            type="text"
            placeholder="Votre Pseudo"
            {...register("pseudo")}
          />
        </label>

        <label htmlFor="email">
          {" "}
          <input type="text" placeholder="Votre Email" {...register("email")} />
        </label>

        <label htmlFor="password">
          <input
            type="text"
            placeholder="Votre Mot de Passe"
            {...register("password")}
          />
        </label>

        <input type="submit" value="S'enregistrer" id="register-button" />
      </form>
      <button type="button" className="redirect-button" onClick={handleDisplay}>
        <h4>Revenir à la connexion</h4>
      </button>
    </div>
  );
}
