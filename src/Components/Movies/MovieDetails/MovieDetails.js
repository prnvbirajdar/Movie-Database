import React, {useState, useEffect} from 'react'
import {instance, img_api} from '../../../Api/axios';
import './MovieDetails.css'
import {Link} from 'react-router-dom'

function MovieDetails({match}) {
    const [movie,setMovie] = useState([])
    const [credits, setCredits] = useState([])
    const [similar, setSimilar] = useState([])

    useEffect(()=>{
        const fetchMovie = async ()=>{
            const response = await instance.get(`/movie/${match.params.id}`)   
            const responseCredits = await instance.get(`/movie/${match.params.id}/credits`)
            const responseSimilar = await instance.get(`/movie/${match.params.id}/similar`)

                // refinedSimilarMovies removes all the movie objects with broken image files
                // and slices the array to render 10 working movie objects
                const refinedSimilarMovies = responseSimilar.data.results.filter((movie)=>{
                    return movie?.poster_path !== null || "" || undefined
                }).slice(0,4)

            setMovie(response.data)
            setCredits(responseCredits.data)
            setSimilar(refinedSimilarMovies)

            return {response, responseCredits, responseSimilar}
        }
        fetchMovie()
    
    },[match.params.id])

    //prevents from rendering empty arrays and giving errors.
    if(!movie.genres || !credits.cast || !credits.crew) return null

    return (
        <div className="movieDetails">
            <div className="movieDetails__main">
                <img className="movieDetails__poster" src={img_api.poster + movie?.poster_path} alt={movie?.title}/>
                <div className="movieDetails__info">
                    <h1>{movie?.title || movie?.original_name || movie?.name}</h1>
                    <p>Overview: {movie.overview}</p> 
                    {credits.crew
                        .filter(credit=> credit.job === 'Director') 
                        .map(credit=> <p key={credit.id}>Director: {credit.original_name}</p>)} {/*filter over the crew array to find the director and then render it*/}
                    <p>Runtime: {Math.floor(movie.runtime/60)}hr {(movie.runtime%60)}min </p> {/*converts mins to hr min*/}
                    <p>Release year: {movie.release_date.substring(0,4)}</p>   {/*only shows the year*/}
                    <p>{movie.vote_average}</p>
                    <div className="movieDetails__genres">
                        {movie.genres.map(m=>{
                            return <p key={m.id} className="movieDetails__genre">{m.name}</p>
                        })}
                    </div>
                </div>
            </div>

            <div className="movieDetails__cast">
                {credits.cast
                    .filter(credit=>{return credit?.profile_path !== null || "" || undefined})
                    .slice(0,4)
                    .map(credit=>{
                    return (
                        <div key={credit.id}> {/*maps over cast array and renders first 4 actors*/}
                            <img src={img_api.poster + credit?.profile_path} alt={credit?.name}/>
                            <p>{credit?.name || credit?.original_name}</p>
                            <p>{credit?.character}</p>
                        </div>
                    )
                })}
            </div>

            <div className='movieDetails__similar'>
                {similar.map(movie=>{
                return (
                    <div key={movie.id}>
                        <Link to={`/movie/${movie.id}`}><img src={img_api.poster + movie?.poster_path} alt={movie.title}/></Link>
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
    )
}

export default MovieDetails


