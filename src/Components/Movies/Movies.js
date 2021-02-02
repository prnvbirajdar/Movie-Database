import React from "react";
import MoviesRow from "./MovieRows/MovieRows";
import Banner from "./Banner/Banner";
import { requests } from "../../Api/axios";

function Movies({ setSearchTerm }) {
  return (
    <div>
      <Banner />
      <MoviesRow
        title={"Trending Movies"}
        handleAPI={requests.trendingMovies}
        setSearchTerm={setSearchTerm}
      />
      <MoviesRow
        title={"Popular Movies"}
        handleAPI={requests.popularMovies}
        setSearchTerm={setSearchTerm}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Top Rated Movies"}
        handleAPI={requests.topRatedMovies}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Comedy Movies"}
        handleAPI={requests.comedyMovies}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Action Movies"}
        handleAPI={requests.actionMovies}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Romantic Movies"}
        handleAPI={requests.romanticMovies}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Crime Movies"}
        handleAPI={requests.crimeMovies}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Horror Movies"}
        handleAPI={requests.horrorMovies}
      />
      <MoviesRow
        setSearchTerm={setSearchTerm}
        title={"Documentaries"}
        handleAPI={requests.documentaryMovies}
      />
    </div>
  );
}

export default Movies;
