import React from 'react'
import {img_api} from '../../../../Api/axios';
import './Similar.css'
import {Link} from 'react-router-dom';

function Similar(similar) {

    return (
        similar.similar.length !== 0 ?

        <div className="movieDetails__similar">
            <h2 className="movieDetails__similar__title">More Like This</h2>
            <div className="movieDetails__similar__profile">
                {similar.similar && similar.similar.map(movie=>{
                return (
                    <div key={movie.id}  className="movieDetails__similar__card">
                        <Link to={`/movie/${movie.id}`}><img className="movieDetails__similar__images" src={img_api.poster + movie?.poster_path} alt={movie.title}/></Link>
                        <p>{movie?.title || movie?.original_name || movie?.name} <span>({movie.release_date.substring(0,4)})</span></p>
                    </div>
                )})}
            </div>
        </div> 
        
        : <React.Fragment></React.Fragment>
    )
}

export default Similar
