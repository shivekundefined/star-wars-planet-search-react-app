import React from 'react';
import './planet-cards.scss';
import { Link } from 'react-router-dom';

const Planet = (props) => {

    let planet_style_default = {
        style: {
            height: '150px'
        },
        planetImage: 'planet-0.svg'
    }

    const population_range = [
        { start: 0, end: 100, planetImage: 'planet-1.svg'},
        { start: 100, end: 1000, planetImage: 'planet-2.svg'},
        { start: 1000, end: 10000, planetImage: 'planet-3.svg'},
        { start: 10000, end: 100000, planetImage: 'planet-4.svg'},
        { start: 100000, end: 1000000, planetImage: 'planet-5.svg'},
        { start: 1000000, end: 10000000, planetImage: 'planet-6.svg'},
        { start: 10000000, end: 100000000, planetImage: 'planet-7.svg'},
        { start: 100000000, end: 1000000000, planetImage: 'planet-8.svg'},
        { start: 1000000000, end: 10000000000, planetImage: 'planet-9.svg'},
        { start: 10000000000, end: 100000000000, planetImage: 'planet-10.svg'},
    ]

    const setPlanetSize = (population) => {
        let in_range = false;
        let planet_style = {
            style: {
                height: '10px',
            },
            planetImage: 'planet-0.svg'
        }
        if(population == "unknown"){
            return planet_style_default
        }
        for(let i = 0; i < population_range.length; i++){
            let range = population_range[i];
            if(population >= range.start && population < range.end){
                let size  = (i+1) * 10 ;
                planet_style.style.height = size + 'px'
                planet_style.planetImage = range.planetImage
                in_range = true;
                break
            }
        }

        // Planet has bigger size
        if(!in_range){
            return planet_style_default
        }

        return planet_style

        
    }

    const {planetDetail} = props
    let splittedUrl = planetDetail.url.split("/")
    let planetId = splittedUrl.length && splittedUrl[splittedUrl.length - 2];
    //let planet_image = Math.floor(Math.random() * 9) + 1  ;
    const planetSize = setPlanetSize(planetDetail.population);
    console.log(planetSize)
    return(
        <>
            <Link className="col-md-4 mb-5 planet-card" to={`/planet-details/${planetId}`}>
                <div >
                        <div className="card rounded pb-4">
                            <div className="card-image text-center p-3">
                                <span className="card-notify-badge">{planetDetail.name}</span>
                                <span className="card-notify-year"> 
                                    <span>{planetDetail.diameter}</span>
                                    { (planetDetail.diameter !== "unknown") && <span>Kms</span>}
                                </span>
                                <div className="planet-image d-flex align-items-center justify-content-center h-100">
                                <img style={planetSize.style} className="img-fluid" src={`/assets/images/${planetSize.planetImage}`} alt="planet" />
                                </div>
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