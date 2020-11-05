import React from 'react';

const SearchResults = (props) => {

    const img_api = "https://image.tmdb.org/t/p/w342"

    const searchedMovies = props.searchList.map((movie)=>{
        return (<div key={movie.id}>
            <h3>{movie.title}</h3>
            <img src={img_api + movie.poster_path} alt="poster"/>
            <p>{movie.vote_average}</p>
            <p>{movie.overview}</p>
        </div>)
    })

    return (
        <div>
            {searchedMovies}
        </div>  
    );
}
 
export default SearchResults;