import React, {useState, useEffect} from 'react'
import {instance, img_api} from '../../../Api/axios';


function MovieDetails({match}) {
    const [movie,setMovie] = useState([])


    useEffect(()=>{

        const fetchMovie = async ()=>{
            const response = await instance.get(`/movie/${match.params.id}`)
            console.log(response.data.genres);

            setMovie(response.data)
            return response
        }
       
        fetchMovie()
    
    },[match.params.id])


    return (
        <div>
            <img src={img_api.poster + movie?.poster_path} alt={movie?.title}/>
            <h1>{movie?.title || movie?.original_name || movie?.name}</h1>
            <h2>{movie?.tagline}</h2>
            <p>{movie.overview}</p>
            <p>{movie.runtime}</p>
            <p>{movie.release_date}</p>
            <p>{movie.vote_average}</p>
            

        </div>
    )
}

export default MovieDetails
