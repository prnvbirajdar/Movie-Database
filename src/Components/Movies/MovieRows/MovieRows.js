import React, {useState, useEffect } from 'react';
import {instance, img_api} from '../../../Api/axios';
import "./MovieRows.css";
import {Link} from 'react-router-dom'

const MoviesRow = ({title, handleAPI})=>{
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        
        const fetchMovies = async()=>{
            const response = await instance.get(handleAPI)
                .catch(err => { console.log("MovieRow Error",err.response) })
            
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
        <React.Fragment>
            
                <div className="row">
                    <h2 className="row__title">{title}</h2>
                    <div className='row__posters'>
                        {movies && movies.map(movie=>{
                        return (
                            <div key={movie.id} className="row__movie" >
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={img_api.poster + movie?.poster_path} alt={movie.title} className='row__poster'/>
                                </Link>
                            </div>
                            )  
                        })}
                    </div>
                </div>
           
        </React.Fragment>
    );
}

export default MoviesRow;