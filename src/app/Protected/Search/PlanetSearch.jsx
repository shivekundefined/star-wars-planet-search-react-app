

import React from 'react'
import { SearchBar } from './search-bar/SearchBar';
import { PlanetsList } from './planets-list/PlanetsList';
import { SearchCount } from './search-count/SearchCount';
import { planetService } from '../../services/planets-service';
import { LoggerService } from '../../helpers/logger-service';


export class PlanetSearch extends React.Component{
    debounceTimeout = null;
    searchLimit = 3;
    displayResult = false;
    constructor(props){
        super(props);
        //LoggerService.warn(props);
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
        LoggerService.log(textToSearch)
        if(this.debounceTimeout)
            clearTimeout(this.debounceTimeout)

        this.debounceTimeout = setTimeout(() => {
            this.searchPlanet(textToSearch)
        }, 500)
    }

    searchPlanet = (searchedText) => {
        searchedText = searchedText.trim() || '';
        if(!searchedText.length){
            this.displayResult = false
            this.resetPlanetList()
            return
        }
        let count = this.state.triggerLimitizerCount;
        this.setState({
            triggerLimitizerCount: ++count
        })
        planetService.planet_search(searchedText).then( planetsList => {
            if(planetsList.length){
                this.displayResult = true
                this.setState({
                    planets: planetsList

                });
                LoggerService.warn(this.state)
            }else{
                this.displayResult = true
                this.resetPlanetList()
            }
            
        }, error => {
            LoggerService.log(error);
            this.displayResult = false
            this.resetPlanetList()
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
        let planets_list;
        const {planets, triggerLimitizerCount, filterText, allowSearch} = this.state;

        console.log(this.displayResult)
        if(planets.length > 0 && this.displayResult){
            planets_list = planets.length > 0 && <PlanetsList planets={planets}/>
        }else if(this.displayResult){
            planets_list = <h4 className="text-center"> No planet with this name </h4>
        }


        return(
            <>
                <SearchBar filterText={filterText} onPlanetSearch={this.handleSearchTextChange} allowSearch={allowSearch}/>
                <SearchCount triggerLimitizerCount={triggerLimitizerCount} isSearchAllowed={this.handleSearchAllowed} searchLimit={this.searchLimit} />
                { planets_list }
            </>
        )
    }
}

export default PlanetSearch