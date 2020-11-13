import axios from 'axios'

// API Key
const api_key = "c7c1da267bcdbf81a6bc2a04f1c8d3a6"

// Axios Create Instance
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",  
    params: { api_key: api_key,
        language: "en-US",
    }
})

//Image API Base Url
const img_api = {
    poster:"https://image.tmdb.org/t/p/w185", // other width options w92 ,154, 185, 342, 500, 780, original
    backdrop:"https://image.tmdb.org/t/p/w780" //"w300", "w780", "w1280", "original"
} 

//Genre Key Values
const genres = {
    "Action":28,
    "Adventure":12,
    "Animation":16,
    "Comedy":"35",
    "Crime": 80,
    "Documentary":99,
    "Drama":18,
    "Family":10751,
    "Fantasy":14,
    "History":36,
    "Horror":27,
    "Music":10402,
    "Mystery":9648,
    "Romance":10749,
    "Science Fiction": 878,
    "TV Movie":10770,
    "Thriller":53,
    "War":10752,
    "Western":37
}
  
// TMDB API requests for different lists
const requests ={
    upcomingMovies:'/movie/upcoming',
    trendingMovies: `/trending/movie/week`,
    popularMovies: `/movie/popular`,
    topRatedMovies: `/movie/top_rated`,
    comedyMovies: `discover/movie?with_genres=${genres.Comedy}`,
    actionMovies: `discover/movie?with_genres=${genres.Action}`,
    romanticMovies:`discover/movie?with_genres=${genres.Romance}`,
    crimeMovies:`discover/movie?with_genres=${genres.Crime}`,
    horrorMovies:`discover/movie?with_genres=${genres.Horror}`,
    documentaryMovies:`discover/movie?with_genres=${genres.Documentary}`
}

export {requests, instance, img_api}