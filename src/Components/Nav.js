import React, {useState, useEffect} from 'react'
import './Nav.css'

function Nav() {
    const [navbar, setNavbar] = useState(false)

    useEffect(()=>{
            window.addEventListener('scroll', ()=>{
                if(window.scrollY >= 80){
                    setNavbar(true)
                } else{
                    setNavbar(false)
                }
            })
            return ()=>{
                window.removeEventListener('scroll')    
            }  
    },[])

    return (
        <div className={`nav ${navbar && "nav__active"}`}>
            <div className="nav__icon">
                <i class="fas fa-film"></i>
            </div>
            <input 
                type='text' 
                className="nav__input" 
                placeholder="&#xF002; Search movie titles" 
                style= {{fontFamily: 'Helvetica, FontAwesome, sans-serif'}} 
            />
            
        </div>
    )
}

export default Nav
