import axios from "axios";
import { useState } from "react";
import Searchbar from "../components/Searchbar";
import Header from "../components/Header";
import "../assets/CSS/Home.css";

export default function Home() {
  const [searchResult, setSearchResult] = useState();
  const [searchParameters, setSearchParameters] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const URLAPI = `http://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_API_KEY
    }&t=${searchParameters}`;
    const URLBDD = `${import.meta.env.VITE_BACKEND_URL}/movies`;
    const promise1 = axios.get(URLAPI);
    const promise2 = axios.get(URLBDD);
    Promise.all([promise1, promise2]).then((values) => {
      const movieFound = values[0].data;
      const movieIDBDD = values[1].data.map((movie) => movie.id_IMDB);
      const isMovieInBDD = movieIDBDD.includes(movieFound.imdbID);
      setSearchResult(movieFound);

      if (!isMovieInBDD) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/movies`, {
            id_IMDB: movieFound.imdbID,
          })
          .catch((err) => console.error(err));
      }
    });
  };
  return (
    <div className="Home">
      <Header />

      <Searchbar
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        searchParameters={searchParameters}
        setSearchParameters={setSearchParameters}
        handleSearchSubmit={handleSearchSubmit}
      />
      <h1>Bienvenue sur le site du sel cinématographique</h1>
    </div>
  );
}
