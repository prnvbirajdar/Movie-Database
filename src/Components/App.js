import React, { Component } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';

class App extends Component {
    state = {  }

    onSearchSubmit = (term)=>{
        console.log(term);
    }

    render() { 
        return (<SearchBar onClickSubmit = {this.onSearchSubmit}/>  );
    }
}
 
export default App;
