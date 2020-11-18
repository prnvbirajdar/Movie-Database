import React, {useState, useEffect} from 'react'
import './Nav.css'
import {requests, instance} from '../Api/axios';
import {Link} from 'react-router-dom'
// import Search from './Search'


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
    const getMovies = async (api)=>{
        const response = await instance.get(api).catch(err => { console.log("Search Error",err.response) })
        setMovies(response.data.results)
    }

    //Handles form tag from reloading on pressing enter
    const handleSubmit=(e)=>{
        e.preventDefault()
        
    }

    //Renders movies based on what's being typed
    const handleChange = (e)=>{
        setSearchTerm(e.target.value)
        if(searchTerm){
            getMovies(`${requests.searchMovies}?query=${searchTerm}`)
         }
    }

    console.log(movies);

    return (
        <nav>
            <div className={`nav ${navbar && "nav__active"}`}>
                <div className="nav__icon">
                    <Link to="/">
                        <i className="fas fa-film"></i>
                    </Link>
                </div>

                <form  onSubmit={handleSubmit}> 
                    <input 
                    type='text' 
                    className="nav__input" 
                    placeholder="Search movie" 
                    value={searchTerm}
                    onChange={handleChange}
                    />
                </form>
               
            </div>
        </nav>
    )
}

export default Nav
