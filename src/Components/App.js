import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Movies from "./Movies/Movies";
import Nav from "./Nav/Nav";
import SearchResults from "./SearchResults";
import MovieDetails from "./Movies/MovieDetails/MovieDetails";
import Footer from "./Footer/Footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Switch>
            <Route path="/" exact component={Movies} />
            <Route
              path="/search"
              render={(props) => (
                <SearchResults
                  {...props}
                  setSearchTerm={setSearchTerm}
                />
              )}
            />
            <Route path="/movie/:id" component={MovieDetails} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

//component={SearchResults}


// import SearchBar from './SearchBar';
// import SearchResults from './SearchResults'

// const base_URL = "https://api.themoviedb.org/3";
// const api = axios.create({ baseURL: base_URL });
// const api_key = "c7c1da267bcdbf81a6bc2a04f1c8d3a6"

// const App = () => {
//     // Defined useState
//     const [popularMovies, setPopularMovies] = useState([])

//     // Called API and logged the response
//     const fetchPopularMovies = ()=>{

//          api.get("/discover/movie", {
//             params: {
//                 api_key: api_key,
//                 sort_by: "populaity.desc"
//             }
//         }).then((response)=>{
//             console.log(response.data.results);
//             setPopularMovies(response.data.results)
//         })
//     }

//     // Called API function inside useEffect
//      useEffect(()=>{
//         fetchPopularMovies()
//      },[])

//     // Mapped the original array on the Movie Component
//     return (
//         <div>
//             {popularMovies.length >0 && popularMovies.map(movie=>
//                 <SearchResults key={movie.id} {...movie}/>
//             )}
//         </div>
//     );
// }

// export default App;

// class App extends Component {
//     state = {
//         popularMovieList: [],
//         movieList : []
//     }

//     onSearchSubmit = async (term)=>{
//         const response = await api.get("/search/movie", {
//             params: {
//                 api_key: api_key,
//                 query: term  //search parameter
//             }
//         });

//         this.setState({movieList: response.data.results})
//         console.log(response.data.results);
//     }

//     onPopularMovies = async ()=>{

//         const popularResponse = await "https://api.themoviedb.org/3/discover/movie?api_key=c7c1da267bcdbf81a6bc2a04f1c8d3a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"

//         api.get("/discover/movie", {
//             params: {
//                 api_key: api_key,
//                 page: 1
//             }
//         });

//         this.setState({popularMovieList: popularResponse.data.results})
//         console.log(popularResponse.data.results);
//     }

//     render() {
//         return (
//             <div>
//                 <SearchBar onClickSubmit = {this.onSearchSubmit}/>
//                 Found: {this.state.movieList.length} movies
//                 <SearchResults searchList = {this.state.movieList}/>
//             </div>
//         );
//     }
// }
