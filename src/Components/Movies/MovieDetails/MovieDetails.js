import React, {useState, useEffect} from 'react';
import {instance, img_api} from '../../../Api/axios';
import './MovieDetails.css';
import {Link} from 'react-router-dom';
import Credits from './Credits/Credits'

import '../../../../node_modules/react-modal-video/css/modal-video.min.css';
import ModalVideo from 'react-modal-video'

function MovieDetails({match}) {
    const [movie, setMovie] = useState([])
    const [credits, setCredits] = useState([])
    const [similar, setSimilar] = useState([])

    const [isOpen, setOpen] = useState(false)
    const [trailer,setTrailer] = useState('')

    useEffect(()=>{
        const fetchMovie = async ()=>{
            const response = await instance.get(`/movie/${match.params.id}?&append_to_response=videos,similar,credits`)
                .catch(err => { console.log("MovieDetails Error", err.response) })

                // refinedSimilarMovies removes all the movie objects with broken image files
                // and slices the array to render 10 working movie objects
                const refinedSimilarMovies = response.data.similar.results.filter((movie)=>{
                    return movie?.poster_path !== null || "" || undefined
                }).slice(0,4)


                const finalTrailer = response.data.videos.results.filter(movie=>{
                    return movie?.type === 'Trailer'
                }).slice(0,1)

            setMovie(response.data)
            setCredits(response.data.credits)
            setSimilar(refinedSimilarMovies)
            setTrailer(finalTrailer[0].key)

            return response
        }
        fetchMovie()
    
    },[match.params.id])

    //prevents from rendering empty arrays and giving errors.
    if(!movie.genres || !credits.cast || !credits.crew || !trailer) return null

    return (
        <div className="movieDetails">
            <div className="movieDetails__backdrop" style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${img_api.backdrop}${movie?.backdrop_path})`}}>
                <div className="movieDetails__main" >
                    <img className="movieDetails__mainPoster" src={img_api.poster + movie?.poster_path} alt={movie?.title}/>
                    <div className="movieDetails__info">
                        <h1>{movie?.title || movie?.original_name || movie?.name} <span>({movie.release_date.substring(0,4)})</span></h1>
                        <div className="movieDetails__titleEtc">
                            <p>{Math.floor(movie.runtime/60)}h {(movie.runtime%60)}min </p> {/*converts mins to hr min*/}
                            <p className="movieDetails__rating">{movie.vote_average}</p>
                            <i class="far fa-play-circle" onClick={()=> setOpen(true)}>Play Trailer</i>
                        </div>
                        <p>Overview: {movie.overview}</p> 
                        {credits.crew && credits.crew
                            .filter(credit=> credit.job === 'Director').slice(0,1)
                            .map(credit=> <p key={credit.id}>Director: {credit.original_name}</p>)} {/*filter over the crew array to find the director and then render it*/}
                    
                        <div className="movieDetails__genres">Genre:&nbsp;&nbsp;
                            {movie.genres.map((m,i)=>{
                                return <p key={m.id} className="movieDetails__genre">{(i ? '| ' : '')}{m.name}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="movieDetails__trailer">
                {trailer && <ModalVideo 
                    channel='youtube' 
                    autoplay
                    isOpen={isOpen} 
                    videoId={trailer} 
                    onClose={() => setOpen(false)} 
                />}
            </div>
          
            <div className="movieDetails__cast">
               <Credits {...credits}/>
            </div>

            <div className='movieDetails__similar'>
                <h2 className="movieDetails__similar__title">More Like This</h2>
                <div className="movieDetails__similar__images">
                    {similar && similar.map(movie=>{
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
        </div>
    )
}

export default MovieDetails


