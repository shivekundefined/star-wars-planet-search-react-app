
import React from 'react'
import Planet from '../Planet';
import { LoggerService } from '../../../helpers/logger-service';

export class PlanetsList extends React.Component{
    constructor(props){
        super(props)
        LoggerService.log("PlanetsList:: constructor")
    }

    render(){
        LoggerService.log("PlanetsList:: Render");

        return (
            <>
                <div className="row planet-result" id="ads">
                    <div className="col-md-12 ">
                        <h3 className="planet">Planets And Population</h3>
                    </div>
                </div >
                <div className="row">
                {
                    this.props.planets.map((planetDetail, index) => <Planet key={index} planetDetail={planetDetail} />)
                }
                </div>
            </>
        )
    }
}
