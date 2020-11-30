import React from 'react';
import {useHistory, Link} from 'react-router-dom'
import {img_api} from '../Api/axios'
import './SearchResults.css'


const SearchResults = () => {

//useHistory helps use state from a different component without defining a child or parent component.
//it helps reroute the entire array from one component to another

const history = useHistory()
const movieSearchResults = history.location.movieRows
const searchInput = history.location.searchInput

console.log(movieSearchResults);

    return (
        <>
            {movieSearchResults ?
            (
                <div className="searchResults">
                    <h2 className="searchResults__title">Movie List</h2>
                    <div className="searchResults__div">
                        {movieSearchResults
                            .filter((movie)=>{return movie.poster_path !== null || "" || undefined})
                                .map(movie=>{
                                    return (
                                        <div key={movie.id} className="searchResults__card" >
                                            <Link to={`/movie/${movie.id}`}><img onclick={window.scrollTo(0, 0)} className="searchResults__images"  src={img_api.poster + movie.poster_path} alt={movie.title}/></Link>
                                        </div>
                                    )
                        })}
                    </div>
                </div>
            ):
                
            (
                <div className="no-results">
                  <div className="no-results__text">
                    <p>Your search for "{searchInput}" did not have any matches.</p>
                    <p>Suggestions:</p>
                    <ul>
                      <li>Try different keywords</li>
                      <li>Looking for a movie or TV show?</li>
                      <li>Try using a movie, TV show title, an actor or director</li>
                      <li>Try a genre, like comedy, romance, sports, or drama</li>
                    </ul>
                  </div>
                </div>
              )
            }
        </>
    )
}

export default SearchResults;
