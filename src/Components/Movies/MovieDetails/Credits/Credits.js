import React from 'react'
import {img_api} from '../../../../Api/axios';
import './Credits.css'

function Credits(credits) {

    return (
        <div>
            <h2 className="movieDetails__cast__title">Cast</h2>
            <div className="movieDetails__cast__images">
            {credits.cast && credits.cast
                .filter(credit=>{return credit?.profile_path !== null || "" || undefined})
                .slice(0,4)
                .map(credit=>{
                return (
                    <div key={credit.id}> {/*maps over cast array and renders first 4 actors*/}
                        <img src={img_api.poster + credit?.profile_path} alt={credit?.name}/>
                        <p>{credit?.name || credit?.original_name}</p>
                        <p>{credit?.character}</p>
                    </div>
                )
            })}
            </div>  
        </div>
    )
}

export default Credits
