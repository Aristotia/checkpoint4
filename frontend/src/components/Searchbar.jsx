import React from "react";
import "../assets/CSS/Searchbar.css";

export default function Searchbar({
  searchResult,
  searchParameters,
  setSearchParameters,
  handleSearchSubmit,
}) {
  return (
    <div className="Searchbar">
      <form className="searchbar-container" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="search"
          value={searchParameters}
          placeholder="Rechercher un film ou un critique"
          id="searchbar-input"
          onChange={(event) => {
            setSearchParameters(event.target.value);
          }}
        />

        {searchResult ? (
          <li className="search-item">
            <img src={`${searchResult.Poster}`} alt="poster" />
            {searchResult.Title}
          </li>
        ) : null}

        <input type="submit" id="submit-searchbar" />
      </form>
    </div>
  );
}
