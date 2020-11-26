import React, {useState, useEffect} from 'react';
import {requests, instance,img_api} from '../../../Api/axios';
import './Banner.css';
import {Link} from 'react-router-dom'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await instance.get(requests.upcomingMovies)
                .catch(err => { console.log("Banner Error", err.response) })

                // refinedMovies removes all the movie objects with broken image files,
                // and selects a random movie to display
                const refinedMovies = response.data.results.filter((movie)=>{
                    return movie?.backdrop_path !== null || "" || undefined
                })

                setMovie(refinedMovies[Math.floor(Math.random() * refinedMovies.length)])
            return response
        }
        fetchData()
    }, [])

    //Function truncates the movie overview to max 150 characters
    const truncate = (string, num) => {
        return string?.length > num ? string.substr(0, num -1) + "..." : string;
    }

    return (
        <React.Fragment>
            <header 
                className="banner"
                style={{
                backgroundImage: `linear-gradient(0deg, rgba(20,20,20,1) 7%, rgba(20,20,20,0.2816001400560224) 100%)
                , url(${img_api.backdrop}${movie?.backdrop_path})`}}
            >
                    <div className="banner__contents">
                        <h1 className="banner__title">{movie?.title || movie?.original_name || movie?.name}</h1>
                      <Link to={`/movie/${movie.id}`}><button className="banner__button">Details</button> </Link>
                        <h1 className="banner__overview">{truncate(movie.overview, 150)}</h1>
                    </div>
                <div className="banner__fadeBottom "/>
            </header>
        </React.Fragment>
    )
}

export default Banner
