import React, {useState, useEffect} from 'react';
import {instance, img_api} from '../../../Api/axios';
import './MovieDetails.css';
//import {Link} from 'react-router-dom';
import Credits from './Credits/Credits'
import Similar from './Similar/Similar'

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
            <div className="movieDetails__backdrop" 
                style={{backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 0%, rgba(20,20,20,0.8071603641456583) 100%), url(${img_api.backdrop}${movie?.backdrop_path})`}}>
                <div className="movieDetails__main" >
                    <img className="movieDetails__mainPoster" src={img_api.posterBig + movie?.poster_path} alt={movie?.title}/>
                    <div className="movieDetails__info">
                        <h1 className="movieDetails__title">{movie?.title || movie?.original_name || movie?.name} <span>({movie.release_date.substring(0,4)})</span></h1>
                        {credits.crew && credits.crew
                            .filter(credit=> credit.job === 'Director').slice(0,1)
                            .map(credit=> <p className="movieDetails__director" key={credit.id}>Directed by <span className="movieDetails__director__span">{credit.original_name}</span> </p>)} {/*filter over the crew array to find the director and then render it*/}
                        <div className="movieDetails__titleEtc">
                            <div className="movieDetails__Etc">
                                <p>{Math.floor(movie.runtime/60)}h {(movie.runtime%60)}m </p> {/*converts mins to hr min*/}
                                <p className="movieDetails__rating">{movie.vote_average}</p>
                            </div>
                            <button className="banner__button" onClick={()=> setOpen(true)}>Play Trailer</button>
                        </div>
                        <p className="movieDetails__overview">Overview: {movie.overview}</p> 
                        
                    
                        <div className="movieDetails__genres">Genre:&nbsp;&nbsp;
                            {movie.genres.map((m,i)=>{
                                return <p key={m.id} className="movieDetails__genre">{(i ? '| ' : '')}{m.name}</p>
                            })}
                        </div>
                    </div>
                </div>  
                <div className="movieDetails__fadeBottom"/>          
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
               <Similar similar={similar}/>
            </div>
        </div>
    )
}

export default MovieDetails


