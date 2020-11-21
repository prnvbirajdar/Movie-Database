import React, {useState, useEffect} from 'react'
import {instance, img_api} from '../../../Api/axios';


function MovieDetails({match}) {
    const [movie,setMovie] = useState([])
    const [credits, setCredits] = useState([])

    useEffect(()=>{
        const fetchMovie = async ()=>{
            const response = await instance.get(`/movie/${match.params.id}`)   
            const responseCredits = await instance.get(`/movie/${match.params.id}/credits`)
            setMovie(response.data)
            setCredits(responseCredits.data)
            console.log(responseCredits.data.cast);
            console.log(responseCredits.data.crew);

            return response
        }
        fetchMovie()
    
    },[match.params.id])

    if(!movie.genres || !credits.cast || !credits.crew) return null


    return (

        <div>
            <img src={img_api.poster + movie?.poster_path} alt={movie?.title}/>
            <h1>{movie?.title || movie?.original_name || movie?.name}</h1>
            <p>{movie.overview}</p> 
            <p>{movie.runtime}</p>
            <p>{movie.release_date.substring(0,4)}</p>   {/*only shows the year*/}
            <p>{movie.vote_average}</p>
            {movie.genres.map(m=>{
                return <p key={m.id}>{m.name}</p>
            })}

            {credits.cast.slice(0,5).map(credit=>{
                return <div key={credit.id}> {/*maps over cast array and renders first 5 actors*/}
                    <p>{credit?.name || credit?.original_name}</p>
                    <p>{credit?.character}</p>
                    <img src={img_api.poster + credit?.profile_path} alt={credit?.name}/>
                </div>
            })}

            {credits.crew
                .filter(credit=> credit.job === 'Director') 
                .map(credit=> <p key={credit.id}>{credit.original_name}</p>)} {/*filter over the crew array to find the director and then render it*/}
        </div>

       
    )
}

export default MovieDetails


