
import React from 'react'
import Planet from '../planets/Planets';

export class PlanetsList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

        return (
            <>
                <div className="row planet-result" id="ads">
                    <div className="col-md-12 ">
                        <h3 className="planet-list-label">Planets And Their Population</h3>
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
