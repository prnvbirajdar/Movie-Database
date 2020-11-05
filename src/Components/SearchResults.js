import React from 'react';

const SearchResults = (props) => {

    const searchedMovies = props.searchList.map((movie)=>{
        return (<div>
            <p>{movie.title}</p>
            <p>{movie.vote_average}</p>
        </div>)
    })

    return (
        <div>
            {searchedMovies}
        </div>  
    );
}
 
export default SearchResults;