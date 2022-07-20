import axios from "axios";
import { useState } from "react";
import Searchbar from "../components/Searchbar";
import Header from "../components/Header";
import "../assets/CSS/Home.css";

export default function Home() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchParameters, setSearchParameters] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_API_KEY
        }&t=${searchParameters}`
      )
      .then((response) => setSearchResult(response.data));
  };
  // console.log(searchResult);
  return (
    <div className="Home">
      <Header />
      <h1>Henlo</h1>
      <Searchbar
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        searchParameters={searchParameters}
        setSearchParameters={setSearchParameters}
        handleSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
}
