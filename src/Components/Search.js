// import React, {useState} from 'react'
// import AsyncSelect from 'react-select/async'
// import {requests, instance} from '../Api/axios';


// function Search() {
//     const [movie, setMovie] = useState([])

//     const onChange = ()=>{
//         return setMovie(movie || [])
//     }

//     const loadApi = async (movie)=>{
//         const response = await instance.get(`${requests.searchMovies}${movie}`)

//         console.log(response);
//     }

  
//     return ( 
//         <div className="movies">
//             <div className='movies__title'>
//                 {movie.map(m=>{
//                     return <p>{m.title}</p>
//                 })}
//             </div> 

//             <AsyncSelect
//                 isMulti
//                 value={movie}
//                 onChange={onChange}
//                 placeholder={'type'}
//                 loadOptions={loadApi}
//             />
//         </div>  
//     )
// }

// export default Search
