/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import "../assets/CSS/UserProfile.css";

export default function UserProfile() {
  const { userConnected } = useContext(UserContext);
  const [userInfos, setUserInfos] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${userConnected.id}`)
      .then((response) => setUserInfos(response.data));
  }, []);

  const validationSchema = yup.object().shape({
    pseudo: yup.string().required("Le pseudo est requis"),
    email: yup.string().email().required("L'email est requis"),
    password: yup.string().required("Le mot de passe est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  // eslint-disable-next-line no-unused-vars
  const { errors } = formState;

  const handleModifications = (data) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userConnected.id}`,
        data
      )
      .then(() => setUserInfos(data))
      .catch((error) => console.error(error));
  };
  return (
    <div className="UserProfile">
      <Header />
      <h1>Modifier vos informations</h1>
      <form
        onSubmit={handleSubmit(handleModifications)}
        className="user-profile-form"
      >
        <label htmlFor="pseudo">
          <h4>Votre Pseudo</h4>
          <input
            type="text"
            placeholder={userInfos.pseudo}
            {...register("pseudo")}
          />
        </label>

        <label htmlFor="email">
          <h4>Votre Email</h4>
          <input
            type="text"
            placeholder={userInfos.email}
            {...register("email")}
          />
        </label>

        <label htmlFor="password">
          <h4>Votre Password</h4>
          <input
            type="text"
            placeholder={userInfos.password}
            {...register("password")}
          />
        </label>

        <input
          type="submit"
          value="Enregistrer les modifications"
          id="register-button"
        />
      </form>
    </div>
  );
}
