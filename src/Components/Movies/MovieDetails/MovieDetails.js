import React, { useState, useEffect } from "react";
import { instance, img_api } from "../../../Api/axios";
import "./MovieDetails.css";
import Cast from "./Cast/Cast";
import Crew from "./Crew/Crew";
import Similar from "./Similar/Similar";

import "../../../../node_modules/react-modal-video/css/modal-video.min.css";
import ModalVideo from "react-modal-video";

function MovieDetails({ match }) {
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [similar, setSimilar] = useState([]);

  const [isOpen, setOpen] = useState(false);
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await instance
        .get(
          `/movie/${match.params.id}?&append_to_response=videos,similar,credits`
        )
        .catch((err) => {
          console.log("MovieDetails Error", err.response);
        });

      // refinedSimilarMovies removes all the movie objects with broken image files
      // and slices the array to render 10 working movie objects
      const refinedSimilarMovies = response.data.similar.results
        .filter((movie) => {
          return movie?.poster_path !== null || "" || undefined;
        })
        .slice(0, 4);

      // const filteredTrailerArray = response.data.videos.results.filter(m=>{
      //     return m !== []
      // })

      const finalTrailer = response.data.videos.results
        .filter((movie) => {
          return movie?.type === "Trailer";
        })
        .slice(0, 1);

      setMovie(response.data);
      setCredits(response.data.credits);
      setSimilar(refinedSimilarMovies);
      setTrailer(finalTrailer);

      return response;
    };

    fetchMovie();
  }, [match.params.id]);

  //prevents from rendering empty arrays and giving errors.
  if (!movie.genres || !credits.cast || !credits.crew) return null;

  return (
    <div className="movieDetails">
      <div
        className="movieDetails__backdrop"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover",
          objectFit: "contain",
          backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,0.8071603641456583) 100%), url(${img_api.backdrop}${movie?.backdrop_path})`,
        }}
      >
        <div className="movieDetails__main">
          <div className="movieDetails__info">
            <div>
              <img
                className="movieDetails__mainPoster"
                src={img_api.posterBig + movie?.poster_path}
                alt={movie?.title}
              />
            </div>
            <div className="movieDetails__mainInfo">
              <h1 className="movieDetails__title">
                {movie?.title || movie?.original_name || movie?.name}{" "}
                <span>({movie.release_date.substring(0, 4)})</span>
              </h1>
              {credits.crew &&
                credits.crew
                  .filter((credit) => credit.job === "Director")
                  .slice(0, 1)
                  .map((credit) => (
                    <p
                      className="movieDetails__director"
                      key={credit.id * Math.floor(Math.random() * 100)}
                    >
                      Directed by{" "}
                      <span className="movieDetails__director__span">
                        {credit.original_name}
                      </span>{" "}
                    </p>
                  ))}{" "}
              {/*filter over the crew array to find the director and then render it*/}
              {movie.runtime !== 0 ? (
                <p className="movieDetails__runtime">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m{" "}
                </p>
              ) : (
                <p></p>
              )}{" "}
              {/*conditional rendering doesn't render 0 min. Runtime is converted mins to hr min*/}
              <div className="movieDetails__genres">
                {movie.genres.slice(0, 3).map((m, i) => {
                  return (
                    <p
                      key={m.id * Math.floor(Math.random() * 100)}
                      className="movieDetails__genre"
                    >
                      {i ? "| " : ""}
                      {m.name}
                    </p>
                  );
                })}
              </div>
              <div className="movieDetails__buttonDiv">
                <button
                  className="trailer__button movieDetails__button"
                  onClick={() => setOpen(true)}
                >
                  Play Trailer
                </button>
              </div>
              <div>
                <p className="movieDetails__overview">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="movieDetails__trailer">
        {trailer.length !== 0 ? (
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={trailer[0].key}
            onClose={() => setOpen(false)}
          />
        ) : (
          <div></div>
        )}
      </div>

      <div className="movieDetails__cast">
        <Cast {...credits} />
      </div>

      <div className="movieDetails__cast">
        <Crew {...credits} />
      </div>

      <div className="movieDetails__similar">
        <Similar similar={similar} />
      </div>
    </div>
  );
}

export default MovieDetails;
