import React from 'react'
import {img_api} from '../../../../Api/axios';
import './Similar.css'
import {Link} from 'react-router-dom';

function Similar(similar) {

    return (
        <div>
            <h2 className="movieDetails__similar__title">More Like This</h2>
            <div className="movieDetails__similar__images">
                {similar.similar && similar.similar.map(movie=>{
                return (
                    <div key={movie.id}>
                        <Link to={`/movie/${movie.id}`}><img src={img_api.poster + movie?.poster_path} alt={movie.title}/></Link>
                        {/*<div className="row__movie-info">
                            <h1>{movie?.title || movie?.original_name || movie?.name}</h1>
                            <span>{movie.vote_average}</span>
                        </div>
                        <p>{movie.overview}</p> */}
                    </div>
                )})}
            </div>
        </div>
    )
}

export default Similar
