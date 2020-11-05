import React, { Component } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults'

class App extends Component {
    state = { movieList : []  }


    onSearchSubmit = async (term)=>{

        const base_URL = "https://api.themoviedb.org/3"; 
        const api = axios.create({ baseURL: base_URL });
        const api_key = "c7c1da267bcdbf81a6bc2a04f1c8d3a6"
    
        const response = await api.get("/search/movie", { 
            params: { 
                api_key: api_key,
                query: term  //search parameter
            } 
        });

        this.setState({movieList: response.data.results})
        console.log(response.data.results);
    }

    render() { 
        return (
            <div>
                <SearchBar onClickSubmit = {this.onSearchSubmit}/> 
                Found: {this.state.movieList.length} movies
                <SearchResults searchList = {this.state.movieList}/>
            </div>
        );
    }
}
 
export default App;
