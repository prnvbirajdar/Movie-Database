//import { set } from "lodash";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { img_api } from "../Api/axios";
import "./SearchResults.css";

const SearchResults = ({setSearchTerm }) => {
  //useHistory helps use state from a different component without defining a child or parent component.
  //it helps reroute the entire array from one component to another

  const history = useHistory();
  const movieSearchResults = history.location.movieRows;
  // const searchInput = history.location.searchInput

  console.log(movieSearchResults);

  const handleClick = () => {
    window.scrollTo(0, 0);
    setSearchTerm("");
  };

  return (
    <>
      {movieSearchResults ? (
        <div className="searchResults">
          <h2 className="searchResults__title">Movie List</h2>
          <div className="searchResults__div">
            {movieSearchResults
              .filter((movie) => {
                return movie.poster_path !== null || "" || undefined;
              })
              .map((movie) => {
                return (
                  <div key={movie.id} className="searchResults__card">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        onClick={handleClick}
                        className="searchResults__images"
                        src={img_api.poster + movie.poster_path}
                        alt={movie.title}
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results__text">
            <p>
              Your search did not have any matches. <br /> Try different
              keywords.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
