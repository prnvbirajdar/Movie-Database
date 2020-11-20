import React from 'react'
import MoviesRow from './MovieRows/MovieRows';
import Banner from './Banner/Banner'
import {requests} from '../../Api/axios';

function Movies() {




    return (
        <div>
            <Banner/>
            <MoviesRow title={'Trending Movies'} handleAPI = {requests.trendingMovies}/>  
            <MoviesRow title={'Popular Movies'} handleAPI = {requests.popularMovies}/>
            <MoviesRow title={'Top Rated Movies'} handleAPI = {requests.topRatedMovies}/>
            <MoviesRow title={'Comedy Movies'} handleAPI = {requests.comedyMovies}/>
            <MoviesRow title={'Action Movies'} handleAPI = {requests.actionMovies}/>
            <MoviesRow title={'Romantic Movies'} handleAPI = {requests.romanticMovies}/>
            <MoviesRow title={'Crime Movies'} handleAPI = {requests.crimeMovies}/>
            <MoviesRow title={'Horror Movies'} handleAPI = {requests.horrorMovies}/>
            <MoviesRow title={'Documentaries'} handleAPI = {requests.documentaryMovies}/>
        </div>
    )
}

export default Movies
