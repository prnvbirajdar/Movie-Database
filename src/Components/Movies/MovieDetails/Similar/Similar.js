import React from "react";
import { img_api } from "../../../../Api/axios";
import "./Similar.css";
import { Link } from "react-router-dom";

function Similar(similar) {
  return similar.similar.length !== 0 ? (
    <div className="movieDetails__similar">
      <h2 className="movieDetails__similar__title">More Like This</h2>
      <div className="movieDetails__similar__profile">
        {similar.similar &&
          similar.similar.map((movie) => {
            return (
              <div key={movie.id} className="movieDetails__similar__card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    onClick={window.scrollTo(0, 0)}
                    className="movieDetails__similar__images"
                    src={img_api.poster + movie?.poster_path}
                    alt={movie.title}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

export default Similar;
