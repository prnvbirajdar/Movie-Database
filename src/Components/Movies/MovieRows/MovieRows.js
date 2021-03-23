import React, { useState, useEffect } from "react";
import { instance, img_api } from "../../../Api/axios";
import "./MovieRows.css";
import { Link } from "react-router-dom";
// import { useHorizontalScroll } from "../useHorizontalScroll";

const MoviesRow = ({ title, handleAPI, setSearchTerm }) => {
  const [movies, setMovies] = useState([]);

  // const scrollRef = useHorizontalScroll();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await instance.get(handleAPI).catch((err) => {
        console.log("MovieRow Error", err.response);
      });

      // refinedMovies removes all the movie objects with broken image files
      // and slices the array to render 10 working movie objects
      const refinedMovies = response.data.results
        .filter((movie) => {
          return movie?.poster_path !== null || "" || undefined;
        })
        .slice(0, 10);

      setMovies(refinedMovies);
      return response;
    };

    fetchMovies();
  }, [handleAPI]);

  return (
    <React.Fragment>
      <div className="row">
        <h2 className="row__title">{title}</h2>
        <div
          className="row__posters"
          // ref={scrollRef}
        >
          {movies &&
            movies.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="row__movie"
                  onClick={() => setSearchTerm("")}
                >
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={img_api.poster + movie?.poster_path}
                      alt={movie.title}
                      className="row__poster"
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MoviesRow;

// <div>
// {movies &&
//   movies.map((movie) => {
//     return (
//       <div key={movie.id} onClick={() => setSearchTerm("")}>
//         <Link to={`/movie/${movie.id}`}>
//           <img
//             src={img_api.poster + movie?.poster_path}
//             alt={movie.title}
//           />
//         </Link>
//       </div>
//     );
//   })}
// </div>

// <React.Fragment>
// <div className="row">
//   <h2 className="row__title">{title}</h2>
//   <div className="row__posters">
//     {movies &&
//       movies.map((movie) => {
//         return (
//           <div
//             key={movie.id}
//             className="row__movie"
//             onClick={() => setSearchTerm("")}
//           >
//             <Link to={`/movie/${movie.id}`}>
//               <img
//                 src={img_api.poster + movie?.poster_path}
//                 alt={movie.title}
//                 className="row__poster"
//               />
//             </Link>
//           </div>
//         );
//       })}
//   </div>{" "}
// </div>
// </React.Fragment>
