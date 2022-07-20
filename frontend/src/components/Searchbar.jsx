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
        <input type="submit" id="submit-searchbar" />
      </form>
      <ul className="searchbar-results">
        {searchResult ? <li>{searchResult.Title}</li> : null}
      </ul>
    </div>
  );
}
