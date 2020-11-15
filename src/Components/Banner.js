import React, {useState, useEffect} from 'react';
import {requests, instance} from '../Api/axios';
import './Banner.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

function Banner() {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await instance.get(requests.upcomingMovies)
                
                // refinedMovies removes all the movie objects with broken image files,
                // shuffles and slices the array to render 4 random working movie objects
                const refinedMovies = response.data.results.filter((movie)=>{
                    return movie?.backdrop_path !== null || "" || undefined
                }).sort(() => 0.5 - Math.random()).slice(0,4)

            setMovies(refinedMovies)
            return response
        }
        fetchData()
    }, [])

    // Slider properties
    const settings = {
        dots: false, //icons indicating how many movies turned off
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        lazyLoad: true, //lazy loading on
        autoplaySpeed: 5000, //new poster every 5 seconds
        speed: 500, //0.5 for transition
        fade: true, //fading transition
      }

    return (
        <header className="banner">
            <Slider {...settings}>
             {movies.slice(0,4).map(movie=>{ //Picks first 5 movies from the shuffled array
             return (
                 <div key={movie.id} className="banner__movie" >
                     <div className="banner__movie-info">
                         <h3>{movie?.title || movie?.original_name || movie?.name}</h3>
                         <button classname="banner__button">Play Trailer</button>
                         <p className="banner__overview">{movie.overview}</p>
                         <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} width="100%" alt={movie.title} className='banner__poster'/>
                     </div>
                 </div>
                 )  
             })}
            </Slider>
        </header>
    )
}

export default Banner




 






// <div>
// <Slider {...settings}>
// {movies.slice(0,4).map(movie=>{ //Picks first 5 movies from the shuffled array
// return (
//     <header className='banner' 
//     style={{
//     backgroundSize: "cover",
//     backgroundPosition:"center center",
//     backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}
//     >
//         <div className="banner__movie-info">
//             <h3>{movie?.title || movie?.original_name || movie?.name}</h3>
//             <button classname="banner__button">Play Trailer</button>
//             <p className="banner__overview">{movie.overview}</p>
//         </div>
//     </header>
// )

// })} 
// </Slider>  
// </div>
