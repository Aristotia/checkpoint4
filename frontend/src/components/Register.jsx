/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

export default function Counter(props) {
  const { handleDisplay } = props;
  const validationSchema = yup.object().shape({
    pseudo: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  // eslint-disable-next-line no-unused-vars
  const { errors } = formState;
  const handleRegister = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, data)
      .then((response) => console.error(response))
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
        <input type="text" placeholder="Votre Pseudo" {...register("pseudo")} />
        <input type="text" placeholder="Votre Email" {...register("email")} />
        <input
          type="text"
          placeholder="Votre Mot de Passe"
          {...register("password")}
        />

        <input type="submit" value="S'enregistrer" />
      </form>
    </div>
  );
}
