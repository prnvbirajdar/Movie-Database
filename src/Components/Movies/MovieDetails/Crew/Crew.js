import React from "react";
import { img_api } from "../../../../Api/axios";
import "../Cast/Credits.css";
import BackupImage from "../Cast/img.png";

function Crew(credits) {
  return credits.crew.length !== 0 ? (
    <div className="movieDetails__credits movieDetails__creditsCrew">
      <h2 className="movieDetails__credits__title">Crew</h2>
      <div className="movieDetails__credits__profile">
        {credits.crew &&
          credits.crew.slice(0, 10).map((credit) => {
            return (
              <div className="movieDetails__credits__card" key={credit.id}>
                {" "}
                {/*maps over credits array and renders first 4 actors*/}
                <img
                  className="movieDetails__credits__images"
                  src={
                    credit?.profile_path
                      ? img_api.poster + credit?.profile_path
                      : BackupImage
                  }
                  alt={credit?.name}
                />
                <div className="movieDetails__credits__text">
                  <p className="movieDetails__credits__name">
                    {credit?.name || credit?.original_name}
                  </p>
                  <p>{credit?.job}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Crew;
