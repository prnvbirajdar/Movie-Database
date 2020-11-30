import React from 'react'
import {img_api} from '../../../../Api/axios';
import './Credits.css'
import BackupImage from '../Cast/img.png'

function Cast(credits) {

    return (
     
        credits.cast.length !== 0 ?

        <div className="movieDetails__credits">
            <h2 className="movieDetails__credits__title">Cast</h2>
            <div className="movieDetails__credits__profile">
            {credits.cast && credits.cast
                .slice(0,10)
                .map(credit=>{
                return (
                    <div className="movieDetails__credits__card" key={credit.id}> {/*maps over cast array and renders first 4 actors*/}
                        <img className="movieDetails__credits__images" src={credit?.profile_path? img_api.poster + credit?.profile_path : BackupImage } alt={credit?.name}/>
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
