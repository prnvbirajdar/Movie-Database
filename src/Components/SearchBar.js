// import React, { Component } from 'react';

// class SearchBar extends Component {
//     state = { term :"" }

//     handleSubmit = e => {
//         e.preventDefault()
    
//         // this.props for CLASSES
//         this.props.onClickSubmit(this.state.term)
//     }

//     render() { 
//         return ( 
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <input type='text' value={this.state.term} onChange = {e=> this.setState({term: e.target.value})}/>
//                 </form>
//             </div> 
//         );
//     }
// }
 
// export default SearchBar;