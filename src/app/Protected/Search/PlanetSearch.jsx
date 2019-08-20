

import React from 'react'
import { SearchBar } from './search-bar/SearchBar';
import { PlanetsList } from './planets-list/PlanetsList';
import { SearchCount } from './search-count/SearchCount';
import { planetService } from '../../services/planets-service';


export class PlanetSearch extends React.Component{
    debounceTimeout = null;
    searchLimit = 3;
    constructor(props){
        super(props);
        //console.warn(props);
        this.state = {
            filterText: '',
            planets : [],
            allowSearch : true,
            triggerLimitizerCount : 0
        };

        if(props.user.name === "Luke Skywalker"){
            this.searchLimit = 5
        }
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchAllowed = this.handleSearchAllowed.bind(this);
        
    }

    handleSearchTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
        this.handleInputDebounce(filterText)
    }

    handleInputDebounce(textToSearch) {
        if(this.debounceTimeout)
            clearTimeout(this.debounceTimeout)

        this.debounceTimeout = setTimeout(() => {
            this.searchPlanet(textToSearch)
        }, 500)
    }

    searchPlanet = (searchedText) => {
        searchedText = searchedText.trim() || '';
        if(!searchedText.length){
            this.resetPlanetList()
            return
        }
        let count = this.state.triggerLimitizerCount;
        this.setState({
            triggerLimitizerCount: ++count
        })
        planetService.planet_search(searchedText).then( planetsList => {
            if(planetsList.length){
                
                this.setState({
                    planets: planetsList

                });
                console.warn(this.state)
            }else{
                this.resetPlanetList()
            }
            
        }, error => {
            alert(error.message)
        })
    }

    resetPlanetList(){
        this.setState({
            planets: []
        })
    }

    handleSearchAllowed(isAllowed){
        this.setState({
            allowSearch : isAllowed
        })
    }

    render(){
        const {planets, triggerLimitizerCount, filterText, allowSearch} = this.state;
        return(
            <>
                <SearchBar filterText={filterText} onPlanetSearch={this.handleSearchTextChange} allowSearch={allowSearch}/>
                <SearchCount triggerLimitizerCount={triggerLimitizerCount} isSearchAllowed={this.handleSearchAllowed} searchLimit={this.searchLimit} />
                {planets.length > 0 && <PlanetsList planets={planets}/> }
            </>
        )
    }
}

export default PlanetSearch