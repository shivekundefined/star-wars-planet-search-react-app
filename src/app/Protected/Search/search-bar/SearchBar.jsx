
import React from 'react'
import { LoggerService } from '../../../helpers/logger-service';

export class SearchBar extends React.Component{
    constructor(props){
        super(props)
        LoggerService.log("SearchBar:: constructor");
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    handleSearchTextChange(e) {
        //LoggerService.log(e.target.value)
        this.props.onPlanetSearch(e.target.value);
    }

    render(){
        LoggerService.log("SearchBar:: Render")
        LoggerService.log("=====>>>"+ this.props.allowSearch)
        const filterText = this.props.filterText;
        return (
            <form>
                <div className="form-label-group">
                <input
                    id="inputSearch"
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={filterText}
                    autoFocus
                    onChange={this.handleSearchTextChange} 
                    disabled={!this.props.allowSearch}/>
                    <label htmlFor="inputSearch">Search Planet</label>
                </div>
                
          </form>
        )
    }
}