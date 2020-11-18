import React, {useState, useEffect } from 'react';
import {instance, img_api} from '../Api/axios';
import "../Components/MovieRow.css";

const MoviesRow = ({title, handleAPI})=>{
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        const fetchMovies = async()=>{
            const response = await instance.get(handleAPI).catch(err => { console.log("MovieRow Error",err.response) })


                // refinedMovies removes all the movie objects with broken image files
                // and slices the array to render 10 working movie objects
                const refinedMovies = response.data.results.filter((movie)=>{
                    return movie?.poster_path !== null || "" || undefined
                }).slice(0,10)

            setMovies(refinedMovies)
            return response
        }
        
        fetchMovies()
    },[handleAPI])

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className='row__posters'>
                {movies.map(movie=>{
                return (
                    <div key={movie.id} className="row__movie" >
                        <img src={img_api.poster + movie?.poster_path} alt={movie.title} className='row__poster'/>
                        {/*<div className="row__movie-info">
                            <h1>{movie?.title || movie?.original_name || movie?.name}</h1>
                            <span>{movie.vote_average}</span>
                        </div>
                          <p>{movie.overview}</p> */}
                    </div>
                    )  
                })}
            </div>
        </div>
    );
}

export default MoviesRow;