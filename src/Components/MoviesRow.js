import React, {useState, useEffect } from 'react';
import {instance, img_api} from '../Api/axios';
import "../Components/MovieRow.css";

const MoviesRow = ({title, handleAPI})=>{
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        const fetchMovies = async()=>{
            const response = await instance.get(handleAPI)
            setMovies(response.data.results)
            return response
        }
        
        fetchMovies()
    },[handleAPI])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map(movie=>{
                return (
                    <div key={movie.id} >
                    {/*    <h3>{movie.title}</h3>*/}
                        <img src={img_api + movie.poster_path} alt="poster" className='row__poster'/>
                    {/*  <p>{movie.vote_average}</p>
                        <p>{movie.overview}</p> */}
                    </div>
                    )  
                })}
            </div>
        </div>
    );
}

export default MoviesRow;