
import React from 'react'

export class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    handleSearchTextChange(e) {
        this.props.onPlanetSearch(e.target.value);
    }

    render(){

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