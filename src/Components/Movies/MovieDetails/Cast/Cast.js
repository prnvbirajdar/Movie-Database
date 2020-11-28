import React from 'react'
import {img_api} from '../../../../Api/axios';
import './Credits.css'

function Cast(credits) {

    return (
     
        credits.cast.length !== 0 ?

        <div className="movieDetails__credits">
            <h2 className="movieDetails__credits__title">Cast</h2>
            <div className="movieDetails__credits__profile">
            {credits.cast && credits.cast
                .filter(credit=>{return credit?.profile_path !== null || "" || undefined})
                .slice(0,6)
                .map(credit=>{
                return (
                    <div className="movieDetails__credits__card" key={credit.id}> {/*maps over cast array and renders first 4 actors*/}
                        <img className="movieDetails__credits__images" src={img_api.poster + credit?.profile_path} alt={credit?.name}/>
                        <div className="movieDetails__credits__text">
                            <p className="movieDetails__credits__name">{credit?.name || credit?.original_name}</p>
                            <p>{credit?.character}</p>
                        </div>
                    </div>
                )
            })}
            </div>  
        </div>

        : <React.Fragment></React.Fragment>
    )
}

export default Cast
