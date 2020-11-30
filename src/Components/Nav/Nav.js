import React, {useState, useEffect} from 'react'
import './Nav.css'
import {requests, instance} from '../../Api/axios';
import {Link, useHistory, withRouter} from 'react-router-dom'

function Nav() {
    // SCROLLING SECTION
    const [searchTerm, setSearchTerm] = useState('')
    const [movies,setMovies] = useState([])

    //Black bar appears on scroll, disappears when on top
    const [navbar, setNavbar] = useState(false)

    //Scrolling useEffect
    useEffect(()=>{
            //listen to scroll, if more than 80px, nav__active class is added
           const scroll = window.addEventListener('scroll', ()=>{
                if(window.scrollY >= 80){
                    setNavbar(true)
                } else{
                    setNavbar(false)
                }
            })
            //removes scroll listener when not scrolling
            return ()=>{
                window.removeEventListener('scroll', scroll)    
            }  
    },[])

    // MOVIE SEARCH SECTION
    //funtion that calls API
    const getMovies = async (apiSearchTerm)=>{
        // default apiSearchTerm is '/search/movie?query=' and it's length is 21.
        // if length is 21, the input is empty and we get back to main page
        //else we go to '/search' page of our React website
        if(apiSearchTerm.substr(21).length <= 1){
            history.push('/')
            return
        }

        const response = await instance.get(apiSearchTerm).catch(err => { console.log("Search Error",err.response) })
        setMovies(response.data.results)
        history.push({
            pathname: '/search',
            movieRows: movies,
            searchInput: apiSearchTerm.substr(20)
          });

    }

    let history = useHistory();

    //Renders movies based on what's being typed
    const handleChange = (e)=>{
       setSearchTerm(e.target.value)

       if(searchTerm){
        getMovies(`${requests.searchMovies}?query=${searchTerm}`)
        } 

    }

    const handleOnSubmit=(e)=>{
        e.preventDefault()

        setSearchTerm('')

    }

console.log(movies)

    return (
            <nav>
                <div className={`nav ${navbar && "nav__active"}`}>
                    <div className="nav__icon">
                        <Link to="/">
                            <i className="fas fa-film"></i>
                        </Link>
                    </div>
                        <form onSubmit={handleOnSubmit}>
                            <input 
                            type='text' 
                            name="search"
                            className="nav__input" 
                            placeholder="Search movie" 
                            value={searchTerm}
                            onChange={handleChange}
                            autoComplete='off'
                            onFocus="this.value=''"/> 
                            
                        </form>        
                </div>
            </nav>
    )
}

export default withRouter(Nav)

