
import React from 'react';
import { planetService } from '../../services/planets-service';
import { Link } from 'react-router-dom';
export class PlanetDetails extends React.Component{
    planetId;
    constructor(props){
        super(props);
        this.state = {
            planetDetail: {},

        }
    }

    componentDidMount(){
        this.planetId = this.props.match.params["planetId"];
        this.getPlanetDetails(this.planetId);
    }

    getPlanetDetails(planetId){
        planetService.planet_details(planetId).then( planet => {
            this.setState({
                planetDetail : planet
            });
        }, error => {
            alert(error.message)
        })
    }

    render(){
        const {planetDetail} = this.state;
        return (
            <>
                <div className="text-right mb-2">
                    <Link to="/search-planet">Back</Link>
                </div>
                <div className="card text-left">
                <div className="card-header">
                    Planet Name - {planetDetail.name}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            Diameter
                        </div>
                        <div className="col">
                            {planetDetail.diameter}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Climate
                        </div>
                        <div className="col">
                            {planetDetail.climate}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Rotation Period
                        </div>
                        <div className="col">
                            {planetDetail.rotation_period}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Orbital Period
                        </div>
                        <div className="col">
                            {planetDetail.orbital_period}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Surface Water
                        </div>
                        <div className="col">
                            {planetDetail.surface_water}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Gravity
                        </div>
                        <div className="col">
                            {planetDetail.gravity}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Terrain
                        </div>
                        <div className="col">
                            {planetDetail.terrain}
                        </div>
                    </div>    
                </div>
                <div className="card-footer text-muted">
                {(planetDetail.population !== "unknown") && <div>Population - <strong>{planetDetail.population}</strong></div>}
                </div>
                </div>
            </>
        )
    }
}