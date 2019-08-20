import React from 'react';
import './planet-cards.scss';
import { Link } from 'react-router-dom';

const Planet = (props) => {

    const planet_style = {
        'width': '150px'
    }

    const {planetDetail} = props
    let splittedUrl = planetDetail.url.split("/")
    let planetId = splittedUrl.length && splittedUrl[splittedUrl.length - 2];
    let planet_image = Math.floor(Math.random() * 5) + 1  ;
    return(
        <>
            <Link className="col-md-4 mb-5" to={`/planet-details/${planetId}`}>
                <div >
                        <div className="card rounded pb-4">
                            <div className="card-image text-center">
                                <span className="card-notify-badge">{planetDetail.name}</span>
                                <span className="card-notify-year"> 
                                    <span>{planetDetail.diameter}</span>
                                    { (planetDetail.diameter !== "unknown") && <span>Kms</span>}
                                </span>
                                <img style={planet_style} className="img-fluid" src={`/assets/images/planet-${planet_image}.svg`} alt="planet" />
                            </div>
                            <div className="card-image-overlay m-auto">
                                {<span className="card-detail-badge">Population</span>}
                                <span className="card-detail-badge">{planetDetail.population}</span>
                                {/* <span className="card-detail-badge">13000 Kms</span> */}
                            </div>
                        </div>
                </div>
            </Link>
        </>
    )
}

export default Planet