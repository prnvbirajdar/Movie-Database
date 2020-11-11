import React, {useState, useEffect } from 'react';
// import tmdbApi from '../Api/axios';
import {instance} from '../Api/axios';


const MoviesRow = ({title, handleAPI})=>{
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        const fetchMovies = async()=>{
            const response = await instance.get(handleAPI)
            console.log(response.data.results)
            setMovies(response.data.results)
            return response
        }
        
        fetchMovies()
    },[handleAPI])

    return (
        <React.Fragment>
            <h2>{title}</h2>
            {movies.map(movie=>{

            })}
        </React.Fragment>
      );
    
}

 
export default MoviesRow;